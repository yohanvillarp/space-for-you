import { useState } from 'react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { playSpatialSfx, cn } from '@/shared/lib'

export interface FireflyJarItemProps {
  item: SpatialItem
  onUpdateData?: (id: string, data: Partial<SpatialItem['data']>) => void
  isEditorMode?: boolean
}

export function FireflyJarItem({
  item,
  onUpdateData,
  isEditorMode,
}: FireflyJarItemProps) {
  const [localOpen, setLocalOpen] = useState(Boolean(item.data.isOpen))
  const isOpen = item.data.isOpen !== undefined ? item.data.isOpen : localOpen

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const nextOpen = !isOpen
    setLocalOpen(nextOpen)
    onUpdateData?.(item.id, { isOpen: nextOpen })

    if (nextOpen) {
      playSpatialSfx('cork-pop')
      setTimeout(() => playSpatialSfx('firefly-chime'), 120)
    } else {
      playSpatialSfx('tactile-tap')
    }
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title={isOpen ? 'Click to close the jar' : 'Click to release fireflies'}
      className={cn(
        'group relative flex flex-col items-center justify-center p-3 transition-transform duration-300 select-none',
        !isEditorMode && 'cursor-pointer hover:scale-105',
      )}
    >
      {/* Ambient Firefly Radiance Glow */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 -m-4 rounded-full blur-xl transition-all duration-700',
          isOpen
            ? 'scale-125 bg-amber-400/25 opacity-100'
            : 'scale-95 bg-amber-400/10 opacity-50',
        )}
      />

      {/* Cork Stopper with elastic lift when opened */}
      <div
        className={cn(
          'relative z-20 flex flex-col items-center transition-all duration-500 ease-out',
          isOpen
            ? '-translate-y-4 scale-105 -rotate-12'
            : 'translate-y-0.5 rotate-0',
        )}
      >
        <div className="h-4 w-7 rounded-t-sm border border-stone-600/40 bg-gradient-to-b from-[#A87B51] to-[#7B5330] shadow-md" />
        <div className="h-1.5 w-6 rounded-b-xs border-x border-b border-stone-700/50 bg-[#654324]" />
        {/* Fine hanging twine tie */}
        <div className="h-2 w-0.5 bg-amber-800/40" />
      </div>

      {/* Handcrafted Glass Jar Body */}
      <div className="relative z-10 flex h-28 w-22 flex-col items-center justify-between overflow-hidden rounded-2xl border border-white/30 bg-gradient-to-b from-white/15 via-white/5 to-white/10 p-2 shadow-2xl backdrop-blur-[2px]">
        {/* Subtle glass reflection highlight */}
        <div className="pointer-events-none absolute top-1 left-2 h-24 w-1.5 rounded-full bg-gradient-to-b from-white/60 via-white/20 to-transparent" />
        <div className="pointer-events-none absolute top-3 right-2 h-8 w-1 rounded-full bg-white/25" />

        {/* Jar Rim Collar */}
        <div className="absolute top-0 right-0 left-0 h-1.5 border-b border-white/30 bg-white/20" />

        {/* Floating Fireflies */}
        <div className="relative flex h-full w-full items-center justify-center">
          {/* Firefly 1 */}
          <span
            className={cn(
              'absolute text-amber-300 transition-all duration-1000',
              isOpen
                ? '-top-3 left-2 scale-110 animate-bounce text-amber-200'
                : 'top-3 left-3 animate-pulse text-xs',
            )}
            style={{ animationDuration: '3s' }}
          >
            ✦
          </span>

          {/* Firefly 2 (Center glowing beacon) */}
          <div
            className={cn(
              'absolute flex items-center justify-center transition-all duration-700',
              isOpen ? '-top-1 scale-125' : 'top-8',
            )}
          >
            <span className="relative z-10 text-sm font-bold text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]">
              ✧
            </span>
            <span className="absolute h-4 w-4 animate-ping rounded-full bg-amber-400/40" />
          </div>

          {/* Firefly 3 */}
          <span
            className={cn(
              'absolute text-amber-400 transition-all duration-1000',
              isOpen
                ? '-top-2 right-1 animate-pulse'
                : 'right-3 bottom-4 text-xs',
            )}
            style={{ animationDuration: '2.4s' }}
          >
            ✦
          </span>

          {/* Firefly 4 */}
          <span
            className="absolute bottom-2 left-4 animate-pulse text-[10px] text-amber-300/80"
            style={{ animationDuration: '3.6s' }}
          >
            ✧
          </span>

          {/* Miniature scrolled letter inside jar */}
          <div className="mt-auto flex h-3.5 w-10 items-center justify-center rounded-xs border border-amber-900/30 bg-amber-100/70 shadow-xs">
            <span className="font-serif text-[7px] text-amber-900/60">
              wishes
            </span>
          </div>
        </div>

        {/* Jar Thick Base Glass */}
        <div className="absolute right-0 bottom-0 left-0 h-2 border-t border-white/20 bg-white/20" />
      </div>

      {/* Label Tag */}
      <span className="mt-1.5 font-serif text-[10px] tracking-wider text-amber-200/80 uppercase">
        {item.data.title || 'Firefly Jar'}
      </span>
    </div>
  )
}
