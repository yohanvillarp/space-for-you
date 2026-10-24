/**
 * Utility functions for generating spreadsheet-like letter sequence suffixes
 * (A...Z, AA...ZZ, etc.) for duplicated and pasted spatial stage items.
 */

/**
 * Converts a 0-based index to an alphabetical sequence:
 * 0 -> 'A', 25 -> 'Z', 26 -> 'AA', 27 -> 'AB', ..., 701 -> 'ZZ', 702 -> 'AAA'
 */
export function getLetterSequence(index: number): string {
  let result = ''
  let num = Math.max(0, Math.floor(index))

  while (num >= 0) {
    result = String.fromCharCode((num % 26) + 65) + result
    num = Math.floor(num / 26) - 1
  }

  return result
}

/**
 * Extracts the base label without any trailing letter suffixes or legacy (Copy) indicators.
 * E.g., 'Birthday Music Box A' -> 'Birthday Music Box'
 *       'Birthday Music Box (Copy)' -> 'Birthday Music Box'
 */
export function getBaseItemLabel(label: string): string {
  const cleaned = label
    .replace(/\s*\([Cc]opy.*\)$/, '')
    .replace(/\s+[A-Z]+$/, '')
    .trim()

  return cleaned || 'Keepsake Item'
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Computes the next unique letter-suffixed label for an item based on existing stage items.
 * E.g., 'Birthday Music Box' -> 'Birthday Music Box A' -> 'Birthday Music Box B'
 */
export function getNextItemLabel(
  currentLabel: string,
  existingItems: readonly { label: string }[],
): string {
  const base = getBaseItemLabel(currentLabel)
  const pattern = new RegExp(`^${escapeRegex(base)}\\s+([A-Z]+)$`)

  const usedSuffixes = new Set<string>()
  for (const item of existingItems) {
    const match = item.label.match(pattern)
    if (match && match[1]) {
      usedSuffixes.add(match[1])
    }
  }

  let index = 0
  while (true) {
    const suffix = getLetterSequence(index)
    if (!usedSuffixes.has(suffix)) {
      return `${base} ${suffix}`
    }
    index++
  }
}
