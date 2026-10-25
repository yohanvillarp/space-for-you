import { Check, QrCode, Sparkles, Star, Award, Square } from 'lucide-react'
import type { QrStyleType } from '@/features/create-space/ui/share/share-customizer.types'
import { QR_STYLE_PRESETS } from '@/features/create-space/ui/share/share-customizer.constants'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface QrStylesSectionProps {
  currentStyle: QrStyleType
  onSelectStyle: (style: QrStyleType) => void
  searchQuery?: string
  className?: string
}

export function QrStylesSection({
  currentStyle,
  onSelectStyle,
  searchQuery = '',
  className,
}: QrStylesSectionProps) {
  const query = searchQuery.toLowerCase().trim()
  const filteredPresets = QR_STYLE_PRESETS.filter((p) => {
    if (!query) return true
    return (
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some((t) => t.includes(query))
    )
  })

  const renderSilhouette = (id: QrStyleType) => {
    switch (id) {
      case 'vintage':
        return (
          <div className="relative flex h-14 w-14 items-center justify-center rounded-sm border border-dashed border-[#CF7056]/80 bg-[#FAF7F2] p-2 shadow-xs transition-transform duration-300 group-hover:scale-105">
            <div className="absolute -top-1 -left-1 h-1.5 w-1.5 border-t border-l border-[#CF7056]" />
            <div className="absolute -top-1 -right-1 h-1.5 w-1.5 border-t border-r border-[#CF7056]" />
            <div className="absolute -bottom-1 -left-1 h-1.5 w-1.5 border-b border-l border-[#CF7056]" />
            <div className="absolute -right-1 -bottom-1 h-1.5 w-1.5 border-r border-b border-[#CF7056]" />
            <QrCode className="h-8 w-8 text-[#A34835]" />
          </div>
        )
      case 'celestial':
        return (
          <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-indigo-400/40 bg-[#121622] p-2 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Star className="absolute top-1 left-1 h-2 w-2 fill-amber-300 text-amber-300" />
            <Star className="absolute right-1 bottom-1 h-2 w-2 fill-amber-300 text-amber-300" />
            <QrCode className="h-8 w-8 text-amber-300" />
          </div>
        )
      case 'stamp':
        return (
          <div className="relative flex h-14 w-14 items-center justify-center rounded-sm border-2 border-[#C26775]/60 bg-[#FAF2F0] p-2 shadow-xs transition-transform duration-300 group-hover:scale-105">
            <div className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-white shadow-xs">
              <Award className="h-2.5 w-2.5" />
            </div>
            <QrCode className="h-8 w-8 text-[#9B3D44]" />
          </div>
        )
      case 'pill':
        return (
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-stone-300 bg-white p-2 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Square className="pointer-events-none absolute inset-1 h-12 w-12 rounded-xl text-stone-200" />
            <QrCode className="h-8 w-8 text-[#221915]" />
          </div>
        )
      case 'minimal':
      default:
        return (
          <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-stone-200 bg-white p-2 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="absolute top-1 right-1 h-2 w-2 fill-amber-500 text-amber-500" />
            <QrCode className="h-8 w-8 text-[#CF7056]" />
          </div>
        )
    }
  }

  return (
    <div className={cn('space-y-3 select-none', className)}>
      <div className="flex items-center justify-between px-1">
        <span className="font-heading text-xs font-semibold tracking-wide text-amber-200/90">
          QR Code Frame & Silhouette
        </span>
        <span className="font-sans text-[11px] text-stone-400">
          {filteredPresets.length} styles
        </span>
      </div>

      {/* Direct 2-Column Grid matching Studio Library elements aesthetic */}
      <div className="grid grid-cols-2 gap-2.5">
        {filteredPresets.map((preset) => {
          const isSelected = currentStyle === preset.id
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                playSpatialSfx('tactile-tap')
                onSelectStyle(preset.id)
              }}
              className={cn(
                'group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border text-left transition-all duration-200',
                isSelected
                  ? 'border-amber-400 bg-amber-400/10 shadow-lg ring-1 ring-amber-400/50'
                  : 'border-[#3B302A] bg-[#211B18] hover:border-[#CF7056]/60 hover:bg-[#251F1C] hover:shadow-md',
              )}
            >
              {/* Dedicated Visual Preview Area */}
              <div className="relative flex h-24 w-full items-center justify-center overflow-hidden border-b border-[#3B302A]/50 bg-[#2A221E] p-3 transition-colors group-hover:bg-[#2E2520]">
                {renderSilhouette(preset.id)}

                {/* Selected Check Badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-stone-900 shadow-xs">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Asset Name Label Below Preview */}
              <div className="p-2.5 text-center">
                <p
                  className={cn(
                    'truncate font-sans text-xs font-medium transition-colors',
                    isSelected
                      ? 'font-semibold text-amber-200'
                      : 'text-[#F3EAE1]',
                  )}
                >
                  {preset.name}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {filteredPresets.length === 0 && (
        <div className="rounded-xl border border-white/10 bg-black/20 p-6 text-center text-xs text-stone-400">
          No QR styles matching &ldquo;{searchQuery}&rdquo;
        </div>
      )}
    </div>
  )
}
