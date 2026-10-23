import { cn } from '@/shared/lib'

export interface DominantSpacePreviewProps {
  className?: string
}

export function DominantSpacePreview({ className }: DominantSpacePreviewProps) {
  return (
    <article
      aria-label="Preview of a personalized digital space: For Clara"
      className={cn(
        'relative rounded-2xl border border-border-base bg-bg-surface p-6 sm:p-7 shadow-xs',
        'transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-1',
        'motion-reduce:transition-none motion-reduce:transform-none',
        className,
      )}
    >
      {/* Space Header: Recipient & Quiet Token */}
      <header className="flex items-center justify-between border-b border-border-subtle pb-4">
        <div className="flex items-center gap-2.5">
          <span className="font-heading text-lg sm:text-xl font-normal text-text-primary italic">
            For Clara
          </span>
          {/* Brand Spark Motif */}
          <svg
            viewBox="0 0 16 16"
            className="w-3.5 h-3.5 fill-primary shrink-0 opacity-80"
            aria-hidden="true"
          >
            <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" />
          </svg>
        </div>
        <span className="font-sans text-xs text-text-muted tracking-wide">
          Quiet evening
        </span>
      </header>

      {/* Space Sanctuary Window & Artwork */}
      <div className="my-5 rounded-xl border border-border-subtle bg-bg-subtle/60 p-4 sm:p-5">
        <div className="flex items-center justify-center py-4 sm:py-6">
          <svg
            viewBox="0 0 200 110"
            className="w-full max-w-[220px] h-auto"
            fill="none"
            aria-hidden="true"
          >
            {/* Architectural Arch Frame */}
            <path
              d="M30 100 V 45 A 70 70 0 0 1 170 45 V 100"
              className="stroke-border-base"
              strokeWidth="1.5"
              strokeDasharray="2 3"
            />
            {/* Gentle Horizon */}
            <line
              x1="20"
              y1="90"
              x2="180"
              y2="90"
              className="stroke-border-base"
              strokeWidth="1.5"
            />
            {/* Warm Terracotta Sun */}
            <circle cx="100" cy="56" r="22" className="fill-primary/20" />
            <circle cx="100" cy="56" r="14" className="fill-primary/60" />
            {/* Olive Leaf Line Accent */}
            <path
              d="M75 90 Q 90 76 100 74 Q 110 76 125 90"
              className="stroke-accent"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Thoughtful Reflection */}
        <p className="font-heading text-center text-sm sm:text-base font-normal text-text-primary italic leading-relaxed pt-1">
          &ldquo;A quiet corner for your thoughts, whenever the world gets too loud.&rdquo;
        </p>
      </div>

      {/* Tactile Workshop Details */}
      <footer className="flex items-center justify-between pt-1 text-xs text-text-muted">
        {/* Color Palette Chips */}
        <div className="flex items-center gap-1.5" title="Palette created for Clara">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" aria-label="Terracotta accent" />
          <span className="w-2.5 h-2.5 rounded-full bg-arcilla" aria-label="Soft clay" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent" aria-label="Olive note" />
          <span className="w-2.5 h-2.5 rounded-full border border-border-base bg-marfil" aria-label="Warm ivory" />
        </div>

        {/* Warm Note Marker */}
        <div className="flex items-center gap-1.5 text-text-secondary font-sans text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse" />
          <span>Leave a light on</span>
        </div>
      </footer>
    </article>
  )
}
