export const ROUTES = {
  HOME: '/',
  NOT_FOUND: '*',
} as const

export type AppRoute = typeof ROUTES[keyof typeof ROUTES]
