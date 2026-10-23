import { Link } from 'react-router'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Logomark } from '@/shared/ui'

export interface LogoProps {
  className?: string
  markSize?: number
}

export function Logo({ className, markSize = 28 }: LogoProps) {
  return (
    <Link
      to={ROUTES.HOME}
      aria-label="Space For You - Inicio"
      className={cn(
        'group flex items-center gap-2.5 font-heading text-xl font-medium tracking-tight text-text-primary hover:text-accent transition-colors',
        className,
      )}
    >
      <Logomark
        size={markSize}
        className="transition-transform duration-200 group-hover:scale-105"
      />
      <span>Space For You</span>
    </Link>
  )
}
