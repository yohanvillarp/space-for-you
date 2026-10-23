export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  AUTH_SUCCESS: '/auth/success',
  AUTH_FAILURE: '/auth/failure',
  DASHBOARD: '/dashboard',
  NOT_FOUND: '*',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
