import type { ChangeEvent } from 'react'
import { Search, X, Layers, Hash, Sparkles } from 'lucide-react'
import type { LockGateCategory } from '@/features/space-lock/model/useLockGateToolbox'
import { cn, getSearchShortcutLabel } from '@/shared/lib'

export interface LockGateToolboxHeaderProps {
  activeCategory: LockGateCategory
  onSelectCategory: (category: LockGateCategory) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onClearSearch: () => void
  searchPlaceholder?: string
  isCompact?: boolean
}

export function LockGateToolboxHeader({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onClearSearch,
  searchPlaceholder = 'Search...',
  isCompact = false,
}: LockGateToolboxHeaderProps) {
  return (
    <div className="space-y-2 pt-1">
      {/* Search Input Bar */}
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
          placeholder={searchPlaceholder}
          aria-label="Search entrance catalog"
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

      {/* Segmented Category Switcher Pill Container */}
      <div
        role="tablist"
        aria-label="Entrance categories"
        className="grid grid-cols-3 gap-1 rounded-lg border border-[#3B302A] bg-[#211B18] p-0.5 font-sans text-xs"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'vaults'}
          onClick={() => onSelectCategory('vaults')}
          title="Vault Artifacts"
          className={cn(
            'flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-1 py-1.5 text-xs transition-all',
            activeCategory === 'vaults'
              ? 'border border-[#3B302A] bg-[#2A221E] font-medium text-[#CF7056] shadow-xs'
              : 'text-[#A99B90] hover:text-[#F3EAE1]',
          )}
        >
          <Layers className="h-3.5 w-3.5 shrink-0" />
          {!isCompact && <span className="truncate">Vaults</span>}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'keypads'}
          onClick={() => onSelectCategory('keypads')}
          title="Keypad & Numbering"
          className={cn(
            'flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-1 py-1.5 text-xs transition-all',
            activeCategory === 'keypads'
              ? 'border border-[#3B302A] bg-[#2A221E] font-medium text-[#CF7056] shadow-xs'
              : 'text-[#A99B90] hover:text-[#F3EAE1]',
          )}
        >
          <Hash className="h-3.5 w-3.5 shrink-0" />
          {!isCompact && <span className="truncate">Keypads</span>}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'atmospheres'}
          onClick={() => onSelectCategory('atmospheres')}
          title="Entrance Atmospheres"
          className={cn(
            'flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-1 py-1.5 text-xs transition-all',
            activeCategory === 'atmospheres'
              ? 'border border-[#3B302A] bg-[#2A221E] font-medium text-[#CF7056] shadow-xs'
              : 'text-[#A99B90] hover:text-[#F3EAE1]',
          )}
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          {!isCompact && <span className="truncate">Backdrops</span>}
        </button>
      </div>
    </div>
  )
}
