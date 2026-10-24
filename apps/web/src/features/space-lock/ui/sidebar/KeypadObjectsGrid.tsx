import type { LockKeypadTheme } from '../../model/lock.types'
import { KEYPAD_THEMES_CATALOG } from '../../model/lock.types'
import { KeypadMiniaturePreview } from '../KeypadMiniaturePreview'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface KeypadObjectsGridProps {
  currentTheme?: LockKeypadTheme
  onSelectTheme: (themeId: LockKeypadTheme) => void
}

export function KeypadObjectsGrid({
  currentTheme = 'classic',
  onSelectTheme,
}: KeypadObjectsGridProps) {
  return (
    <div className="space-y-2 pt-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-medium text-amber-200">
          Keypad Objects
        </label>
        <span className="text-[10px] text-stone-400">5 styles</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {KEYPAD_THEMES_CATALOG.map((kp) => {
          const isSelected = currentTheme === kp.id
          return (
            <button
              key={kp.id}
              type="button"
              onClick={() => {
                playSpatialSfx('tactile-tap')
                onSelectTheme(kp.id)
              }}
              className={cn(
                'group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border text-left transition-all duration-200',
                isSelected
                  ? 'border-amber-400 bg-amber-500/15 shadow-lg ring-1 ring-amber-400/60'
                  : 'border-[#3B302A] bg-[#1E1815] hover:border-amber-400/50 hover:bg-[#251F1C]',
              )}
            >
              <div className="relative flex h-14 w-full items-center justify-center overflow-hidden border-b border-[#3B302A]/50 bg-[#2A221E] p-1.5 transition-transform duration-200 group-hover:scale-105">
                <KeypadMiniaturePreview theme={kp.id} />
              </div>
              <div className="p-1.5 text-center">
                <p className="truncate font-sans text-[11px] font-medium text-[#F3EAE1]">
                  {kp.name}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
