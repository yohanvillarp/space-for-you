import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import type { ReactNode } from 'react'
import { account, signOut as apiSignOut } from '@/shared/api'
import { SessionContext } from './SessionContext.ts'
import type { AppwriteUser, AuthStatus, SessionContextValue } from './types.ts'

interface SessionProviderProps {
  children: ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [user, setUser] = useState<AppwriteUser | null>(null)
  const [status, setStatus] = useState<AuthStatus>('loading')
  const [error, setError] = useState<string | null>(null)
  const activeRequestSeq = useRef(0)

  const refreshSession = useCallback(async (): Promise<AppwriteUser | null> => {
    const seq = ++activeRequestSeq.current
    try {
      const activeUser = await account.get()
      if (seq === activeRequestSeq.current) {
        setUser(activeUser)
        setStatus('authenticated')
        setError(null)
      }
      return activeUser
    } catch (err: unknown) {
      if (seq === activeRequestSeq.current) {
        const isAppwriteError = err && typeof err === 'object' && 'code' in err
        const errorCode = isAppwriteError
          ? (err as { code: number }).code
          : null

        if (errorCode === 401) {
          setUser(null)
          setStatus('unauthenticated')
          setError(null)
        } else {
          const msg =
            err instanceof Error ? err.message : 'Session verification failed'
          setError(msg)
          setStatus('unauthenticated')
        }
      }
      return null
    }
  }, [])

  const setSessionUser = useCallback((newUser: AppwriteUser | null) => {
    setUser(newUser)
    setStatus(newUser ? 'authenticated' : 'unauthenticated')
    setError(null)
  }, [])

  const logout = useCallback(async (): Promise<void> => {
    try {
      await apiSignOut()
    } finally {
      setUser(null)
      setStatus('unauthenticated')
      setError(null)
    }
  }, [])

  useEffect(() => {
    let isCancelled = false

    async function initializeSession() {
      try {
        const activeUser = await account.get()
        if (!isCancelled) {
          setUser(activeUser)
          setStatus('authenticated')
          setError(null)
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          const isAppwriteError =
            err && typeof err === 'object' && 'code' in err
          const errorCode = isAppwriteError
            ? (err as { code: number }).code
            : null

          if (errorCode === 401) {
            setUser(null)
            setStatus('unauthenticated')
            setError(null)
          } else {
            const msg =
              err instanceof Error ? err.message : 'Session verification failed'
            setError(msg)
            setStatus('unauthenticated')
          }
        }
      }
    }

    void initializeSession()

    return () => {
      isCancelled = true
    }
  }, [])

  const value = useMemo<SessionContextValue>(
    () => ({
      user,
      status,
      isAuthenticated: status === 'authenticated' && user !== null,
      isLoading: status === 'loading',
      error,
      refreshSession,
      logout,
      setSessionUser,
    }),
    [user, status, error, refreshSession, logout, setSessionUser],
  )

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}
