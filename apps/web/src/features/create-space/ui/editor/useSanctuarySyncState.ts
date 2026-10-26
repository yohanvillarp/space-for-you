import { useState, useCallback, useMemo } from 'react'
import type {
  SpaceMeta,
  SpaceScene,
} from '@/features/create-space/model/scenes.types'
import type { SpaceProtectionConfig } from '@/features/space-lock'
import {
  computeSanctuaryFingerprint,
  getPublishedFingerprint,
  setPublishedFingerprint,
} from '@/features/create-space/lib/sanctuary-fingerprint'

export interface UseSanctuarySyncStateOptions {
  spaceId?: string
  isPublished: boolean
  spaceMeta: SpaceMeta
  scenes: SpaceScene[]
  protectionConfig?: SpaceProtectionConfig
}

export function useSanctuarySyncState({
  spaceId,
  isPublished,
  spaceMeta,
  scenes,
  protectionConfig,
}: UseSanctuarySyncStateOptions) {
  const currentFingerprint = useMemo(
    () => computeSanctuaryFingerprint(spaceMeta, scenes, protectionConfig),
    [spaceMeta, scenes, protectionConfig],
  )

  const [publishedBaseline, setPublishedBaseline] = useState<string | null>(
    () => {
      if (!isPublished) return null
      const stored = getPublishedFingerprint(spaceId)
      if (stored) return stored
      // Baseline storage on initial load for existing published space
      const initial = computeSanctuaryFingerprint(
        spaceMeta,
        scenes,
        protectionConfig,
      )
      setPublishedFingerprint(spaceId, initial)
      return initial
    },
  )

  // Derive unpublished state synchronously during render without cascading effects
  const hasUnpublishedChanges = Boolean(
    isPublished &&
    publishedBaseline &&
    currentFingerprint !== publishedBaseline,
  )

  const markAsPublished = useCallback(() => {
    setPublishedFingerprint(spaceId, currentFingerprint)
    setPublishedBaseline(currentFingerprint)
  }, [spaceId, currentFingerprint])

  return { hasUnpublishedChanges, markAsPublished }
}
