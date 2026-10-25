const UNBOXED_STORAGE_PREFIX = 'sfy_unboxed_'

export function hasSanctuaryBeenUnboxed(spaceId: string): boolean {
  if (typeof window === 'undefined' || !spaceId) return false
  try {
    return (
      window.localStorage.getItem(`${UNBOXED_STORAGE_PREFIX}${spaceId}`) ===
      'true'
    )
  } catch {
    return false
  }
}

export function markSanctuaryAsUnboxed(spaceId: string): void {
  if (typeof window === 'undefined' || !spaceId) return
  try {
    window.localStorage.setItem(`${UNBOXED_STORAGE_PREFIX}${spaceId}`, 'true')
  } catch {
    // Ignore storage quota or access errors
  }
}

export function resetSanctuaryUnboxed(spaceId: string): void {
  if (typeof window === 'undefined' || !spaceId) return
  try {
    window.localStorage.removeItem(`${UNBOXED_STORAGE_PREFIX}${spaceId}`)
  } catch {
    // Ignore
  }
}
