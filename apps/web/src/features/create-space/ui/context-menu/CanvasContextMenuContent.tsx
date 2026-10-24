import {
  CreditCard,
  Disc,
  Image,
  Flame,
  Clipboard,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import type {
  SpatialItemType,
  SpatialItem,
} from '../../model/spatial-stage.types'
import { playSpatialSfx } from '@/shared/lib'
import type { SpatialSfxName } from '@/shared/lib'

export interface CanvasContextMenuContentProps {
  coords: { x: number; y: number }
  copiedItem: SpatialItem | null
  canAddPhoto?: boolean
  onClose: () => void
  onAddItem: (type: SpatialItemType, x: number, y: number) => void
  onPasteItem: (x?: number, y?: number) => void
  onResetToDefaults: () => void
  onClearCanvas: () => void
}

export function CanvasContextMenuContent({
  coords,
  copiedItem,
  canAddPhoto = true,
  onClose,
  onAddItem,
  onPasteItem,
  onResetToDefaults,
  onClearCanvas,
}: CanvasContextMenuContentProps) {
  const executeAction = (
    action: () => void,
    sfxKey: SpatialSfxName = 'tactile-tap',
  ) => {
    playSpatialSfx(sfxKey)
    action()
    onClose()
  }

  return (
    <div className="flex flex-col gap-0.5 p-1 text-xs text-[#F3EAE1]">
      {/* Header */}
      <div className="border-b border-[#3B302A] px-2.5 py-1.5 pb-2">
        <span className="font-heading truncate text-xs font-semibold text-amber-200">
          Studio Stage
        </span>
        <p className="text-[10px] text-[#A99B90]">
          Add keepsake at {Math.round(coords.x)}%, {Math.round(coords.y)}%
        </p>
      </div>

      {/* Quick Add Sub-items */}
      <div className="px-2.5 pt-1.5 pb-1 font-sans text-[10px] font-semibold tracking-wider text-[#A99B90] uppercase">
        Quick Add
      </div>

      <button
        type="button"
        onClick={() =>
          executeAction(
            () => onAddItem('greeting-card', coords.x, coords.y),
            'paper-rustle',
          )
        }
        className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-amber-300"
      >
        <CreditCard className="h-3.5 w-3.5 text-[#CF7056]" />
        <span>Dedication Card</span>
      </button>

      <button
        type="button"
        onClick={() =>
          executeAction(
            () => onAddItem('music-box', coords.x, coords.y),
            'musicbox-chime',
          )
        }
        className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-amber-300"
      >
        <Disc className="h-3.5 w-3.5 text-amber-400" />
        <span>Music Box</span>
      </button>

      <button
        type="button"
        disabled={!canAddPhoto}
        onClick={() =>
          executeAction(
            () => onAddItem('polaroid', coords.x, coords.y),
            'camera-shutter',
          )
        }
        title={
          canAddPhoto ? undefined : 'Maximum 2 photos reached for this space'
        }
        className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <div className="flex items-center gap-2">
          <Image className="h-3.5 w-3.5 text-cyan-400" />
          <span>Memory Polaroid</span>
        </div>
        {!canAddPhoto && (
          <span className="font-mono text-[9px] text-amber-400">Max 2</span>
        )}
      </button>

      <button
        type="button"
        onClick={() =>
          executeAction(
            () => onAddItem('candle', coords.x, coords.y),
            'candle-spark',
          )
        }
        className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-amber-300"
      >
        <Flame className="h-3.5 w-3.5 text-amber-400" />
        <span>Birthday Candle</span>
      </button>

      <div className="my-0.5 border-t border-[#3B302A]" />

      {/* Paste from Clipboard */}
      <button
        type="button"
        disabled={!copiedItem}
        onClick={() =>
          executeAction(() => onPasteItem(coords.x, coords.y), 'tactile-tap')
        }
        className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-[#F3EAE1] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <div className="flex items-center gap-2">
          <Clipboard className="h-3.5 w-3.5 text-[#A99B90]" />
          <span>
            {copiedItem ? `Paste "${copiedItem.label}"` : 'Paste Keepsake'}
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#A99B90]">Ctrl+V</span>
      </button>

      <div className="my-0.5 border-t border-[#3B302A]" />

      {/* Stage Layout Controls */}
      <button
        type="button"
        onClick={() => executeAction(onResetToDefaults, 'tactile-tap')}
        className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-[#A99B90] transition-colors hover:bg-[#2A221E] hover:text-[#F3EAE1]"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        <span>Reset Template Layout</span>
      </button>

      <button
        type="button"
        onClick={() => executeAction(onClearCanvas, 'paper-rustle')}
        className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-rose-300/80 transition-colors hover:bg-rose-500/15 hover:text-rose-200"
      >
        <Sparkles className="h-3.5 w-3.5 text-rose-400" />
        <span>Clear Blackboard</span>
      </button>
    </div>
  )
}
