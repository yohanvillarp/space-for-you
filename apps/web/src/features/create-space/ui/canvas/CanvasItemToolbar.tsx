import {
  RotateCcw,
  RotateCw,
  Trash2,
  BringToFront,
  GripHorizontal,
} from 'lucide-react'
import { playSpatialSfx } from '@/shared/lib'

export interface CanvasItemToolbarProps {
  itemId: string
  onRotate: (id: string, delta: number) => void
  onBringToFront: (id: string) => void
  onDelete: (id: string) => void
}

export function CanvasItemToolbar({
  itemId,
  onRotate,
  onBringToFront,
  onDelete,
}: CanvasItemToolbarProps) {
  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      className="bg-bg-surface/95 border-border-base/80 text-text-primary animate-fade-in absolute -top-11 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border px-2 py-1 shadow-lg backdrop-blur-md"
    >
      {/* Drag Handle Indicator */}
      <div className="text-text-muted px-1">
        <GripHorizontal className="h-3.5 w-3.5" />
      </div>

      {/* Rotate Counter-Clockwise */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          playSpatialSfx('tactile-tap')
          onRotate(itemId, -5)
        }}
        title="Tilt left (-5°)"
        className="hover:bg-bg-subtle text-text-secondary hover:text-text-primary cursor-pointer rounded-full p-1 transition-colors"
      >
        <RotateCcw className="h-3 w-3" />
      </button>

      {/* Rotate Clockwise */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          playSpatialSfx('tactile-tap')
          onRotate(itemId, 5)
        }}
        title="Tilt right (+5°)"
        className="hover:bg-bg-subtle text-text-secondary hover:text-text-primary cursor-pointer rounded-full p-1 transition-colors"
      >
        <RotateCw className="h-3 w-3" />
      </button>

      {/* Bring to Front */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          playSpatialSfx('tactile-tap')
          onBringToFront(itemId)
        }}
        title="Bring to front"
        className="hover:bg-bg-subtle text-text-secondary hover:text-text-primary cursor-pointer rounded-full p-1 transition-colors"
      >
        <BringToFront className="h-3 w-3" />
      </button>

      <div className="bg-border-base/60 mx-0.5 h-3 w-px" />

      {/* Delete Object */}
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          playSpatialSfx('pop-snap')
          onDelete(itemId)
        }}
        title="Delete keepsake (or press Del)"
        className="text-text-secondary hover:text-feedback-error hover:bg-feedback-error/10 cursor-pointer rounded-full p-1 transition-colors"
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  )
}
