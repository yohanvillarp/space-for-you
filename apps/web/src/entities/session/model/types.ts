export interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
}

export interface SessionState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
