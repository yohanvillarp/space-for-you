import { cn } from '@/shared/lib'

export interface SupportingSpacePreviewProps {
  className?: string
}

export function SupportingSpacePreview({ className }: SupportingSpacePreviewProps) {
  return (
    <article
      aria-label="Preview of a personalized digital space: To Julian"
      className={cn(
        'relative rounded-2xl border border-border-base bg-bg-surface p-5 sm:p-6 shadow-xs',
        'transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-1',
        'motion-reduce:transition-none motion-reduce:transform-none',
        className,
      )}
    >
      {/* Supporting Space Header */}
      <header className="flex items-center justify-between border-b border-border-subtle pb-3">
        <div className="flex items-center gap-2">
          <span className="font-heading text-base font-normal text-text-primary italic">
            To Julian
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
        </div>
        <span className="font-sans text-[11px] text-text-muted">
          Our little room
        </span>
      </header>

      {/* Interior Note & Tactile Motif */}
      <div className="my-4 space-y-3">
        <div className="flex items-center gap-3">
          {/* Minimalist Horizon Mark */}
          <div className="w-10 h-10 shrink-0 rounded-lg bg-bg-subtle border border-border-subtle flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 stroke-primary"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="5" className="fill-arcilla/40" />
              <line x1="4" y1="18" x2="20" y2="18" />
              <path d="M7 15C9 13 11 13 13 15C15 17 17 17 19 15" />
            </svg>
          </div>

          <p className="font-sans text-xs sm:text-sm text-text-secondary leading-snug">
            &ldquo;Wherever you are today, this little room is yours.&rdquo;
          </p>
        </div>
      </div>

      {/* Subtle Bottom Accent Tag */}
      <footer className="pt-1 flex items-center justify-between text-[11px] text-text-muted">
        <span className="font-sans">Private sanctuary</span>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-arcilla" />
          <span className="w-2 h-2 rounded-full bg-primary" />
        </div>
      </footer>
    </article>
  )
}
