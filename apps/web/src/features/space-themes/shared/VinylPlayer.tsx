import type { HTMLAttributes } from 'react'
import { Play, Pause, Loader2 } from 'lucide-react'
import { getPresetTrackForTemplate } from '@/entities/audio'
import { cn, useSpatialAudioPlayer, playSpatialSfx } from '@/shared/lib'

export interface VinylPlayerProps extends HTMLAttributes<HTMLDivElement> {
  trackTitle?: string
  artist?: string
  labelColor?: string
  trackUrl?: string
  autoPlay?: boolean
}

export function VinylPlayer({
  trackTitle = 'Our Special Song',
  artist = 'Atelier Keepsake Soundscape',
  labelColor = '#A34835',
  trackUrl,
  autoPlay = false,
  className,
  ...props
}: VinylPlayerProps) {
  const defaultTrack = getPresetTrackForTemplate('anniversary')
  const activeUrl = trackUrl || defaultTrack.url

  const { isPlaying, isLoading, togglePlay } = useSpatialAudioPlayer({
    trackUrl: activeUrl,
    loop: true,
    autoPlay,
  })

  const handleToggle = () => {
    playSpatialSfx('vinyl-needle')
    togglePlay()
  }

  return (
    <div
      className={cn(
        'relative flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-[#FAF7F2] p-3 shadow-md select-none sm:p-4 dark:border-white/10 dark:bg-[#251E1B]',
        className,
      )}
      {...props}
    >
      {/* Vinyl Disc Container with Mechanical Tonearm */}
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
        {/* Mechanical Tonearm that pivots onto the disc groove */}
        <div
          className={cn(
            'pointer-events-none absolute -top-1 right-0 z-20 origin-top-right transition-transform duration-700 ease-out',
            isPlaying ? 'rotate-[18deg]' : '-rotate-[15deg]',
          )}
        >
          {/* Tonearm Base Pivot */}
          <div className="h-2.5 w-2.5 rounded-full border border-stone-400 bg-stone-300 shadow-xs" />
          {/* Tonearm Metallic Rod */}
          <div className="ml-1 h-7 w-0.5 rounded-full bg-gradient-to-b from-stone-400 via-stone-300 to-amber-200/90 shadow-xs" />
          {/* Cartridge & Stylus Head */}
          <div className="ml-0.5 h-2 w-1.5 rounded-xs bg-amber-700 shadow-xs" />
        </div>

        {/* Vinyl Disc with Realistic Sheen & Interactive Click */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleToggle()
          }}
          title={isPlaying ? 'Click to pause vinyl' : 'Click to play vinyl'}
          className={cn(
            'group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-2 border-neutral-700/70 bg-gradient-to-tr from-neutral-950 via-neutral-800 to-neutral-900 shadow-lg transition-transform hover:scale-105 active:scale-95',
            isPlaying && 'animate-spin [animation-duration:6s]',
          )}
        >
          {/* Grooves concentric rings */}
          <div className="absolute inset-1 rounded-full border border-neutral-700/40 opacity-70" />
          <div className="absolute inset-2.5 rounded-full border border-neutral-700/50 opacity-60" />
          <div className="absolute inset-4 rounded-full border border-neutral-700/60 opacity-50" />

          {/* Center Record Label */}
          <div
            className="flex h-5 w-5 items-center justify-center rounded-full shadow-inner transition-transform group-hover:scale-105"
            style={{ backgroundColor: labelColor }}
          >
            {/* Spindle hole */}
            <div className="h-1.5 w-1.5 rounded-full border border-white/20 bg-neutral-950" />
          </div>
        </button>
      </div>

      {/* Track Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-heading text-text-primary truncate text-xs font-medium italic sm:text-sm">
            {trackTitle}
          </p>
          {isPlaying && (
            <div className="flex h-3 items-end gap-0.5 px-0.5">
              <span className="bg-primary h-2 w-0.5 animate-pulse rounded-full" />
              <span className="bg-primary h-3 w-0.5 animate-pulse rounded-full [animation-delay:150ms]" />
              <span className="bg-primary h-1.5 w-0.5 animate-pulse rounded-full [animation-delay:300ms]" />
            </div>
          )}
        </div>
        <p className="text-text-muted truncate font-sans text-[11px]">
          {artist}
        </p>
      </div>

      {/* Play/Pause Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          handleToggle()
        }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="bg-bg-surface border-border-base/70 text-text-primary hover:border-primary/50 hover:text-primary flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border shadow-xs transition-transform hover:scale-105 active:scale-95"
      >
        {isLoading ? (
          <Loader2 className="text-primary h-3.5 w-3.5 animate-spin" />
        ) : isPlaying ? (
          <Pause className="h-3.5 w-3.5" />
        ) : (
          <Play className="ml-0.5 h-3.5 w-3.5" />
        )}
      </button>
    </div>
  )
}
