import type { SpaceTemplateId } from '@/entities/space'
import type { SpatialItem, SpatialItemType } from '../model/spatial-stage.types'
import { SpatialCanvasItem } from './SpatialCanvasItem'
import { SpatialStageAtmosphere } from './canvas/SpatialStageAtmosphere'
import { useCanvasDragAndDrop } from './canvas/useCanvasDragAndDrop'
import { cn } from '@/shared/lib'
import '@/features/space-themes/birthday/birthday.css'
import '@/features/space-themes/romantic/romantic.css'
import '@/features/space-themes/friendship/friendship.css'

export interface SpatialStageCanvasProps {
  templateId: SpaceTemplateId
  items: SpatialItem[]
  selectedId: string | null
  onSelectItem: (id: string | null) => void
  onUpdateItemPosition: (id: string, x: number, y: number) => void
  onRotateItem: (id: string, delta: number) => void
  onBringToFront: (id: string) => void
  onDeleteItem: (id: string) => void
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
  onSelectItem,
  onUpdateItemPosition,
  onRotateItem,
  onBringToFront,
  onDeleteItem,
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
        />
      ))}
    </div>
  )
}
