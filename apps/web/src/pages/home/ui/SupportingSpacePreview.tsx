import { cn } from '@/shared/lib'

export interface SupportingSpacePreviewProps {
  className?: string
}

export function SupportingSpacePreview({
  className,
}: SupportingSpacePreviewProps) {
  return (
    <article
      aria-label="Preview of a personalized digital space: To Julian"
      className={cn(
        'border-border-base bg-bg-surface relative rounded-2xl border p-5 shadow-xs sm:p-6',
        'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md',
        'motion-reduce:transform-none motion-reduce:transition-none',
        className,
      )}
    >
      {/* Supporting Space Header */}
      <header className="border-border-subtle flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <span className="font-heading text-text-primary text-base font-normal italic">
            To Julian
          </span>
          <span
            className="bg-accent h-1.5 w-1.5 rounded-full"
            aria-hidden="true"
          />
        </div>
        <span className="text-text-muted font-sans text-[11px]">
          Our little room
        </span>
      </header>

      {/* Interior Note & Tactile Motif */}
      <div className="my-4 space-y-3">
        <div className="flex items-center gap-3">
          {/* Minimalist Horizon Mark */}
          <div className="bg-bg-subtle border-border-subtle flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
            <svg
              viewBox="0 0 24 24"
              className="stroke-primary h-5 w-5"
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

          <p className="text-text-secondary font-sans text-xs leading-snug sm:text-sm">
            &ldquo;Wherever you are today, this little room is yours.&rdquo;
          </p>
        </div>
      </div>

      {/* Subtle Bottom Accent Tag */}
      <footer className="text-text-muted flex items-center justify-between pt-1 text-[11px]">
        <span className="font-sans">Dedicated space</span>
        <div className="flex items-center gap-1">
          <span className="bg-arcilla h-2 w-2 rounded-full" />
          <span className="bg-primary h-2 w-2 rounded-full" />
        </div>
      </footer>
    </article>
  )
}
