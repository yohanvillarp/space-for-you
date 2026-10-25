import { useEffect, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import type { SpaceTemplateId } from '@/entities/space'
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
import { useStudioBehavior } from './editor/useStudioBehavior'
import { VoiceNoteRecorderModal } from './canvas/inspector/VoiceNoteRecorderModal'
import { countSpaceVoiceNotes } from '@/features/create-space/lib/voice-recorder/voice-note-types'
import type { SpatialStageCanvasProps } from './canvas/spatial-stage-canvas.types'
import { cn } from '@/shared/lib'
import '@/features/space-themes/birthday/birthday.css'
import '@/features/space-themes/romantic/romantic.css'
import '@/features/space-themes/friendship/friendship.css'

export type { SpatialStageCanvasProps }

const SURFACE_CLASSES: Record<SpaceTemplateId, string> = {
  birthday: 'universe-birthday celebration-table-surface',
  anniversary: 'universe-romantic romantic-desk-surface',
  friendship: 'universe-friendship corkboard-surface',
}

export function SpatialStageCanvas(props: SpatialStageCanvasProps) {
  const {
    templateId,
    items,
    selectedId,
    copiedItem = null,
    onSelectItem,
    onUpdateItemPosition,
    onStartDragItem,
    onCommitItemPosition,
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
  } = props

  const { isEditorMode } = useStudioBehavior()
  const { menuState, menuRef, openMenu, closeMenu } = useContextMenu()
  const [recordingCassetteId, setRecordingCassetteId] = useState<string | null>(
    null,
  )

  useEffect(() => {
    if (menuState.isOpen && menuState.target?.type === 'item') {
      const targetItem = menuState.target.item
      if (!items.some((it) => it.id === targetItem.id)) closeMenu()
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
    onStartDragItem,
    onCommitItemPosition,
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

  const {
    containerRef: viewportRef,
    scale,
    zoomMode,
    toggleZoomMode,
    isMobile,
    scaledHeight,
  } = useVirtualCanvasScale()

  const targetCassette = items.find((it) => it.id === recordingCassetteId)
  const voiceNotesCount = countSpaceVoiceNotes(items)

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
      {isMobile && (
        <div className="absolute top-2.5 right-2.5 z-30">
          <CanvasZoomControl
            zoomMode={zoomMode}
            scale={scale}
            onToggle={toggleZoomMode}
          />
        </div>
      )}

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
          isEditor={isEditorMode}
        />

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
            onContextMenu={(it, e) =>
              openMenu({ type: 'item', item: it }, e.clientX, e.clientY)
            }
            onOpenPhotoPicker={onOpenPhotoPicker}
            onRecordVoiceNote={
              isEditorMode ? (id) => setRecordingCassetteId(id) : undefined
            }
            isEditorMode={isEditorMode}
          />
        ))}

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

      {recordingCassetteId && (
        <VoiceNoteRecorderModal
          isOpen={Boolean(recordingCassetteId)}
          onClose={() => setRecordingCassetteId(null)}
          currentVoiceNotesCount={voiceNotesCount}
          initialLabel={targetCassette?.data?.title || 'Personal Voice Message'}
          onSaveVoiceNote={(audioUrl, durationSeconds, label) => {
            onUpdateItemData(recordingCassetteId, {
              audioUrl,
              duration: durationSeconds,
              title: label,
              isVoiceNote: true,
              isVoiceNoteSample: false,
            })
            setRecordingCassetteId(null)
          }}
        />
      )}
    </div>
  )
}
