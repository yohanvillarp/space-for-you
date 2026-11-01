import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { FireflyJarItem } from './sensory/FireflyJarItem'
import { MiniDictaphoneItem } from './sensory/MiniDictaphoneItem'
import { PressedHerbariumItem } from './sensory/PressedHerbariumItem'
import { WoodWickCandleItem } from './sensory/WoodWickCandleItem'
import { StardustHourglassItem } from './sensory/StardustHourglassItem'
import { VintageCameraItem } from './sensory/VintageCameraItem'
import { KeepsakeTicketItem } from './sensory/KeepsakeTicketItem'
import { AntiqueLocketItem } from './sensory/AntiqueLocketItem'

export interface SensoryItemRendererProps {
  item: SpatialItem
  onUpdateData?: (id: string, data: Partial<SpatialItem['data']>) => void
  isEditorMode?: boolean
}

export function SensoryItemRenderer({
  item,
  onUpdateData,
  isEditorMode,
}: SensoryItemRendererProps) {
  switch (item.type) {
    case 'firefly-jar':
      return (
        <FireflyJarItem
          item={item}
          onUpdateData={onUpdateData}
          isEditorMode={isEditorMode}
        />
      )

    case 'mini-dictaphone':
      return (
        <MiniDictaphoneItem
          item={item}
          onUpdateData={onUpdateData}
          isEditorMode={isEditorMode}
        />
      )

    case 'pressed-herbarium':
      return (
        <PressedHerbariumItem
          item={item}
          onUpdateData={onUpdateData}
          isEditorMode={isEditorMode}
        />
      )

    case 'wood-wick-candle':
      return (
        <WoodWickCandleItem
          item={item}
          onUpdateData={onUpdateData}
          isEditorMode={isEditorMode}
        />
      )

    case 'stardust-hourglass':
      return (
        <StardustHourglassItem
          item={item}
          onUpdateData={onUpdateData}
          isEditorMode={isEditorMode}
        />
      )

    case 'vintage-camera':
      return (
        <VintageCameraItem
          item={item}
          onUpdateData={onUpdateData}
          isEditorMode={isEditorMode}
        />
      )

    case 'keepsake-ticket':
      return (
        <KeepsakeTicketItem
          item={item}
          onUpdateData={onUpdateData}
          isEditorMode={isEditorMode}
        />
      )

    case 'antique-locket':
      return (
        <AntiqueLocketItem
          item={item}
          onUpdateData={onUpdateData}
          isEditorMode={isEditorMode}
        />
      )

    default:
      return null
  }
}
