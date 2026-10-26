import { useRef } from 'react'
import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from 'react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { CanvasItemToolbar } from './canvas/CanvasItemToolbar'
import { KeepsakeItemRenderer } from './canvas/KeepsakeItemRenderer'
import { StationeryItemRenderer } from './canvas/StationeryItemRenderer'
import { EphemeraItemRenderer } from './canvas/EphemeraItemRenderer'
import { cn } from '@/shared/lib'

export interface SpatialCanvasItemProps {
  item: SpatialItem
  isSelected: boolean
  isDragging: boolean
  onSelect: (id: string) => void
  onStartDrag: (id: string, e: ReactPointerEvent) => void
  onRotate: (id: string, delta: number) => void
  onResetRotation?: (id: string) => void
  onBringToFront: (id: string) => void
  onDelete: (id: string) => void
  onUpdateData: (id: string, data: Partial<SpatialItem['data']>) => void
  onContextMenu?: (item: SpatialItem, e: ReactMouseEvent) => void
  onOpenPhotoPicker?: (item: SpatialItem) => void
  onRecordVoiceNote?: (id: string) => void
  onStartEditText?: (item: SpatialItem) => void
  isEditorMode?: boolean
}

export function SpatialCanvasItem({
  item,
  isSelected,
  isDragging,
  onSelect,
  onStartDrag,
  onRotate,
  onResetRotation,
  onBringToFront,
  onDelete,
  onUpdateData,
  onContextMenu,
  onOpenPhotoPicker,
  onRecordVoiceNote,
  onStartEditText,
  isEditorMode,
}: SpatialCanvasItemProps) {
  const itemRef = useRef<HTMLDivElement | null>(null)

  const isKeepsake =
    item.type === 'candle' ||
    item.type === 'wax-envelope' ||
    item.type === 'vinyl-player' ||
    item.type === 'cassette-tape' ||
    item.type === 'music-box' ||
    item.type === 'vintage-radio'

  const isEphemera =
    item.type === 'rose-petals' ||
    item.type === 'washi-tape' ||
    item.type === 'confetti-stars' ||
    item.type === 'vector-sticker'

  const isMusicOrPhoto =
    item.type === 'polaroid' ||
    item.type === 'music-box' ||
    item.type === 'vinyl-player' ||
    item.type === 'cassette-tape' ||
    item.type === 'vintage-radio'

  return (
    <div
      ref={itemRef}
      onPointerDown={(e: ReactPointerEvent) => {
        if (!item.isLocked && isEditorMode) {
          onStartDrag(item.id, e)
        }
      }}
      onClick={(e: ReactMouseEvent) => {
        e.stopPropagation()
        onSelect(item.id)
      }}
      onDoubleClick={(e) => {
        if (isEditorMode && onStartEditText) {
          e.stopPropagation()
          onStartEditText(item)
        }
      }}
      onContextMenu={(e: ReactMouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onSelect(item.id)
        onContextMenu?.(item, e)
      }}
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
        zIndex: item.zIndex,
      }}
      className={cn(
        'group absolute transition-shadow select-none',
        isEditorMode && !item.isLocked && 'cursor-grab active:cursor-grabbing',
        isDragging && 'opacity-60 shadow-2xl',
        isSelected &&
          isEditorMode &&
          'ring-primary/80 ring-offset-background/80 rounded-lg ring-2 ring-offset-2',
        isSelected && isEditorMode && isMusicOrPhoto && 'animate-pulse-twice',
        item.isLocked && isEditorMode && 'cursor-not-allowed opacity-90',
      )}
    >
      {isSelected && isEditorMode && (
        <CanvasItemToolbar
          itemId={item.id}
          itemType={item.type}
          currentRotation={item.rotation}
          onRotate={onRotate}
          onResetRotation={onResetRotation}
          onBringToFront={onBringToFront}
          onDelete={onDelete}
          onRecordVoiceNote={onRecordVoiceNote}
          onStartEditText={
            onStartEditText ? () => onStartEditText(item) : undefined
          }
        />
      )}

      {isKeepsake && (
        <KeepsakeItemRenderer
          item={item}
          onStartEditText={
            onStartEditText ? () => onStartEditText(item) : undefined
          }
          onUpdateData={onUpdateData}
          onRecordVoiceNote={onRecordVoiceNote}
          isEditorMode={isEditorMode}
        />
      )}

      {isEphemera && <EphemeraItemRenderer item={item} />}

      {!isKeepsake && !isEphemera && (
        <StationeryItemRenderer
          item={item}
          onStartEditText={
            onStartEditText ? () => onStartEditText(item) : undefined
          }
          onOpenPhotoPicker={onOpenPhotoPicker}
          isEditorMode={isEditorMode}
        />
      )}
    </div>
  )
}
