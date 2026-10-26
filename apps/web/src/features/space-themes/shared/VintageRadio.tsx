import type { HTMLAttributes } from 'react'
import { Play, Pause, Loader2, Radio as RadioIcon, Volume2 } from 'lucide-react'
import { getPresetTrackForTemplate } from '@/entities/audio'
import { cn, useSpatialAudioPlayer, playSpatialSfx } from '@/shared/lib'

export interface VintageRadioProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  artist?: string
  trackUrl?: string
  autoPlay?: boolean
}

/**
 * Handcrafted Roadtrip Vintage Radio
 * An interactive, retro analog transistor radio featuring a perforated speaker mesh,
 * illuminated tuning dial, metallic antenna, and acoustic friendship soundtrack.
 */
export function VintageRadio({
  title = 'Roadtrip Mixtape • Side A',
  artist = 'Atelier Soundscape',
  trackUrl,
  autoPlay = false,
  className,
  ...props
}: VintageRadioProps) {
  const defaultTrack = getPresetTrackForTemplate('friendship')
  const activeUrl = trackUrl || defaultTrack.url

  const { isPlaying, isLoading, togglePlay } = useSpatialAudioPlayer({
    trackUrl: activeUrl,
    loop: true,
    autoPlay,
  })

  const handleToggle = () => {
    playSpatialSfx('tactile-tap')
    togglePlay()
  }

  return (
    <div
      className={cn(
        'group relative flex w-full max-w-[340px] flex-col rounded-2xl border-2 border-[#523321] bg-gradient-to-b from-[#3D2519] via-[#2A180F] to-[#1C100A] p-4 shadow-2xl transition-all select-none hover:border-amber-600/50 hover:shadow-[0_12px_36px_rgba(202,138,4,0.18)]',
        className,
      )}
      {...props}
    >
      {/* Retractable Antenna */}
      <div className="pointer-events-none absolute -top-5 left-6 h-5 w-1 rounded-full bg-gradient-to-t from-[#6E503C] to-[#C8B29E] shadow-sm">
        <span className="absolute -top-1 -left-0.5 h-2 w-2 rounded-full bg-[#E5D5C5] shadow-xs" />
      </div>

      {/* Top Handle / Metal Trim */}
      <div className="mb-2.5 flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5 text-amber-200/80">
          <RadioIcon className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-sans text-[10px] font-semibold tracking-wider uppercase">
            Roadtrip FM • Transistor
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full transition-colors',
              isPlaying
                ? 'animate-pulse bg-emerald-400 shadow-[0_0_6px_#34d399]'
                : 'bg-stone-600',
            )}
          />
          <span className="font-sans text-[9px] text-stone-400">
            {isPlaying ? 'TUNED' : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* Main Body: Speaker Grille + Frequency Tuner */}
      <div className="grid grid-cols-12 items-center gap-3">
        {/* Perforated Retro Speaker Grille */}
        <div className="relative col-span-5 flex h-20 w-20 items-center justify-center rounded-xl border border-black/40 bg-[#170E08] p-2 shadow-inner">
          <div className="grid h-full w-full grid-cols-4 place-items-center gap-1.5 opacity-70">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-1.5 w-1.5 rounded-full bg-[#42291B] transition-colors',
                  isPlaying &&
                    (i % 2 === 0
                      ? 'animate-ping bg-amber-400/80'
                      : 'bg-amber-200/40'),
                )}
              />
            ))}
          </div>
          {/* Subtle sound vibration halo */}
          {isPlaying && (
            <div className="pointer-events-none absolute -inset-1 animate-pulse rounded-xl bg-amber-500/10 blur-xs" />
          )}
        </div>

        {/* Right Section: Tuning Dial & Play Control */}
        <div className="col-span-7 flex flex-col justify-between space-y-2">
          {/* Backlit Analog Dial */}
          <div className="relative overflow-hidden rounded-lg border border-amber-950/60 bg-[#120A06] px-2.5 py-1.5 shadow-inner">
            <div className="flex items-center justify-between font-mono text-[8px] tracking-tighter text-amber-400/70">
              <span>88</span>
              <span>96</span>
              <span>104</span>
              <span>108</span>
              <span>MHz</span>
            </div>
            {/* Tuning Needle */}
            <div className="relative my-0.5 h-1 w-full rounded-full bg-stone-800">
              <span
                className={cn(
                  'absolute top-0 bottom-0 w-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316] transition-all duration-700',
                  isPlaying ? 'left-3/5' : 'left-1/4',
                )}
              />
            </div>
            <p className="truncate font-sans text-[11px] font-medium text-amber-100">
              {title}
            </p>
            <p className="truncate font-sans text-[9px] text-stone-400">
              {artist}
            </p>
          </div>

          {/* Interactive Toggle Button */}
          <button
            type="button"
            onClick={handleToggle}
            aria-label={
              isPlaying ? 'Pause Roadtrip Radio' : 'Play Roadtrip Radio'
            }
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-amber-600/40 bg-gradient-to-r from-amber-700/30 via-amber-600/30 to-amber-700/30 px-3 py-1.5 font-sans text-xs font-medium text-amber-100 shadow-md backdrop-blur-xs transition-all hover:border-amber-500/70 hover:from-amber-600/40 hover:to-amber-500/40 active:scale-95"
          >
            {isLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-300" />
            ) : isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 text-amber-300" />
                <span>Pause Radio</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                <span>Tune Radio</span>
              </>
            )}
            <Volume2
              className={cn(
                'h-3.5 w-3.5 transition-opacity',
                isPlaying ? 'text-amber-400 opacity-100' : 'opacity-40',
              )}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
