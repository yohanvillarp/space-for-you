/**
 * @fileoverview Resilient URL shortening service with transparent fallback.
 * Generates compact URLs for QR codes to improve camera scan readability.
 */

const SHORTENER_CACHE = new Map<string, string>()
const API_TIMEOUT_MS = 2500

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
 * Attempts to shorten a URL via a lightweight, free shortener API (TinyURL).
 * If the external API times out, fails, or is blocked by CORS/network,
 * it silently and gracefully falls back to the original long URL.
 *
 * @param longUrl - Full canonical URL to shorten
 * @returns Shortened URL if available, otherwise original longUrl
 */
export async function shortenSanctuaryUrl(longUrl: string): Promise<string> {
  if (!longUrl) return ''

  // Return from in-memory cache if previously resolved
  const cached = SHORTENER_CACHE.get(longUrl)
  if (cached) return cached

  // Skip shortening localhost or preview staging addresses
  if (longUrl.includes('localhost') || longUrl.includes('127.0.0.1')) {
    return longUrl
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS)

  try {
    const endpoint = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
    const response = await fetch(endpoint, {
      signal: controller.signal,
      method: 'GET',
    })

    clearTimeout(timer)

    if (response.ok) {
      const shortUrl = (await response.text()).trim()
      if (shortUrl.startsWith('http')) {
        SHORTENER_CACHE.set(longUrl, shortUrl)
        return shortUrl
      }
    }
    // API responded with non-200 or unexpected body: silent fallback
    return longUrl
  } catch {
    // Timeout, network failure, or offline: silent fallback
    clearTimeout(timer)
    return longUrl
  }
}
