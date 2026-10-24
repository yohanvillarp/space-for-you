import { Check } from 'lucide-react'
import type { ShareFontFamily } from '../share-customizer.types'
import { SHARE_FONT_OPTIONS } from '../share-customizer.types'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface FontsSectionProps {
  currentFont: ShareFontFamily
  onSelectFont: (font: ShareFontFamily) => void
  searchQuery?: string
  className?: string
}

export function FontsSection({
  currentFont,
  onSelectFont,
  searchQuery = '',
  className,
}: FontsSectionProps) {
  const query = searchQuery.toLowerCase().trim()
  const filteredFonts = SHARE_FONT_OPTIONS.filter((f) => {
    if (!query) return true
    return (
      f.name.toLowerCase().includes(query) ||
      f.description.toLowerCase().includes(query) ||
      f.tags.some((t) => t.includes(query))
    )
  })

  return (
    <div className={cn('space-y-3 select-none', className)}>
      <div className="flex items-center justify-between px-1">
        <span className="font-heading text-xs font-semibold tracking-wide text-amber-200/90">
          Dedication Typography
        </span>
        <span className="font-sans text-[11px] text-stone-400">
          {filteredFonts.length} families
        </span>
      </div>

      {/* Direct 2-Column Grid matching Studio Library elements aesthetic */}
      <div className="grid grid-cols-2 gap-2.5">
        {filteredFonts.map((font) => {
          const isSelected = currentFont === font.id
          return (
            <button
              key={font.id}
              type="button"
              onClick={() => {
                playSpatialSfx('tactile-tap')
                onSelectFont(font.id)
              }}
              className={cn(
                'group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border text-left transition-all duration-200',
                isSelected
                  ? 'border-amber-400 bg-amber-400/10 shadow-lg ring-1 ring-amber-400/50'
                  : 'border-[#3B302A] bg-[#211B18] hover:border-[#CF7056]/60 hover:bg-[#251F1C] hover:shadow-md',
              )}
            >
              {/* Dedicated Visual Preview Area */}
              <div className="relative flex h-24 w-full flex-col items-center justify-center overflow-hidden border-b border-[#3B302A]/50 bg-[#2A221E] p-3 transition-colors group-hover:bg-[#2E2520]">
                <span
                  className={cn(
                    'text-2xl font-medium tracking-tight text-stone-200 transition-transform duration-200 group-hover:scale-105',
                    font.familyClass,
                    isSelected && 'text-amber-200',
                  )}
                >
                  Aa
                </span>
                <span
                  className={cn(
                    'mt-1 max-w-[90px] truncate text-[10px] text-stone-400 italic',
                    font.familyClass,
                    isSelected && 'text-amber-300/80',
                  )}
                >
                  Sanctuary
                </span>

                {/* Selected Check Badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-stone-900 shadow-xs">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Font Name Label Below Preview */}
              <div className="p-2.5 text-center">
                <p
                  className={cn(
                    'truncate font-sans text-xs font-medium transition-colors',
                    isSelected
                      ? 'font-semibold text-amber-200'
                      : 'text-[#F3EAE1]',
                  )}
                >
                  {font.name}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {filteredFonts.length === 0 && (
        <div className="rounded-xl border border-white/10 bg-black/20 p-6 text-center text-xs text-stone-400">
          No typography matching &ldquo;{searchQuery}&rdquo;
        </div>
      )}
    </div>
  )
}
