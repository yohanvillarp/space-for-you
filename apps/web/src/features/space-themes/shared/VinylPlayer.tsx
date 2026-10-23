import { useState } from 'react'
import type { HTMLAttributes } from 'react'
import { Play, Pause } from 'lucide-react'
import { cn } from '@/shared/lib'

export interface VinylPlayerProps extends HTMLAttributes<HTMLDivElement> {
  trackTitle?: string
  artist?: string
  labelColor?: string
}

export function VinylPlayer({
  trackTitle = 'Our Special Song',
  artist = 'Coldplay',
  labelColor = '#A34835',
  className,
  ...props
}: VinylPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-[#FAF7F2] p-3 shadow-sm select-none sm:p-4 dark:border-white/10 dark:bg-[#251E1B]',
        className,
      )}
      {...props}
    >
      {/* Vinyl Disc with realistic grooved sheen */}
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
        {/* Ambient spin shadow */}
        <div
          className={cn(
            'relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-neutral-700/60 bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-900 shadow-md',
            isPlaying && 'animate-spin [animation-duration:6s]',
          )}
        >
          {/* Vinyl Grooves concentric rings */}
          <div className="absolute inset-1 rounded-full border border-neutral-700/40 opacity-70" />
          <div className="absolute inset-2.5 rounded-full border border-neutral-700/50 opacity-60" />
          <div className="absolute inset-4 rounded-full border border-neutral-700/60 opacity-50" />

          {/* Center Record Label */}
          <div
            className="flex h-5 w-5 items-center justify-center rounded-full shadow-inner"
            style={{ backgroundColor: labelColor }}
          >
            {/* Spindle hole */}
            <div className="h-1.5 w-1.5 rounded-full border border-white/20 bg-neutral-900" />
          </div>
        </div>
      </div>

      {/* Track Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-heading text-text-primary truncate text-xs font-medium italic sm:text-sm">
            {trackTitle}
          </p>
          {isPlaying && (
            <span className="bg-primary flex h-1.5 w-1.5 animate-ping rounded-full" />
          )}
        </div>
        <p className="text-text-muted truncate font-sans text-[11px]">
          {artist} • Keepsake Soundscape
        </p>
      </div>

      {/* Play/Pause Button */}
      <button
        type="button"
        onClick={() => setIsPlaying((p) => !p)}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="bg-bg-surface border-border-base/70 text-text-primary flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border shadow-xs transition-transform hover:scale-105 active:scale-95"
      >
        {isPlaying ? (
          <Pause className="h-3.5 w-3.5" />
        ) : (
          <Play className="ml-0.5 h-3.5 w-3.5" />
        )}
      </button>
    </div>
  )
}
