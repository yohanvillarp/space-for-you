import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib'

export interface PushPinProps extends HTMLAttributes<HTMLDivElement> {
  color?: 'red' | 'brass' | 'teal' | 'silver'
}

export function PushPin({
  color = 'brass',
  className,
  ...props
}: PushPinProps) {
  const getColorStyles = () => {
    switch (color) {
      case 'red':
        return {
          head: 'bg-radial from-rose-400 via-red-600 to-rose-900 shadow-md shadow-red-950/40',
          pin: 'bg-gradient-to-b from-stone-300 to-stone-500',
        }
      case 'teal':
        return {
          head: 'bg-radial from-teal-300 via-teal-600 to-teal-900 shadow-md shadow-teal-950/40',
          pin: 'bg-gradient-to-b from-stone-300 to-stone-500',
        }
      case 'silver':
        return {
          head: 'bg-radial from-stone-100 via-stone-400 to-stone-700 shadow-md shadow-black/40',
          pin: 'bg-gradient-to-b from-stone-300 to-stone-600',
        }
      case 'brass':
      default:
        return {
          head: 'bg-radial from-amber-200 via-amber-500 to-amber-800 shadow-md shadow-amber-950/40',
          pin: 'bg-gradient-to-b from-amber-100 to-amber-600',
        }
    }
  }

  const styles = getColorStyles()

  return (
    <div
      className={cn(
        'relative z-10 inline-flex items-center justify-center select-none',
        className,
      )}
      aria-hidden="true"
      {...props}
    >
      {/* 3D Round Push Pin Head */}
      <div
        className={cn(
          'relative flex h-5 w-5 items-center justify-center rounded-full border border-white/40 ring-1 ring-black/20 transition-transform hover:scale-110',
          styles.head,
        )}
      >
        {/* Specular highlight glint */}
        <div className="absolute top-1 left-1 h-1.5 w-1.5 rounded-full bg-white/70 blur-[0.5px]" />
      </div>

      {/* Pin Shadow on surface below */}
      <div className="pointer-events-none absolute top-4 left-3 h-2 w-4 -rotate-12 rounded-full bg-black/40 blur-[2px]" />
    </div>
  )
}
