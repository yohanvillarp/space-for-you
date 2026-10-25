import { useState, useEffect, useMemo } from 'react'
import type { AudioTrack } from '@/entities/audio'
import { CURATED_SOUNDSCAPES, searchItunesTracks } from '@/entities/audio'
import { useSpatialAudioPlayer } from '@/shared/lib'
import type {
  SpatialItem,
  SpatialItemType,
  SpatialItemData,
} from '@/features/create-space/model/spatial-stage.types'

export const INITIAL_POPULAR_STICKERS = [
  { id: 'fluent-emoji-flat:birthday-cake', name: 'Birthday Cake' },
  { id: 'fluent-emoji-flat:party-popper', name: 'Party Popper' },
  { id: 'fluent-emoji-flat:wrapped-gift', name: 'Gift Box' },
  { id: 'fluent-emoji-flat:red-heart', name: 'Red Heart' },
  { id: 'fluent-emoji-flat:sparkling-heart', name: 'Sparkling Heart' },
  { id: 'fluent-emoji-flat:sparkles', name: 'Magic Sparkles' },
  { id: 'fluent-emoji-flat:glowing-star', name: 'Golden Star' },
  { id: 'fluent-emoji-flat:cherry-blossom', name: 'Cherry Blossom' },
  { id: 'fluent-emoji-flat:bouquet', name: 'Flower Bouquet' },
  { id: 'fluent-emoji-flat:musical-notes', name: 'Music Notes' },
  { id: 'fluent-emoji-flat:clinking-glasses', name: 'Champagne' },
  { id: 'fluent-emoji-flat:love-letter', name: 'Love Letter' },
  { id: 'fluent-emoji-flat:camera-with-flash', name: 'Camera' },
  { id: 'fluent-emoji-flat:candle', name: 'Festive Candle' },
  { id: 'fluent-emoji-flat:balloon', name: 'Balloon' },
]

export function useToolboxAssets(
  activeCategory: 'objects' | 'stickers' | 'music' | 'photos',
  searchQuery: string,
  onAddItem: (
    type: SpatialItemType,
    x?: number,
    y?: number,
    defaultData?: Partial<SpatialItemData>,
  ) => void,
  onAssignTrack?: (track: AudioTrack) => void,
  selectedMusicItem?: SpatialItem | null,
) {
  // Vector Stickers State
  const [customStickers, setCustomStickers] = useState<
    { id: string; name: string }[]
  >([])
  const [isSearchingStickers, setIsSearchingStickers] = useState(false)

  // Music State
  const [searchedMusic, setSearchedMusic] = useState<AudioTrack[]>([])
  const [isSearchingMusic, setIsSearchingMusic] = useState(false)
  const [assignedTrackId, setAssignedTrackId] = useState<string | null>(null)

  // Derived assets during render
  const isSearchActive = Boolean(searchQuery.trim())
  const displayedStickers = isSearchActive
    ? customStickers
    : INITIAL_POPULAR_STICKERS

  const musicTracks = useMemo(() => {
    if (isSearchActive) return searchedMusic

    if (selectedMusicItem?.data?.audioUrl && selectedMusicItem.data.title) {
      const exists = CURATED_SOUNDSCAPES.some(
        (t) => t.url === selectedMusicItem.data.audioUrl,
      )
      if (!exists) {
        const activeTrack: AudioTrack = {
          id: `active-${selectedMusicItem.id}`,
          title: selectedMusicItem.data.title,
          artist: selectedMusicItem.data.artist || 'Custom Audio',
          url: selectedMusicItem.data.audioUrl,
          albumArt: selectedMusicItem.data.photoUrl,
          source: 'preset',
          genre: 'Active',
        }
        return [activeTrack, ...CURATED_SOUNDSCAPES]
      }
    }
    return CURATED_SOUNDSCAPES
  }, [isSearchActive, searchedMusic, selectedMusicItem])

  // Audio preview inside sidebar
  const [previewTrackUrl, setPreviewTrackUrl] = useState<string | undefined>(
    undefined,
  )
  const previewPlayer = useSpatialAudioPlayer({
    trackUrl: previewTrackUrl,
    autoPlay: true,
    loop: false,
    onEnded: () => setPreviewTrackUrl(undefined),
  })

  // Debounced search for Vector Stickers
  useEffect(() => {
    if (activeCategory !== 'stickers') return

    const trimmed = searchQuery.trim()
    if (!trimmed) {
      const clearTimer = setTimeout(() => {
        setCustomStickers([])
        setIsSearchingStickers(false)
      }, 0)
      return () => clearTimeout(clearTimer)
    }

    const timer = setTimeout(async () => {
      setIsSearchingStickers(true)
      try {
        const query = encodeURIComponent(trimmed)
        const response = await fetch(
          `https://api.iconify.design/search?query=${query}&limit=24`,
        )
        if (response.ok) {
          const data = (await response.json()) as { icons?: string[] }
          if (data.icons && data.icons.length > 0) {
            const mapped = data.icons.map((id: string) => {
              const parts = id.split(':')
              const namePart = parts[1] || parts[0] || 'Sticker'
              const formattedName = namePart
                .split('-')
                .map(
                  (word: string) =>
                    word.charAt(0).toUpperCase() + word.slice(1),
                )
                .join(' ')
              return { id, name: formattedName }
            })
            setCustomStickers(mapped)
          } else {
            setCustomStickers([])
          }
        }
      } catch {
        // Fallback gracefully
      } finally {
        setIsSearchingStickers(false)
      }
    }, 380)

    return () => clearTimeout(timer)
  }, [searchQuery, activeCategory])

  // Debounced search for Music (iTunes Search API)
  useEffect(() => {
    if (activeCategory !== 'music') return

    const trimmed = searchQuery.trim()
    if (!trimmed) {
      const clearTimer = setTimeout(() => {
        setSearchedMusic([])
        setIsSearchingMusic(false)
      }, 0)
      return () => clearTimeout(clearTimer)
    }

    const controller = new AbortController()

    const timer = setTimeout(async () => {
      setIsSearchingMusic(true)
      try {
        const results = await searchItunesTracks(trimmed)
        if (!controller.signal.aborted) {
          setSearchedMusic(results)
        }
      } catch {
        // Fallback to empty list gracefully
      } finally {
        if (!controller.signal.aborted) {
          setIsSearchingMusic(false)
        }
      }
    }, 420)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [searchQuery, activeCategory])

  const handleTogglePreview = (track: AudioTrack) => {
    if (previewTrackUrl === track.url) {
      previewPlayer.togglePlay()
    } else {
      setPreviewTrackUrl(track.url)
    }
  }

  const handleAssignTrackToStage = (track: AudioTrack) => {
    setAssignedTrackId(track.id)
    if (onAssignTrack) {
      onAssignTrack(track)
    } else {
      onAddItem('vinyl-player', undefined, undefined, {
        title: track.title,
        artist: track.artist,
        audioUrl: track.url,
        photoUrl: track.albumArt || track.coverUrl,
        isPlaying: false,
      })
    }
    setTimeout(() => setAssignedTrackId(null), 2000)
  }

  return {
    displayedStickers,
    isSearchingStickers,
    setIsSearchingStickers,
    musicTracks,
    isSearchingMusic,
    setIsSearchingMusic,
    previewTrackUrl,
    isPreviewPlaying: previewPlayer.isPlaying,
    assignedTrackId,
    handleTogglePreview,
    handleAssignTrackToStage,
  }
}
