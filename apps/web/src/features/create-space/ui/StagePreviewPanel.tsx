import { ExternalLink } from 'lucide-react'
import type { SpaceTemplateId } from '@/entities/space'
import { THEME_REGISTRY } from '@/features/space-themes'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import './stage-preview.css'

export interface StagePreviewPanelProps {
  templateId: SpaceTemplateId
  className?: string
}

export function StagePreviewPanel({
  templateId,
  className,
}: StagePreviewPanelProps) {
  const activeTheme = THEME_REGISTRY[templateId] ?? THEME_REGISTRY.birthday
  const ThemeUniverse = activeTheme.component
  const studioPath = `${ROUTES.STUDIO}?template=${encodeURIComponent(templateId)}`

  return (
    <div className={cn('relative w-full space-y-4', className)}>
      {/* Ambient Radial Backlight Glow */}
      <div
        className={cn(
          'pointer-events-none absolute -inset-4 rounded-3xl bg-radial opacity-60 blur-3xl transition-all duration-700',
          activeTheme.ambientGlow,
        )}
        aria-hidden="true"
      />

      {/* Main Preview Card Container */}
      <div className="border-border-base/70 bg-bg-surface/85 relative overflow-hidden rounded-3xl border shadow-xl backdrop-blur-xl">
        {/* Top Preview Status Bar */}
        <div className="border-border-base/60 bg-bg-surface/90 flex flex-col gap-3 border-b px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full shadow-xs"
              style={{ backgroundColor: activeTheme.accentColor }}
              aria-hidden="true"
            />
            <div>
              <h3 className="font-heading text-text-primary text-sm font-medium sm:text-base">
                {activeTheme.stageName}
              </h3>
              <p className="text-text-muted hidden font-sans text-xs sm:block">
                {activeTheme.mood}
              </p>
            </div>
          </div>

          {/* Top Action: subtle external studio link */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <a
              href={studioPath}
              target="_blank"
              rel="noopener noreferrer"
              title="Open Studio in new tab"
              aria-label="Open Studio in new tab"
              className="border-border-base/70 bg-bg-surface text-text-secondary hover:border-border-base hover:text-text-primary inline-flex items-center justify-center rounded-lg border p-1.5 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* The Clean Centered Stage Preview Area - Full Diorama without clipping */}
        <div className="stage-diorama-viewport relative flex h-[360px] w-full items-center justify-center overflow-hidden sm:h-[480px] lg:h-[500px]">
          <div className="w-full max-w-5xl origin-center scale-[0.52] transform transition-transform duration-300 sm:scale-[0.80] lg:scale-[0.85]">
            <ThemeUniverse />
          </div>
        </div>
      </div>
    </div>
  )
}
