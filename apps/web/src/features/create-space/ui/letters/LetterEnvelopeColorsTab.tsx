import type { EnvelopeColor } from '@/features/create-space/model/scenes.types'
import { Check } from 'lucide-react'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface LetterEnvelopeColorsTabProps {
  currentColor: EnvelopeColor
  searchQuery?: string
  onSelectColor: (color: EnvelopeColor) => void
}

interface ColorOption {
  id: EnvelopeColor
  name: string
  description: string
  bgGradient: string
  accentColor: string
}

const COLOR_OPTIONS: ColorOption[] = [
  {
    id: 'rose',
    name: 'Rose Blush',
    description: 'Warm gentle blush with soft paper texture',
    bgGradient: 'from-rose-400 to-rose-500',
    accentColor: '#F43F5E',
  },
  {
    id: 'sky',
    name: 'Sky Frost',
    description: 'Calm airy cyan hue for serene sentiments',
    bgGradient: 'from-sky-400 to-sky-500',
    accentColor: '#0EA5E9',
  },
  {
    id: 'lavender',
    name: 'Lavender Dream',
    description: 'Quiet dusk violet for nostalgic thoughts',
    bgGradient: 'from-purple-400 to-purple-500',
    accentColor: '#A855F7',
  },
  {
    id: 'amber',
    name: 'Warm Amber',
    description: 'Golden honey paper reminiscent of old books',
    bgGradient: 'from-amber-400 to-amber-500',
    accentColor: '#F59E0B',
  },
  {
    id: 'emerald',
    name: 'Sage Mint',
    description: 'Earthy botanical green for enduring bonds',
    bgGradient: 'from-emerald-400 to-emerald-500',
    accentColor: '#10B981',
  },
]

export function LetterEnvelopeColorsTab({
  currentColor,
  searchQuery = '',
  onSelectColor,
}: LetterEnvelopeColorsTabProps) {
  const query = searchQuery.trim().toLowerCase()
  const filtered = COLOR_OPTIONS.filter(
    (c) =>
      !query ||
      c.name.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query),
  )

  return (
    <div className="space-y-2 p-1 font-sans">
      <div className="px-1 pb-1">
        <h4 className="font-heading text-xs font-semibold text-amber-200">
          Envelope Paper Hue
        </h4>
        <p className="text-[11px] text-stone-400">
          Choose the stationery tone for the selected envelope.
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="p-4 text-center text-xs text-stone-400">
          No colors match &ldquo;{searchQuery}&rdquo;
        </div>
      ) : (
        <div className="space-y-1.5">
          {filtered.map((opt) => {
            const isSelected = currentColor === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  playSpatialSfx('tactile-tap')
                  onSelectColor(opt.id)
                }}
                className={cn(
                  'group flex w-full cursor-pointer items-center justify-between rounded-xl border p-2.5 text-left transition-all',
                  isSelected
                    ? 'border-amber-400/80 bg-[#251E1A] shadow-md ring-1 ring-amber-400/40'
                    : 'border-[#3B302A] bg-[#1A1411] hover:border-white/20 hover:bg-[#201915]',
                )}
              >
                <div className="flex items-center gap-3">
                  {/* Color Swatch Circle */}
                  <div
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br shadow-inner transition-transform group-hover:scale-105',
                      opt.bgGradient,
                    )}
                  >
                    {isSelected && (
                      <Check className="h-4 w-4 stroke-[3] text-white" />
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

                {/* Selection Dot */}
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
