import type { SpaceScene } from '@/features/create-space/model/scenes.types'

export interface TimeRemainingParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  isUnlocked: boolean
}

/**
 * Checks whether a scene is currently time-locked based on its schedule.
 */
export function isSceneTimeLocked(
  scene: SpaceScene | undefined | null,
  now = new Date(),
): boolean {
  if (!scene?.schedule?.enabled || !scene.schedule.unlockAt) return false
  const unlockDate = new Date(scene.schedule.unlockAt)
  if (isNaN(unlockDate.getTime())) return false
  return unlockDate.getTime() > now.getTime()
}

/**
 * Calculates remaining days, hours, minutes, and seconds until the scheduled unlock date.
 */
export function getTimeRemainingParts(
  unlockAt: string,
  now = new Date(),
): TimeRemainingParts {
  const target = new Date(unlockAt)
  if (isNaN(target.getTime())) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isUnlocked: true }
  }

  const diffMs = target.getTime() - now.getTime()
  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isUnlocked: true }
  }

  const totalSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, isUnlocked: false }
}

/**
 * Formats remaining time into a concise, human-friendly status string for cards.
 */
export function formatTimeRemaining(
  unlockAt?: string,
  now = new Date(),
): string {
  if (!unlockAt) return 'Unlocked'
  const parts = getTimeRemainingParts(unlockAt, now)
  if (parts.isUnlocked) return 'Unlocked'
  if (parts.days > 1) return `Opens in ${parts.days} days`
  if (parts.days === 1) return 'Opens tomorrow'
  if (parts.hours > 0) return `Opens in ${parts.hours}h ${parts.minutes}m`
  if (parts.minutes > 0) return `Opens in ${parts.minutes}m`
  return `Opens in ${parts.seconds}s`
}

/**
 * Formats the target date and time nicely for editorial reading.
 */
export function formatUnlockDate(unlockAt?: string): string {
  if (!unlockAt) return 'Scheduled'
  const date = new Date(unlockAt)
  if (isNaN(date.getTime())) return unlockAt
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}
