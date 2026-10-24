import { cn } from '@/shared/lib'
import { STICKER_CHIPS, MUSIC_CHIPS } from './toolbox-chips'

export interface ToolboxFilterChipsProps {
  activeCategory: 'objects' | 'stickers' | 'music' | 'photos'
  objectFilter: 'all' | 'stage' | 'universal'
  onSelectObjectFilter: (filter: 'all' | 'stage' | 'universal') => void
  searchQuery: string
  onSelectStickerChip: (query: string) => void
  onSelectMusicChip: (query: string) => void
}

export function ToolboxFilterChips({
  activeCategory,
  objectFilter,
  onSelectObjectFilter,
  searchQuery,
  onSelectStickerChip,
  onSelectMusicChip,
}: ToolboxFilterChipsProps) {
  if (activeCategory === 'objects') {
    return (
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
    )
  }

  if (activeCategory === 'stickers') {
    return (
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
    )
  }

  if (activeCategory === 'music') {
    return (
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
    )
  }

  return null
}
