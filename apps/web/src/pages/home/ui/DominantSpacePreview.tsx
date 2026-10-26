import { cn } from '@/shared/lib'

export interface DominantSpacePreviewProps {
  className?: string
}

export function DominantSpacePreview({ className }: DominantSpacePreviewProps) {
  return (
    <article
      aria-label="Preview of a personalized digital space: For Clara"
      className={cn(
        'border-border-base bg-bg-surface relative rounded-2xl border p-6 shadow-xs sm:p-7',
        'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md',
        'motion-reduce:transform-none motion-reduce:transition-none',
        className,
      )}
    >
      {/* Space Header: Recipient & Quiet Token */}
      <header className="border-border-subtle flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2.5">
          <span className="font-heading text-text-primary text-lg font-normal italic sm:text-xl">
            For Clara
          </span>
          {/* Brand Spark Motif */}
          <svg
            viewBox="0 0 16 16"
            className="fill-primary h-3.5 w-3.5 shrink-0 opacity-80"
            aria-hidden="true"
          >
            <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" />
          </svg>
        </div>
        <span className="text-text-muted font-sans text-xs tracking-wide">
          Quiet evening
        </span>
      </header>

      {/* Space Window & Artwork */}
      <div className="border-border-subtle bg-bg-subtle/60 my-5 rounded-xl border p-4 sm:p-5">
        <div className="flex items-center justify-center py-4 sm:py-6">
          <svg
            viewBox="0 0 200 110"
            className="h-auto w-full max-w-[220px]"
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
        <p className="font-heading text-text-primary pt-1 text-center text-sm leading-relaxed font-normal italic sm:text-base">
          &ldquo;A quiet corner for your thoughts, whenever the world gets too
          loud.&rdquo;
        </p>
      </div>

      {/* Tactile Workshop Details */}
      <footer className="text-text-muted flex items-center justify-between pt-1 text-xs">
        {/* Color Palette Chips */}
        <div
          className="flex items-center gap-1.5"
          title="Palette created for Clara"
        >
          <span
            className="bg-primary h-2.5 w-2.5 rounded-full"
            aria-label="Terracotta accent"
          />
          <span
            className="bg-arcilla h-2.5 w-2.5 rounded-full"
            aria-label="Soft clay"
          />
          <span
            className="bg-accent h-2.5 w-2.5 rounded-full"
            aria-label="Olive note"
          />
          <span
            className="border-border-base bg-marfil h-2.5 w-2.5 rounded-full border"
            aria-label="Warm ivory"
          />
        </div>

        {/* Warm Note Marker */}
        <div className="text-text-secondary flex items-center gap-1.5 font-sans text-[11px]">
          <span className="bg-primary/70 h-1.5 w-1.5 animate-pulse rounded-full" />
          <span>Leave a light on</span>
        </div>
      </footer>
    </article>
  )
}
