import { Play } from 'lucide-react'
import { ENV } from '@/shared/config'

/**
 * Paste your YouTube link or 11-character video ID here once recorded
 * (or set VITE_HERO_YOUTUBE_VIDEO_ID in apps/web/.env).
 * Examples:
 * - "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 * - "https://youtu.be/dQw4w9WgXcQ"
 * - "dQw4w9WgXcQ"
 */
export const HERO_YOUTUBE_URL_OR_ID = ''

function extractYouTubeVideoId(raw: string): string | null {
  const input = raw.trim()
  if (!input) return null
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input

  try {
    const url = new URL(input)
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.replace('/', '').split('/')[0]
      return id && id.length === 11 ? id : null
    }
    const vParam = url.searchParams.get('v')
    if (vParam && vParam.length === 11) return vParam
    const parts = url.pathname.split('/').filter(Boolean)
    const embedIdx = parts.findIndex((p) => p === 'embed' || p === 'shorts')
    if (embedIdx >= 0 && parts[embedIdx + 1]?.length === 11) {
      return parts[embedIdx + 1]
    }
  } catch {
    // ignore malformed URL
  }
  return null
}

export function HeroVideoShowcase() {
  const resolvedVideoId = extractYouTubeVideoId(
    HERO_YOUTUBE_URL_OR_ID || ENV.HERO_YOUTUBE_VIDEO_ID,
  )

  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      {/* Warm Ambient Backlight */}
      <div
        className="from-primary/25 pointer-events-none absolute -inset-4 rounded-3xl bg-radial via-amber-950/15 to-transparent opacity-60 blur-3xl"
        aria-hidden="true"
      />

      <div className="border-border-base/80 bg-bg-surface/90 relative overflow-hidden rounded-2xl border shadow-2xl">
        <div className="relative aspect-video w-full overflow-hidden bg-[#120D0B]">
          {resolvedVideoId ? (
            <iframe
              className="h-full w-full border-0"
              src={`https://www.youtube-nocookie.com/embed/${resolvedVideoId}?rel=0&modestbranding=1`}
              title="Space For You — How it works"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1C1411] via-[#130E0C] to-[#0D0907] p-6 text-center select-none">
              <div className="bg-primary/15 border-primary/30 mb-4 flex h-16 w-16 items-center justify-center rounded-full border shadow-xl">
                <Play className="text-primary ml-1 h-7 w-7 fill-current" />
              </div>
              <p className="font-heading text-text-primary text-lg font-medium sm:text-xl">
                See how a personal space is created and shared
              </p>
              <p className="text-text-muted mt-1.5 max-w-md font-sans text-xs sm:text-sm">
                From arranging dynamic objects and recording voice messages on
                the canvas to sealing letters and sharing a QR keepsake card.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
