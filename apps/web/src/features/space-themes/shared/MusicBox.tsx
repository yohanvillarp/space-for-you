import type { HTMLAttributes } from 'react'
import { Play, Pause, Loader2, Sparkles } from 'lucide-react'
import { getPresetTrackForTemplate } from '@/entities/audio'
import { cn, useSpatialAudioPlayer, playSpatialSfx } from '@/shared/lib'

export interface MusicBoxProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  artist?: string
  trackUrl?: string
  autoPlay?: boolean
}

/**
 * Handcrafted Birthday Music Box
 * An intimate, tactile mechanical music box featuring a spinning brass winding key,
 * rotating celebratory melody cylinder, floating musical notes, and integrated acoustic soundscape.
 */
export function MusicBox({
  title = 'Happy Birthday (Music Box)',
  artist = 'Oleg Kirilkov',
  trackUrl,
  autoPlay = false,
  className,
  ...props
}: MusicBoxProps) {
  const defaultTrack = getPresetTrackForTemplate('birthday')
  const activeUrl = trackUrl || defaultTrack.url

  const { isPlaying, isLoading, togglePlay } = useSpatialAudioPlayer({
    trackUrl: activeUrl,
    loop: true,
    autoPlay,
  })

  const handleToggle = () => {
    playSpatialSfx('musicbox-chime')
    togglePlay()
  }

  return (
    <div
      className={cn(
        'group relative flex w-full max-w-sm items-center justify-between gap-3.5 rounded-2xl border-2 border-amber-600/30 bg-gradient-to-b from-[#2A1D15] via-[#1E140E] to-[#150E0A] p-4 shadow-2xl transition-all select-none hover:border-amber-500/50 hover:shadow-[0_12px_32px_rgba(245,158,11,0.18)]',
        className,
      )}
      {...props}
    >
      {/* Antique Ornamental Brass Corner Inlays */}
      <span className="absolute top-1.5 left-1.5 h-2 w-2 rounded-tl-xs border-t-2 border-l-2 border-amber-400/60" />
      <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-tr-xs border-t-2 border-r-2 border-amber-400/60" />
      <span className="absolute bottom-1.5 left-1.5 h-2 w-2 rounded-bl-xs border-b-2 border-l-2 border-amber-400/60" />
      <span className="absolute right-1.5 bottom-1.5 h-2 w-2 rounded-br-xs border-r-2 border-b-2 border-amber-400/60" />

      {/* Mechanical Music Chamber Showcase */}
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-visible">
        {/* Warm Golden Glow Halo when playing */}
        {isPlaying && (
          <div className="pointer-events-none absolute -inset-2 animate-pulse rounded-full bg-amber-500/20 blur-md" />
        )}

        {/* Floating Musical Notes when playing */}
        {isPlaying && (
          <div className="pointer-events-none absolute -top-4 -right-1 z-30 flex gap-1 font-serif text-[11px] text-amber-300">
            <span className="animate-bounce [animation-duration:1.6s]">♪</span>
            <span className="animate-bounce text-[9px] text-amber-200 [animation-delay:400ms] [animation-duration:1.9s]">
              ♫
            </span>
            <span className="animate-bounce text-xs text-amber-400 [animation-delay:700ms] [animation-duration:2.1s]">
              ♩
            </span>
          </div>
        )}

        {/* Music Box Velvet Vitrine Container */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleToggle()
          }}
          title={
            isPlaying
              ? 'Click to pause music box'
              : 'Click to play celebration melody'
          }
          className={cn(
            'relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl border border-amber-500/40 bg-gradient-to-tr from-[#120B07] via-[#241710] to-[#120B07] shadow-inner transition-transform hover:scale-105 active:scale-95',
          )}
        >
          {/* Internal Brass Mechanism & Melody Cylinder */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Spinning Melody Cylinder */}
            <div
              className={cn(
                'relative flex h-5 w-8 items-center justify-around rounded-sm border border-amber-400/60 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 shadow-sm transition-transform',
                isPlaying && 'animate-pulse',
              )}
            >
              {/* Cylinder pins / teeth */}
              <span className="h-2 w-0.5 rounded-full bg-amber-950/80" />
              <span className="h-2.5 w-0.5 rounded-full bg-amber-950/80" />
              <span className="h-1.5 w-0.5 rounded-full bg-amber-950/80" />
              <span className="h-2 w-0.5 rounded-full bg-amber-950/80" />
            </div>

            {/* Miniature Birthday Cake / Golden Star Accent */}
            <div className="mt-0.5 flex items-center justify-center gap-0.5">
              <span
                className={cn(
                  'text-[10px] text-amber-300 transition-transform',
                  isPlaying && 'animate-spin [animation-duration:5s]',
                )}
              >
                ✦
              </span>
              <span className="text-[8px] text-amber-400">🎂</span>
              <span
                className={cn(
                  'text-[10px] text-amber-300 transition-transform',
                  isPlaying && 'animate-spin [animation-duration:5s]',
                )}
              >
                ✧
              </span>
            </div>
          </div>

          {/* Quick Play/Pause Badge Indicator */}
          <div className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full border border-amber-400/50 bg-[#2A1D15] text-amber-300 shadow-sm">
            {isLoading ? (
              <Loader2 className="h-2.5 w-2.5 animate-spin text-amber-400" />
            ) : isPlaying ? (
              <Pause className="h-2.5 w-2.5 fill-amber-300" />
            ) : (
              <Play className="ml-0.5 h-2.5 w-2.5 fill-amber-300" />
            )}
          </div>
        </button>
      </div>

      {/* Middle: Track Title, Artist & Equalizer */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-heading truncate text-sm font-semibold tracking-wide text-amber-100 italic">
            {title}
          </p>
          {isPlaying && (
            <div className="flex h-3 items-end gap-0.5 px-0.5">
              <span className="h-2 w-0.5 animate-pulse rounded-full bg-amber-400" />
              <span className="h-3 w-0.5 animate-pulse rounded-full bg-amber-400 [animation-delay:150ms]" />
              <span className="h-1.5 w-0.5 animate-pulse rounded-full bg-amber-400 [animation-delay:300ms]" />
            </div>
          )}
        </div>

        <div className="mt-0.5 flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-amber-400/80" />
          <p className="truncate font-sans text-[11px] text-stone-400">
            {artist}
          </p>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <span className="font-sans text-[10px] text-stone-500">
            {isPlaying ? 'Playing celebration melody' : 'Click to wind melody'}
          </span>
        </div>
      </div>

      {/* Right Side: Animated Rotating Brass Winding Key */}
      <div className="relative flex shrink-0 flex-col items-center justify-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleToggle()
          }}
          title={
            isPlaying
              ? 'Pause music box'
              : 'Wind and play celebration music box'
          }
          className="group/key relative flex cursor-pointer flex-col items-center justify-center p-1"
        >
          {/* Brass Key Butterfly Wings */}
          <div
            className={cn(
              'relative flex h-7 w-7 items-center justify-center transition-transform',
              isPlaying && 'animate-spin [animation-duration:3.2s]',
              !isPlaying && 'group-hover/key:rotate-45',
            )}
          >
            {/* Wing 1 */}
            <div className="absolute top-0 h-3.5 w-3 rounded-full border border-amber-300/60 bg-gradient-to-b from-amber-300 to-amber-500 shadow-xs" />
            {/* Wing 2 */}
            <div className="absolute bottom-0 h-3.5 w-3 rounded-full border border-amber-300/60 bg-gradient-to-t from-amber-300 to-amber-500 shadow-xs" />
            {/* Center Winding Pivot Post */}
            <div className="relative z-10 h-2.5 w-2.5 rounded-full border border-amber-200 bg-amber-400 shadow-inner" />
          </div>

          {/* Key Winding Stem */}
          <div className="-mt-0.5 h-1.5 w-1 rounded-b-xs bg-amber-600/90" />
          <span className="mt-1 font-sans text-[9px] font-medium text-amber-400/80 group-hover/key:text-amber-300">
            {isPlaying ? 'Wound' : 'Wind'}
          </span>
        </button>
      </div>
    </div>
  )
}
