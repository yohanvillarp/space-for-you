import { useState } from 'react'
import type { ReactNode, ComponentType } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface LockGateCollapsibleSectionProps {
  title: string
  icon: ComponentType<{ className?: string }>
  defaultOpen?: boolean
  children: ReactNode
  className?: string
}

export function LockGateCollapsibleSection({
  title,
  icon: Icon,
  defaultOpen = true,
  children,
  className,
}: LockGateCollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const handleToggle = () => {
    playSpatialSfx('tactile-tap')
    setIsOpen((prev) => !prev)
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-[#3B302A] bg-[#1E1815]',
        className,
      )}
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between p-3 transition-colors hover:bg-[#251F1C]"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-400/10 text-amber-300">
            <Icon className="h-3.5 w-3.5" />
          </div>
          <span className="font-sans text-xs font-medium text-amber-100">
            {title}
          </span>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-[#A99B90] transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {isOpen && (
        <div className="animate-fade-in space-y-3 border-t border-[#3B302A]/60 p-3 pt-3">
          {children}
        </div>
      )}
    </div>
  )
}
