import { useState, useCallback } from 'react'
import type { SpaceTemplateId, UserSpace } from '@/entities/space'
import { getSpaceById, saveSpace, saveSpaceToDatabase } from '@/entities/space'
import { getCurrentUser } from '@/shared/api'
import type {
  SpaceMeta,
  SpaceScene,
} from '@/features/create-space/model/scenes.types'

export interface UseStudioSaveOptions {
  spaceId?: string
  templateId: SpaceTemplateId
  spaceMeta: SpaceMeta
  scenes?: SpaceScene[]
  scenesCount: number
  artifactsCount: number
  fallbackTitle: string
}

export function useStudioSave({
  spaceId,
  templateId,
  spaceMeta,
  scenes = [],
  scenesCount,
  artifactsCount,
  fallbackTitle,
}: UseStudioSaveOptions) {
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
