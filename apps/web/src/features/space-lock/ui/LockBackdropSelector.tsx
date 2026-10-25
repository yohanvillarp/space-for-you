import {
  BACKGROUND_THEMES_CATALOG,
  type LockBackgroundTheme,
} from '@/features/space-lock/model/lock.types'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface LockBackdropSelectorProps {
  currentTheme?: LockBackgroundTheme
  onSelectTheme: (theme: LockBackgroundTheme) => void
  className?: string
}

export function LockBackdropSelector({
  currentTheme = 'midnight-sanctuary',
  onSelectTheme,
  className,
}: LockBackdropSelectorProps) {
  const selectedTheme = currentTheme || BACKGROUND_THEMES_CATALOG[0].id

  return (
    <div
      className={cn(
        'animate-fade-in absolute top-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 shadow-xl backdrop-blur-xl select-none',
        className,
      )}
    >
      <span className="mr-1 font-sans text-[11px] font-medium text-stone-300">
        Backdrop:
      </span>
      {BACKGROUND_THEMES_CATALOG.map((bg) => {
        const isSelected = selectedTheme === bg.id
        return (
          <button
            key={bg.id}
            type="button"
            onClick={() => {
              playSpatialSfx('tactile-tap')
              onSelectTheme(bg.id)
            }}
            title={bg.name}
            className={cn(
              'flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all',
              isSelected
                ? 'border border-amber-400 bg-amber-400/25 text-amber-200 shadow-sm'
                : 'border border-transparent text-stone-400 hover:bg-white/10 hover:text-stone-200',
            )}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: bg.accentColor }}
            />
            <span className="hidden sm:inline">{bg.name}</span>
          </button>
        )
      })}
    </div>
  )
}
