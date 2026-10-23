import { Link } from 'react-router'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Logomark } from './Logomark'

export interface LogoProps {
  className?: string
  markSize?: number
  showText?: boolean
  textClassName?: string
}

export function Logo({
  className,
  markSize = 28,
  showText = true,
  textClassName,
}: LogoProps) {
  return (
    <Link
      to={ROUTES.HOME}
      aria-label="Space For You - Inicio"
      className={cn(
        'group font-heading text-text-primary hover:text-primary inline-flex items-center gap-2.5 text-xl font-medium tracking-tight transition-colors',
        className,
      )}
    >
      <Logomark
        size={markSize}
        className="transition-transform duration-300 ease-out group-hover:scale-105"
      />
      {showText && (
        <span className={cn('transition-colors', textClassName)}>
          Space For You
        </span>
      )}
    </Link>
  )
}
