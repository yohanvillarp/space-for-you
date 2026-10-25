import { Undo2, Redo2 } from 'lucide-react'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface UndoRedoControlsProps {
  canUndo?: boolean
  canRedo?: boolean
  onUndo?: () => void
  onRedo?: () => void
  className?: string
}

export function UndoRedoControls({
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  className,
}: UndoRedoControlsProps) {
  const handleUndo = () => {
    if (canUndo && onUndo) {
      onUndo()
      playSpatialSfx('tactile-tap')
    }
  }

  const handleRedo = () => {
    if (canRedo && onRedo) {
      onRedo()
      playSpatialSfx('tactile-tap')
    }
  }

  return (
    <div
      className={cn(
        'flex items-center gap-0.5 rounded-lg border border-white/10 bg-white/5 p-0.5',
        className,
      )}
    >
      <button
        type="button"
        disabled={!canUndo}
        onClick={handleUndo}
        title={canUndo ? 'Undo last action (Ctrl+Z)' : 'Nothing to undo'}
        aria-label="Undo"
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-md transition-colors',
          canUndo
            ? 'cursor-pointer text-stone-200 hover:bg-white/15 hover:text-white'
            : 'cursor-not-allowed text-stone-600',
        )}
      >
        <Undo2 className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        disabled={!canRedo}
        onClick={handleRedo}
        title={canRedo ? 'Redo last action (Ctrl+Y)' : 'Nothing to redo'}
        aria-label="Redo"
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-md transition-colors',
          canRedo
            ? 'cursor-pointer text-stone-200 hover:bg-white/15 hover:text-white'
            : 'cursor-not-allowed text-stone-600',
        )}
      >
        <Redo2 className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
