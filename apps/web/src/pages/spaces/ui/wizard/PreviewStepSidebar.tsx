import { Link } from 'react-router'
import type { ThemeRegistryEntry } from '@/features/space-themes'
import { ROUTES } from '@/shared/config'
import { Card, Button } from '@/shared/ui'

export interface PreviewStepSidebarProps {
  activeTheme: ThemeRegistryEntry
  recipientName: string
  onPrevStep: () => void
}

export function PreviewStepSidebar({
  activeTheme,
  recipientName,
  onPrevStep,
}: PreviewStepSidebarProps) {
  return (
    <div className="animate-fade-in space-y-4">
      <Card className="border-border-base bg-bg-surface/70 space-y-3 border p-5">
        <span className="font-heading text-primary text-xs font-semibold italic">
          Space Ready
        </span>
        <div className="space-y-1">
          <p className="font-heading text-text-primary text-base font-medium">
            {activeTheme.title}
          </p>
          <p className="text-text-secondary font-sans text-xs">
            Setting: {activeTheme.stageName}
          </p>
          <p className="text-text-secondary font-sans text-xs">
            Recipient: For {recipientName || 'Someone Special'}
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
          ← Edit Details
        </Button>
        <Button
          asChild
          variant="primary"
          size="md"
          className="flex-1 cursor-pointer"
        >
          <Link to={ROUTES.DASHBOARD}>Publish Space</Link>
        </Button>
      </div>
    </div>
  )
}
