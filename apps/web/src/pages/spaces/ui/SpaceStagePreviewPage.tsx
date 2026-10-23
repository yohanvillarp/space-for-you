import { useParams, Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { THEME_REGISTRY } from '@/features/space-themes'
import type { SpaceTemplateId } from '@/entities/space'
import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui'

export function SpaceStagePreviewPage() {
  const { templateId } = useParams<{ templateId: string }>()

  const validTemplateId = (
    templateId && templateId in THEME_REGISTRY ? templateId : 'birthday'
  ) as SpaceTemplateId

  const activeTheme = THEME_REGISTRY[validTemplateId]
  const ThemeUniverse = activeTheme.component

  return (
    <div className="selection:bg-primary relative flex min-h-dvh w-full flex-col justify-between overflow-x-hidden selection:text-white">
      {/* Floating Minimal Studio Bar (for creator preview navigation) */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/70 px-4 py-3.5 backdrop-blur-md sm:px-8">
        <div className="flex items-center gap-3">
          <Link
            to={ROUTES.NEW_SPACE}
            className="group inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-sans text-xs text-stone-200 transition-colors hover:bg-white/15"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Return to Studio</span>
          </Link>

          <div className="hidden items-center gap-2 font-sans text-xs text-stone-300 sm:flex">
            <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
            <span>Live Recipient Experience</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-heading text-xs text-stone-300 italic">
            {activeTheme.title} —{' '}
            <span className="text-primary font-medium">
              {activeTheme.stageName}
            </span>
          </span>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden border-white/20 text-xs text-stone-200 hover:bg-white/10 md:inline-flex"
          >
            <Link to={ROUTES.NEW_SPACE}>
              <span>Use this Stage</span>
            </Link>
          </Button>
        </div>
      </header>

      {/* The entire screen below the header takes the stage material full-bleed */}
      <main className="flex min-h-[calc(100dvh-57px)] w-full flex-1 flex-col">
        <ThemeUniverse />
      </main>
    </div>
  )
}
