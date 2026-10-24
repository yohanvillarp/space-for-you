import { createContext, useContext } from 'react'

export type StudioBehaviorMode = 'editor' | 'user'

export interface StudioBehaviorContextValue {
  mode: StudioBehaviorMode
  isEditorMode: boolean
  isUserMode: boolean
  setMode: (mode: StudioBehaviorMode) => void
  toggleMode: () => void
}

export const StudioBehaviorContext =
  createContext<StudioBehaviorContextValue | null>(null)

export function useStudioBehavior(): StudioBehaviorContextValue {
  const context = useContext(StudioBehaviorContext)
  if (!context) {
    return {
      mode: 'editor',
      isEditorMode: true,
      isUserMode: false,
      setMode: () => {},
      toggleMode: () => {},
    }
  }
  return context
}
