/**
 * @fileoverview Resilient URL service for sanctuary QR codes and keepsakes.
 * Provides canonical, permanent URLs for QR codes to guarantee scan readability,
 * privacy, and zero CORS errors without relying on third-party shortener APIs.
 */

const SHORTENER_CACHE = new Map<string, string>()

/**
 * Returns the canonical short URL path for a space using the local origin.
 * Guaranteed to work without depending on third-party services.
 *
 * @param slugOrId - Space slug or unique identifier
 * @returns Fully qualified canonical URL (e.g. `https://domain.com/s/carolina-2026`)
 */
export function getCanonicalPublicUrl(slugOrId: string): string {
  if (typeof window === 'undefined') return `/s/${slugOrId}`
  const origin = window.location.origin
  return `${origin}/s/${encodeURIComponent(slugOrId)}`
}

/**
 * Resolves a space URL for QR codes and keepsake dedication cards.
 * Returns the clean canonical `/s/:slug` directly to guarantee permanence,
 * privacy, instant generation, and avoid CORS errors in client browsers.
 *
 * @param longUrl - Full canonical URL to resolve
 * @returns Canonical sanctuary URL
 */
export async function shortenSanctuaryUrl(longUrl: string): Promise<string> {
  if (!longUrl) return ''

  const cached = SHORTENER_CACHE.get(longUrl)
  if (cached) return cached

  SHORTENER_CACHE.set(longUrl, longUrl)
  return longUrl
}
