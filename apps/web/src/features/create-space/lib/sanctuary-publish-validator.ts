import type {
  SpaceMeta,
  SpaceScene,
} from '@/features/create-space/model/scenes.types'
import type { SpaceProtectionConfig } from '@/features/space-lock'
import { isSceneTimeLocked } from '@/features/create-space/lib/scene-schedule-utils'

export interface PublishValidationIssue {
  id: 'title' | 'recipient' | 'empty_content' | 'blank_passcode'
  title: string
  message: string
  severity: 'error' | 'warning'
  suggestedSceneId?: string
}

export interface SanctuaryPublishValidation {
  isValid: boolean
  issues: PublishValidationIssue[]
  summary: {
    title: string
    recipientName: string
    senderName: string
    totalScenes: number
    populatedScenes: number
    totalPhotos: number
    pendingPhotosCount: number
    isProtected: boolean
    hasSchedule: boolean
  }
}

/**
 * Evaluates whether a digital sanctuary is ready for public flight.
 * Checks completeness, emotional requirements, privacy guards, and assets.
 */
export function validateSanctuaryForPublish({
  spaceMeta,
  scenes,
  protectionConfig,
  pendingPhotosCount = 0,
}: {
  spaceMeta: SpaceMeta
  scenes: SpaceScene[]
  protectionConfig?: SpaceProtectionConfig
  pendingPhotosCount?: number
}): SanctuaryPublishValidation {
  const issues: PublishValidationIssue[] = []

  const title = (spaceMeta.title || '').trim()
  const recipientName = (spaceMeta.recipientName || '').trim()
  const senderName = (spaceMeta.senderName || '').trim()

  // 1. Title validation
  if (!title) {
    issues.push({
      id: 'title',
      title: 'Missing Sanctuary Title',
      message: 'Give your sanctuary a meaningful title before sharing.',
      severity: 'error',
      suggestedSceneId: 'hub',
    })
  }

  // 2. Recipient validation
  if (!recipientName) {
    issues.push({
      id: 'recipient',
      title: 'Missing Recipient Name',
      message: 'Specify who this digital space is dedicated to.',
      severity: 'error',
      suggestedSceneId: 'hub',
    })
  }

  // 3. Populated content check
  let populatedCount = 0
  let totalPhotos = 0
  let hasSchedule = false

  for (const scene of scenes) {
    if (isSceneTimeLocked(scene)) {
      hasSchedule = true
    }
    if (scene.type === 'free-canvas') {
      const itemsCount = scene.items?.length || 0
      if (itemsCount > 0) populatedCount++
      const photoItems =
        scene.items?.filter((it) => Boolean(it.data?.photoUrl)) || []
      totalPhotos += photoItems.length
    } else if (scene.type === 'letters') {
      const lettersCount = scene.letters?.length || 0
      if (lettersCount > 0) populatedCount++
      const photoLetters =
        scene.letters?.filter((l) => Boolean(l.imageUrl)) || []
      totalPhotos += photoLetters.length
    }
  }

  if (populatedCount === 0) {
    issues.push({
      id: 'empty_content',
      title: 'Sanctuary is Empty',
      message:
        'Place at least one keepsake memory or write a letter before publishing.',
      severity: 'error',
      suggestedSceneId: scenes[0]?.id || 'hub',
    })
  }

  // 4. Passcode safety check
  const isProtected = Boolean(protectionConfig?.enabled)
  if (isProtected) {
    const hasCode = Boolean(
      (protectionConfig?.passcode &&
        protectionConfig.passcode.trim().length >= 4) ||
      protectionConfig?.passcodeHash,
    )
    if (!hasCode) {
      issues.push({
        id: 'blank_passcode',
        title: 'Passcode Protection is Blank',
        message: 'Passcode lock is turned on, but no 4+ digit PIN is set.',
        severity: 'error',
        suggestedSceneId: 'gate',
      })
    }
  }

  const hasBlockingErrors = issues.some((i) => i.severity === 'error')

  return {
    isValid: !hasBlockingErrors,
    issues,
    summary: {
      title: title || 'Untitled Sanctuary',
      recipientName: recipientName || 'Someone Special',
      senderName,
      totalScenes: scenes.length,
      populatedScenes: populatedCount,
      totalPhotos,
      pendingPhotosCount,
      isProtected,
      hasSchedule,
    },
  }
}
