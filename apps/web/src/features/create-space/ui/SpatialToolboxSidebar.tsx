import { useState } from 'react'
import type { SpaceTemplateId } from '@/entities/space'
import type { AudioTrack } from '@/entities/audio'
import type {
  SpatialItem,
  SpatialItemType,
  SpatialItemData,
} from '@/features/create-space/model/spatial-stage.types'
import { getToolboxItemsForTemplate } from '@/features/create-space/lib/spatial-stage-defaults'
import { cn } from '@/shared/lib'
import { ToolboxHeader } from './toolbox/ToolboxHeader'
import type { ToolboxCategory } from './toolbox/ToolboxHeader'
import { ObjectsTabContent } from './toolbox/ObjectsTabContent'
import { StickersTabContent } from './toolbox/StickersTabContent'
import { MusicTabContent } from './toolbox/MusicTabContent'
import { PhotosTabContent } from './toolbox/PhotosTabContent'
import { useToolboxAssets } from './toolbox/useToolboxAssets'
import {
  handleDragKeepsake,
  handleDragSticker,
  handleDragTrack,
  getIconSvgUrl,
} from './toolbox/toolboxDragPayloads'

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
  selectedPhotoItem?: SpatialItem | null
  onAssignPhoto?: (photoUrl: string, file?: File) => void
  photoCount?: number
  uploadedPhotoCount?: number
  isCompact?: boolean
  className?: string
}

const SIDEBAR_CATEGORY_STORAGE_KEY = 'sfy_spatial_sidebar_category'

export function SpatialToolboxSidebar({
  templateId,
  onAddItem,
  onAssignTrack,
  selectedMusicItem,
  selectedPhotoItem,
  onAssignPhoto,
  photoCount = 0,
  uploadedPhotoCount = 0,
  isCompact = false,
  className,
}: SpatialToolboxSidebarProps) {
  const hasMusicOption = Boolean(selectedMusicItem)
  const hasPhotoOption = Boolean(selectedPhotoItem) || photoCount > 0

  const [activeCategory, setActiveCategory] =
    useState<ToolboxCategory>('objects')
  const [searchQuery, setSearchQuery] = useState('')
  const [objectFilter, setObjectFilter] = useState<
    'all' | 'stage' | 'universal'
  >('all')
  const [isSidebarPulsing, setIsSidebarPulsing] = useState(false)

  // Auto-switch to Music when a music item is selected
  const [prevSelectedMusicItem, setPrevSelectedMusicItem] =
    useState(selectedMusicItem)
  if (selectedMusicItem !== prevSelectedMusicItem) {
    setPrevSelectedMusicItem(selectedMusicItem)
    setSearchQuery('')
    if (selectedMusicItem) {
      setActiveCategory('music')
      setIsSidebarPulsing(true)
      setTimeout(() => setIsSidebarPulsing(false), 2400)
    } else if (activeCategory === 'music') {
      setActiveCategory('objects')
    }
  }

  // Auto-switch to Photos when a Polaroid item is selected
  const [prevSelectedPhotoItem, setPrevSelectedPhotoItem] =
    useState(selectedPhotoItem)
  if (selectedPhotoItem !== prevSelectedPhotoItem) {
    setPrevSelectedPhotoItem(selectedPhotoItem)
    setSearchQuery('')
    if (selectedPhotoItem) {
      setActiveCategory('photos')
      setIsSidebarPulsing(true)
      setTimeout(() => setIsSidebarPulsing(false), 2400)
    } else if (activeCategory === 'photos') {
      setActiveCategory('objects')
    }
  }

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

  const handleSelectCategory = (cat: ToolboxCategory) => {
    setActiveCategory(cat)
    setSearchQuery('')
    try {
      localStorage.setItem(SIDEBAR_CATEGORY_STORAGE_KEY, cat)
    } catch {
      // Ignore storage error
    }
  }

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

  return (
    <aside
      className={cn(
        'flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#14110F] text-[#F3EAE1] transition-all select-none',
        isSidebarPulsing && 'animate-pulse-twice ring-2 ring-amber-400/90',
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
          setSearchQuery((prev) => (prev === query ? '' : query))
          setIsSearchingStickers(true)
        }}
        onSelectMusicChip={(query) => {
          setSearchQuery((prev) => (prev === query ? '' : query))
        }}
        hasMusicOption={hasMusicOption}
        selectedMusicItemName={selectedMusicItem?.label}
        hasPhotoOption={hasPhotoOption}
        selectedPhotoItemName={selectedPhotoItem?.label}
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

        {activeCategory === 'photos' && (
          <PhotosTabContent
            selectedItemName={selectedPhotoItem?.label}
            currentPhotoUrl={selectedPhotoItem?.data?.photoUrl}
            photoCount={photoCount}
            uploadedPhotoCount={uploadedPhotoCount}
            isPolaroidSelected={Boolean(selectedPhotoItem)}
            onAssignPhoto={(url, file) => onAssignPhoto?.(url, file)}
            onAddPolaroidWithPhoto={(url) => {
              onAddItem('polaroid', undefined, undefined, { photoUrl: url })
            }}
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

      <div className="shrink-0 space-y-0.5 border-t border-[#3B302A] bg-[#171310] px-3 py-1.5 text-center font-sans text-[10px] text-[#A99B90]">
        <p>
          {activeCategory === 'photos'
            ? selectedPhotoItem
              ? 'Click or upload to replace photo for selected frame'
              : 'Click or upload photo to place a Polaroid'
            : activeCategory === 'music'
              ? 'Click ▶ to preview · Click Use or drag to place'
              : 'Drag onto canvas · Click to add'}
        </p>
        <p className="text-[9px] text-[#786C64]">
          {activeCategory === 'photos'
            ? 'Photos powered by Pexels & Unsplash'
            : activeCategory === 'music'
              ? '30s previews via Apple Music API'
              : activeCategory === 'stickers'
                ? 'Stickers powered by Iconify'
                : 'Interactive keepsakes'}
        </p>
      </div>
    </aside>
  )
}
