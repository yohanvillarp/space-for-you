import type { SpaceTemplateId } from '@/entities/space'
import type {
  SpatialItem,
  SpatialItemType,
  SpatialItemData,
} from '@/features/create-space/model/spatial-stage.types'

export interface SpatialStageCanvasProps {
  templateId: SpaceTemplateId
  items: SpatialItem[]
  selectedId: string | null
  copiedItem?: SpatialItem | null
  onSelectItem: (id: string | null) => void
  onUpdateItemPosition: (id: string, x: number, y: number) => void
  onStartDragItem?: (id: string) => void
  onCommitItemPosition?: () => void
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
  onUpdateItemData: (id: string, updates: Partial<SpatialItemData>) => void
  onAddItem: (
    type: SpatialItemType,
    x?: number,
    y?: number,
    customData?: Partial<SpatialItemData>,
  ) => void
  onOpenPhotoPicker?: (item: SpatialItem) => void
  fitToHeight?: boolean
  className?: string
}
