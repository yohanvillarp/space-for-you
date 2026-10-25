/**
 * @fileoverview Hook orchestrating studio persistence for Space For You.
 * Implements a dual-layer persistence model (synchronous local cache + asynchronous Appwrite cloud sync).
 */

import { useState, useCallback, useEffect, useRef } from 'react'
import type { SpaceTemplateId, UserSpace } from '@/entities/space'
import { getSpaceById, saveSpace, saveSpaceToDatabase } from '@/entities/space'
import { getCurrentUser } from '@/shared/api'
import type {
  SpaceMeta,
  SpaceScene,
} from '@/features/create-space/model/scenes.types'
import { getSpaceStorageKeys, saveToStorage } from './multi-scene-storage'
import type { SpaceProtectionConfig } from '@/features/space-lock'
import { serializeProtectionTheme } from '@/features/space-lock'
import {
  uploadAllPendingPhotos,
  applyUploadedUrlsToScenes,
} from '@/features/create-space/lib/stage-photo-upload'

/**
 * Configuration options supplied to the `useStudioSave` hook.
 */
export interface UseStudioSaveOptions {
  /** Optional existing space ID when editing a previously created space. */
  spaceId?: string
  /** Selected sanctuary theme identifier. */
  templateId: SpaceTemplateId
  /** Dedication metadata including title, recipient, sender, and message. */
  spaceMeta: SpaceMeta
  /** Passcode privacy gate configuration for protecting the space. */
  protectionConfig?: SpaceProtectionConfig
  /** Active scenes including canvas items and letters to persist. */
  scenes?: SpaceScene[]
  /** Total count of scenes in this space. */
  scenesCount: number
  /** Total count of spatial artifacts/memories in the canvas. */
  artifactsCount: number
  /** Fallback title if user leaves the space title blank. */
  fallbackTitle: string
  pendingPhotos?: Map<string, File>
  onPhotosUploaded?: (uploadedMap: Map<string, string>) => void
}

/**
 * Return interface for `useStudioSave`.
 */
export interface UseStudioSaveReturn {
  /** Whether a cloud persistence request is currently in flight. */
  isSaving: boolean
  /** Whether the save operation completed recently (resets after 2.4s). */
  isSaved: boolean
  /** Whether unsaved modifications exist in the current session. */
  isDirty: boolean
  /** Trigger function to save the space locally and sync to Appwrite Databases. */
  handleSave: () => UserSpace
  /** Flushes any pending debounced autosave immediately. */
  flushSave: () => Promise<UserSpace>
}

/**
 * Custom hook managing the studio save workflow.
 * Saves synchronously to `localStorage` first for instant UI responsiveness,
 * and debounces background synchronization to Appwrite Databases and Storage.
 *
 * @param options - Configuration options and active studio state.
 * @returns State flags and trigger handlers.
 */
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

  // Local-first instant persistence: always keep local disk in sync ($0 cost, 0 API calls)
  const persistLocally = useCallback(
    (targetId: string): UserSpace => {
      const existing = spaceId ? getSpaceById(spaceId) : undefined
      const keys = getSpaceStorageKeys(targetId, templateId)

      saveToStorage(keys.scenesKey, scenes)
      saveToStorage(keys.metaKey, spaceMeta)

      if (protectionConfig) saveToStorage(keys.protectionKey, protectionConfig)

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
        status: 'ready',
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

  // Sync to Appwrite Cloud with consolidated payload and upload pending photos
  const syncToCloud = useCallback(
    async (localSaved: UserSpace): Promise<void> => {
      try {
        setIsSaving(true)
        const user = await getCurrentUser()
        if (user) {
          let scenesToSave = scenes

          // Deferred upload of pending photos to Appwrite Storage
          if (pendingPhotos && pendingPhotos.size > 0) {
            const uploadedUrls = await uploadAllPendingPhotos(pendingPhotos)
            if (uploadedUrls.size > 0) {
              scenesToSave = applyUploadedUrlsToScenes(scenes, uploadedUrls)
              onPhotosUploaded?.(uploadedUrls)
              const keys = getSpaceStorageKeys(localSaved.id, templateId)
              saveToStorage(keys.scenesKey, scenesToSave)
            }
          }

          const protectionTheme = serializeProtectionTheme(protectionConfig)

          await saveSpaceToDatabase({
            space: localSaved,
            scenes: scenesToSave,
            userId: user.$id,
            senderName: spaceMeta.senderName,
            dedicationMessage: spaceMeta.dedicationMessage,
            passcodeHash: protectionConfig?.enabled
              ? protectionConfig.passcodeHash
              : undefined,
            passcodeSalt: protectionConfig?.enabled
              ? protectionConfig.passcodeSalt
              : undefined,
            passcodeHint: protectionConfig?.enabled
              ? protectionConfig.hint
              : undefined,
            protectionTheme,
          })
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

  // Manual save triggered by user
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

  // Flush save on exit (before navigation or unload)
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

  // Auto-Save Effect: Instant local persistence + debounced cloud sync ONLY on actual content changes
  useEffect(() => {
    const existing = spaceId ? getSpaceById(spaceId) : undefined
    const targetId = spaceId ?? existing?.id ?? `space_${Date.now()}`

    const currentPayload = JSON.stringify({
      scenes,
      spaceMeta,
      protectionConfig,
    })

    // On initial page load, save payload baseline and ensure local state is synced without cloud write
    if (isInitialMount.current) {
      isInitialMount.current = false
      lastPersistedPayloadRef.current = currentPayload
      persistLocally(targetId)
      return
    }

    // If actual content didn't change (e.g. tab switched, window resized), DO NOT trigger cloud save
    if (currentPayload === lastPersistedPayloadRef.current) {
      return
    }

    lastPersistedPayloadRef.current = currentPayload
    persistLocally(targetId)
    setIsDirty(true)

    // Clear previous timer if user continues editing
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Schedule single consolidated cloud write after 5 seconds of idle inactivity
    debounceTimerRef.current = setTimeout(() => {
      const localSaved = persistLocally(targetId)
      syncToCloud(localSaved).catch(() => {})
    }, 5000)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
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
