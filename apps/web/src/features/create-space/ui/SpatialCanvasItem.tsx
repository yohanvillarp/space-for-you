import { useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import type { SpatialItem } from '../model/spatial-stage.types'
import { cn, playSpatialSfx } from '@/shared/lib'
import { CanvasItemToolbar } from './canvas/CanvasItemToolbar'
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
  onBringToFront: (id: string) => void
  onDelete: (id: string) => void
  onUpdateData: (id: string, updates: Partial<SpatialItem['data']>) => void
}

export function SpatialCanvasItem({
  item,
  isSelected,
  isDragging,
  onSelect,
  onStartDrag,
  onRotate,
  onBringToFront,
  onDelete,
  onUpdateData,
}: SpatialCanvasItemProps) {
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
      onPointerDown={(e) => onStartDrag(item.id, e)}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(item.id)
      }}
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
        zIndex: item.zIndex,
      }}
      className={cn(
        'group absolute cursor-grab touch-none transition-shadow select-none',
        isDragging && 'cursor-grabbing opacity-90 shadow-2xl',
        isSelected &&
          'ring-primary/80 ring-offset-bg-surface rounded-2xl ring-2 ring-offset-2',
      )}
    >
      {/* Micro Floating Toolbar when Item is Selected */}
      {isSelected && (
        <CanvasItemToolbar
          itemId={item.id}
          onRotate={onRotate}
          onBringToFront={onBringToFront}
          onDelete={onDelete}
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
        />
      )}
    </div>
  )
}
