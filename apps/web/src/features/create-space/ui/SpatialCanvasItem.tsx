import { useState, useRef } from 'react'
import type {
  PointerEvent as ReactPointerEvent,
  MouseEvent as ReactMouseEvent,
} from 'react'
import { Lock } from 'lucide-react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { cn, playSpatialSfx } from '@/shared/lib'
import { CanvasItemToolbar } from './canvas/CanvasItemToolbar'
import { RotationHandle } from './canvas/RotationHandle'
import { KeepsakeItemRenderer } from './canvas/KeepsakeItemRenderer'
import { StationeryItemRenderer } from './canvas/StationeryItemRenderer'
import { EphemeraItemRenderer } from './canvas/EphemeraItemRenderer'

export interface SpatialCanvasItemProps {
  item: SpatialItem
  isSelected: boolean
  isDragging: boolean
  onSelect: (id: string) => void
  onStartDrag: (id: string, e: ReactPointerEvent) => void
  onRotate: (id: string, delta: number) => void
  onSetRotation?: (id: string, angle: number) => void
  onResetRotation?: (id: string) => void
  onBringToFront: (id: string) => void
  onDelete: (id: string) => void
  onUpdateData: (id: string, updates: Partial<SpatialItem['data']>) => void
  onContextMenu?: (item: SpatialItem, e: ReactMouseEvent) => void
  onOpenPhotoPicker?: (item: SpatialItem) => void
  onRecordVoiceNote?: (id: string) => void
  isEditorMode?: boolean
}

export function SpatialCanvasItem({
  item,
  isSelected,
  isDragging,
  onSelect,
  onStartDrag,
  onRotate,
  onSetRotation,
  onResetRotation,
  onBringToFront,
  onDelete,
  onUpdateData,
  onContextMenu,
  onOpenPhotoPicker,
  onRecordVoiceNote,
  isEditorMode,
}: SpatialCanvasItemProps) {
  const itemRef = useRef<HTMLDivElement | null>(null)
  const [isEditingText, setIsEditingText] = useState(false)
  const [localText, setLocalText] = useState(
    item.data.caption || item.data.text || '',
  )

  const handleSaveText = () => {
    setIsEditingText(false)
    if (item.type === 'polaroid') {
      onUpdateData(item.id, { caption: localText })
    } else {
      onUpdateData(item.id, { text: localText })
    }
  }

  const isKeepsake =
    item.type === 'candle' ||
    item.type === 'wax-envelope' ||
    item.type === 'vinyl-player' ||
    item.type === 'cassette-tape' ||
    item.type === 'music-box'

  const isEphemera =
    item.type === 'rose-petals' ||
    item.type === 'washi-tape' ||
    item.type === 'confetti-stars' ||
    item.type === 'vector-sticker'

  return (
    <div
      ref={itemRef}
      onPointerDown={(e) => {
        if (!item.isLocked) onStartDrag(item.id, e)
      }}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(item.id)
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
        'group absolute touch-none transition-shadow select-none',
        item.isLocked ? 'cursor-default' : 'cursor-grab',
        isDragging && 'cursor-grabbing opacity-90 shadow-2xl',
        isSelected &&
          'ring-primary/80 ring-offset-bg-surface rounded-2xl ring-2 ring-offset-2',
      )}
    >
      {/* Locked Badge indicator */}
      {item.isLocked && isSelected && (
        <div
          title="Item is locked"
          className="absolute -top-3 -left-3 z-30 flex h-6 w-6 items-center justify-center rounded-full border border-amber-400/60 bg-[#1C1613] text-amber-300 shadow-md backdrop-blur-md"
        >
          <Lock className="h-3 w-3" />
        </div>
      )}

      {/* Tactile Rotation Stem & Knob Handle when selected */}
      {isSelected && !item.isLocked && onSetRotation && (
        <RotationHandle
          itemId={item.id}
          currentRotation={item.rotation}
          itemRef={itemRef}
          onSetRotation={onSetRotation}
        />
      )}

      {/* Micro Floating Toolbar when Item is Selected */}
      {isSelected && (
        <CanvasItemToolbar
          itemId={item.id}
          itemType={item.type}
          currentRotation={item.rotation}
          onRotate={onRotate}
          onResetRotation={onResetRotation}
          onBringToFront={onBringToFront}
          onDelete={onDelete}
          onRecordVoiceNote={onRecordVoiceNote}
        />
      )}

      {/* Render Keepsake Objects (Candle, Envelope, Vinyl, Cassette, Music Box) */}
      {isKeepsake && (
        <KeepsakeItemRenderer
          item={item}
          isEditingText={isEditingText}
          localText={localText}
          onSetLocalText={setLocalText}
          onSaveText={handleSaveText}
          onStartEditText={() => {
            playSpatialSfx('paper-rustle')
            setIsEditingText(true)
          }}
          onUpdateData={onUpdateData}
          onRecordVoiceNote={onRecordVoiceNote}
          isEditorMode={isEditorMode}
        />
      )}

      {/* Render Ephemera Decorative Accents (Stickers, Petals, Tape, Confetti) */}
      {isEphemera && <EphemeraItemRenderer item={item} />}

      {/* Render Editable Stationery (Polaroid, Greeting Card, Airmail Postcard, Sticky Note) */}
      {!isKeepsake && !isEphemera && (
        <StationeryItemRenderer
          item={item}
          isEditingText={isEditingText}
          localText={localText}
          onSetLocalText={setLocalText}
          onSaveText={handleSaveText}
          onStartEditText={() => {
            playSpatialSfx('paper-rustle')
            setIsEditingText(true)
          }}
          onOpenPhotoPicker={onOpenPhotoPicker}
        />
      )}
    </div>
  )
}
