import { Sun, Moon } from 'lucide-react'
import { useTheme, cn } from '@/shared/lib'
import type { ThemeToggleSize } from '../model/types.ts'

interface IconThemeToggleProps {
  size?: ThemeToggleSize
  className?: string
}

export function IconThemeToggle({
  size = 'sm',
  className,
}: IconThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const isSm = size === 'sm'
  const iconSize = isSm ? 16 : 18

  const handleToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Alternar modo claro y oscuro"
      title={`Cambiar a modo ${resolvedTheme === 'dark' ? 'claro' : 'oscuro'}`}
      className={cn(
        'inline-flex items-center justify-center rounded-md border border-border-base bg-bg-surface text-text-primary hover:bg-bg-subtle transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
        isSm ? 'h-8 w-8' : 'h-9 w-9',
        className,
      )}
    >
      {resolvedTheme === 'dark' ? (
        <Sun size={iconSize} className="transition-transform duration-200 rotate-0 hover:rotate-45" />
      ) : (
        <Moon size={iconSize} className="transition-transform duration-200 rotate-0 hover:-rotate-12" />
      )}
    </button>
  )
}
