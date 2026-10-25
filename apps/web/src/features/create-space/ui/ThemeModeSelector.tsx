import { useState, useMemo, useRef, useEffect } from 'react'
import type { ComponentType } from 'react'
import { Sparkles, Heart, Users, Check, Search, X, Layers } from 'lucide-react'
import type { SpaceTemplateId } from '@/entities/space'
import { THEME_REGISTRY } from '@/features/space-themes'
import type { ThemeRegistryEntry } from '@/features/space-themes'
import { Card } from '@/shared/ui'
import { cn, getSearchShortcutLabel } from '@/shared/lib'

export interface ThemeModeSelectorProps {
  selectedTemplateId: SpaceTemplateId
  onSelectTemplate: (id: SpaceTemplateId) => void
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  birthday: Sparkles,
  anniversary: Heart,
  friendship: Users,
}

const THEME_FEATURE_PILLS: Record<string, string[]> = {
  birthday: ['Candle', 'Dedication Card', 'Music Box'],
  anniversary: ['Wax Letter', 'Couple Photo', 'Vinyl Player'],
  friendship: ['Travel Postcard', 'Push Pins', 'Mixtape'],
}

export function ThemeModeSelector({
  selectedTemplateId,
  onSelectTemplate,
  className,
}: ThemeModeSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const allThemes: ThemeRegistryEntry[] = useMemo(
    () => Object.values(THEME_REGISTRY),
    [],
  )

  const filteredThemes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return allThemes
    return allThemes.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.stageName.toLowerCase().includes(q) ||
        t.mood.toLowerCase().includes(q),
    )
  }, [allThemes, searchQuery])

  const getThemeIcon = (entry: ThemeRegistryEntry) => {
    const IconComponent = ICON_MAP[entry.id] ?? Layers
    return <IconComponent className="h-4 w-4" />
  }

  return (
    <div
      className={cn(
        'flex h-full max-h-[560px] min-h-[460px] w-full flex-col overflow-hidden rounded-3xl border border-[#3B302A] bg-[#171310] shadow-xl sm:min-h-[500px] lg:min-h-[520px]',
        className,
      )}
    >
      {/* Top Search Header */}
      <div className="shrink-0 border-b border-[#3B302A] bg-[#171310] p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-2.5 left-2.5 h-3.5 w-3.5 text-[#A99B90]" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                if (searchQuery) setSearchQuery('')
                else e.currentTarget.blur()
              }
            }}
            placeholder="Search stage themes..."
            aria-label="Search stage themes"
            className="font-heading w-full rounded-lg border border-[#3B302A] bg-[#211B18] py-2 pr-12 pl-8 text-xs text-[#F3EAE1] placeholder-[#A99B90] transition-all outline-none focus:border-[#CF7056] focus:bg-[#2A221E] focus:ring-1 focus:ring-[#CF7056]"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
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
      </div>

      {/* Scrollable Theme Modes List */}
      <div
        role="radiogroup"
        aria-label="Space theme selection"
        className="flex-1 scrollbar-none space-y-2.5 overflow-y-auto p-3"
      >
        {filteredThemes.length === 0 ? (
          <div className="flex h-36 flex-col items-center justify-center text-center">
            <p className="font-heading text-xs text-[#A99B90]">
              No themes match your search
            </p>
          </div>
        ) : (
          filteredThemes.map((theme) => {
            const isSelected = selectedTemplateId === theme.id
            const featurePills = THEME_FEATURE_PILLS[theme.id] ?? []

            return (
              <Card
                key={theme.id}
                tabIndex={0}
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectTemplate(theme.id)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault()
                    onSelectTemplate(theme.id)
                  }
                }}
                className={cn(
                  'group relative flex cursor-pointer flex-col gap-2.5 rounded-2xl border p-3.5 text-left transition-all duration-200 outline-none select-none',
                  isSelected
                    ? 'border-[#CF7056] bg-[#2A221E] shadow-md ring-1 ring-[#CF7056]/30'
                    : 'border-[#3B302A] bg-[#211B18]/90 hover:border-[#CF7056]/50 hover:bg-[#2A221E]/80 hover:shadow-xs',
                )}
              >
                {/* Main Row: Icon, Titles & Checkmark */}
                <div className="flex w-full items-center justify-between">
                  <div className="flex min-w-0 items-center gap-3 pr-2">
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:scale-105',
                        isSelected
                          ? 'border-[#CF7056]/50 bg-[#CF7056]/15 text-[#CF7056]'
                          : 'border-[#3B302A] bg-[#2A221E] text-[#A99B90] group-hover:text-[#F3EAE1]',
                      )}
                      style={{
                        color: isSelected ? theme.accentColor : undefined,
                      }}
                    >
                      {getThemeIcon(theme)}
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-heading truncate text-sm font-medium tracking-tight text-[#F3EAE1]">
                          {theme.title}
                        </h3>
                        <span
                          className="h-2 w-2 shrink-0 rounded-full shadow-xs"
                          style={{ backgroundColor: theme.accentColor }}
                          aria-hidden="true"
                        />
                      </div>

                      <p className="font-heading truncate text-xs font-medium text-[#CF7056] italic">
                        {theme.stageName}
                      </p>
                    </div>
                  </div>

                  {/* Right: Selection Checkmark Badge */}
                  <div
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200',
                      isSelected
                        ? 'border-[#CF7056] bg-[#CF7056] text-white shadow-xs'
                        : 'border-[#3B302A] bg-[#2A221E] opacity-0 group-hover:opacity-100',
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                </div>

                {/* Keepsake Feature Pills */}
                {featurePills.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    {featurePills.map((pill) => (
                      <span
                        key={pill}
                        className="rounded-md border border-[#3B302A] bg-[#1A1412] px-2 py-0.5 font-sans text-[10px] text-[#A99B90] transition-colors group-hover:border-[#CF7056]/30 group-hover:text-[#D5C7BC]"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            )
          })
        )}
      </div>

      {/* Bottom Atelier Footer Note */}
      <div className="shrink-0 border-t border-[#3B302A] bg-[#15110E] px-4 py-2.5 text-center font-sans text-[11px] text-[#8C7E74]">
        <p>Interactive stages handcrafted for your recipient</p>
      </div>
    </div>
  )
}
