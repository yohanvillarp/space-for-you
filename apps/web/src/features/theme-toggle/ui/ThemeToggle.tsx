import { SegmentedThemeToggle } from './SegmentedThemeToggle.tsx'
import { IconThemeToggle } from './IconThemeToggle.tsx'
import { DropdownThemeToggle } from './DropdownThemeToggle.tsx'
import type { ThemeToggleProps } from '../model/types.ts'

export function ThemeToggle({
  variant = 'segmented',
  size = 'sm',
  className,
}: ThemeToggleProps) {
  if (variant === 'icon') {
    return <IconThemeToggle size={size} className={className} />
  }

  if (variant === 'dropdown') {
    return <DropdownThemeToggle size={size} className={className} />
  }

  return <SegmentedThemeToggle size={size} className={className} />
}
