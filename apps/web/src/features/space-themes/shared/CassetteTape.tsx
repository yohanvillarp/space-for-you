import { useState } from 'react'
import type { HTMLAttributes } from 'react'
import { Play, Pause } from 'lucide-react'
import { cn } from '@/shared/lib'

export interface CassetteTapeProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
  subtitle?: string
}

export function CassetteTape({
  label = 'Roadtrip Mixtape • Side A',
  subtitle = 'Waiting for your playlist in Step 2',
  className,
  ...props
}: CassetteTapeProps) {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <div
      className={cn(
        'relative w-full max-w-sm rounded-xl p-3 transition-transform select-none hover:scale-[1.01]',
        'border-2 border-[#3E454A] bg-gradient-to-b from-[#2B3033] to-[#1E2225] shadow-xl',
        className,
      )}
      {...props}
    >
      {/* Screw accents in 4 corners */}
      <span className="absolute top-1.5 left-1.5 h-1.5 w-1.5 rounded-full border border-stone-700 bg-stone-500/80" />
      <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full border border-stone-700 bg-stone-500/80" />
      <span className="absolute bottom-1.5 left-1.5 h-1.5 w-1.5 rounded-full border border-stone-700 bg-stone-500/80" />
      <span className="absolute right-1.5 bottom-1.5 h-1.5 w-1.5 rounded-full border border-stone-700 bg-stone-500/80" />

      {/* Cassette Paper Sticker Label */}
      <div className="relative rounded-lg border border-stone-300 bg-[#FAF7EE] p-3 text-stone-800 shadow-inner dark:bg-[#F2ECE1]">
        {/* Retro Color Stripes */}
        <div className="mb-2 flex h-1.5 w-full gap-1">
          <span className="h-full flex-1 rounded-full bg-rose-500" />
          <span className="h-full flex-1 rounded-full bg-amber-500" />
          <span className="h-full flex-1 rounded-full bg-teal-600" />
        </div>

        {/* Handwritten Label Header */}
        <div className="flex items-center justify-between">
          <span className="font-heading text-xs font-bold tracking-tight text-stone-900 italic">
            {label}
          </span>
          <span className="font-mono text-[9px] font-bold tracking-widest text-stone-500 uppercase">
            60 MIN
          </span>
        </div>

        {/* Center Transparent Tape Window with Spools */}
        <div className="my-2.5 flex items-center justify-between rounded-md border border-stone-700/60 bg-[#181B1D] px-4 py-2 shadow-inner">
          {/* Left Spool */}
          <div
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full border-2 border-dashed border-stone-300 bg-[#E2E8F0]',
              isPlaying && 'animate-spin [animation-duration:4s]',
            )}
          >
            <span className="h-2 w-2 rounded-full bg-[#181B1D]" />
          </div>

          {/* Tape Ribbon Window with ruler markings */}
          <div className="mx-3 flex h-4 flex-1 items-center justify-center rounded border border-stone-700 bg-amber-950/40">
            <span className="font-mono text-[8px] tracking-widest text-stone-400">
              ◄ REEL ►
            </span>
          </div>

          {/* Right Spool */}
          <div
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full border-2 border-dashed border-stone-300 bg-[#E2E8F0]',
              isPlaying && 'animate-spin [animation-duration:4s]',
            )}
          >
            <span className="h-2 w-2 rounded-full bg-[#181B1D]" />
          </div>
        </div>

        {/* Bottom prompt & controls */}
        <div className="flex items-center justify-between pt-1 font-sans text-[10px] text-stone-600">
          <span className="max-w-[200px] truncate italic">{subtitle}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsPlaying(!isPlaying)
            }}
            className="flex cursor-pointer items-center gap-1 rounded bg-stone-800 px-2 py-0.5 text-stone-100 transition-colors hover:bg-stone-700"
          >
            {isPlaying ? (
              <>
                <Pause className="h-2.5 w-2.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-2.5 w-2.5" />
                <span>Play</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
