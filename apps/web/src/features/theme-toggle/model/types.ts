import type { LucideIcon } from 'lucide-react'
import type { Theme } from '@/shared/lib'

export type ThemeToggleVariant = 'segmented' | 'icon' | 'dropdown'
export type ThemeToggleSize = 'sm' | 'md'

export interface ThemeToggleProps {
  variant?: ThemeToggleVariant
  size?: ThemeToggleSize
  className?: string
}

export interface ThemeOption {
  value: Theme
  label: string
  icon: LucideIcon
}
