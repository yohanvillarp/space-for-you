import { useState, useCallback } from 'react'
import type { SpaceTemplateId } from '@/entities/space'
import { getSpaceById, saveSpace } from '@/entities/space'
import type { SpaceMeta } from '@/features/create-space/model/scenes.types'

export interface UseStudioSaveOptions {
  spaceId?: string
  templateId: SpaceTemplateId
  spaceMeta: SpaceMeta
  scenesCount: number
  artifactsCount: number
  fallbackTitle: string
}

export function useStudioSave({
  spaceId,
  templateId,
  spaceMeta,
  scenesCount,
  artifactsCount,
  fallbackTitle,
}: UseStudioSaveOptions) {
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = useCallback(() => {
    const existing = spaceId ? getSpaceById(spaceId) : undefined
    const saved = saveSpace({
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
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2400)
    return saved
  }, [
    spaceId,
    spaceMeta,
    fallbackTitle,
    templateId,
    scenesCount,
    artifactsCount,
  ])

  return { isSaved, handleSave }
}
