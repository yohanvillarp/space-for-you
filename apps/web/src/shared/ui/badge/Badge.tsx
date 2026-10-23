import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib'

export type BadgeVariant = 'default' | 'outline' | 'accent' | 'secondary'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children?: ReactNode
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: 'border-border-base bg-bg-surface text-text-secondary',
  outline: 'border-border-base bg-transparent text-text-primary',
  accent: 'border-transparent bg-accent text-accent-foreground',
  secondary: 'border-transparent bg-bg-subtle text-text-secondary',
}

export function Badge({
  variant = 'default',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors shadow-xs',
        badgeVariants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
