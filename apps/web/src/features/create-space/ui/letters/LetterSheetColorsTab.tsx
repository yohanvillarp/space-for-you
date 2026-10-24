import { Check } from 'lucide-react'
import { SHEET_COLORS } from './letter-sheet-colors'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface LetterSheetColorsTabProps {
  currentPaperColor?: string
  searchQuery?: string
  onSelectPaperColor: (colorId: string) => void
}

export function LetterSheetColorsTab({
  currentPaperColor = 'ivory',
  searchQuery = '',
  onSelectPaperColor,
}: LetterSheetColorsTabProps) {
  const query = searchQuery.trim().toLowerCase()
  const filtered = SHEET_COLORS.filter(
    (c) =>
      !query ||
      c.name.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query),
  )

  return (
    <div className="space-y-2 p-1 font-sans">
      <div className="px-1 pb-1">
        <h4 className="font-heading text-xs font-semibold text-amber-200">
          Letter Paper Sheet Tone
        </h4>
        <p className="text-[11px] text-stone-400">
          Choose the stationery paper background for this open letter.
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="p-4 text-center text-xs text-stone-400">
          No paper tones match &ldquo;{searchQuery}&rdquo;
        </div>
      ) : (
        <div className="space-y-1.5">
          {filtered.map((opt) => {
            const isSelected = (currentPaperColor || 'ivory') === opt.id

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  playSpatialSfx('tactile-tap')
                  onSelectPaperColor(opt.id)
                }}
                className={cn(
                  'group flex w-full cursor-pointer items-center justify-between rounded-xl border p-2.5 text-left transition-all',
                  isSelected
                    ? 'border-amber-400/80 bg-[#251E1A] shadow-md ring-1 ring-amber-400/40'
                    : 'border-[#3B302A] bg-[#1A1411] hover:border-white/20 hover:bg-[#201915]',
                )}
              >
                <div className="flex items-center gap-3">
                  {/* Miniature Sheet Swatch */}
                  <div
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border shadow-sm transition-transform group-hover:scale-105',
                      opt.swatchBg,
                    )}
                  >
                    {isSelected && (
                      <Check className="h-4 w-4 stroke-[3] text-stone-800" />
                    )}
                  </div>

                  <div>
                    <p
                      className={cn(
                        'font-heading text-xs font-medium transition-colors',
                        isSelected
                          ? 'font-semibold text-amber-100'
                          : 'text-[#FAF6F0]',
                      )}
                    >
                      {opt.name}
                    </p>
                    <p className="font-sans text-[10px] text-[#A99B90]">
                      {opt.description}
                    </p>
                  </div>
                </div>

                {/* Active Indicator */}
                <div
                  className={cn(
                    'h-2 w-2 rounded-full transition-all',
                    isSelected
                      ? 'bg-amber-400 ring-2 ring-amber-400/30'
                      : 'bg-transparent',
                  )}
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
