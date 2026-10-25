import { useState } from 'react'
import type { SpaceTemplateId } from '@/entities/space'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { KeepsakeItemRenderer } from '@/features/create-space/ui/canvas/KeepsakeItemRenderer'
import { StationeryItemRenderer } from '@/features/create-space/ui/canvas/StationeryItemRenderer'
import { EphemeraItemRenderer } from '@/features/create-space/ui/canvas/EphemeraItemRenderer'
import { SpatialStageAtmosphere } from '@/features/create-space/ui/canvas/SpatialStageAtmosphere'
import {
  useVirtualCanvasScale,
  VIRTUAL_CANVAS_WIDTH,
  VIRTUAL_CANVAS_HEIGHT,
} from '@/features/create-space/ui/canvas/useVirtualCanvasScale'
import { PublicPhotoLightbox } from '@/features/create-space/ui/public/PublicPhotoLightbox'
import { cn, playSpatialSfx } from '@/shared/lib'
import '@/features/space-themes/birthday/birthday.css'
import '@/features/space-themes/romantic/romantic.css'
import '@/features/space-themes/friendship/friendship.css'

export interface PublicStageCanvasProps {
  templateId: SpaceTemplateId
  items: SpatialItem[]
  className?: string
}

const SURFACE_CLASSES: Record<SpaceTemplateId, string> = {
  birthday: 'universe-birthday celebration-table-surface',
  anniversary: 'universe-romantic romantic-desk-surface',
  friendship: 'universe-friendship corkboard-surface',
}

const KEEPSAKE_TYPES = new Set([
  'candle',
  'wax-envelope',
  'vinyl-player',
  'cassette-tape',
  'music-box',
])

const EPHEMERA_TYPES = new Set([
  'vector-sticker',
  'rose-petals',
  'washi-tape',
  'confetti-stars',
])

export function PublicStageCanvas({
  templateId,
  items: initialItems,
  className,
}: PublicStageCanvasProps) {
  const [items, setItems] = useState<SpatialItem[]>(initialItems)
  const [activePhoto, setActivePhoto] = useState<SpatialItem | null>(null)
  const { containerRef, scale } = useVirtualCanvasScale()

  const handleUpdateItemData = (
    id: string,
    updates: Partial<SpatialItem['data']>,
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, data: { ...(item.data || {}), ...updates } }
          : item,
      ),
    )
  }

  const handleItemClick = (item: SpatialItem) => {
    if (
      (item.type === 'polaroid' || item.type === 'greeting-card') &&
      item.data?.photoUrl
    ) {
      playSpatialSfx('tactile-tap')
      setActivePhoto(item)
      return
    }

    if (item.type === 'candle') {
      const nextLit = item.data?.isLit === false
      handleUpdateItemData(item.id, { isLit: nextLit })
      playSpatialSfx(nextLit ? 'candle-spark' : 'candle-blow')
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex h-full w-full flex-1 items-center justify-center overflow-hidden select-none',
        className,
      )}
    >
      <div
        style={{
          width: VIRTUAL_CANVAS_WIDTH,
          height: VIRTUAL_CANVAS_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
        className={cn(
          'relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-200 ease-out',
          SURFACE_CLASSES[templateId] ?? 'celebration-table-surface',
        )}
      >
        <SpatialStageAtmosphere
          templateId={templateId}
          isDragOver={false}
          isEmpty={items.length === 0}
          isEditor={false}
        />

        {items.map((item) => {
          const isKeepsake = KEEPSAKE_TYPES.has(item.type)
          const isEphemera = EPHEMERA_TYPES.has(item.type)
          const localText = item.data?.text || item.data?.caption || ''

          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
                zIndex: item.zIndex,
              }}
              className="group absolute cursor-pointer touch-none transition-transform hover:scale-[1.02]"
            >
              {isKeepsake && (
                <KeepsakeItemRenderer
                  item={item}
                  isEditingText={false}
                  localText={localText}
                  onSetLocalText={() => {}}
                  onSaveText={() => {}}
                  onStartEditText={() => {}}
                  onUpdateData={handleUpdateItemData}
                />
              )}

              {isEphemera && <EphemeraItemRenderer item={item} />}

              {!isKeepsake && !isEphemera && (
                <StationeryItemRenderer
                  item={item}
                  isEditingText={false}
                  localText={localText}
                  onSetLocalText={() => {}}
                  onSaveText={() => {}}
                  onStartEditText={() => {}}
                  onOpenPhotoPicker={() => setActivePhoto(item)}
                />
              )}
            </div>
          )
        })}
      </div>

      <PublicPhotoLightbox
        item={activePhoto}
        onClose={() => setActivePhoto(null)}
      />
    </div>
  )
}
