export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  AUTH_SUCCESS: '/auth/success',
  AUTH_FAILURE: '/auth/failure',
  DASHBOARD: '/dashboard',
  EXAMPLES: '/examples',
  HOW_IT_WORKS: '/how-it-works',
  PRIVACY: '/privacy',
  NEW_SPACE: '/spaces/new',
  EDIT_SPACE: '/spaces/:id/edit',
  PUBLIC_SPACE: '/s/:slug',
  NOT_FOUND: '*',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
