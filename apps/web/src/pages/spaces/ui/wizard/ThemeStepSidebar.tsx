import { ArrowRight, ExternalLink } from 'lucide-react'
import { ThemeSelectorList } from '@/features'
import type { ThemeRegistryEntry } from '@/features/space-themes'
import type { SpaceTemplateId } from '@/entities/space'
import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui'

export interface ThemeStepSidebarProps {
  selectedTemplateId: SpaceTemplateId
  onSelectTemplate: (id: SpaceTemplateId) => void
  activeTheme: ThemeRegistryEntry
  onNextStep: () => void
}

export function ThemeStepSidebar({
  selectedTemplateId,
  onSelectTemplate,
  activeTheme,
  onNextStep,
}: ThemeStepSidebarProps) {
  const studioPath = `${ROUTES.STUDIO}?template=${encodeURIComponent(selectedTemplateId)}`

  return (
    <div className="animate-fade-in space-y-4">
      <ThemeSelectorList
        selectedTemplateId={selectedTemplateId}
        onSelectTemplate={onSelectTemplate}
      />

      {/* Setting Inclusions Panel */}
      <div className="border-border-base/70 bg-bg-surface/80 rounded-2xl border p-4 backdrop-blur-md">
        <div className="flex items-center justify-between pb-2">
          <span className="font-heading text-primary text-xs font-semibold italic">
            Included Artifacts
          </span>
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: activeTheme.accentColor }}
          />
        </div>
        <p className="text-text-secondary font-sans text-xs leading-relaxed">
          {selectedTemplateId === 'birthday' &&
            'Interactive candle with extinguishable flame, deckled cotton card, polaroid photo frame, and acoustic guitar melody.'}
          {selectedTemplateId === 'anniversary' &&
            'Wax-sealed private envelope, instant couple polaroid, spinning vinyl turntable, and scattered rose petals.'}
          {selectedTemplateId === 'friendship' &&
            'Airmail roadtrip postcard with push pins, retro cassette tape player, polaroid memory, and washi tape.'}
        </p>
      </div>

      {/* Action Buttons: Fullscreen Workspace & Continue */}
      <div className="space-y-2 pt-1">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onNextStep}
          className="group w-full cursor-pointer justify-center gap-2 py-3 shadow-xs"
        >
          <span>Continue to Personalize</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full cursor-pointer justify-center gap-1.5 text-xs"
        >
          <a href={studioPath} target="_blank" rel="noopener noreferrer">
            <span>Launch Fullscreen Studio</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </div>
    </div>
  )
}
