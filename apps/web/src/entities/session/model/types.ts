import type { Models } from 'appwrite'

export type AppwriteUser = Models.User<Models.Preferences>

export interface User {
  id: string
  email: string
  name: string
  emailVerification: boolean
  avatarUrl?: string
}

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export interface SessionState {
  user: AppwriteUser | null
  status: AuthStatus
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface SessionContextValue extends SessionState {
  refreshSession: () => Promise<AppwriteUser | null>
  logout: () => Promise<void>
  setSessionUser: (user: AppwriteUser | null) => void
}
