import { ArrowRight, Sparkles } from 'lucide-react'
import type { ThemeRegistryEntry } from '@/features/space-themes'
import { Card, Button } from '@/shared/ui'

export interface DetailsStepSidebarProps {
  activeTheme: ThemeRegistryEntry
  onPrevStep: () => void
  onNextStep: () => void
}

export function DetailsStepSidebar({
  activeTheme,
  onPrevStep,
  onNextStep,
}: DetailsStepSidebarProps) {
  return (
    <div className="animate-fade-in space-y-4">
      <Card className="border-border-base bg-bg-surface/60 space-y-3 border-2 border-dashed p-6 text-center">
        <div className="bg-primary/10 text-primary mx-auto flex h-10 w-10 items-center justify-center rounded-xl">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h3 className="font-heading text-text-primary text-base font-medium">
            Story & Letters Editor
          </h3>
          <p className="text-text-secondary font-sans text-xs leading-relaxed">
            Pen your letters, upload photos, and link playlists tailored to the{' '}
            <strong className="text-text-primary">{activeTheme.title}</strong>{' '}
            stage.
          </p>
        </div>
      </Card>

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onPrevStep}
          className="flex-1 cursor-pointer"
        >
          ← Back to Stage
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onNextStep}
          className="flex-1 cursor-pointer gap-1"
        >
          <span>Share Card</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
