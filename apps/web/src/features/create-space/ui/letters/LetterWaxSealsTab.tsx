import type { WaxSealType } from '@/features/create-space/model/scenes.types'
import { Heart, Star, Sun, Sparkles, Check } from 'lucide-react'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface LetterWaxSealsTabProps {
  currentSeal: WaxSealType
  searchQuery?: string
  onSelectSeal: (seal: WaxSealType) => void
}

interface SealOption {
  id: WaxSealType
  name: string
  description: string
  icon: typeof Heart
  accent: string
}

const SEAL_OPTIONS: SealOption[] = [
  {
    id: 'heart',
    name: 'Beloved Heart',
    description: 'Classic wax seal for love and heartfelt intimacy',
    icon: Heart,
    accent: 'text-rose-400',
  },
  {
    id: 'star',
    name: 'Starlight Wish',
    description: 'Celestial motif for dreams, guidance, and hope',
    icon: Star,
    accent: 'text-amber-300',
  },
  {
    id: 'sun',
    name: 'Morning Radiance',
    description: 'Solar crest for warmth, vitality, and gratitude',
    icon: Sun,
    accent: 'text-orange-400',
  },
  {
    id: 'sparkle',
    name: 'Golden Sparkle',
    description: 'Whimsical magic for celebration and wonder',
    icon: Sparkles,
    accent: 'text-yellow-300',
  },
]

export function LetterWaxSealsTab({
  currentSeal,
  searchQuery = '',
  onSelectSeal,
}: LetterWaxSealsTabProps) {
  const query = searchQuery.trim().toLowerCase()
  const filtered = SEAL_OPTIONS.filter(
    (s) =>
      !query ||
      s.name.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query),
  )

  return (
    <div className="space-y-2 p-1 font-sans">
      <div className="px-1 pb-1">
        <h4 className="font-heading text-xs font-semibold text-amber-200">
          Wax Seal &amp; Stamp
        </h4>
        <p className="text-[11px] text-stone-400">
          The tactile seal holding your folded letter closed.
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="p-4 text-center text-xs text-stone-400">
          No seals match &ldquo;{searchQuery}&rdquo;
        </div>
      ) : (
        <div className="space-y-1.5">
          {filtered.map((opt) => {
            const isSelected = currentSeal === opt.id
            const Icon = opt.icon

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  playSpatialSfx('tactile-tap')
                  onSelectSeal(opt.id)
                }}
                className={cn(
                  'group flex w-full cursor-pointer items-center justify-between rounded-xl border p-2.5 text-left transition-all',
                  isSelected
                    ? 'border-amber-400/80 bg-[#251E1A] shadow-md ring-1 ring-amber-400/40'
                    : 'border-[#3B302A] bg-[#1A1411] hover:border-white/20 hover:bg-[#201915]',
                )}
              >
                <div className="flex items-center gap-3">
                  {/* Embossed Wax Seal Circle */}
                  <div
                    className={cn(
                      'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-gradient-to-br from-amber-600/40 via-amber-800/60 to-amber-950 shadow-md transition-transform group-hover:scale-105',
                      isSelected && 'ring-2 ring-amber-400/60',
                    )}
                  >
                    <Icon className={cn('h-4 w-4 fill-current', opt.accent)} />
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

                {/* Selection Checkmark */}
                {isSelected ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </div>
                ) : (
                  <div className="h-2 w-2 rounded-full bg-transparent" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
