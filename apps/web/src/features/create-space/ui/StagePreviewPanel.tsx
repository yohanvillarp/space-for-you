import { ExternalLink, Sparkles } from 'lucide-react'
import type { SpaceTemplateId } from '@/entities/space'
import { THEME_REGISTRY } from '@/features/space-themes'
import { Button } from '@/shared/ui'
import { cn } from '@/shared/lib'

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
  const previewPath = `/spaces/preview/${templateId}`

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
        <div className="border-border-base/60 bg-bg-surface/90 flex flex-col gap-3 border-b px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: activeTheme.accentColor }}
              aria-hidden="true"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-text-primary text-sm font-medium sm:text-base">
                  {activeTheme.stageName}
                </h3>
                <span className="bg-primary/10 text-primary border-primary/20 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-sans text-[10px] font-medium">
                  <Sparkles className="h-3 w-3" />
                  <span>Live Recipient Setting</span>
                </span>
              </div>
              <p className="text-text-muted hidden font-sans text-xs sm:block">
                {activeTheme.mood}
              </p>
            </div>
          </div>

          {/* Action: Open Fullscreen Studio */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button
              asChild
              variant="primary"
              size="sm"
              className="cursor-pointer gap-1.5 text-xs shadow-xs"
            >
              <a href={previewPath} target="_blank" rel="noopener noreferrer">
                <span>Open Fullscreen Studio</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>

        {/* The Clean Stage Preview Area */}
        <div className="relative min-h-[560px] w-full overflow-hidden sm:min-h-[620px]">
          <ThemeUniverse />
        </div>
      </div>
    </div>
  )
}
