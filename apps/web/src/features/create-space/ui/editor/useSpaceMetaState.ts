import { useState, useEffect } from 'react'
import type { SpaceMeta } from '@/features/create-space/model/scenes.types'
import { DEFAULT_SPACE_META } from '@/features/create-space/model/scenes.types'
import { getSpaceById } from '@/entities/space'
import {
  loadFromStorage,
  saveToStorage,
  getSpaceStorageKeys,
} from './multi-scene-storage'

export interface UseSpaceMetaStateReturn {
  spaceMeta: SpaceMeta
  setSpaceMeta: React.Dispatch<React.SetStateAction<SpaceMeta>>
}

export function useSpaceMetaState(spaceId?: string): UseSpaceMetaStateReturn {
  const { metaKey } = getSpaceStorageKeys(spaceId)

  const [spaceMeta, setSpaceMeta] = useState<SpaceMeta>(() => {
    const existing = spaceId ? getSpaceById(spaceId) : undefined
    const saved = loadFromStorage<SpaceMeta | null>(metaKey, null)

    if (saved) {
      return {
        ...saved,
        title: existing?.title || saved.title || DEFAULT_SPACE_META.title,
        recipientName:
          existing?.recipientName ||
          saved.recipientName ||
          DEFAULT_SPACE_META.recipientName,
      }
    }

    if (existing) {
      return {
        ...DEFAULT_SPACE_META,
        title: existing.title,
        recipientName: existing.recipientName,
      }
    }

    return DEFAULT_SPACE_META
  })

  useEffect(() => {
    saveToStorage(metaKey, spaceMeta)
  }, [metaKey, spaceMeta])

  return { spaceMeta, setSpaceMeta }
}
