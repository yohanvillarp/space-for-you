import { useContext } from 'react'
import { ThemeContext } from './theme-context.ts'
import type { ThemeContextValue } from './types.ts'

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
