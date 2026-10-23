import { useState } from 'react'
import type { DragEvent } from 'react'
import type { SpaceTemplateId } from '@/entities/space'
import type { AudioTrack } from '@/entities/audio'
import type {
  SpatialItem,
  SpatialItemType,
  ToolboxItemDef,
  SpatialItemData,
} from '../model/spatial-stage.types'
import { getToolboxItemsForTemplate } from '../lib/spatial-stage-defaults'
import { cn } from '@/shared/lib'
import { ToolboxHeader } from './toolbox/ToolboxHeader'
import { ObjectsTabContent } from './toolbox/ObjectsTabContent'
import { StickersTabContent } from './toolbox/StickersTabContent'
import { MusicTabContent } from './toolbox/MusicTabContent'
import { useToolboxAssets } from './toolbox/useToolboxAssets'

export interface SpatialToolboxSidebarProps {
  templateId: SpaceTemplateId
  onAddItem: (
    type: SpatialItemType,
    x?: number,
    y?: number,
    defaultData?: Partial<SpatialItemData>,
  ) => void
  onAssignTrack?: (track: AudioTrack) => void
  selectedMusicItem?: SpatialItem | null
  isCompact?: boolean
  className?: string
}

const SIDEBAR_CATEGORY_STORAGE_KEY = 'sfy_spatial_sidebar_category'

export function SpatialToolboxSidebar({
  templateId,
  onAddItem,
  onAssignTrack,
  selectedMusicItem,
  isCompact = false,
  className,
}: SpatialToolboxSidebarProps) {
  const hasMusicOption = Boolean(selectedMusicItem)

  // Navigation: Objects vs Stickers vs Music
  const [activeCategory, setActiveCategory] = useState<
    'objects' | 'stickers' | 'music'
  >('objects')

  // Automatically activate Music when a music object is selected, and return to objects when deselected
  const [prevSelectedMusicItem, setPrevSelectedMusicItem] =
    useState(selectedMusicItem)
  if (selectedMusicItem !== prevSelectedMusicItem) {
    setPrevSelectedMusicItem(selectedMusicItem)
    if (selectedMusicItem) {
      setActiveCategory('music')
    } else if (activeCategory === 'music') {
      setActiveCategory('objects')
    }
  }

  const [searchQuery, setSearchQuery] = useState('')
  const [objectFilter, setObjectFilter] = useState<
    'all' | 'stage' | 'universal'
  >('all')

  const {
    displayedStickers,
    isSearchingStickers,
    setIsSearchingStickers,
    musicTracks,
    isSearchingMusic,
    previewTrackUrl,
    isPreviewPlaying,
    assignedTrackId,
    handleTogglePreview,
    handleAssignTrackToStage,
  } = useToolboxAssets(
    activeCategory,
    searchQuery,
    onAddItem,
    onAssignTrack,
    selectedMusicItem,
  )

  const handleSelectCategory = (cat: 'objects' | 'stickers' | 'music') => {
    setActiveCategory(cat)
    setSearchQuery('')
    try {
      localStorage.setItem(SIDEBAR_CATEGORY_STORAGE_KEY, cat)
    } catch {
      // Ignore storage error
    }
  }

  // Filter Objects by Search & Category Sub-filter
  const rawItems = getToolboxItemsForTemplate(templateId)
  const filteredObjects = rawItems.filter((item) => {
    const matchesCategory =
      objectFilter === 'all' || item.category === objectFilter
    const matchesSearch =
      !searchQuery.trim() ||
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getIconSvgUrl = (iconKey: string) => {
    const [prefix, name] = iconKey.split(':')
    return `https://api.iconify.design/${prefix}/${name}.svg`
  }

  // Drag start handlers
  const handleDragKeepsake = (
    e: DragEvent<HTMLDivElement>,
    item: ToolboxItemDef,
  ) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item))
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleDragSticker = (
    e: DragEvent<HTMLDivElement>,
    sticker: { id: string; name: string },
  ) => {
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

  const handleDragTrack = (e: DragEvent<HTMLDivElement>, track: AudioTrack) => {
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

  return (
    <aside
      className={cn(
        'flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#14110F] text-[#F3EAE1] select-none',
        className,
      )}
    >
      <ToolboxHeader
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={() => {
          setSearchQuery('')
          setIsSearchingStickers(false)
        }}
        objectFilter={objectFilter}
        onSelectObjectFilter={setObjectFilter}
        onSelectStickerChip={(query) => {
          setSearchQuery(query)
          setIsSearchingStickers(true)
        }}
        onSelectMusicChip={(query) => {
          setSearchQuery(query)
        }}
        hasMusicOption={hasMusicOption}
        selectedMusicItemName={selectedMusicItem?.label}
        isCompact={isCompact}
      />

      <div className="min-h-0 flex-1 [scrollbar-width:thin] [scrollbar-color:#3B302A_transparent] overflow-y-auto p-3">
        {activeCategory === 'objects' && (
          <ObjectsTabContent
            items={filteredObjects}
            onAddItem={onAddItem}
            onDragStart={handleDragKeepsake}
          />
        )}

        {activeCategory === 'stickers' && (
          <StickersTabContent
            stickers={displayedStickers}
            isLoading={isSearchingStickers}
            onAddItem={onAddItem}
            onDragStart={handleDragSticker}
            getIconSvgUrl={getIconSvgUrl}
          />
        )}

        {activeCategory === 'music' && (
          <MusicTabContent
            tracks={musicTracks}
            isLoading={isSearchingMusic}
            previewTrackUrl={previewTrackUrl}
            isPreviewPlaying={isPreviewPlaying}
            assignedTrackId={assignedTrackId}
            selectedItemName={selectedMusicItem?.label}
            currentTrackUrl={selectedMusicItem?.data?.audioUrl}
            currentTrackTitle={selectedMusicItem?.data?.title}
            onTogglePreview={handleTogglePreview}
            onAssignTrack={handleAssignTrackToStage}
            onDragStart={handleDragTrack}
          />
        )}
      </div>

      <div className="shrink-0 border-t border-[#3B302A] bg-[#171310] px-3 py-2 text-center font-sans text-[10px] text-[#A99B90]">
        <span>
          {activeCategory === 'music'
            ? 'Click ▶ to preview · Click Use or drag to place'
            : 'Drag onto canvas · Click to add'}
        </span>
      </div>
    </aside>
  )
}
