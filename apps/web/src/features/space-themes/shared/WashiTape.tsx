import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib'

export interface WashiTapeProps extends HTMLAttributes<HTMLDivElement> {
  color?: 'gold' | 'rose' | 'sage' | 'translucent'
  tilt?: 'left' | 'right' | 'straight'
}

export function WashiTape({
  color = 'gold',
  tilt = 'straight',
  className,
  ...props
}: WashiTapeProps) {
  const colorStyles = {
    gold: 'bg-amber-300/45 dark:bg-amber-400/35 border-amber-400/30',
    rose: 'bg-rose-300/45 dark:bg-rose-400/35 border-rose-400/30',
    sage: 'bg-teal-300/45 dark:bg-teal-400/35 border-teal-400/30',
    translucent: 'bg-white/40 dark:bg-white/20 border-white/30',
  }

  const tiltStyles = {
    left: '-rotate-3 -translate-y-1',
    right: 'rotate-3 -translate-y-1',
    straight: 'rotate-0',
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none h-4 w-14 rounded-[1px] border-y shadow-xs backdrop-blur-[1px] transition-transform select-none',
        colorStyles[color],
        tiltStyles[tilt],
        className,
      )}
      {...props}
    />
  )
}
