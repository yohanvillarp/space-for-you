import { useState } from 'react'
import type { LetterItem } from '@/features/create-space/model/scenes.types'
import { LettersToolboxHeader } from '@/features/create-space/ui/letters/LettersToolboxHeader'
import type { LettersToolboxCategory } from '@/features/create-space/ui/letters/LettersToolboxHeader'
import { LetterEnvelopeColorsTab } from '@/features/create-space/ui/letters/LetterEnvelopeColorsTab'
import { LetterSheetColorsTab } from '@/features/create-space/ui/letters/LetterSheetColorsTab'
import { LetterWaxSealsTab } from '@/features/create-space/ui/letters/LetterWaxSealsTab'
import { LetterPhotoEnclosureTab } from '@/features/create-space/ui/letters/LetterPhotoEnclosureTab'
import { LetterTextsTab } from '@/features/create-space/ui/letters/LetterTextsTab'
import { LetterOrderTab } from '@/features/create-space/ui/letters/LetterOrderTab'
import { cn } from '@/shared/lib'

export interface LettersToolboxSidebarProps {
  letters: LetterItem[]
  selectedLetterId: string | null
  openLetterId?: string | null
  onSelectLetter: (id: string | null) => void
  onOpenLetter?: (id: string | null) => void
  onAddLetter?: () => void
  onUpdateLetter: (updated: LetterItem) => void
  onDeleteLetter: (id: string) => void
  onAssignLetterPhoto?: (letterId: string, url: string, file?: File) => void
  isCompact?: boolean
  className?: string
}

export function LettersToolboxSidebar({
  letters,
  selectedLetterId,
  openLetterId = null,
  onAddLetter: _onAddLetter,
  onUpdateLetter,
  onAssignLetterPhoto,
  isCompact = false,
  className,
}: LettersToolboxSidebarProps) {
  const isOpenLetter = Boolean(openLetterId)
  const activeLetter =
    letters.find((l) => l.id === (openLetterId || selectedLetterId)) ??
    letters[0]

  const [activeCategory, setActiveCategory] =
    useState<LettersToolboxCategory>('colors')
  const [searchQuery, setSearchQuery] = useState('')
  const [prevIsOpen, setPrevIsOpen] = useState(isOpenLetter)

  // Sync category when open letter mode changes
  if (prevIsOpen !== isOpenLetter) {
    setPrevIsOpen(isOpenLetter)
    setActiveCategory('colors')
    setSearchQuery('')
  }

  return (
    <aside
      className={cn(
        'flex h-full w-full flex-col bg-[#16120F] text-[#F3EAE1] select-none',
        className,
      )}
    >
      {/* Header with Search and Category Switcher */}
      <LettersToolboxHeader
        isOpenLetter={isOpenLetter}
        selectedLetterTitle={activeLetter?.title}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={() => setSearchQuery('')}
        isCompact={isCompact}
      />

      {/* Main Tabbed Content Body */}
      <div className="flex-1 overflow-y-auto p-3">
        {activeLetter ? (
          isOpenLetter ? (
            /* Open Letter Mode: Sheet Colors, Keepsake Photos, Texts & Object Order */
            <>
              {activeCategory === 'colors' && (
                <LetterSheetColorsTab
                  currentPaperColor={activeLetter.paperColor}
                  searchQuery={searchQuery}
                  onSelectPaperColor={(colorId) =>
                    onUpdateLetter({ ...activeLetter, paperColor: colorId })
                  }
                />
              )}

              {activeCategory === 'photos' && (
                <LetterPhotoEnclosureTab
                  imageUrl={activeLetter.imageUrl}
                  searchQuery={searchQuery}
                  onAssignPhoto={(url, file) => {
                    onUpdateLetter({ ...activeLetter, imageUrl: url })
                    onAssignLetterPhoto?.(activeLetter.id, url, file)
                  }}
                  onRemovePhoto={() =>
                    onUpdateLetter({ ...activeLetter, imageUrl: undefined })
                  }
                />
              )}

              {activeCategory === 'texts' && (
                <LetterTextsTab
                  letter={activeLetter}
                  onUpdateLetter={onUpdateLetter}
                />
              )}

              {activeCategory === 'order' && (
                <LetterOrderTab
                  blocksOrder={activeLetter.blocksOrder}
                  hasPhoto={Boolean(activeLetter.imageUrl)}
                  title={activeLetter.title}
                  content={activeLetter.content}
                  onUpdateBlocksOrder={(order) =>
                    onUpdateLetter({ ...activeLetter, blocksOrder: order })
                  }
                />
              )}
            </>
          ) : (
            /* Closed Desk Mode: Envelope Hue & Wax Seals (No Photos tab) */
            <>
              {activeCategory === 'colors' && (
                <LetterEnvelopeColorsTab
                  currentColor={activeLetter.envelopeColor}
                  searchQuery={searchQuery}
                  onSelectColor={(color) =>
                    onUpdateLetter({ ...activeLetter, envelopeColor: color })
                  }
                />
              )}

              {activeCategory === 'seals' && (
                <LetterWaxSealsTab
                  currentSeal={activeLetter.waxSeal}
                  searchQuery={searchQuery}
                  onSelectSeal={(seal) =>
                    onUpdateLetter({ ...activeLetter, waxSeal: seal })
                  }
                />
              )}
            </>
          )
        ) : (
          <div className="flex h-40 flex-col items-center justify-center p-4 text-center text-xs text-stone-500">
            No envelope selected on desk.
          </div>
        )}
      </div>

      {/* Footer Info Hint */}
      <div className="shrink-0 border-t border-[#3B302A] bg-[#171310] px-3 py-2 text-center font-sans text-[10px] text-[#A99B90]">
        {!isCompact && (
          <span>
            {isOpenLetter
              ? 'Styling open letter • Reorder objects in Texts or on stationery'
              : 'Click any envelope to customize • Right-click to open & write'}
          </span>
        )}
      </div>
    </aside>
  )
}
