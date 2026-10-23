import type { ChangeEvent } from 'react'
import { Search, X, Sparkles, Layers, Disc } from 'lucide-react'
import { cn } from '@/shared/lib'

import { STICKER_CHIPS, MUSIC_CHIPS } from './toolbox-chips'

export interface ToolboxHeaderProps {
  activeCategory: 'objects' | 'stickers' | 'music'
  onSelectCategory: (category: 'objects' | 'stickers' | 'music') => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onClearSearch: () => void
  objectFilter: 'all' | 'stage' | 'universal'
  onSelectObjectFilter: (filter: 'all' | 'stage' | 'universal') => void
  onSelectStickerChip: (query: string) => void
  onSelectMusicChip: (query: string) => void
  hasMusicOption?: boolean
  selectedMusicItemName?: string
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
  isCompact = false,
}: ToolboxHeaderProps) {
  return (
    <div className="shrink-0 border-b border-[#3B302A] bg-[#171310]">
      {/* Top Studio Library Title */}
      <div className="flex items-center justify-between border-b border-[#3B302A] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-md border border-[#3B302A] bg-[#2A221E] text-[#CF7056]">
            {activeCategory === 'music' ? (
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
              {activeCategory === 'objects'
                ? 'Elements'
                : activeCategory === 'stickers'
                  ? 'Stickers'
                  : selectedMusicItemName
                    ? `Song for ${selectedMusicItemName}`
                    : 'Soundtracks'}
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
            type="text"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onSearchChange(e.target.value)
            }
            placeholder={
              activeCategory === 'objects'
                ? 'Search keepsake elements...'
                : activeCategory === 'stickers'
                  ? 'Search vector stickers...'
                  : 'Search any song or artist...'
            }
            className="w-full rounded-lg border border-[#3B302A] bg-[#211B18] py-1.5 pr-7 pl-8 font-sans text-xs text-[#F3EAE1] transition-colors outline-none placeholder:text-[#A99B90]/60 focus:border-[#CF7056] focus:ring-1 focus:ring-[#CF7056]/30"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={onClearSearch}
              title="Clear search"
              className="absolute top-2 right-2 cursor-pointer p-0.5 text-[#A99B90] hover:text-[#F3EAE1]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Category Switcher: Objects vs Stickers vs Music (conditional) */}
        <div
          className={cn(
            'grid gap-1 rounded-lg border border-[#3B302A] bg-[#211B18] p-0.5 font-sans text-xs',
            hasMusicOption ? 'grid-cols-3' : 'grid-cols-2',
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

        {/* Secondary Filter Chips Row for Objects */}
        {activeCategory === 'objects' && (
          <div className="flex items-center gap-1 pt-0.5">
            <button
              type="button"
              onClick={() => onSelectObjectFilter('all')}
              className={cn(
                'flex-1 cursor-pointer rounded-full border px-2 py-0.5 text-center font-sans text-[10px] font-medium transition-colors',
                objectFilter === 'all'
                  ? 'border-[#CF7056] bg-[#CF7056] font-semibold text-[#14110F]'
                  : 'border-[#3B302A] bg-[#211B18] text-[#A99B90] hover:text-[#F3EAE1]',
              )}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => onSelectObjectFilter('stage')}
              className={cn(
                'flex-1 cursor-pointer truncate rounded-full border px-2 py-0.5 text-center font-sans text-[10px] font-medium transition-colors',
                objectFilter === 'stage'
                  ? 'border-[#CF7056] bg-[#CF7056] font-semibold text-[#14110F]'
                  : 'border-[#3B302A] bg-[#211B18] text-[#A99B90] hover:text-[#F3EAE1]',
              )}
            >
              Setting
            </button>
            <button
              type="button"
              onClick={() => onSelectObjectFilter('universal')}
              className={cn(
                'flex-1 cursor-pointer rounded-full border px-2 py-0.5 text-center font-sans text-[10px] font-medium transition-colors',
                objectFilter === 'universal'
                  ? 'border-[#CF7056] bg-[#CF7056] font-semibold text-[#14110F]'
                  : 'border-[#3B302A] bg-[#211B18] text-[#A99B90] hover:text-[#F3EAE1]',
              )}
            >
              Universal
            </button>
          </div>
        )}

        {/* Secondary Filter Chips Row for Stickers */}
        {activeCategory === 'stickers' && (
          <div className="flex [scrollbar-width:none] flex-wrap items-center gap-1 pt-0.5 [&::-webkit-scrollbar]:hidden">
            {STICKER_CHIPS.map((chip) => (
              <button
                key={chip.query}
                type="button"
                onClick={() => onSelectStickerChip(chip.query)}
                className={cn(
                  'shrink-0 cursor-pointer rounded-full border px-2 py-0.5 font-sans text-[10px] font-medium transition-colors',
                  searchQuery === chip.query
                    ? 'border-[#CF7056] bg-[#CF7056] font-semibold text-[#14110F]'
                    : 'border-[#3B302A] bg-[#211B18] text-[#A99B90] hover:text-[#F3EAE1]',
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}

        {/* Secondary Filter Chips Row for Music */}
        {activeCategory === 'music' && (
          <div className="flex [scrollbar-width:none] flex-wrap items-center gap-1 pt-0.5 [&::-webkit-scrollbar]:hidden">
            {MUSIC_CHIPS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => onSelectMusicChip(chip.query)}
                className={cn(
                  'shrink-0 cursor-pointer rounded-full border px-2 py-0.5 font-sans text-[10px] font-medium transition-colors',
                  searchQuery === chip.query
                    ? 'border-amber-400 bg-amber-400 font-semibold text-[#14110F]'
                    : 'border-[#3B302A] bg-[#211B18] text-[#A99B90] hover:text-[#F3EAE1]',
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
