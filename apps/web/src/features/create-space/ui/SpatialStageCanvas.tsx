import type { MouseEvent as ReactMouseEvent } from 'react'
import type { SpaceTemplateId } from '@/entities/space'
import type { SpatialItem, SpatialItemType } from '../model/spatial-stage.types'
import { SpatialCanvasItem } from './SpatialCanvasItem'
import { SpatialStageAtmosphere } from './canvas/SpatialStageAtmosphere'
import { useCanvasDragAndDrop } from './canvas/useCanvasDragAndDrop'
import { StageContextMenu, useContextMenu } from './context-menu'
import { cn } from '@/shared/lib'
import '@/features/space-themes/birthday/birthday.css'
import '@/features/space-themes/romantic/romantic.css'
import '@/features/space-themes/friendship/friendship.css'

export interface SpatialStageCanvasProps {
  templateId: SpaceTemplateId
  items: SpatialItem[]
  selectedId: string | null
  copiedItem?: SpatialItem | null
  onSelectItem: (id: string | null) => void
  onUpdateItemPosition: (id: string, x: number, y: number) => void
  onRotateItem: (id: string, delta: number) => void
  onResetRotation?: (id: string) => void
  onBringToFront: (id: string) => void
  onSendToBack?: (id: string) => void
  onDeleteItem: (id: string) => void
  onDuplicateItem?: (id: string) => void
  onToggleLock?: (id: string) => void
  onCopyItem?: (item: SpatialItem) => void
  onPasteItem?: (x?: number, y?: number) => void
  onResetToDefaults?: () => void
  onClearCanvas?: () => void
  onUpdateItemData: (id: string, updates: Partial<SpatialItem['data']>) => void
  onAddItem: (
    type: SpatialItemType,
    x?: number,
    y?: number,
    customData?: Partial<SpatialItem['data']>,
  ) => void
  className?: string
}

export function SpatialStageCanvas({
  templateId,
  items,
  selectedId,
  copiedItem = null,
  onSelectItem,
  onUpdateItemPosition,
  onRotateItem,
  onResetRotation,
  onBringToFront,
  onSendToBack,
  onDeleteItem,
  onDuplicateItem,
  onToggleLock,
  onCopyItem,
  onPasteItem,
  onResetToDefaults,
  onClearCanvas,
  onUpdateItemData,
  onAddItem,
  className,
}: SpatialStageCanvasProps) {
  const {
    containerRef,
    draggingId,
    isDragOver,
    handleStartDrag,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useCanvasDragAndDrop({
    items,
    selectedId,
    onSelectItem,
    onUpdateItemPosition,
    onDeleteItem,
    onAddItem,
  })

  const { menuState, menuRef, openMenu, closeMenu } = useContextMenu()

  const handleCanvasContextMenu = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const rawX = ((e.clientX - rect.left) / rect.width) * 100
    const rawY = ((e.clientY - rect.top) / rect.height) * 100
    const clampedX = Math.max(5, Math.min(95, Math.round(rawX)))
    const clampedY = Math.max(5, Math.min(95, Math.round(rawY)))
    openMenu(
      { type: 'canvas', coords: { x: clampedX, y: clampedY } },
      e.clientX,
      e.clientY,
    )
  }

  const handleItemContextMenu = (item: SpatialItem, e: ReactMouseEvent) => {
    openMenu({ type: 'item', item }, e.clientX, e.clientY)
  }

  const getSurfaceClass = () => {
    switch (templateId) {
      case 'birthday':
        return 'celebration-table-surface'
      case 'anniversary':
        return 'romantic-desk-surface'
      case 'friendship':
        return 'corkboard-surface'
      default:
        return 'celebration-table-surface'
    }
  }

  return (
    <div
      ref={containerRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => onSelectItem(null)}
      onContextMenu={handleCanvasContextMenu}
      className={cn(
        'relative min-h-[580px] w-full overflow-hidden rounded-3xl border border-black/15 shadow-2xl transition-all sm:min-h-[640px] dark:border-white/10',
        getSurfaceClass(),
        isDragOver && 'ring-primary/70 ring-4 ring-inset',
        className,
      )}
    >
      <SpatialStageAtmosphere
        templateId={templateId}
        isDragOver={isDragOver}
        isEmpty={items.length === 0}
      />

      {/* Render All Draggable Items on the Stage */}
      {items.map((item) => (
        <SpatialCanvasItem
          key={item.id}
          item={item}
          isSelected={selectedId === item.id}
          isDragging={draggingId === item.id}
          onSelect={onSelectItem}
          onStartDrag={handleStartDrag}
          onRotate={onRotateItem}
          onBringToFront={onBringToFront}
          onDelete={onDeleteItem}
          onUpdateData={onUpdateItemData}
          onContextMenu={handleItemContextMenu}
        />
      ))}

      {/* Stage Context Menu for Items and Canvas */}
      <StageContextMenu
        state={menuState}
        menuRef={menuRef}
        copiedItem={copiedItem}
        onClose={closeMenu}
        onBringToFront={onBringToFront}
        onSendToBack={onSendToBack || onBringToFront}
        onDuplicate={onDuplicateItem || (() => {})}
        onResetRotation={onResetRotation || (() => {})}
        onToggleLock={onToggleLock || (() => {})}
        onCopyItem={onCopyItem || (() => {})}
        onDelete={onDeleteItem}
        onUpdateData={onUpdateItemData}
        onAddItem={(type, x, y) => onAddItem(type, x, y)}
        onPasteItem={(x, y) => onPasteItem?.(x, y)}
        onResetToDefaults={onResetToDefaults || (() => {})}
        onClearCanvas={onClearCanvas || (() => {})}
      />
    </div>
  )
}
