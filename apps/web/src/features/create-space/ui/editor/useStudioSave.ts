/**
 * @fileoverview Hook orchestrating studio persistence for Space For You.
 * Implements a dual-layer persistence model (synchronous local cache + asynchronous Appwrite cloud sync).
 */

import { useState, useCallback } from 'react'
import type { SpaceTemplateId, UserSpace } from '@/entities/space'
import { getSpaceById, saveSpace, saveSpaceToDatabase } from '@/entities/space'
import { getCurrentUser } from '@/shared/api'
import type {
  SpaceMeta,
  SpaceScene,
} from '@/features/create-space/model/scenes.types'

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
  /** Active scenes including canvas items and letters to persist. */
  scenes?: SpaceScene[]
  /** Total count of scenes in this space. */
  scenesCount: number
  /** Total count of spatial artifacts/memories in the canvas. */
  artifactsCount: number
  /** Fallback title if user leaves the space title blank. */
  fallbackTitle: string
}

/**
 * Return interface for `useStudioSave`.
 */
export interface UseStudioSaveReturn {
  /** Whether a cloud persistence request is currently in flight. */
  isSaving: boolean
  /** Whether the save operation completed recently (resets after 2.4s). */
  isSaved: boolean
  /** Trigger function to save the space locally and sync to Appwrite Databases. */
  handleSave: () => UserSpace
}

/**
 * Custom hook managing the studio save workflow.
 *
 * @remarks
 * Saves synchronously to `localStorage` first to ensure instant UI responsiveness
 * with zero perceptible latency. If the user has an active Appwrite session, it
 * dispatches a background task to upsert documents in `spaces` and `space_scenes`.
 *
 * @param options - Configuration options and active studio state.
 * @returns State flags and trigger handler.
 *
 * @example
 * ```tsx
 * const { isSaving, isSaved, handleSave } = useStudioSave({
 *   spaceId,
 *   templateId: 'birthday',
 *   spaceMeta,
 *   scenes: resolvedScenes,
 *   scenesCount: scenes.length,
 *   artifactsCount: items.length,
 *   fallbackTitle: 'Birthday Sanctuary',
 * })
 * ```
 */
export function useStudioSave({
  spaceId,
  templateId,
  spaceMeta,
  scenes = [],
  scenesCount,
  artifactsCount,
  fallbackTitle,
}: UseStudioSaveOptions): UseStudioSaveReturn {
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = useCallback((): UserSpace => {
    setIsSaving(true)
    const existing = spaceId ? getSpaceById(spaceId) : undefined
    const localSaved = saveSpace({
      id: spaceId ?? existing?.id ?? `space_${Date.now()}`,
      title: spaceMeta.title?.trim() || existing?.title || fallbackTitle,
      recipientName:
        spaceMeta.recipientName?.trim() ||
        existing?.recipientName ||
        'Someone Special',
      templateId,
      scenesCount,
      artifactsCount,
      status: 'ready',
      createdAt: existing?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description: existing?.description,
    })

    // Cloud sync with Appwrite Databases if user has an active session
    getCurrentUser()
      .then(async (user) => {
        if (user) {
          await saveSpaceToDatabase({
            space: localSaved,
            scenes,
            userId: user.$id,
            senderName: spaceMeta.senderName,
            dedicationMessage: spaceMeta.dedicationMessage,
          })
        }
      })
      .catch(() => {
        // Non-blocking fallback to local storage
      })
      .finally(() => {
        setIsSaving(false)
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 2400)
      })

    return localSaved
  }, [
    spaceId,
    spaceMeta,
    fallbackTitle,
    templateId,
    scenes,
    scenesCount,
    artifactsCount,
  ])

  return { isSaving, isSaved, handleSave }
}
