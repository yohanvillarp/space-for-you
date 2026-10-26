import {
  Play,
  Pause,
  Flame,
  FlameKindling,
  PenLine,
  Camera,
} from 'lucide-react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { playSpatialSfx } from '@/shared/lib'
import type { SpatialSfxName } from '@/shared/lib'

export interface ItemSpecimenActionsProps {
  item: SpatialItem
  onClose: () => void
  onUpdateData: (id: string, updates: Partial<SpatialItem['data']>) => void
  onStartEditText?: (item: SpatialItem) => void
  onChangePhoto?: (item: SpatialItem) => void
}

export function ItemSpecimenActions({
  item,
  onClose,
  onUpdateData,
  onStartEditText,
  onChangePhoto,
}: ItemSpecimenActionsProps) {
  const isMusic =
    item.type === 'music-box' ||
    item.type === 'vinyl-player' ||
    item.type === 'vintage-radio' ||
    item.type === 'cassette-tape'
  const isCandle = item.type === 'candle'
  const isPhoto = item.type === 'polaroid'
  const hasText =
    item.type === 'polaroid' ||
    item.type === 'greeting-card' ||
    item.type === 'sticky-note' ||
    item.type === 'airmail-postcard'

  if (
    !isMusic &&
    !isCandle &&
    (!hasText || !onStartEditText) &&
    (!isPhoto || !onChangePhoto)
  ) {
    return null
  }

  const executeAction = (
    action: () => void,
    sfxKey: SpatialSfxName = 'tactile-tap',
  ) => {
    playSpatialSfx(sfxKey)
    action()
    onClose()
  }

  return (
    <>
      {isMusic && (
        <button
          type="button"
          onClick={() =>
            executeAction(() =>
              onUpdateData(item.id, { isPlaying: !item.data.isPlaying }),
            )
          }
          className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-amber-300"
        >
          <div className="flex items-center gap-2">
            {item.data.isPlaying ? (
              <Pause className="h-3.5 w-3.5 text-amber-400" />
            ) : (
              <Play className="h-3.5 w-3.5 text-amber-400" />
            )}
            <span>
              {item.data.isPlaying ? 'Pause Playback' : 'Start Music'}
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#A99B90]">Space</span>
        </button>
      )}

      {isCandle && (
        <button
          type="button"
          onClick={() =>
            executeAction(
              () => onUpdateData(item.id, { isLit: !item.data.isLit }),
              item.data.isLit ? 'candle-blow' : 'candle-spark',
            )
          }
          className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-amber-300"
        >
          <div className="flex items-center gap-2">
            {item.data.isLit ? (
              <FlameKindling className="h-3.5 w-3.5 text-orange-400" />
            ) : (
              <Flame className="h-3.5 w-3.5 text-amber-400" />
            )}
            <span>{item.data.isLit ? 'Blow out Flame' : 'Light Candle'}</span>
          </div>
        </button>
      )}

      {isPhoto && onChangePhoto && (
        <button
          type="button"
          onClick={() =>
            executeAction(() => onChangePhoto(item), 'camera-shutter')
          }
          className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-amber-300"
        >
          <div className="flex items-center gap-2">
            <Camera className="h-3.5 w-3.5 text-amber-400" />
            <span>
              {item.data.photoUrl ? 'Change Photograph' : 'Add Photograph'}
            </span>
          </div>
        </button>
      )}

      {hasText && onStartEditText && (
        <button
          type="button"
          onClick={() =>
            executeAction(() => onStartEditText(item), 'paper-rustle')
          }
          className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[#2A221E] hover:text-amber-300"
        >
          <div className="flex items-center gap-2">
            <PenLine className="h-3.5 w-3.5 text-[#CF7056]" />
            <span>Edit Dedication</span>
          </div>
        </button>
      )}

      <div className="my-0.5 border-t border-[#3B302A]" />
    </>
  )
}
