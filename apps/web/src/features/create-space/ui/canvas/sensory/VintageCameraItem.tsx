import { useState } from 'react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { playSpatialSfx, cn } from '@/shared/lib'

export interface VintageCameraItemProps {
  item: SpatialItem
  onUpdateData?: (id: string, data: Partial<SpatialItem['data']>) => void
  isEditorMode?: boolean
}

export function VintageCameraItem({
  item,
  isEditorMode,
}: VintageCameraItemProps) {
  const [isFlashing, setIsFlashing] = useState(false)
  const [hasEjectedPhoto, setHasEjectedPhoto] = useState(false)

  const handleShutter = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFlashing(true)
    playSpatialSfx('camera-shutter')
    setTimeout(() => {
      setIsFlashing(false)
      setHasEjectedPhoto(true)
    }, 140)
  }

  return (
    <div
      onClick={handleShutter}
      role="button"
      tabIndex={0}
      title="Click to snap a photograph"
      className={cn(
        'group relative flex flex-col items-center justify-center p-2 transition-transform duration-300 select-none',
        !isEditorMode && 'cursor-pointer hover:scale-105',
      )}
    >
      {/* Radiant Lens Flare / Flash Effect */}
      {isFlashing && (
        <div className="animate-out fade-out pointer-events-none fixed inset-0 z-50 bg-white/70 duration-200" />
      )}

      {/* Retro 35mm Rangefinder Camera Body */}
      <div className="relative z-10 flex h-20 w-28 flex-col justify-between rounded-lg border border-stone-600 bg-gradient-to-b from-stone-300 via-stone-400 to-stone-500 p-1.5 shadow-2xl dark:border-stone-700 dark:from-stone-700 dark:via-stone-800 dark:to-stone-900">
        {/* Top Metallic Plate: Viewfinder & Shutter Button */}
        <div className="flex items-center justify-between px-1">
          {/* Shutter Button with mechanical depression */}
          <div
            className={cn(
              'h-2 w-3 rounded-t-xs border border-stone-600 bg-gradient-to-t from-stone-400 to-stone-200 shadow-xs transition-transform',
              isFlashing && 'translate-y-0.5',
            )}
          />
          {/* Small red dot and optical viewfinder */}
          <div className="flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-rose-600 shadow-xs" />
            <div className="h-2.5 w-4 rounded-xs border border-stone-700 bg-stone-900 shadow-inner" />
          </div>
        </div>

        {/* Central Leatherette Textured Grip with Big Lens */}
        <div className="relative my-0.5 flex flex-1 items-center justify-center rounded-sm bg-[#1E1B18] shadow-inner">
          {/* Outer Lens Bezel */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-stone-400 bg-gradient-to-tr from-stone-800 to-stone-900 shadow-md">
            {/* Multi-coated Glass Core */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-400/40 bg-gradient-to-br from-sky-950 via-stone-950 to-indigo-950 shadow-inner">
              {/* Glass flare reflection */}
              <div className="h-2 w-2 rounded-full bg-white/50 blur-[0.5px]" />
            </div>
          </div>
        </div>

        {/* Bottom Ejection Slot */}
        <div className="h-1 w-full rounded-full bg-stone-950 shadow-inner" />
      </div>

      {/* Ejected Instant Photo Print */}
      {hasEjectedPhoto && (
        <div className="animate-in slide-in-from-top-2 relative z-0 -mt-2 flex h-10 w-9 flex-col rounded-xs border border-stone-300 bg-white p-0.5 shadow-md duration-500">
          <div className="rounded-2xs flex h-7 w-full items-center justify-center bg-stone-800 text-[8px] text-amber-200">
            ♥
          </div>
          <div className="mt-auto h-0.5 w-4 self-center rounded-full bg-stone-300" />
        </div>
      )}

      <span className="text-text-secondary mt-1 font-mono text-[9px] font-medium tracking-wider uppercase">
        {item.data.title || '35mm Camera'}
      </span>
    </div>
  )
}
