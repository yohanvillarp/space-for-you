import { Sun, Moon, Monitor } from 'lucide-react'
import type { ThemeOption } from './types.ts'

export const THEME_OPTIONS: readonly ThemeOption[] = [
  { value: 'light', label: 'Claro', icon: Sun },
  { value: 'dark', label: 'Oscuro', icon: Moon },
  { value: 'system', label: 'Sistema', icon: Monitor },
] as const
