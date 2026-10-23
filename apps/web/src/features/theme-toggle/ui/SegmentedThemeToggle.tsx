import { useTheme, cn } from '@/shared/lib'
import { THEME_OPTIONS } from '../model/constants.ts'
import type { ThemeToggleSize } from '../model/types.ts'

interface SegmentedThemeToggleProps {
  size?: ThemeToggleSize
  className?: string
}

export function SegmentedThemeToggle({
  size = 'sm',
  className,
}: SegmentedThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const isSm = size === 'sm'
  const iconSize = isSm ? 14 : 16

  return (
    <div
      role="radiogroup"
      aria-label="Seleccionar tema"
      className={cn(
        'inline-flex items-center rounded-full border border-border-base bg-bg-subtle p-0.5 transition-colors',
        className,
      )}
    >
      {THEME_OPTIONS.map((option) => {
        const Icon = option.icon
        const isSelected = theme === option.value

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            title={option.label}
            onClick={() => setTheme(option.value)}
            className={cn(
              'relative flex items-center justify-center rounded-full transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
              isSm ? 'h-7 w-7' : 'h-8 w-8',
              isSelected
                ? 'bg-bg-surface text-text-primary shadow-xs font-semibold'
                : 'text-text-muted hover:text-text-primary hover:bg-bg-surface/50',
            )}
          >
            <Icon size={iconSize} className="transition-transform" />
            <span className="sr-only">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
