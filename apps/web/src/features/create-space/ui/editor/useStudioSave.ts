/**
 * @fileoverview Hook orchestrating studio persistence for Space For You.
 * Implements a dual-layer persistence model (synchronous local cache + asynchronous Appwrite cloud sync).
 */

import { useState, useCallback, useEffect, useRef } from 'react'
import type { UserSpace } from '@/entities/space'
import {
  getSpaceById,
  saveSpace,
  saveSpaceToDatabase,
  getPendingCloudSyncIds,
  markPendingCloudSync,
  clearPendingCloudSync,
} from '@/entities/space'
import { getCurrentUser } from '@/shared/api'
import { getSpaceStorageKeys, saveToStorage } from './multi-scene-storage'
import { serializeProtectionTheme } from '@/features/space-lock'
import {
  derivePasscodeHash,
  generateCryptographicSalt,
} from '@/shared/lib/crypto'
import {
  uploadAllPendingPhotos,
  applyUploadedUrlsToScenes,
} from '@/features/create-space/lib/stage-photo-upload'
import type {
  UseStudioSaveOptions,
  UseStudioSaveReturn,
} from './useStudioSave.types'

export type { UseStudioSaveOptions, UseStudioSaveReturn }

export function useStudioSave({
  spaceId,
  templateId,
  spaceMeta,
  protectionConfig,
  scenes = [],
  scenesCount,
  artifactsCount,
  fallbackTitle,
  pendingPhotos,
  onPhotosUploaded,
}: UseStudioSaveOptions): UseStudioSaveReturn {
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  const isInitialMount = useRef(true)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastPersistedPayloadRef = useRef<string>('')

  const persistLocally = useCallback(
    (targetId: string): UserSpace => {
      const existing = spaceId ? getSpaceById(spaceId) : undefined
      const keys = getSpaceStorageKeys(targetId, templateId)

      saveToStorage(keys.scenesKey, scenes)
      saveToStorage(keys.metaKey, spaceMeta)
      if (protectionConfig) saveToStorage(keys.protectionKey, protectionConfig)

      const resolvedStatus =
        existing?.status === 'published'
          ? 'published'
          : (existing?.status ?? 'draft')

      return saveSpace({
        id: targetId,
        title: spaceMeta.title?.trim() || existing?.title || fallbackTitle,
        recipientName:
          spaceMeta.recipientName?.trim() ||
          existing?.recipientName ||
          'Someone Special',
        templateId,
        scenesCount,
        artifactsCount,
        status: resolvedStatus,
        isProtected: Boolean(protectionConfig?.enabled),
        createdAt: existing?.createdAt ?? new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        description: existing?.description,
      })
    },
    [
      spaceId,
      spaceMeta,
      fallbackTitle,
      templateId,
      scenes,
      scenesCount,
      artifactsCount,
      protectionConfig,
    ],
  )

  const syncToCloud = useCallback(
    async (localSaved: UserSpace): Promise<void> => {
      try {
        setIsSaving(true)
        const user = await getCurrentUser()
        if (user) {
          let scenesToSave = scenes

          if (pendingPhotos && pendingPhotos.size > 0) {
            const uploadedUrls = await uploadAllPendingPhotos(pendingPhotos)
            if (uploadedUrls.size > 0) {
              scenesToSave = applyUploadedUrlsToScenes(scenes, uploadedUrls)
              onPhotosUploaded?.(uploadedUrls)
              const keys = getSpaceStorageKeys(localSaved.id, templateId)
              saveToStorage(keys.scenesKey, scenesToSave)
            }
          }

          let finalPasscodeHash = protectionConfig?.passcodeHash
          let finalPasscodeSalt = protectionConfig?.passcodeSalt
          if (protectionConfig?.enabled) {
            if (!finalPasscodeHash || !finalPasscodeSalt) {
              const rawCode = protectionConfig.passcode || '1234'
              finalPasscodeSalt =
                finalPasscodeSalt || generateCryptographicSalt()
              finalPasscodeHash = await derivePasscodeHash(
                rawCode,
                finalPasscodeSalt,
              )
            }
          }

          const protectionTheme = serializeProtectionTheme(
            protectionConfig
              ? {
                  ...protectionConfig,
                  passcodeHash: finalPasscodeHash,
                  passcodeSalt: finalPasscodeSalt,
                }
              : undefined,
          )

          await saveSpaceToDatabase({
            space: localSaved,
            scenes: scenesToSave,
            userId: user.$id,
            senderName: spaceMeta.senderName,
            dedicationMessage: spaceMeta.dedicationMessage,
            passcodeHash: finalPasscodeHash,
            passcodeSalt: finalPasscodeSalt,
            passcodeHint: protectionConfig?.hint,
            protectionTheme,
          })
          clearPendingCloudSync(localSaved.id)
        }
        setIsDirty(false)
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 2400)
      } catch {
        // Fallback safely to local storage on offline/network errors
      } finally {
        setIsSaving(false)
      }
    },
    [
      scenes,
      spaceMeta.senderName,
      spaceMeta.dedicationMessage,
      pendingPhotos,
      onPhotosUploaded,
      templateId,
      protectionConfig,
    ],
  )

  const handleSave = useCallback((): UserSpace => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }

    const existing = spaceId ? getSpaceById(spaceId) : undefined
    const targetId = spaceId ?? existing?.id ?? `space_${Date.now()}`
    const localSaved = persistLocally(targetId)
    syncToCloud(localSaved).catch(() => {})
    return localSaved
  }, [spaceId, persistLocally, syncToCloud])

  const flushSave = useCallback(async (): Promise<UserSpace> => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }

    const existing = spaceId ? getSpaceById(spaceId) : undefined
    const targetId = spaceId ?? existing?.id ?? `space_${Date.now()}`
    const localSaved = persistLocally(targetId)
    await syncToCloud(localSaved)
    return localSaved
  }, [spaceId, persistLocally, syncToCloud])

  useEffect(() => {
    const existing = spaceId ? getSpaceById(spaceId) : undefined
    const targetId = spaceId ?? existing?.id ?? `space_${Date.now()}`

    const currentPayload = JSON.stringify({
      scenes,
      spaceMeta,
      protectionConfig,
    })

    if (isInitialMount.current) {
      isInitialMount.current = false
      lastPersistedPayloadRef.current = currentPayload
      if (getPendingCloudSyncIds().has(targetId)) {
        const localSaved = persistLocally(targetId)
        setTimeout(() => {
          syncToCloud(localSaved).catch(() => {})
        }, 0)
      }
      return
    }

    if (currentPayload === lastPersistedPayloadRef.current) return

    lastPersistedPayloadRef.current = currentPayload
    markPendingCloudSync(targetId)
    persistLocally(targetId)
    setIsDirty(true)

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)

    debounceTimerRef.current = setTimeout(() => {
      const localSaved = persistLocally(targetId)
      syncToCloud(localSaved).catch(() => {})
    }, 5000)

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    }
  }, [
    scenes,
    spaceMeta,
    protectionConfig,
    spaceId,
    persistLocally,
    syncToCloud,
  ])

  return { isSaving, isSaved, isDirty, handleSave, flushSave }
}
