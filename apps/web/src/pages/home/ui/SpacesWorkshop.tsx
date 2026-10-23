import { cn } from '@/shared/lib'
import { DominantSpacePreview } from './DominantSpacePreview.tsx'
import { SupportingSpacePreview } from './SupportingSpacePreview.tsx'

export interface SpacesWorkshopProps {
  className?: string
}

export function SpacesWorkshop({ className }: SpacesWorkshopProps) {
  return (
    <div
      className={cn(
        'relative w-full max-w-xl mx-auto lg:max-w-none overflow-hidden sm:overflow-visible',
        className,
      )}
    >
      {/* Workshop Atmosphere / Delicate Ambient Glow (Warm Ivory & Soft Clay) */}
      <div
        className="pointer-events-none absolute -inset-4 sm:-inset-6 rounded-3xl bg-radial from-arcilla/15 via-transparent to-transparent opacity-60 dark:opacity-20 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative">
        {/* Dominant Preview: One clear focal point */}
        <div className="relative z-0 max-w-lg mx-auto lg:mx-0">
          <DominantSpacePreview />
        </div>

        {/* Supporting Preview: Nestled with subtle depth and generous breathing room */}
        <div
          className={cn(
            'relative z-10',
            // Mobile: stacks cleanly without negative horizontal margin or overflow
            'mt-4 w-full',
            // Tablet & Desktop: tucks into the bottom-right with controlled overlap and depth
            'sm:-mt-14 sm:ml-auto sm:w-[320px] lg:w-[310px] xl:w-[330px]',
          )}
        >
          <SupportingSpacePreview />
        </div>
      </div>
    </div>
  )
}
