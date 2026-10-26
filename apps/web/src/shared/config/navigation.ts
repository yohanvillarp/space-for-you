import { ROUTES } from './routes.ts'

export interface NavItem {
  label: string
  path: string
}

export const MAIN_NAV_ITEMS: readonly NavItem[] = [
  {
    label: 'Examples',
    path: ROUTES.EXAMPLES,
  },
  {
    label: 'How it works',
    path: ROUTES.HOW_IT_WORKS,
  },
  {
    label: 'Privacy',
    path: ROUTES.PRIVACY,
  },
  {
    label: 'Attributions',
    path: ROUTES.ATTRIBUTIONS,
  },
] as const
