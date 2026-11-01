import { useState } from 'react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { playSpatialSfx, cn } from '@/shared/lib'

export interface PressedHerbariumItemProps {
  item: SpatialItem
  onUpdateData?: (id: string, data: Partial<SpatialItem['data']>) => void
  isEditorMode?: boolean
}

export function PressedHerbariumItem({
  item,
  isEditorMode,
}: PressedHerbariumItemProps) {
  const [isGleaming, setIsGleaming] = useState(false)

  const handleTouch = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsGleaming(true)
    playSpatialSfx('herbarium-rustle')
    setTimeout(() => setIsGleaming(false), 800)
  }

  const flowerType = item.data.herbariumFlower || 'lavender'

  return (
    <div
      onClick={handleTouch}
      role="button"
      tabIndex={0}
      title="Click to admire botanical keepsake"
      className={cn(
        'group relative flex flex-col items-center justify-center p-2 transition-transform duration-300 select-none',
        !isEditorMode && 'cursor-pointer hover:scale-105',
      )}
    >
      {/* Hanging Brass Ring */}
      <div className="relative z-20 -mb-1 flex h-3 w-3 items-center justify-center rounded-full border-2 border-amber-600/70 bg-transparent shadow-xs" />

      {/* Double-Glass Frame with Copper Soldered Edges */}
      <div className="relative z-10 flex h-32 w-24 flex-col justify-between overflow-hidden rounded-md border-2 border-[#8B5A2B] bg-white/10 p-2 shadow-2xl backdrop-blur-[1px] dark:border-[#A06D3B] dark:bg-black/20">
        {/* Copper corner solder reinforcements */}
        <div className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-amber-500/80" />
        <div className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-amber-500/80" />
        <div className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-amber-500/80" />
        <div className="absolute right-0 bottom-0 h-2 w-2 border-r-2 border-b-2 border-amber-500/80" />

        {/* Diagonal Light Sweep Animation */}
        <div
          className={cn(
            'pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out',
            isGleaming
              ? 'translate-x-full -translate-y-full'
              : '-translate-x-full translate-y-full',
          )}
        />

        {/* Botanical Specimen Center */}
        <div className="relative flex flex-1 flex-col items-center justify-center">
          {flowerType === 'lavender' && (
            <div className="flex flex-col items-center">
              {/* Lavender Buds */}
              <div className="flex flex-col items-center space-y-0.5">
                <span className="text-xs text-purple-400 drop-shadow-xs">
                  🪻
                </span>
                <span className="text-xs text-purple-300">🪻</span>
                <span className="text-xs text-purple-400">🪻</span>
              </div>
              {/* Delicate Green Stem */}
              <div className="h-10 w-0.5 rounded-full bg-emerald-800/80" />
            </div>
          )}

          {flowerType === 'pressed-rose' && (
            <div className="flex flex-col items-center">
              <span className="text-2xl text-rose-500 drop-shadow-xs">🥀</span>
              <div className="h-8 w-0.5 rounded-full bg-stone-700/80" />
            </div>
          )}

          {flowerType === 'hydrangea' && (
            <div className="flex flex-col items-center">
              <span className="text-2xl text-sky-400 drop-shadow-xs">🌸</span>
              <div className="h-8 w-0.5 rounded-full bg-emerald-700/70" />
            </div>
          )}

          {flowerType === 'ferns' && (
            <div className="flex flex-col items-center">
              <span className="text-2xl text-emerald-500 drop-shadow-xs">
                🌿
              </span>
              <div className="h-6 w-0.5 rounded-full bg-emerald-900/80" />
            </div>
          )}

          {/* Floating Petal particle when gleaming */}
          {isGleaming && (
            <span className="absolute -top-1 right-2 animate-bounce text-xs text-purple-300">
              ❧
            </span>
          )}
        </div>

        {/* Specimen Calligraphy Tag at Base */}
        <div className="relative z-10 flex h-4 w-full items-center justify-between border-t border-stone-400/40 bg-amber-50/80 px-1 dark:bg-stone-900/80">
          <span className="font-serif text-[7px] text-stone-700 italic dark:text-stone-300">
            {item.data.caption || 'Herbarium No. 24'}
          </span>
          <span className="text-[6px] text-amber-700">★</span>
        </div>
      </div>

      <span className="mt-1 font-serif text-[10px] tracking-wide text-amber-200/80">
        {item.data.title || 'Pressed Wildflower'}
      </span>
    </div>
  )
}
