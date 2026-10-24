import type { DragEvent } from 'react'
import type { AudioTrack } from '@/entities/audio'
import type {
  SpatialItemType,
  ToolboxItemDef,
} from '../../model/spatial-stage.types'

export function getIconSvgUrl(iconKey: string): string {
  const [prefix, name] = iconKey.split(':')
  return `https://api.iconify.design/${prefix}/${name}.svg`
}

export function handleDragKeepsake(
  e: DragEvent<HTMLDivElement>,
  item: ToolboxItemDef,
): void {
  e.dataTransfer.setData('application/json', JSON.stringify(item))
  e.dataTransfer.effectAllowed = 'copy'
}

export function handleDragSticker(
  e: DragEvent<HTMLDivElement>,
  sticker: { id: string; name: string },
): void {
  const svgUrl = getIconSvgUrl(sticker.id)
  const payload = {
    type: 'vector-sticker' as SpatialItemType,
    label: sticker.name,
    category: 'universal',
    description: 'Decorative SVG sticker element',
    defaultData: { svgUrl, stickerName: sticker.name, title: sticker.name },
  }
  e.dataTransfer.setData('application/json', JSON.stringify(payload))
  e.dataTransfer.effectAllowed = 'copy'
}

export function handleDragTrack(
  e: DragEvent<HTMLDivElement>,
  track: AudioTrack,
): void {
  const payload = {
    type: 'vinyl-player' as SpatialItemType,
    label: track.title,
    category: 'stage',
    description: track.artist,
    defaultData: {
      title: track.title,
      artist: track.artist,
      audioUrl: track.url,
      photoUrl: track.albumArt || track.coverUrl,
      isPlaying: false,
    },
  }
  e.dataTransfer.setData('application/json', JSON.stringify(payload))
  e.dataTransfer.effectAllowed = 'copy'
}
