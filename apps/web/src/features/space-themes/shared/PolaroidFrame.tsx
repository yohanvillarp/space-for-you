import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib'
import { WashiTape } from './WashiTape'
import type { WashiTapeProps } from './WashiTape'

export interface PolaroidFrameProps extends HTMLAttributes<HTMLDivElement> {
  caption?: string
  date?: string
  rotation?: 'left' | 'right' | 'none'
  tapeColor?: WashiTapeProps['color']
  children?: ReactNode
}

export function PolaroidFrame({
  caption,
  date,
  rotation = 'none',
  tapeColor,
  className,
  children,
  ...props
}: PolaroidFrameProps) {
  const rotationClasses = {
    left: '-rotate-2 hover:rotate-0',
    right: 'rotate-2 hover:rotate-0',
    none: 'rotate-0',
  }

  return (
    <div
      className={cn(
        'group relative rounded-xl border border-black/5 bg-[#FBF8F3] p-3 pb-4 shadow-md transition-all duration-300 select-none hover:scale-[1.02] hover:shadow-xl dark:border-white/10 dark:bg-[#2A2320]',
        rotationClasses[rotation],
        className,
      )}
      {...props}
    >
      {/* Optional Top Washi Tape */}
      {tapeColor && (
        <div className="absolute -top-2.5 left-1/2 z-10 -translate-x-1/2">
          <WashiTape
            color={tapeColor}
            tilt={rotation === 'left' ? 'left' : 'right'}
          />
        </div>
      )}

      {/* Inner Image / Content Container */}
      <div className="bg-bg-subtle/80 relative flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-lg border border-black/5 dark:border-black/20">
        {children}
      </div>

      {/* Handwritten Polaroid Caption */}
      {(caption || date) && (
        <div className="flex items-baseline justify-between px-1 pt-2.5 text-left">
          {caption && (
            <p className="font-heading text-text-primary/90 truncate text-xs font-medium italic sm:text-sm">
              {caption}
            </p>
          )}
          {date && (
            <span className="text-text-muted ml-2 shrink-0 font-sans text-[10px]">
              {date}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
