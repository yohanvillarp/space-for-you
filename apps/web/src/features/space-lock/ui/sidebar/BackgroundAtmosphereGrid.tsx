import type { LockBackgroundTheme } from '../../model/lock.types'
import { BACKGROUND_THEMES_CATALOG } from '../../model/lock.types'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface BackgroundAtmosphereGridProps {
  currentTheme?: LockBackgroundTheme
  onSelectTheme: (themeId: LockBackgroundTheme) => void
}

export function BackgroundAtmosphereGrid({
  currentTheme = 'midnight-sanctuary',
  onSelectTheme,
}: BackgroundAtmosphereGridProps) {
  return (
    <div className="space-y-2 pt-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-medium text-amber-200">
          Entrance Atmospheres
        </label>
        <span className="text-[10px] text-stone-400">4 backdrops</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {BACKGROUND_THEMES_CATALOG.map((bg) => {
          const isSelected = currentTheme === bg.id
          return (
            <button
              key={bg.id}
              type="button"
              onClick={() => {
                playSpatialSfx('tactile-tap')
                onSelectTheme(bg.id)
              }}
              className={cn(
                'group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border text-left transition-all duration-200',
                isSelected
                  ? 'border-amber-400 bg-amber-500/15 shadow-lg ring-1 ring-amber-400/60'
                  : 'border-[#3B302A] bg-[#1E1815] hover:border-amber-400/50 hover:bg-[#251F1C]',
              )}
            >
              {/* Gradient swatch preview area */}
              <div
                className={cn(
                  'relative flex h-14 w-full items-center justify-center overflow-hidden border-b border-[#3B302A]/50 bg-gradient-to-tr p-1.5 transition-transform duration-200 group-hover:scale-105',
                  bg.previewClass,
                )}
              >
                <div className="h-6 w-12 rounded-full border border-white/20 bg-white/10 blur-[3px]" />
              </div>

              {/* Title label */}
              <div className="p-1.5 text-center">
                <p className="truncate font-sans text-[11px] font-medium text-[#F3EAE1]">
                  {bg.name}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
