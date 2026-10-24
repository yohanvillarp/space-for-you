import type { ChangeEvent } from 'react'
import { Search, X, Sparkles, Layers, Disc, Camera } from 'lucide-react'
import { cn, getSearchShortcutLabel } from '@/shared/lib'
import { ToolboxFilterChips } from './ToolboxFilterChips'

export type ToolboxCategory = 'objects' | 'stickers' | 'music' | 'photos'

export interface ToolboxHeaderProps {
  activeCategory: ToolboxCategory
  onSelectCategory: (category: ToolboxCategory) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onClearSearch: () => void
  objectFilter: 'all' | 'stage' | 'universal'
  onSelectObjectFilter: (filter: 'all' | 'stage' | 'universal') => void
  onSelectStickerChip: (query: string) => void
  onSelectMusicChip: (query: string) => void
  hasMusicOption?: boolean
  selectedMusicItemName?: string
  hasPhotoOption?: boolean
  selectedPhotoItemName?: string
  isCompact?: boolean
}

export function ToolboxHeader({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onClearSearch,
  objectFilter,
  onSelectObjectFilter,
  onSelectStickerChip,
  onSelectMusicChip,
  hasMusicOption = false,
  selectedMusicItemName,
  selectedPhotoItemName,
  isCompact = false,
}: ToolboxHeaderProps) {
  const getHeaderTitle = () => {
    switch (activeCategory) {
      case 'photos':
        return selectedPhotoItemName
          ? `Photo for ${selectedPhotoItemName}`
          : 'Photographs'
      case 'music':
        return selectedMusicItemName
          ? `Song for ${selectedMusicItemName}`
          : 'Soundtracks'
      case 'stickers':
        return 'Stickers'
      default:
        return 'Elements'
    }
  }

  const getSearchPlaceholder = () => {
    switch (activeCategory) {
      case 'photos':
        return 'Search web photos (nature, stars, memories)...'
      case 'stickers':
        return 'Search stickers (cake, heart, tape)...'
      case 'music':
        return 'Search songs (artist, title, mood)...'
      default:
        return 'Search keepsakes & decor...'
    }
  }

  return (
    <div className="shrink-0 border-b border-[#3B302A] bg-[#171310]">
      {/* Top Studio Library Title */}
      <div className="flex items-center justify-between border-b border-[#3B302A] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-md border border-[#3B302A] bg-[#2A221E] text-[#CF7056]">
            {activeCategory === 'photos' ? (
              <Camera className="h-3 w-3 text-amber-400" />
            ) : activeCategory === 'music' ? (
              <Disc className="h-3 w-3 text-amber-400" />
            ) : activeCategory === 'stickers' ? (
              <Sparkles className="h-3 w-3 text-[#CF7056]" />
            ) : (
              <Layers className="h-3 w-3 text-[#CF7056]" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-sans text-[9px] font-semibold tracking-widest text-[#A99B90] uppercase">
                Studio Library
              </span>
            </div>
            <h3 className="font-heading mt-0.5 text-sm leading-tight font-medium text-[#F3EAE1]">
              {getHeaderTitle()}
            </h3>
          </div>
        </div>
      </div>

      {/* Search & Category Switcher */}
      <div className="space-y-2.5 p-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="pointer-events-none absolute top-2.5 left-2.5 h-3.5 w-3.5 text-[#A99B90]" />
          <input
            data-search-input
            type="text"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onSearchChange(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                if (searchQuery) onClearSearch()
                else e.currentTarget.blur()
              }
            }}
            placeholder={getSearchPlaceholder()}
            aria-label="Search studio assets"
            className="font-heading w-full rounded-lg border border-[#3B302A] bg-[#211B18] py-2 pr-14 pl-8 text-xs text-[#F3EAE1] placeholder-[#A99B90] transition-all outline-none focus:border-[#CF7056] focus:bg-[#2A221E] focus:ring-1 focus:ring-[#CF7056]"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={onClearSearch}
              aria-label="Clear search"
              className="absolute top-2.5 right-2.5 cursor-pointer text-[#A99B90] hover:text-[#F3EAE1]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute top-2.5 right-2.5 hidden items-center rounded border border-[#3B302A] bg-[#2A221E] px-1.5 py-0.5 font-sans text-[10px] text-[#A99B90] select-none sm:inline-flex">
              {getSearchShortcutLabel()}
            </kbd>
          )}
        </div>

        {/* Category Switcher: Objects vs Photos vs Stickers vs Music */}
        <div
          className={cn(
            'grid gap-1 rounded-lg border border-[#3B302A] bg-[#211B18] p-0.5 font-sans text-xs',
            hasMusicOption ? 'grid-cols-4' : 'grid-cols-3',
          )}
        >
          <button
            type="button"
            onClick={() => onSelectCategory('objects')}
            title="Objects & Keepsakes"
            className={cn(
              'flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-1 py-1.5 text-xs transition-all',
              activeCategory === 'objects'
                ? 'border border-[#3B302A] bg-[#2A221E] font-medium text-[#CF7056] shadow-xs'
                : 'text-[#A99B90] hover:text-[#F3EAE1]',
            )}
          >
            <Layers className="h-3.5 w-3.5 shrink-0" />
            {!isCompact && <span className="truncate">Objects</span>}
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory('photos')}
            title="Keepsake Photographs"
            className={cn(
              'flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-1 py-1.5 text-xs transition-all',
              activeCategory === 'photos'
                ? 'border border-amber-500/40 bg-[#2A221E] font-medium text-amber-400 shadow-xs'
                : 'text-[#A99B90] hover:text-[#F3EAE1]',
            )}
          >
            <Camera className="h-3.5 w-3.5 shrink-0" />
            {!isCompact && <span className="truncate">Photos</span>}
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory('stickers')}
            title="Vector Stickers"
            className={cn(
              'flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-1 py-1.5 text-xs transition-all',
              activeCategory === 'stickers'
                ? 'border border-[#3B302A] bg-[#2A221E] font-medium text-[#CF7056] shadow-xs'
                : 'text-[#A99B90] hover:text-[#F3EAE1]',
            )}
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            {!isCompact && <span className="truncate">Stickers</span>}
          </button>

          {hasMusicOption && (
            <button
              type="button"
              onClick={() => onSelectCategory('music')}
              title="Soundtracks & Music"
              className={cn(
                'animate-fade-in flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-1 py-1.5 text-xs transition-all',
                activeCategory === 'music'
                  ? 'border border-amber-500/40 bg-[#2A221E] font-medium text-amber-400 shadow-xs'
                  : 'text-[#A99B90] hover:text-[#F3EAE1]',
              )}
            >
              <Disc className="h-3.5 w-3.5 shrink-0 animate-spin [animation-duration:8s]" />
              {!isCompact && <span className="truncate">Music</span>}
            </button>
          )}
        </div>

        {/* Secondary Filter Chips Row */}
        <ToolboxFilterChips
          activeCategory={activeCategory}
          objectFilter={objectFilter}
          onSelectObjectFilter={onSelectObjectFilter}
          searchQuery={searchQuery}
          onSelectStickerChip={onSelectStickerChip}
          onSelectMusicChip={onSelectMusicChip}
        />
      </div>
    </div>
  )
}
