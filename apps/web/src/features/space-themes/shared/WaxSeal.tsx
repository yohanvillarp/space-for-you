import { useState } from 'react'
import type { HTMLAttributes } from 'react'
import { Heart, Sparkles, Check } from 'lucide-react'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface WaxSealProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  'onToggle'
> {
  variant?: 'rose' | 'gold' | 'terracotta'
  symbol?: 'heart' | 'sparkles'
  label?: string
  defaultOpen?: boolean
  onToggle?: (isOpen: boolean) => void
}

export function WaxSeal({
  variant = 'terracotta',
  symbol = 'heart',
  label = 'Break wax seal',
  defaultOpen = false,
  onToggle,
  className,
  ...props
}: WaxSealProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const handleToggle = () => {
    const next = !isOpen
    playSpatialSfx(next ? 'wax-crack' : 'seal-stamp')
    setIsOpen(next)
    onToggle?.(next)
  }

  const colorStyles = {
    terracotta:
      'from-[#A34835] via-[#8E3827] to-[#6E281A] shadow-amber-950/40 text-rose-100',
    rose: 'from-[#9F3E50] via-[#852C3D] to-[#641C2A] shadow-rose-950/40 text-rose-100',
    gold: 'from-[#D97706] via-[#B45309] to-[#8D3B03] shadow-amber-950/40 text-amber-100',
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={label}
      aria-expanded={isOpen}
      className={cn(
        'group focus-visible:ring-primary relative flex cursor-pointer items-center gap-2.5 rounded-full px-4 py-2 font-sans text-xs font-medium transition-all duration-300 select-none focus:outline-none focus-visible:ring-2',
        isOpen
          ? 'bg-bg-subtle/80 text-text-secondary border-border-base/50 border'
          : 'bg-gradient-to-br text-white shadow-md hover:scale-105 active:scale-95',
        !isOpen && colorStyles[variant],
        className,
      )}
      {...props}
    >
      {/* 3D Wax Stamp Badge */}
      <div
        className={cn(
          'relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/30 shadow-inner transition-transform duration-300',
          isOpen
            ? 'bg-bg-surface text-text-muted rotate-45'
            : 'bg-white/20 group-hover:rotate-12',
        )}
      >
        {isOpen ? (
          <Check className="h-3.5 w-3.5" />
        ) : symbol === 'heart' ? (
          <Heart className="h-3.5 w-3.5 fill-current" />
        ) : (
          <Sparkles className="h-3.5 w-3.5 fill-current" />
        )}
      </div>

      <span className="font-heading text-xs italic">
        {isOpen ? 'Letter Unsealed' : label}
      </span>
    </button>
  )
}
