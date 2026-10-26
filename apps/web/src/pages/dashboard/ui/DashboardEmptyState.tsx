import { Button, Card } from '@/shared/ui'
import { Logomark } from '@/shared/ui/logo'
import type { DashboardFilterId } from './DashboardFilters'

export interface DashboardEmptyStateProps {
  isTotalEmpty: boolean
  activeFilter: DashboardFilterId
  onCreateSpace: () => void
  onResetFilter: () => void
}

export function DashboardEmptyState({
  isTotalEmpty,
  activeFilter,
  onCreateSpace,
  onResetFilter,
}: DashboardEmptyStateProps) {
  if (isTotalEmpty) {
    return (
      <Card className="space-y-4 border-2 border-dashed px-6 py-16 text-center">
        <div className="bg-secondary/20 text-primary mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
          <Logomark className="h-7 w-7" />
        </div>
        <div className="mx-auto max-w-md space-y-1.5">
          <h3 className="font-heading text-text-primary text-xl font-medium">
            No spaces created yet
          </h3>
          <p className="text-text-secondary font-sans text-sm leading-relaxed">
            Start crafting an intimate digital space with heartfelt notes,
            photographs, and thoughtful music.
          </p>
        </div>
        <div className="pt-3">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onCreateSpace}
          >
            Start your first space
          </Button>
        </div>
      </Card>
    )
  }

  const emptyFilterMessages: Record<DashboardFilterId, string> = {
    all: 'No active sanctuaries found.',
    published: 'No live sanctuaries yet.',
    scheduled: 'No sanctuaries scheduled for future release.',
    draft: 'No drafts found in this view.',
    archived: 'No archived sanctuaries.',
  }

  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center font-sans">
      <p className="text-sm text-stone-300">
        {emptyFilterMessages[activeFilter] ??
          'No sanctuaries match this filter.'}
      </p>
      <button
        type="button"
        onClick={onResetFilter}
        className="mt-3 text-xs text-[#CF7056] underline-offset-4 hover:underline"
      >
        Show all active spaces
      </button>
    </div>
  )
}
