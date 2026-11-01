import { useState } from 'react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { playSpatialSfx, cn } from '@/shared/lib'

export interface AntiqueLocketItemProps {
  item: SpatialItem
  onUpdateData?: (id: string, data: Partial<SpatialItem['data']>) => void
  isEditorMode?: boolean
}

export function AntiqueLocketItem({
  item,
  onUpdateData,
  isEditorMode,
}: AntiqueLocketItemProps) {
  const [localOpen, setLocalOpen] = useState(Boolean(item.data.locketOpen))
  const isOpen =
    item.data.locketOpen !== undefined ? item.data.locketOpen : localOpen

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    const nextOpen = !isOpen
    setLocalOpen(nextOpen)
    onUpdateData?.(item.id, { locketOpen: nextOpen })
    playSpatialSfx('locket-click')
  }

  return (
    <div
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      title={isOpen ? 'Click to close locket' : 'Click to open heirloom locket'}
      className={cn(
        'group relative flex flex-col items-center justify-center p-2 transition-transform duration-300 select-none',
        !isEditorMode && 'cursor-pointer hover:scale-105',
      )}
    >
      {/* Hanging Black/Burgundy Velvet Loop Ribbon */}
      <div className="relative z-20 -mb-1 flex h-4 w-1.5 rounded-t-full bg-gradient-to-b from-[#8B1E2B] to-[#5C141C] shadow-sm" />

      {/* Locket Container with 3D perspective */}
      <div className="relative z-10 flex h-24 w-20 items-center justify-center [perspective:800px]">
        {/* Right Base Half (The Interior Compartment) */}
        <div className="relative flex h-20 w-16 flex-col items-center justify-center overflow-hidden rounded-[50%] border-2 border-amber-600 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 p-1.5 shadow-2xl">
          {/* Internal Velvet Lining */}
          <div className="flex h-full w-full flex-col items-center justify-center rounded-[50%] border border-amber-500/40 bg-[#3B1419] p-1 shadow-inner">
            {item.data.photoUrl ? (
              <img
                src={item.data.photoUrl}
                alt="Locket memory"
                className="h-full w-full rounded-[50%] object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center px-1 text-center">
                <span className="text-sm text-amber-300 drop-shadow-xs">♥</span>
                <span className="font-serif text-[6px] leading-tight text-amber-200/90">
                  {item.data.text || 'Always'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Left Swinging Lid with 3D Hinged Rotation */}
        <div
          className={cn(
            'absolute inset-0 flex origin-left items-center justify-center transition-transform duration-700 ease-out',
            isOpen ? '-rotate-y-120' : 'rotate-y-0',
          )}
        >
          <div className="relative flex h-20 w-16 flex-col items-center justify-center rounded-[50%] border-2 border-amber-400/90 bg-gradient-to-br from-amber-300 via-amber-600 to-amber-800 p-1.5 shadow-2xl">
            {/* Victorian Filigree Engraving Center */}
            <div className="flex h-12 w-10 flex-col items-center justify-center rounded-[50%] border border-amber-300/40 bg-amber-700/30">
              <span className="text-[10px] text-amber-200">✦</span>
              <span className="font-serif text-[8px] font-bold text-amber-100">
                {item.data.title ? item.data.title.slice(0, 4) : 'SFY'}
              </span>
              <span className="text-[10px] text-amber-200">✦</span>
            </div>
            {/* Specular curved highlight */}
            <div className="pointer-events-none absolute top-2 left-3 h-10 w-1 rounded-full bg-amber-200/40 blur-[0.5px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
