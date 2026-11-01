import { createContext, useContext } from 'react'
import type { SessionContextValue } from './types.ts'

export const SessionContext = createContext<SessionContextValue | null>(null)

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext)
  if (!ctx) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return ctx
}

export const useAuth = useSession
