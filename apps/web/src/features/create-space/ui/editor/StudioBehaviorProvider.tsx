import { useState, useCallback, useMemo, type ReactNode } from 'react'
import {
  type StudioBehaviorMode,
  type StudioBehaviorContextValue,
  StudioBehaviorContext,
} from './useStudioBehavior'

export interface StudioBehaviorProviderProps {
  children: ReactNode
  initialMode?: StudioBehaviorMode
  onModeChange?: (mode: StudioBehaviorMode) => void
}

export function StudioBehaviorProvider({
  children,
  initialMode = 'editor',
  onModeChange,
}: StudioBehaviorProviderProps) {
  const [mode, setModeState] = useState<StudioBehaviorMode>(initialMode)

  const setMode = useCallback(
    (newMode: StudioBehaviorMode) => {
      setModeState(newMode)
      onModeChange?.(newMode)
    },
    [onModeChange],
  )

  const toggleMode = useCallback(() => {
    setModeState((prev) => {
      const next = prev === 'editor' ? 'user' : 'editor'
      onModeChange?.(next)
      return next
    })
  }, [onModeChange])

  const value = useMemo<StudioBehaviorContextValue>(
    () => ({
      mode,
      isEditorMode: mode === 'editor',
      isUserMode: mode === 'user',
      setMode,
      toggleMode,
    }),
    [mode, setMode, toggleMode],
  )

  return (
    <StudioBehaviorContext.Provider value={value}>
      {children}
    </StudioBehaviorContext.Provider>
  )
}
