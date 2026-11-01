import { Button } from '@/shared/ui'

interface DashboardHeaderProps {
  displayName: string
  isSigningOut: boolean
  onSignOut: () => void
  onCreateSpace: () => void
}

export function DashboardHeader({
  displayName,
  isSigningOut,
  onSignOut,
  onCreateSpace,
}: DashboardHeaderProps) {
  return (
    <div className="border-border-base flex flex-col gap-6 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1.5">
        <span className="font-heading text-primary text-lg italic">
          Welcome back,
        </span>
        <h1 className="font-heading text-text-primary text-3xl font-medium tracking-tight sm:text-4xl">
          {displayName}
        </h1>
        <p className="text-text-secondary font-sans text-sm">
          Manage your personal spaces, invitations, and keepsake settings.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onCreateSpace}
        >
          + Create space
        </Button>
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onSignOut}
          disabled={isSigningOut}
          className="text-red-600 hover:border-red-200 hover:bg-red-50 dark:text-red-400 dark:hover:border-red-900/50 dark:hover:bg-red-950/30"
        >
          {isSigningOut ? 'Signing out...' : 'Sign out'}
        </Button>
      </div>
    </div>
  )
}
