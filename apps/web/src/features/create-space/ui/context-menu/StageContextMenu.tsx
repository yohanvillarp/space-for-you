import type { RefObject } from 'react'
import type { ContextMenuState } from './types'
import type {
  SpatialItem,
  SpatialItemType,
} from '../../model/spatial-stage.types'
import { ItemContextMenuContent } from './ItemContextMenuContent'
import { CanvasContextMenuContent } from './CanvasContextMenuContent'

export interface StageContextMenuProps {
  state: ContextMenuState
  menuRef: RefObject<HTMLDivElement | null>
  copiedItem: SpatialItem | null
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
  onAddItem: (type: SpatialItemType, x: number, y: number) => void
  onPasteItem: (x: number, y: number) => void
  onResetToDefaults: () => void
  onClearCanvas: () => void
}

export function StageContextMenu({
  state,
  menuRef,
  copiedItem,
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
  onAddItem,
  onPasteItem,
  onResetToDefaults,
  onClearCanvas,
}: StageContextMenuProps) {
  if (!state.isOpen || !state.target) return null

  return (
    <div
      ref={menuRef}
      style={{
        left: `${state.x}px`,
        top: `${state.y}px`,
      }}
      className="animate-in fade-in zoom-in-95 fixed z-50 max-w-[260px] min-w-[210px] rounded-2xl border border-[#3B302A] bg-[#1A1411]/95 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl duration-100 select-none"
    >
      {state.target.type === 'item' ? (
        <ItemContextMenuContent
          item={state.target.item}
          onClose={onClose}
          onBringToFront={onBringToFront}
          onSendToBack={onSendToBack}
          onDuplicate={onDuplicate}
          onResetRotation={onResetRotation}
          onToggleLock={onToggleLock}
          onCopyItem={onCopyItem}
          onDelete={onDelete}
          onUpdateData={onUpdateData}
          onStartEditText={onStartEditText}
        />
      ) : (
        <CanvasContextMenuContent
          coords={state.target.coords}
          copiedItem={copiedItem}
          onClose={onClose}
          onAddItem={onAddItem}
          onPasteItem={onPasteItem}
          onResetToDefaults={onResetToDefaults}
          onClearCanvas={onClearCanvas}
        />
      )}
    </div>
  )
}
