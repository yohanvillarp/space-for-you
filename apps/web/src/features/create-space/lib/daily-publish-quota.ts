export const MAX_DAILY_UPDATES = 10

interface DailyPublishQuotaData {
  date: string
  count: number
}

function getTodayString(): string {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getDailyQuotaStorageKey(spaceId?: string): string {
  return spaceId ? `sfy_pub_quota_${spaceId}` : 'sfy_pub_quota_draft'
}

export function getDailyPublishQuota(spaceId?: string): {
  count: number
  remaining: number
  isLimitReached: boolean
} {
  if (typeof window === 'undefined') {
    return { count: 0, remaining: MAX_DAILY_UPDATES, isLimitReached: false }
  }

  const key = getDailyQuotaStorageKey(spaceId)
  const raw = localStorage.getItem(key)
  const today = getTodayString()

  if (!raw) {
    return { count: 0, remaining: MAX_DAILY_UPDATES, isLimitReached: false }
  }

  try {
    const data: DailyPublishQuotaData = JSON.parse(raw)
    if (data.date !== today) {
      return { count: 0, remaining: MAX_DAILY_UPDATES, isLimitReached: false }
    }
    const count = Math.max(0, data.count || 0)
    const remaining = Math.max(0, MAX_DAILY_UPDATES - count)
    return { count, remaining, isLimitReached: remaining <= 0 }
  } catch {
    return { count: 0, remaining: MAX_DAILY_UPDATES, isLimitReached: false }
  }
}

export function recordPublishUpdate(spaceId?: string): {
  count: number
  remaining: number
  isLimitReached: boolean
} {
  if (typeof window === 'undefined') {
    return { count: 1, remaining: MAX_DAILY_UPDATES - 1, isLimitReached: false }
  }

  const key = getDailyQuotaStorageKey(spaceId)
  const today = getTodayString()
  const current = getDailyPublishQuota(spaceId)
  const nextCount = current.count + 1

  const payload: DailyPublishQuotaData = {
    date: today,
    count: nextCount,
  }

  try {
    localStorage.setItem(key, JSON.stringify(payload))
  } catch {}

  const remaining = Math.max(0, MAX_DAILY_UPDATES - nextCount)
  return {
    count: nextCount,
    remaining,
    isLimitReached: remaining <= 0,
  }
}
