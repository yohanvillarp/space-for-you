import type { ReactNode } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export interface ThemeContextValue {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

export interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
}
