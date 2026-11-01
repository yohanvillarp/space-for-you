import { useState } from 'react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { playSpatialSfx, cn } from '@/shared/lib'

export interface StardustHourglassItemProps {
  item: SpatialItem
  onUpdateData?: (id: string, data: Partial<SpatialItem['data']>) => void
  isEditorMode?: boolean
}

export function StardustHourglassItem({
  item,
  onUpdateData,
  isEditorMode,
}: StardustHourglassItemProps) {
  const [localFlipped, setLocalFlipped] = useState(
    Boolean(item.data.sandFlipped),
  )
  const isFlipped =
    item.data.sandFlipped !== undefined ? item.data.sandFlipped : localFlipped

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation()
    const nextFlipped = !isFlipped
    setLocalFlipped(nextFlipped)
    onUpdateData?.(item.id, { sandFlipped: nextFlipped })
    playSpatialSfx('hourglass-cascade')
  }

  return (
    <div
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      title="Click to flip the hourglass"
      className={cn(
        'group relative flex flex-col items-center justify-center p-2 transition-transform duration-300 select-none',
        !isEditorMode && 'cursor-pointer hover:scale-105',
      )}
    >
      {/* Turned Walnut Wood Top Stand */}
      <div className="relative z-20 flex h-2 w-16 items-center justify-center rounded-sm border border-amber-950 bg-gradient-to-r from-[#4A2D16] via-[#664020] to-[#4A2D16] shadow-md" />

      {/* Glass Body with Stardust Interior */}
      <div
        className={cn(
          'relative z-10 flex h-24 w-12 flex-col items-center justify-between transition-transform duration-700 ease-in-out',
          isFlipped ? 'rotate-180' : 'rotate-0',
        )}
      >
        {/* Left and Right Brass Support Rods */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0.5 w-0.5 bg-gradient-to-b from-amber-600 via-amber-400 to-amber-700" />
        <div className="pointer-events-none absolute top-0 right-0.5 bottom-0 w-0.5 bg-gradient-to-b from-amber-600 via-amber-400 to-amber-700" />

        {/* Upper Glass Bulb */}
        <div className="relative flex h-11 w-11 flex-col items-center justify-end overflow-hidden rounded-t-full rounded-b-md border border-white/30 bg-white/10 shadow-inner backdrop-blur-[1px]">
          {/* Upper Sand level */}
          <div className="flex h-5 w-8 items-end justify-center rounded-b-md bg-gradient-to-t from-amber-400 via-amber-300 to-amber-500 shadow-sm">
            <span className="text-[7px] text-amber-100">✧</span>
          </div>
          {/* Glass glare line */}
          <div className="pointer-events-none absolute top-1 left-2 h-7 w-0.5 rounded-full bg-white/40" />
        </div>

        {/* Hourglass Waist Conduit (Trickling Star Stream) */}
        <div className="relative z-10 flex h-2 w-2 items-center justify-center">
          <div className="h-full w-0.5 animate-pulse rounded-full bg-amber-300 shadow-[0_0_4px_rgba(251,191,36,0.8)]" />
        </div>

        {/* Lower Glass Bulb */}
        <div className="relative flex h-11 w-11 flex-col items-center justify-end overflow-hidden rounded-t-md rounded-b-full border border-white/30 bg-white/10 shadow-inner backdrop-blur-[1px]">
          {/* Mounded Sand Cone */}
          <div className="flex h-6 w-9 flex-col items-center justify-center rounded-t-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 shadow-md">
            <span className="animate-pulse text-[8px] text-amber-100">✦</span>
          </div>
          {/* Glass glare line */}
          <div className="pointer-events-none absolute right-2 bottom-1 h-7 w-0.5 rounded-full bg-white/40" />
        </div>
      </div>

      {/* Turned Walnut Wood Bottom Stand */}
      <div className="relative z-20 flex h-2 w-16 items-center justify-center rounded-sm border border-amber-950 bg-gradient-to-r from-[#4A2D16] via-[#664020] to-[#4A2D16] shadow-md" />

      <span className="mt-1 font-serif text-[10px] tracking-wide text-amber-200/80">
        {item.data.title || 'Stardust Hourglass'}
      </span>
    </div>
  )
}
