import { useState, useEffect } from 'react'
import type { SpaceTemplateId } from '@/entities/space'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { KeepsakeItemRenderer } from '@/features/create-space/ui/canvas/KeepsakeItemRenderer'
import { StationeryItemRenderer } from '@/features/create-space/ui/canvas/StationeryItemRenderer'
import { EphemeraItemRenderer } from '@/features/create-space/ui/canvas/EphemeraItemRenderer'
import { SpatialStageAtmosphere } from '@/features/create-space/ui/canvas/SpatialStageAtmosphere'
import { useVirtualCanvasScale } from '@/features/create-space/ui/canvas/useVirtualCanvasScale'
import { ScaledStageFrame } from '@/features/create-space/ui/canvas/ScaledStageFrame'
import { CanvasOrientationPrompt } from '@/features/create-space/ui/canvas/CanvasOrientationPrompt'
import { PublicPhotoLightbox } from '@/features/create-space/ui/public/PublicPhotoLightbox'
import { PublicCardReaderModal } from '@/features/create-space/ui/public/PublicCardReaderModal'
import { filterPublicItems } from '@/features/create-space/lib/stage-public-filter'
import { cn, playSpatialSfx } from '@/shared/lib'
import '@/features/space-themes/birthday/birthday.css'
import '@/features/space-themes/romantic/romantic.css'
import '@/features/space-themes/friendship/friendship.css'

export interface PublicStageCanvasProps {
  templateId: SpaceTemplateId
  items: SpatialItem[]
  onVirtualLandscapeChange?: (isRotated: boolean) => void
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
  'vintage-radio',
  'cassette-tape',
  'music-box',
])

const EPHEMERA_TYPES = new Set([
  'vector-sticker',
  'rose-petals',
  'washi-tape',
  'confetti-stars',
])

const TEXT_READER_TYPES = new Set([
  'greeting-card',
  'airmail-postcard',
  'sticky-note',
  'wax-envelope',
])

export function PublicStageCanvas({
  templateId,
  items: initialItems,
  onVirtualLandscapeChange,
  className,
}: PublicStageCanvasProps) {
  const [prevInitialItems, setPrevInitialItems] = useState(initialItems)
  const [items, setItems] = useState<SpatialItem[]>(() =>
    filterPublicItems(initialItems),
  )

  if (prevInitialItems !== initialItems) {
    setPrevInitialItems(initialItems)
    setItems(filterPublicItems(initialItems))
  }

  const [activePhoto, setActivePhoto] = useState<SpatialItem | null>(null)
  const [activeCard, setActiveCard] = useState<SpatialItem | null>(null)

  const {
    containerRef,
    scale,
    isMobile,
    isPortrait,
    isRotated,
    toggleVirtualLandscape,
  } = useVirtualCanvasScale({ insetX: 8, insetY: 8 })

  useEffect(() => {
    onVirtualLandscapeChange?.(isRotated)
    return () => onVirtualLandscapeChange?.(false)
  }, [isRotated, onVirtualLandscapeChange])

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
      return
    }

    if (TEXT_READER_TYPES.has(item.type) && item.data?.text) {
      if (item.type === 'wax-envelope' && item.data?.isSealed) return
      playSpatialSfx('tactile-tap')
      setActiveCard(item)
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex h-full w-full flex-1 items-center justify-center overflow-hidden select-none',
        isRotated ? 'p-1 pb-2' : 'p-2 pb-16 sm:p-4 sm:pb-16 lg:p-6 lg:pb-16',
        className,
      )}
    >
      <CanvasOrientationPrompt
        isMobile={isMobile}
        isPortrait={isPortrait}
        isVirtualLandscape={isRotated}
        onToggleVirtualLandscape={toggleVirtualLandscape}
      />

      <ScaledStageFrame
        scale={scale}
        rotated={isRotated}
        className={cn(
          'rounded-3xl border border-black/15 shadow-2xl transition-colors duration-300 dark:border-white/10',
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
                  onUpdateData={handleUpdateItemData}
                  isEditorMode={false}
                />
              )}

              {isEphemera && <EphemeraItemRenderer item={item} />}

              {!isKeepsake && !isEphemera && (
                <StationeryItemRenderer
                  item={item}
                  onOpenPhotoPicker={() => setActivePhoto(item)}
                  isEditorMode={false}
                />
              )}
            </div>
          )
        })}
      </ScaledStageFrame>

      <PublicPhotoLightbox
        item={activePhoto}
        isRotated={isRotated}
        onClose={() => setActivePhoto(null)}
      />

      <PublicCardReaderModal
        item={activeCard}
        isRotated={isRotated}
        onClose={() => setActiveCard(null)}
      />
    </div>
  )
}
