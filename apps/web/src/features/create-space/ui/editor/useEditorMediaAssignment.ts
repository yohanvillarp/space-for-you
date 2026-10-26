import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import type { AudioTrack } from '@/entities/audio'

export interface UseEditorMediaAssignmentProps {
  items: SpatialItem[]
  selectedId: string | null
  onUpdateItemData: (id: string, data: Partial<SpatialItem['data']>) => void
  onAssignItemPhoto: (id: string, photoUrl: string, file?: File) => void
}

export function useEditorMediaAssignment({
  items,
  selectedId,
  onUpdateItemData,
  onAssignItemPhoto,
}: UseEditorMediaAssignmentProps) {
  const selectedItem = items.find((it) => it.id === selectedId)
  const isMusic = ['music-box', 'vinyl-player', 'vintage-radio'].includes(
    selectedItem?.type || '',
  )
  const selectedMusicItem = isMusic ? selectedItem : null
  const selectedPhotoItem =
    selectedItem?.type === 'polaroid' ? selectedItem : null

  const handleAssignTrack = (track: AudioTrack) => {
    const target =
      selectedMusicItem ||
      items.find((it) =>
        ['music-box', 'vinyl-player', 'vintage-radio'].includes(it.type),
      )
    if (target) {
      onUpdateItemData(target.id, {
        title: track.title,
        artist: track.artist,
        audioUrl: track.url,
        photoUrl: track.albumArt || track.coverUrl,
      })
    }
  }

  const handleAssignPhoto = (photoUrl: string, file?: File) => {
    const target =
      selectedPhotoItem || items.find((it) => it.type === 'polaroid')
    if (target) onAssignItemPhoto(target.id, photoUrl, file)
  }

  return {
    selectedItem,
    selectedMusicItem,
    selectedPhotoItem,
    handleAssignTrack,
    handleAssignPhoto,
  }
}
