/**
 * Detects if the current platform is macOS / iOS.
 */
export function isMacPlatform(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false
  }
  const userAgent = navigator.userAgent || ''
  const platform =
    (navigator as unknown as { userAgentData?: { platform?: string } })
      .userAgentData?.platform ||
    navigator.platform ||
    ''

  return /Mac|iPhone|iPod|iPad/i.test(userAgent) || /Mac/i.test(platform)
}

/**
 * Returns the platform standard modifier shortcut label for search ('⌘K' or 'Ctrl K').
 */
export function getSearchShortcutLabel(): string {
  return isMacPlatform() ? '⌘K' : 'Ctrl K'
}
