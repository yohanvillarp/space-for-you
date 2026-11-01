import { useState } from 'react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { playSpatialSfx, cn } from '@/shared/lib'

export interface WoodWickCandleItemProps {
  item: SpatialItem
  onUpdateData?: (id: string, data: Partial<SpatialItem['data']>) => void
  isEditorMode?: boolean
}

export function WoodWickCandleItem({
  item,
  onUpdateData,
  isEditorMode,
}: WoodWickCandleItemProps) {
  const [localLit, setLocalLit] = useState(item.data.isLit !== false)
  const isLit = item.data.isLit !== undefined ? item.data.isLit : localLit

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    const nextLit = !isLit
    setLocalLit(nextLit)
    onUpdateData?.(item.id, { isLit: nextLit })

    if (nextLit) {
      playSpatialSfx('candle-spark')
      setTimeout(() => playSpatialSfx('wood-wick'), 100)
    } else {
      playSpatialSfx('candle-blow')
    }
  }

  return (
    <div
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      title={isLit ? 'Click to blow out candle' : 'Click to light wooden wick'}
      className={cn(
        'group relative flex flex-col items-center justify-center p-3 transition-transform duration-300 select-none',
        !isEditorMode && 'cursor-pointer hover:scale-105',
      )}
    >
      {/* Warm Ambient Hearth Glow */}
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 -top-4 h-32 rounded-full blur-2xl transition-all duration-700',
          isLit
            ? 'scale-125 bg-amber-500/25 opacity-100'
            : 'scale-75 opacity-0',
        )}
      />

      {/* Flame & Smoke Container */}
      <div className="relative z-20 flex h-10 flex-col items-center justify-end">
        {isLit ? (
          <div className="relative flex flex-col items-center">
            {/* Outer Warm Flame Halo */}
            <div className="h-6 w-3.5 animate-pulse rounded-full bg-gradient-to-t from-amber-500 via-amber-300 to-amber-100 shadow-[0_0_12px_rgba(245,158,11,0.9)]" />
            {/* Inner Blue Core */}
            <div className="absolute bottom-0 h-2 w-1.5 rounded-full bg-sky-300/80" />
            {/* Micro Embers Sparkle */}
            <span className="absolute -top-1 -right-1 animate-ping text-[6px] text-amber-200">
              ✦
            </span>
          </div>
        ) : (
          /* Smoke Wisp after Extinguish */
          <div className="flex flex-col items-center opacity-40">
            <div className="h-5 w-0.5 animate-pulse rounded-full bg-stone-400 blur-[0.5px]" />
          </div>
        )}

        {/* Flat Horizontal Wood Wick */}
        <div className="mt-0.5 h-1.5 w-3.5 rounded-xs border border-stone-900 bg-amber-950 shadow-xs" />
      </div>

      {/* Ceramic Artisan Candle Vessel */}
      <div className="relative z-10 flex h-18 w-20 flex-col items-center overflow-hidden rounded-t-sm rounded-b-2xl border border-[#5C3A21] bg-gradient-to-b from-[#8C532B] via-[#6B3F1D] to-[#4A2B14] p-1.5 shadow-2xl">
        {/* Soy Wax Pool Rim */}
        <div className="relative flex h-3.5 w-full items-center justify-center rounded-full border border-amber-200/30 bg-[#FDFBF7] shadow-inner">
          <div className="h-2 w-3/4 rounded-full bg-amber-100/80" />
        </div>

        {/* Tactile Fluted Ribs on Vessel Body */}
        <div className="mt-2 flex w-full justify-around px-1">
          <div className="h-8 w-0.5 rounded-full bg-black/25" />
          <div className="h-8 w-0.5 rounded-full bg-black/25" />
          <div className="h-8 w-0.5 rounded-full bg-black/25" />
          <div className="h-8 w-0.5 rounded-full bg-black/25" />
        </div>

        {/* Minimalist Emblem Tag */}
        <div className="mt-auto flex h-3 w-10 items-center justify-center rounded-xs border border-amber-300/20 bg-black/20">
          <span className="text-[6px] tracking-widest text-amber-200/60 uppercase">
            ATELIER
          </span>
        </div>
      </div>

      {/* Base Caption */}
      <span className="mt-1 font-serif text-[10px] tracking-wide text-amber-200/80">
        {item.data.title || 'Wood-Wick Candle'}
      </span>
    </div>
  )
}
