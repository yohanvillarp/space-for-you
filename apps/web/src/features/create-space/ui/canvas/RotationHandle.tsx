import type { RefObject } from 'react'
import { RotateCw } from 'lucide-react'
import { cn } from '@/shared/lib'
import { useItemRotation } from './useItemRotation'

export interface RotationHandleProps {
  itemId: string
  currentRotation: number
  itemRef: RefObject<HTMLDivElement | null>
  onSetRotation: (id: string, angle: number) => void
}

export function RotationHandle({
  itemId,
  currentRotation,
  itemRef,
  onSetRotation,
}: RotationHandleProps) {
  const { isRotating, liveAngle, handlePointerDown } = useItemRotation({
    itemId,
    currentRotation,
    itemRef,
    onSetRotation,
  })

  return (
    <div
      className="pointer-events-auto absolute -bottom-7 left-1/2 z-40 -translate-x-1/2"
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* Connection Stalk from bottom of item to knob */}
      <div className="bg-accent/60 mx-auto h-2 w-px" />

      {/* Rotating Knob Handle */}
      <div
        role="slider"
        aria-label="Rotate item"
        aria-valuenow={liveAngle}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        title="Drag to rotate smoothly · Hold Shift for 15° steps"
        className={cn(
          'group border-accent/70 text-accent flex h-5 w-5 items-center justify-center rounded-full border bg-[#1C1613] shadow-md transition-transform select-none',
          isRotating
            ? 'scale-110 cursor-grabbing border-amber-400 text-amber-300 ring-2 ring-amber-400/40'
            : 'hover:border-accent hover:text-accent-hover cursor-grab hover:scale-110',
        )}
      >
        <RotateCw
          className={cn(
            'h-2.5 w-2.5 transition-transform duration-150',
            isRotating && 'rotate-45',
          )}
        />
      </div>

      {/* Live Angle Pill Tooltip during rotation */}
      {isRotating && (
        <div className="animate-scale-in pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 rounded-full border border-amber-400/50 bg-[#16120F]/95 px-2.5 py-0.5 font-mono text-[10px] font-medium whitespace-nowrap text-amber-200 shadow-xl backdrop-blur-md">
          {liveAngle === 0
            ? '0° · Straight'
            : `${liveAngle > 0 ? `+${liveAngle}` : liveAngle}°`}
        </div>
      )}
    </div>
  )
}
