import { useEffect } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import type { SpaceTemplateId } from '@/entities/space'
import type {
  SpatialItem,
  SpatialItemType,
} from '@/features/create-space/model/spatial-stage.types'
import { SpatialCanvasItem } from './SpatialCanvasItem'
import { SpatialStageAtmosphere } from './canvas/SpatialStageAtmosphere'
import { useCanvasDragAndDrop } from './canvas/useCanvasDragAndDrop'
import { StageContextMenu, useContextMenu } from './context-menu'
import {
  useVirtualCanvasScale,
  VIRTUAL_CANVAS_WIDTH,
  VIRTUAL_CANVAS_HEIGHT,
} from './canvas/useVirtualCanvasScale'
import { CanvasZoomControl } from './canvas/CanvasZoomControl'
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
  onSetRotation?: (id: string, angle: number) => void
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
  onOpenPhotoPicker?: (item: SpatialItem) => void
  className?: string
}

const SURFACE_CLASSES: Record<SpaceTemplateId, string> = {
  birthday: 'celebration-table-surface',
  anniversary: 'romantic-desk-surface',
  friendship: 'corkboard-surface',
}

export function SpatialStageCanvas({
  templateId,
  items,
  selectedId,
  copiedItem = null,
  onSelectItem,
  onUpdateItemPosition,
  onRotateItem,
  onSetRotation,
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
  onOpenPhotoPicker,
  className,
}: SpatialStageCanvasProps) {
  const { menuState, menuRef, openMenu, closeMenu } = useContextMenu()

  // Automatically close context menu if the targeted item was deleted
  useEffect(() => {
    if (menuState.isOpen && menuState.target?.type === 'item') {
      const targetId = menuState.target.item.id
      if (!items.some((it) => it.id === targetId)) {
        closeMenu()
      }
    }
  }, [items, menuState, closeMenu])

  const handleDeleteItem = (id: string) => {
    if (
      menuState.isOpen &&
      menuState.target?.type === 'item' &&
      menuState.target.item.id === id
    ) {
      closeMenu()
    }
    onDeleteItem(id)
  }

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
    onDeleteItem: handleDeleteItem,
    onAddItem,
  })

  const handleCanvasContextMenu = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(
      5,
      Math.min(95, Math.round(((e.clientX - rect.left) / rect.width) * 100)),
    )
    const y = Math.max(
      5,
      Math.min(95, Math.round(((e.clientY - rect.top) / rect.height) * 100)),
    )
    openMenu({ type: 'canvas', coords: { x, y } }, e.clientX, e.clientY)
  }

  const handleItemContextMenu = (item: SpatialItem, e: ReactMouseEvent) => {
    openMenu({ type: 'item', item }, e.clientX, e.clientY)
  }

  const {
    containerRef: viewportRef,
    scale,
    zoomMode,
    toggleZoomMode,
    isMobile,
    scaledHeight,
  } = useVirtualCanvasScale()

  return (
    <div
      ref={viewportRef}
      className={cn(
        'relative w-full transition-all duration-200',
        isMobile && zoomMode === 'full'
          ? 'overflow-x-auto overflow-y-hidden pb-4'
          : 'overflow-visible',
      )}
      style={{
        height:
          isMobile && zoomMode === 'fit' ? `${scaledHeight}px` : undefined,
      }}
    >
      {/* Mobile Floating Zoom Mode Pill */}
      {isMobile && (
        <div className="absolute top-2.5 right-2.5 z-30">
          <CanvasZoomControl
            zoomMode={zoomMode}
            scale={scale}
            onToggle={toggleZoomMode}
          />
        </div>
      )}

      {/* Main Draggable Canvas Stage */}
      <div
        ref={containerRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => onSelectItem(null)}
        onContextMenu={handleCanvasContextMenu}
        style={{
          width: isMobile ? `${VIRTUAL_CANVAS_WIDTH}px` : '100%',
          height: isMobile ? `${VIRTUAL_CANVAS_HEIGHT}px` : undefined,
          transform:
            isMobile && zoomMode === 'fit' ? `scale(${scale})` : undefined,
          transformOrigin: 'top center',
        }}
        className={cn(
          'relative overflow-hidden rounded-3xl border border-black/15 shadow-2xl transition-transform duration-200 dark:border-white/10',
          !isMobile && 'min-h-[580px] w-full sm:min-h-[640px]',
          SURFACE_CLASSES[templateId] ?? 'celebration-table-surface',
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
            onSetRotation={onSetRotation}
            onResetRotation={onResetRotation}
            onBringToFront={onBringToFront}
            onDelete={handleDeleteItem}
            onUpdateData={onUpdateItemData}
            onContextMenu={handleItemContextMenu}
            onOpenPhotoPicker={onOpenPhotoPicker}
          />
        ))}

        {/* Stage Context Menu for Items and Canvas */}
        <StageContextMenu
          state={menuState}
          menuRef={menuRef}
          items={items}
          copiedItem={copiedItem}
          onClose={closeMenu}
          onBringToFront={onBringToFront}
          onSendToBack={onSendToBack || onBringToFront}
          onDuplicate={onDuplicateItem || (() => {})}
          onResetRotation={onResetRotation || (() => {})}
          onToggleLock={onToggleLock || (() => {})}
          onCopyItem={onCopyItem || (() => {})}
          onDelete={handleDeleteItem}
          onUpdateData={onUpdateItemData}
          onChangePhoto={onOpenPhotoPicker}
          onAddItem={(type, x, y) => onAddItem(type, x, y)}
          onPasteItem={(x, y) => onPasteItem?.(x, y)}
          onResetToDefaults={onResetToDefaults || (() => {})}
          onClearCanvas={onClearCanvas || (() => {})}
        />
      </div>
    </div>
  )
}
