import { NavLink } from 'react-router'
import { MAIN_NAV_ITEMS } from '@/shared/config'
import { cn } from '@/shared/lib'

export interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  return (
    <nav className={cn('hidden sm:flex items-center gap-4 text-sm font-medium', className)}>
      {MAIN_NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              'transition-colors py-1 px-2 rounded-md',
              isActive
                ? 'text-text-primary font-semibold'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-subtle',
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
