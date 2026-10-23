import {
  Play,
  Pause,
  Flame,
  FlameKindling,
  PenLine,
  BringToFront,
  SendToBack,
  CopyPlus,
  RotateCcw,
  Lock,
  Unlock,
  Copy,
  Trash2,
} from 'lucide-react'
import type { SpatialItem } from '../../model/spatial-stage.types'
import { playSpatialSfx } from '@/shared/lib'

import type { SpatialSfxName } from '@/shared/lib'

export interface ItemContextMenuContentProps {
  item: SpatialItem
  onClose: () => void
  onBringToFront: (id: string) => void
  onSendToBack: (id: string) => void
  onDuplicate: (id: string) => void
  onResetRotation: (id: string) => void
  onToggleLock: (id: string) => void
  onCopyItem: (item: SpatialItem) => void
  onDelete: (id: string) => void
  onUpdateData: (id: string, updates: Partial<SpatialItem['data']>) => void
  onStartEditText?: (item: SpatialItem) => void
}

export function ItemContextMenuContent({
  item,
  onClose,
  onBringToFront,
  onSendToBack,
  onDuplicate,
  onResetRotation,
  onToggleLock,
  onCopyItem,
  onDelete,
  onUpdateData,
  onStartEditText,
}: ItemContextMenuContentProps) {
  const isMusic =
    item.type === 'music-box' ||
    item.type === 'vinyl-player' ||
    item.type === 'cassette-tape'
  const isCandle = item.type === 'candle'
  const hasText =
    item.type === 'polaroid' ||
    item.type === 'greeting-card' ||
    item.type === 'sticky-note' ||
    item.type === 'airmail-postcard'

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
      {/* Header Info */}
      <div className="border-b border-[#3B302A] px-2.5 py-1.5 pb-2">
        <span className="font-heading truncate text-xs font-semibold text-amber-200">
          {item.label}
        </span>
        <p className="text-[10px] text-[#A99B90]">
          {item.isLocked ? 'Position locked' : 'Interactive keepsake'}
        </p>
      </div>

      {/* Contextual Specimen Action */}
      {isMusic && (
        <button
          type="button"
          onClick={() =>
            executeAction(() =>
              onUpdateData(item.id, { isPlaying: !item.data.isPlaying }),
            )
          }
          className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-amber-300"
        >
          <div className="flex items-center gap-2">
            {item.data.isPlaying ? (
              <Pause className="h-3.5 w-3.5 text-amber-400" />
            ) : (
              <Play className="h-3.5 w-3.5 text-amber-400" />
            )}
            <span>
              {item.data.isPlaying ? 'Pause Playback' : 'Start Music'}
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#A99B90]">Space</span>
        </button>
      )}

      {isCandle && (
        <button
          type="button"
          onClick={() =>
            executeAction(
              () => onUpdateData(item.id, { isLit: !item.data.isLit }),
              item.data.isLit ? 'candle-blow' : 'candle-spark',
            )
          }
          className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-amber-300"
        >
          <div className="flex items-center gap-2">
            {item.data.isLit ? (
              <FlameKindling className="h-3.5 w-3.5 text-orange-400" />
            ) : (
              <Flame className="h-3.5 w-3.5 text-amber-400" />
            )}
            <span>{item.data.isLit ? 'Blow out Flame' : 'Light Candle'}</span>
          </div>
        </button>
      )}

      {hasText && onStartEditText && (
        <button
          type="button"
          onClick={() =>
            executeAction(() => onStartEditText(item), 'paper-rustle')
          }
          className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-amber-300"
        >
          <div className="flex items-center gap-2">
            <PenLine className="h-3.5 w-3.5 text-[#CF7056]" />
            <span>Edit Dedication</span>
          </div>
        </button>
      )}

      {(isMusic || isCandle || hasText) && (
        <div className="my-0.5 border-t border-[#3B302A]" />
      )}

      {/* Layering & Z-Index */}
      <button
        type="button"
        onClick={() => executeAction(() => onBringToFront(item.id))}
        className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-[#F3EAE1]"
      >
        <div className="flex items-center gap-2">
          <BringToFront className="h-3.5 w-3.5 text-[#A99B90]" />
          <span>Bring to Front</span>
        </div>
        <span className="font-mono text-[9px] text-[#A99B90]">]</span>
      </button>

      <button
        type="button"
        onClick={() => executeAction(() => onSendToBack(item.id))}
        className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-[#F3EAE1]"
      >
        <div className="flex items-center gap-2">
          <SendToBack className="h-3.5 w-3.5 text-[#A99B90]" />
          <span>Send to Back</span>
        </div>
        <span className="font-mono text-[9px] text-[#A99B90]">[</span>
      </button>

      <div className="my-0.5 border-t border-[#3B302A]" />

      {/* Transform Actions */}
      <button
        type="button"
        onClick={() => executeAction(() => onDuplicate(item.id))}
        className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-[#F3EAE1]"
      >
        <div className="flex items-center gap-2">
          <CopyPlus className="h-3.5 w-3.5 text-[#A99B90]" />
          <span>Duplicate</span>
        </div>
        <span className="font-mono text-[9px] text-[#A99B90]">Ctrl+D</span>
      </button>

      {item.rotation !== 0 && (
        <button
          type="button"
          onClick={() => executeAction(() => onResetRotation(item.id))}
          className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-[#F3EAE1]"
        >
          <div className="flex items-center gap-2">
            <RotateCcw className="h-3.5 w-3.5 text-[#A99B90]" />
            <span>Reset Rotation</span>
          </div>
          <span className="font-mono text-[9px] text-[#A99B90]">0°</span>
        </button>
      )}

      <button
        type="button"
        onClick={() => executeAction(() => onToggleLock(item.id))}
        className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-[#F3EAE1]"
      >
        <div className="flex items-center gap-2">
          {item.isLocked ? (
            <Unlock className="h-3.5 w-3.5 text-amber-400" />
          ) : (
            <Lock className="h-3.5 w-3.5 text-[#A99B90]" />
          )}
          <span>{item.isLocked ? 'Unlock Position' : 'Lock Position'}</span>
        </div>
      </button>

      <button
        type="button"
        onClick={() => executeAction(() => onCopyItem(item))}
        className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-[#F3EAE1]"
      >
        <div className="flex items-center gap-2">
          <Copy className="h-3.5 w-3.5 text-[#A99B90]" />
          <span>Copy</span>
        </div>
        <span className="font-mono text-[9px] text-[#A99B90]">Ctrl+C</span>
      </button>

      <div className="my-0.5 border-t border-[#3B302A]" />

      {/* Danger Zone */}
      <button
        type="button"
        onClick={() => executeAction(() => onDelete(item.id))}
        className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-rose-300 transition-colors hover:bg-rose-500/15 hover:text-rose-200"
      >
        <div className="flex items-center gap-2">
          <Trash2 className="h-3.5 w-3.5 text-rose-400" />
          <span>Delete Keepsake</span>
        </div>
        <span className="font-mono text-[9px] text-rose-400/80">Del</span>
      </button>
    </div>
  )
}
