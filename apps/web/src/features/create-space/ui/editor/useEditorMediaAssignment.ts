import { useEffect, useState } from 'react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import type { AudioTrack } from '@/entities/audio'

const MUSIC_ITEM_TYPES = [
  'music-box',
  'vinyl-player',
  'vintage-radio',
  'cassette-tape',
]

export interface UseEditorMediaAssignmentProps {
  items: SpatialItem[]
  selectedId: string | null
  onUpdateItemData: (id: string, data: Partial<SpatialItem['data']>) => void
  onAssignItemPhoto: (id: string, photoUrl: string, file?: File) => void
  onOpenSidebar?: () => void
}

export function useEditorMediaAssignment({
  items,
  selectedId,
  onUpdateItemData,
  onAssignItemPhoto,
  onOpenSidebar,
}: UseEditorMediaAssignmentProps) {
  const [prevSelectedStageId, setPrevSelectedStageId] = useState<string | null>(
    null,
  )
  const [isSidebarPulsing, setIsSidebarPulsing] = useState(false)

  const selectedItem = items.find((it) => it.id === selectedId)
  const isMusic = MUSIC_ITEM_TYPES.includes(selectedItem?.type || '')
  const selectedMusicItem = isMusic ? selectedItem : null
  const selectedPhotoItem =
    selectedItem?.type === 'polaroid' ? selectedItem : null

  // Trigger pulse ONLY when the user initially selects a photo/music item on stage
  if (selectedId !== prevSelectedStageId) {
    setPrevSelectedStageId(selectedId)
    if (selectedId && (selectedPhotoItem || selectedMusicItem)) {
      setIsSidebarPulsing(true)
    }
  }

  useEffect(() => {
    if (isSidebarPulsing) {
      onOpenSidebar?.()
      const timer = setTimeout(() => setIsSidebarPulsing(false), 2400)
      return () => clearTimeout(timer)
    }
  }, [isSidebarPulsing, onOpenSidebar])

  const handleAssignTrack = (track: AudioTrack) => {
    const target =
      selectedMusicItem ||
      items.find((it) => MUSIC_ITEM_TYPES.includes(it.type))
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
    isSidebarPulsing,
    handleAssignTrack,
    handleAssignPhoto,
  }
}
