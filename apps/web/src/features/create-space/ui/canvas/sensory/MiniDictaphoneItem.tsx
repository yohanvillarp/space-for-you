import { useState } from 'react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { playSpatialSfx, cn } from '@/shared/lib'

export interface MiniDictaphoneItemProps {
  item: SpatialItem
  onUpdateData?: (id: string, data: Partial<SpatialItem['data']>) => void
  isEditorMode?: boolean
}

export function MiniDictaphoneItem({
  item,
  onUpdateData,
  isEditorMode,
}: MiniDictaphoneItemProps) {
  const [localPlaying, setLocalPlaying] = useState(Boolean(item.data.isPlaying))
  const isPlaying =
    item.data.isPlaying !== undefined ? item.data.isPlaying : localPlaying

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    const nextPlaying = !isPlaying
    setLocalPlaying(nextPlaying)
    onUpdateData?.(item.id, { isPlaying: nextPlaying })
    playSpatialSfx('cassette-click')
  }

  return (
    <div
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      title={isPlaying ? 'Pause tape' : 'Play voice memo'}
      className={cn(
        'group relative flex flex-col items-center justify-center p-2 transition-transform duration-300 select-none',
        !isEditorMode && 'cursor-pointer hover:scale-105',
      )}
    >
      {/* Warm Ambient Glow when Active */}
      {isPlaying && (
        <div className="pointer-events-none absolute inset-0 -m-3 rounded-2xl bg-amber-500/15 blur-lg" />
      )}

      {/* Retro Dictaphone Body */}
      <div className="relative z-10 flex h-32 w-24 flex-col justify-between rounded-xl border border-stone-700 bg-gradient-to-b from-[#FAF6EE] via-[#F2EDE2] to-[#E5DEC9] p-2 shadow-2xl dark:border-stone-800 dark:from-[#241F1C] dark:via-[#1A1614] dark:to-[#120F0D]">
        {/* Top Header: Mic Grille & Brushed Brass Knob */}
        <div className="flex items-center justify-between border-b border-stone-300/60 pb-1.5 dark:border-stone-700/60">
          {/* Micro-Speaker Grille */}
          <div className="grid grid-cols-4 gap-0.5">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-1 w-1 rounded-full bg-stone-400 dark:bg-stone-600"
              />
            ))}
          </div>

          {/* LED Indicator */}
          <div className="flex items-center gap-1">
            <span
              className={cn(
                'h-2 w-2 rounded-full transition-colors duration-300',
                isPlaying
                  ? 'animate-pulse bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]'
                  : 'bg-stone-400 dark:bg-stone-600',
              )}
            />
            {/* Brass Volume dial */}
            <div className="h-3.5 w-3.5 rounded-full border border-amber-600/50 bg-gradient-to-br from-amber-300 to-amber-600 shadow-xs" />
          </div>
        </div>

        {/* Cassette Chamber Viewport */}
        <div className="relative my-1 flex h-14 w-full flex-col justify-between overflow-hidden rounded-md border border-stone-400/60 bg-stone-900 p-1.5 shadow-inner dark:border-stone-700">
          {/* Cassette Tape Spools Window */}
          <div className="flex flex-1 items-center justify-around">
            {/* Left Spool */}
            <div
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full border border-stone-500 bg-stone-200 transition-transform dark:bg-stone-700',
                isPlaying && 'animate-spin',
              )}
              style={{ animationDuration: '3s' }}
            >
              <div className="h-2 w-2 rounded-full border border-stone-400 bg-stone-900" />
              <div className="absolute h-0.5 w-4 rounded-full bg-stone-500" />
            </div>

            {/* Magnetic Tape Bridge */}
            <div className="flex flex-col items-center">
              <div className="h-1 w-5 rounded-xs bg-[#4A3728]" />
              <span className="text-[6px] tracking-tighter text-stone-400">
                MICRO-TAPE
              </span>
            </div>

            {/* Right Spool */}
            <div
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full border border-stone-500 bg-stone-200 transition-transform dark:bg-stone-700',
                isPlaying && 'animate-spin',
              )}
              style={{ animationDuration: '3s' }}
            >
              <div className="h-2 w-2 rounded-full border border-stone-400 bg-stone-900" />
              <div className="absolute h-0.5 w-4 rounded-full bg-stone-500" />
            </div>
          </div>

          {/* VU Meter needle bar */}
          <div className="flex h-1.5 w-full items-center justify-between rounded-xs bg-stone-950 px-1">
            <div
              className={cn(
                'h-0.5 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 transition-all duration-150',
                isPlaying ? 'w-4/5 animate-pulse' : 'w-1',
              )}
            />
            <span className="text-[5px] text-stone-500">VU</span>
          </div>
        </div>

        {/* Lower Control Bar: Mechanical Tactile Buttons */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex gap-1">
            <div
              className={cn(
                'flex h-4 w-6 items-center justify-center rounded-xs border border-stone-400 bg-stone-300 text-[7px] font-bold text-stone-700 shadow-xs transition-transform dark:border-stone-600 dark:bg-stone-700 dark:text-stone-300',
                isPlaying && 'translate-y-0.5 bg-amber-500 text-stone-950',
              )}
            >
              {isPlaying ? '⏸' : '▶'}
            </div>
            <div className="flex h-4 w-4 items-center justify-center rounded-xs border border-stone-400 bg-stone-300 text-[6px] text-stone-600 dark:border-stone-600 dark:bg-stone-700">
              ■
            </div>
          </div>

          <span className="font-mono text-[7px] text-stone-500">
            {isPlaying ? '01:24' : '00:00'}
          </span>
        </div>
      </div>

      <span className="text-text-secondary mt-1 font-sans text-[10px] font-medium tracking-tight">
        {item.data.title || 'Voice Memo'}
      </span>
    </div>
  )
}
