import { Check } from 'lucide-react'
import type { HarmonyPalette } from '../share-customizer.types'
import { HARMONY_PALETTES } from '../share-customizer.types'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface ColorsSectionProps {
  currentQrColor: string
  currentCardBg: string
  currentTextColor: string
  onApplyPalette: (palette: HarmonyPalette) => void
  searchQuery?: string
  className?: string
}

export function ColorsSection({
  currentQrColor,
  currentCardBg,
  currentTextColor,
  onApplyPalette,
  searchQuery = '',
  className,
}: ColorsSectionProps) {
  const query = searchQuery.toLowerCase().trim()

  const filteredPalettes = HARMONY_PALETTES.filter((p) => {
    if (!query) return true
    return (
      p.name.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query)) ||
      p.tags.some((t) => t.includes(query))
    )
  })

  const isPaletteActive = (palette: HarmonyPalette) => {
    return (
      currentCardBg.toLowerCase() === palette.cardBg.toLowerCase() &&
      currentQrColor.toLowerCase() === palette.qrColor.toLowerCase() &&
      currentTextColor.toLowerCase() === palette.textColor.toLowerCase()
    )
  }

  return (
    <div className={cn('space-y-3 select-none', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <span className="font-heading text-xs font-semibold tracking-wide text-amber-200/90">
          Harmonious Palettes
        </span>
        <span className="font-sans text-[11px] text-stone-400">
          {filteredPalettes.length} palettes
        </span>
      </div>

      {/* Curated Color Harmony Cards */}
      <div className="space-y-2">
        {filteredPalettes.map((palette) => {
          const isSelected = isPaletteActive(palette)
          return (
            <button
              key={palette.name}
              type="button"
              onClick={() => {
                playSpatialSfx('tactile-tap')
                onApplyPalette(palette)
              }}
              className={cn(
                'group flex w-full cursor-pointer items-center justify-between rounded-2xl border p-3.5 text-left transition-all duration-200',
                isSelected
                  ? 'border-amber-400/80 bg-amber-400/10 shadow-md ring-1 ring-amber-400/50'
                  : 'border-[#3B302A] bg-[#211B18] hover:border-[#CF7056]/60 hover:bg-[#251F1C] hover:shadow-sm',
              )}
            >
              {/* Palette Info */}
              <div className="min-w-0 flex-1 pr-3">
                <div className="flex items-center gap-2">
                  <h4
                    className={cn(
                      'font-heading text-xs font-semibold tracking-tight transition-colors',
                      isSelected
                        ? 'font-semibold text-amber-200'
                        : 'text-[#FAF6F0]',
                    )}
                  >
                    {palette.name}
                  </h4>
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 shrink-0 text-amber-300" />
                  )}
                </div>
                {palette.description && (
                  <p className="mt-0.5 line-clamp-1 font-sans text-[11px] leading-relaxed text-[#A99B90]">
                    {palette.description}
                  </p>
                )}
              </div>

              {/* 3 Coordinated Swatch Dots (Card, QR, Text) */}
              <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2 py-1.5 shadow-inner">
                <span
                  className="h-4 w-4 rounded-full border border-white/30 shadow-xs transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: palette.cardBg }}
                  title="Card Surface"
                />
                <span
                  className="h-4 w-4 rounded-full border border-white/30 shadow-xs transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: palette.qrColor }}
                  title="QR Silhouette"
                />
                <span
                  className="h-4 w-4 rounded-full border border-white/30 shadow-xs transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: palette.textColor }}
                  title="Dedication Text"
                />
              </div>
            </button>
          )
        })}

        {filteredPalettes.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-black/20 p-6 text-center text-xs text-stone-400">
            No color palettes matching &ldquo;{searchQuery}&rdquo;
          </div>
        )}
      </div>
    </div>
  )
}
