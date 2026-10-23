import { ROUTES } from './routes.ts'

export interface NavItem {
  label: string
  path: string
}

export const MAIN_NAV_ITEMS: readonly NavItem[] = [
  {
    label: 'Inicio',
    path: ROUTES.HOME,
  },
] as const
