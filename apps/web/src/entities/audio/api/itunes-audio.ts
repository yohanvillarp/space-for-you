import type { AudioTrack } from '@/entities/audio/model/types'

interface ITunesTrackResult {
  trackId: number
  trackName?: string
  artistName?: string
  previewUrl?: string
  artworkUrl100?: string
  trackTimeMillis?: number
  primaryGenreName?: string
}

interface ITunesSearchResponse {
  resultCount: number
  results: ITunesTrackResult[]
}

/**
 * Searches the public iTunes Search API for song previews (30s high-fidelity streams with artwork).
 * Free, publicly accessible with CORS enabled, requires no API key.
 */
export async function searchItunesTracks(
  query: string,
  limit = 12,
  signal?: AbortSignal,
): Promise<AudioTrack[]> {
  const trimmed = query.trim()
  if (!trimmed) return []

  try {
    const encoded = encodeURIComponent(trimmed)
    const url = `https://itunes.apple.com/search?term=${encoded}&media=music&entity=song&limit=${limit}`

    const res = await fetch(url, { signal })
    if (!res.ok) {
      return []
    }

    const data = (await res.json()) as ITunesSearchResponse
    if (!data.results || !Array.isArray(data.results)) {
      return []
    }

    return data.results
      .filter((item) => Boolean(item.previewUrl && item.trackName))
      .map((item) => {
        // Upgrade thumbnail to higher resolution (300x300)
        const highResArt = item.artworkUrl100
          ? item.artworkUrl100.replace('100x100bb', '300x300bb')
          : undefined

        return {
          id: `itunes-${item.trackId}`,
          title: item.trackName || 'Unknown Title',
          artist: item.artistName || 'Unknown Artist',
          url: item.previewUrl!,
          duration: item.trackTimeMillis
            ? Math.round(item.trackTimeMillis / 1000)
            : 30,
          source: 'itunes',
          coverUrl: highResArt,
          albumArt: highResArt,
          genre: item.primaryGenreName,
        }
      })
  } catch {
    return []
  }
}
