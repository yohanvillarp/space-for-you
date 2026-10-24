import {
  Search,
  X,
  Palette,
  Stamp,
  Camera,
  Mail,
  Type,
  ArrowUpDown,
} from 'lucide-react'
import { cn, getSearchShortcutLabel } from '@/shared/lib'

export type LettersToolboxCategory =
  'colors' | 'seals' | 'photos' | 'texts' | 'order'

export interface LettersToolboxHeaderProps {
  isOpenLetter: boolean
  selectedLetterTitle?: string
  activeCategory: LettersToolboxCategory
  onSelectCategory: (category: LettersToolboxCategory) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onClearSearch: () => void
  isCompact?: boolean
}

export function LettersToolboxHeader({
  isOpenLetter,
  selectedLetterTitle,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onClearSearch,
  isCompact = false,
}: LettersToolboxHeaderProps) {
  const getSearchPlaceholder = () => {
    switch (activeCategory) {
      case 'colors':
        return isOpenLetter
          ? 'Search paper sheet tones (ivory, rose, kraft)...'
          : 'Search envelope colors (rose, amber, mint)...'
      case 'seals':
        return 'Search wax seals (heart, star, sun)...'
      case 'photos':
        return 'Search keepsake photos...'
      case 'texts':
        return 'Reorder objects...'
      default:
        return 'Search...'
    }
  }

  return (
    <div className="shrink-0 border-b border-[#3B302A] bg-[#171310]">
      {/* Top Header: Icon & Title Only */}
      <div className="flex items-center border-b border-[#3B302A] px-4 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[#3B302A] bg-[#2A221E] text-amber-300">
            <Mail className="h-3.5 w-3.5" />
          </div>
          <h3 className="font-heading truncate text-sm font-medium text-[#F3EAE1]">
            {selectedLetterTitle || 'Selected Envelope'}
          </h3>
        </div>
      </div>

      {/* Search Input Bar (Hidden in Texts and Order tabs) */}
      {activeCategory !== 'texts' && activeCategory !== 'order' && (
        <div className="p-3 pb-2">
          <div className="relative">
            <Search className="pointer-events-none absolute top-2.5 left-2.5 h-3.5 w-3.5 text-[#A99B90]" />
            <input
              data-search-input
              type="text"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onSearchChange(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  if (searchQuery) onClearSearch()
                  else e.currentTarget.blur()
                }
              }}
              placeholder={getSearchPlaceholder()}
              aria-label="Search letters catalog"
              className="font-heading w-full rounded-lg border border-[#3B302A] bg-[#211B18] py-1.5 pr-14 pl-8 text-xs text-[#F3EAE1] placeholder-[#A99B90] transition-all outline-none focus:border-amber-400 focus:bg-[#2A221E]"
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
              <kbd className="pointer-events-none absolute top-2 right-2.5 hidden items-center rounded border border-[#3B302A] bg-[#2A221E] px-1.5 py-0.5 font-sans text-[10px] text-[#A99B90] select-none sm:inline-flex">
                {getSearchShortcutLabel()}
              </kbd>
            )}
          </div>
        </div>
      )}

      {/* Category Switcher Tabs */}
      <div className="px-3 pb-3">
        {isOpenLetter ? (
          /* When Letter is OPEN: Colors (Paper Sheet), Photos, Texts, Order */
          <div className="grid grid-cols-4 gap-1 rounded-lg border border-[#3B302A] bg-[#211B18] p-0.5 font-sans text-xs">
            <button
              type="button"
              onClick={() => onSelectCategory('colors')}
              title="Paper Sheet Tone"
              className={cn(
                'flex cursor-pointer items-center justify-center gap-1 rounded-md px-1 py-1.5 text-xs transition-all',
                activeCategory === 'colors'
                  ? 'border border-amber-500/40 bg-[#2A221E] font-medium text-amber-300 shadow-xs'
                  : 'text-[#A99B90] hover:text-[#F3EAE1]',
              )}
            >
              <Palette className="h-3.5 w-3.5 shrink-0" />
              {!isCompact && <span className="truncate">Colors</span>}
            </button>

            <button
              type="button"
              onClick={() => onSelectCategory('photos')}
              title="Keepsake Photograph"
              className={cn(
                'flex cursor-pointer items-center justify-center gap-1 rounded-md px-1 py-1.5 text-xs transition-all',
                activeCategory === 'photos'
                  ? 'border border-amber-500/40 bg-[#2A221E] font-medium text-amber-300 shadow-xs'
                  : 'text-[#A99B90] hover:text-[#F3EAE1]',
              )}
            >
              <Camera className="h-3.5 w-3.5 shrink-0" />
              {!isCompact && <span className="truncate">Photos</span>}
            </button>

            <button
              type="button"
              onClick={() => onSelectCategory('texts')}
              title="Typography & Text Presets"
              className={cn(
                'flex cursor-pointer items-center justify-center gap-1 rounded-md px-1 py-1.5 text-xs transition-all',
                activeCategory === 'texts'
                  ? 'border border-amber-500/40 bg-[#2A221E] font-medium text-amber-300 shadow-xs'
                  : 'text-[#A99B90] hover:text-[#F3EAE1]',
              )}
            >
              <Type className="h-3.5 w-3.5 shrink-0" />
              {!isCompact && <span className="truncate">Texts</span>}
            </button>

            <button
              type="button"
              onClick={() => onSelectCategory('order')}
              title="Object Order & Layout"
              className={cn(
                'flex cursor-pointer items-center justify-center gap-1 rounded-md px-1 py-1.5 text-xs transition-all',
                activeCategory === 'order'
                  ? 'border border-amber-500/40 bg-[#2A221E] font-medium text-amber-300 shadow-xs'
                  : 'text-[#A99B90] hover:text-[#F3EAE1]',
              )}
            >
              <ArrowUpDown className="h-3.5 w-3.5 shrink-0" />
              {!isCompact && <span className="truncate">Order</span>}
            </button>
          </div>
        ) : (
          /* When Letter is CLOSED: Colors (Envelope Paper) & Seals */
          <div className="grid grid-cols-2 gap-1 rounded-lg border border-[#3B302A] bg-[#211B18] p-0.5 font-sans text-xs">
            <button
              type="button"
              onClick={() => onSelectCategory('colors')}
              title="Envelope Paper Colors"
              className={cn(
                'flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-1 py-1.5 text-xs transition-all',
                activeCategory === 'colors'
                  ? 'border border-amber-500/40 bg-[#2A221E] font-medium text-amber-300 shadow-xs'
                  : 'text-[#A99B90] hover:text-[#F3EAE1]',
              )}
            >
              <Palette className="h-3.5 w-3.5 shrink-0" />
              {!isCompact && <span className="truncate">Colors</span>}
            </button>

            <button
              type="button"
              onClick={() => onSelectCategory('seals')}
              title="Wax Seals & Stamps"
              className={cn(
                'flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-1 py-1.5 text-xs transition-all',
                activeCategory === 'seals'
                  ? 'border border-amber-500/40 bg-[#2A221E] font-medium text-amber-300 shadow-xs'
                  : 'text-[#A99B90] hover:text-[#F3EAE1]',
              )}
            >
              <Stamp className="h-3.5 w-3.5 shrink-0" />
              {!isCompact && <span className="truncate">Seals</span>}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
