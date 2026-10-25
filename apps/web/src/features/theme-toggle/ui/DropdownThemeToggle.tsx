import { useRef, useState } from 'react'
import { Sun, Moon, Check } from 'lucide-react'
import { useTheme, useClickOutside, cn } from '@/shared/lib'
import { THEME_OPTIONS } from '@/features/theme-toggle/model/constants'
import type { ThemeToggleSize } from '@/features/theme-toggle/model/types'

interface DropdownThemeToggleProps {
  size?: ThemeToggleSize
  className?: string
}

export function DropdownThemeToggle({
  size = 'sm',
  className,
}: DropdownThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useClickOutside(dropdownRef, () => setIsOpen(false))

  const ActiveIcon = resolvedTheme === 'dark' ? Moon : Sun
  const iconSize = size === 'sm' ? 15 : 17

  return (
    <div
      ref={dropdownRef}
      className={cn('relative inline-block text-left', className)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Opciones de tema"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'border-border-base bg-bg-surface text-text-primary hover:bg-bg-subtle focus-visible:ring-border-focus inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md border transition-colors focus-visible:ring-2 focus-visible:outline-none',
          size === 'sm' ? 'h-8 px-2.5 text-xs' : 'h-9 px-3 text-sm',
        )}
      >
        <ActiveIcon size={iconSize} />
        <span className="capitalize">{theme}</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="border-border-base bg-bg-surface animate-in fade-in zoom-in-95 absolute right-0 z-50 mt-1.5 w-36 origin-top-right rounded-md border p-1 shadow-md duration-100"
        >
          {THEME_OPTIONS.map((option) => {
            const Icon = option.icon
            const isSelected = theme === option.value

            return (
              <button
                key={option.value}
                type="button"
                role="menuitem"
                onClick={() => {
                  setTheme(option.value)
                  setIsOpen(false)
                }}
                className={cn(
                  'flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm px-2.5 py-1.5 text-left text-xs transition-colors',
                  isSelected
                    ? 'bg-bg-subtle text-text-primary font-medium'
                    : 'text-text-secondary hover:bg-bg-subtle hover:text-text-primary',
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon size={14} className="text-text-muted" />
                  <span>{option.label}</span>
                </div>
                {isSelected && <Check size={14} className="text-accent" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
