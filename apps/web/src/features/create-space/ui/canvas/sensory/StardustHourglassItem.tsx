import { useState, useEffect, useRef } from 'react'
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
  const [rotationDegrees, setRotationDegrees] = useState(0)
  const [isFlowing, setIsFlowing] = useState(false)
  const [isDraining, setIsDraining] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation()
    playSpatialSfx('hourglass-cascade')

    // Tumble the full hourglass frame by 180 degrees
    setRotationDegrees((prev) => prev + 180)
    setIsFlowing(false)
    setIsDraining(false)

    if (timerRef.current) clearTimeout(timerRef.current)

    // Settle rotation then start gravity flow
    setTimeout(() => {
      setIsDraining(true)
      setIsFlowing(true)

      // Stardust trickles for 7 seconds before fully settling
      timerRef.current = setTimeout(() => {
        setIsFlowing(false)
      }, 7000)
    }, 550)

    onUpdateData?.(item.id, { sandFlipped: !item.data.sandFlipped })
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      title={
        item.data.text ||
        item.data.caption ||
        'Stardust Hourglass • Click to flip and reverse time'
      }
      className={cn(
        'group relative flex flex-col items-center justify-center p-2 select-none',
        !isEditorMode && 'cursor-pointer hover:scale-105 active:scale-95',
      )}
    >
      {/* Complete Rigid Hourglass Assembly (Spins 180deg as one physical object) */}
      <div
        style={{
          transform: `rotate(${rotationDegrees}deg)`,
          transition: 'transform 550ms cubic-bezier(0.34, 1.45, 0.64, 1)',
        }}
        className="relative flex flex-col items-center"
      >
        {/* Turned Walnut Wood Top Stand */}
        <div className="relative z-20 flex h-2 w-16 items-center justify-center rounded-sm border border-amber-950 bg-gradient-to-r from-[#4A2D16] via-[#664020] to-[#4A2D16] shadow-md">
          {/* Brass Finial Top Cap */}
          <div className="absolute -top-1 h-1 w-2 rounded-full border border-amber-500/60 bg-amber-400" />
        </div>

        {/* Double-Bulb Blown Glass Vessel */}
        <div className="relative z-10 flex h-24 w-12 flex-col items-center justify-between">
          {/* Left and Right Rigid Brass Support Rods */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-0.5 w-0.5 bg-gradient-to-b from-amber-600 via-amber-300 to-amber-700 shadow-xs" />
          <div className="pointer-events-none absolute top-0 right-0.5 bottom-0 w-0.5 bg-gradient-to-b from-amber-600 via-amber-300 to-amber-700 shadow-xs" />

          {/* Upper Glass Bulb */}
          <div className="relative flex h-11 w-11 flex-col items-center justify-end overflow-hidden rounded-t-full rounded-b-md border border-white/30 bg-white/10 shadow-inner backdrop-blur-[1px]">
            {/* Glass Curvature Glare Line */}
            <div className="pointer-events-none absolute top-1 left-2 h-7 w-0.5 rounded-full bg-white/40" />

            {/* Counter-Rotated Stardust Chamber: Gravity ALWAYS pulls downwards */}
            <div
              style={{
                transform: `rotate(${-rotationDegrees}deg)`,
                transition: 'transform 550ms cubic-bezier(0.34, 1.45, 0.64, 1)',
              }}
              className="absolute inset-0 flex flex-col items-center justify-end p-0.5"
            >
              {/* Upper Sand Reservoir Draining Downward */}
              <div
                style={{
                  transition: isDraining
                    ? 'height 7s cubic-bezier(0.4, 0, 0.2, 1)'
                    : 'none',
                }}
                className={cn(
                  'flex w-8 items-center justify-center overflow-hidden rounded-b-md bg-gradient-to-t from-amber-400 via-amber-300 to-amber-500 shadow-inner',
                  isDraining ? 'h-0' : 'h-5',
                )}
              >
                <span className="text-[6.5px] text-amber-100/90">✧</span>
              </div>
            </div>
          </div>

          {/* Hourglass Waist Conduit (Narrow Funnel Neck) */}
          <div className="relative z-20 flex h-2 w-2 items-center justify-center">
            {/* Falling Stardust Particles Stream */}
            {isFlowing && (
              <div className="flex h-full w-0.5 flex-col items-center justify-center overflow-hidden">
                <div className="h-full w-full animate-pulse bg-amber-300 shadow-[0_0_5px_rgba(251,191,36,0.9)]" />
              </div>
            )}
          </div>

          {/* Lower Glass Bulb */}
          <div className="relative flex h-11 w-11 flex-col items-center justify-end overflow-hidden rounded-t-md rounded-b-full border border-white/30 bg-white/10 shadow-inner backdrop-blur-[1px]">
            {/* Glass Curvature Glare Line */}
            <div className="pointer-events-none absolute right-2 bottom-1 h-7 w-0.5 rounded-full bg-white/40" />

            {/* Counter-Rotated Stardust Chamber: Cone rises from the floor */}
            <div
              style={{
                transform: `rotate(${-rotationDegrees}deg)`,
                transition: 'transform 550ms cubic-bezier(0.34, 1.45, 0.64, 1)',
              }}
              className="absolute inset-0 flex flex-col items-center justify-end p-0.5"
            >
              {/* Lower Sand Cone Accumulating Upward from the floor */}
              <div
                style={{
                  transition: isDraining
                    ? 'height 7s cubic-bezier(0.4, 0, 0.2, 1)'
                    : 'none',
                }}
                className={cn(
                  'flex w-9 flex-col items-center justify-center rounded-t-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 shadow-md',
                  isDraining ? 'h-5' : rotationDegrees === 0 ? 'h-5' : 'h-0',
                )}
              >
                <span className="animate-pulse text-[7.5px] text-amber-100">
                  ✦
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Turned Walnut Wood Bottom Stand */}
        <div className="relative z-20 flex h-2 w-16 items-center justify-center rounded-sm border border-amber-950 bg-gradient-to-r from-[#4A2D16] via-[#664020] to-[#4A2D16] shadow-md">
          {/* Brass Finial Bottom Cap */}
          <div className="absolute -bottom-1 h-1 w-2 rounded-full border border-amber-500/60 bg-amber-400" />
        </div>
      </div>
    </div>
  )
}
