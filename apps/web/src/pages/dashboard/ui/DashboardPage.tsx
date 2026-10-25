import { useState, useMemo } from 'react'
import type { UserSpace } from '@/entities/space'
import {
  SpaceCard,
  useUserSpaces,
  resolveSpaceDisplayStatus,
} from '@/entities/space'
import {
  ProtectedRoute,
  CreateSpaceModal,
  RenameSpaceModal,
  validateSpaceCreation,
} from '@/features'
import { signOut } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { Button, Container, useConfirmDialog } from '@/shared/ui'
import { DashboardFilters, type DashboardFilterId } from './DashboardFilters'
import { DashboardEmptyState } from './DashboardEmptyState'

export function DashboardPage() {
  const { confirm } = useConfirmDialog()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [duplicateTarget, setDuplicateTarget] = useState<UserSpace | null>(null)
  const [renameTarget, setRenameTarget] = useState<UserSpace | null>(null)
  const [activeFilter, setActiveFilter] = useState<DashboardFilterId>('all')

  const {
    spaces,
    deleteSpace,
    duplicateSpace,
    renameSpace,
    archiveSpace,
    restoreSpace,
  } = useUserSpaces()

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      await signOut()
    } catch {
      setIsSigningOut(false)
      window.location.assign(ROUTES.AUTH)
    }
  }

  const handleOpenCreateModal = () => {
    if (!validateSpaceCreation(spaces.length, confirm)) return
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('sfy_active_creation_draft')
    }
    setDuplicateTarget(null)
    setIsCreateModalOpen(true)
  }

  const handleDuplicateRequest = (id: string) => {
    if (!validateSpaceCreation(spaces.length, confirm, true)) return
    const target = spaces.find((s) => s.id === id)
    if (target) {
      setDuplicateTarget(target)
      setIsCreateModalOpen(true)
    }
  }

  const handleRenameRequest = (id: string) => {
    const target = spaces.find((s) => s.id === id)
    if (target) setRenameTarget(target)
  }

  const counts = useMemo(() => {
    const res = { all: 0, published: 0, scheduled: 0, draft: 0, archived: 0 }
    for (const s of spaces) {
      if (s.status === 'archived') {
        res.archived += 1
      } else {
        res.all += 1
        const status = resolveSpaceDisplayStatus(s)
        if (status === 'published') res.published += 1
        else if (status === 'scheduled') res.scheduled += 1
        else if (status === 'draft') res.draft += 1
      }
    }
    return res
  }, [spaces])

  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      const isArchived = space.status === 'archived'
      if (activeFilter === 'archived') return isArchived
      if (isArchived) return false

      if (activeFilter === 'all') return true
      return resolveSpaceDisplayStatus(space) === activeFilter
    })
  }, [spaces, activeFilter])

  return (
    <ProtectedRoute>
      {(user) => {
        const displayName = user.name || user.email

        return (
          <div className="animate-fade-in py-8 sm:py-12 md:py-16">
            <Container className="max-w-5xl space-y-10">
              {/* Header section with greeting and primary actions */}
              <div className="border-border-base flex flex-col gap-6 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1.5">
                  <span className="font-heading text-primary text-lg italic">
                    Welcome back,
                  </span>
                  <h1 className="font-heading text-text-primary text-3xl font-medium tracking-tight sm:text-4xl">
                    {displayName}
                  </h1>
                  <p className="text-text-secondary font-sans text-sm">
                    Manage your personal spaces, invitations, and sanctuary
                    settings.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={handleOpenCreateModal}
                  >
                    + Create space
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="text-red-600 hover:border-red-200 hover:bg-red-50 dark:text-red-400 dark:hover:border-red-900/50 dark:hover:bg-red-950/30"
                  >
                    {isSigningOut ? 'Signing out...' : 'Sign out'}
                  </Button>
                </div>
              </div>

              {/* Spaces Overview with Granular Filters */}
              <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-heading text-text-primary text-xl font-medium">
                      Your Spaces
                    </h2>
                    <p className="font-sans text-xs text-stone-400">
                      Intimate sanctuaries crafted for people you hold close.
                    </p>
                  </div>
                  {spaces.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleOpenCreateModal}
                    >
                      + Create a space
                    </Button>
                  )}
                </div>

                {spaces.length > 0 && (
                  <DashboardFilters
                    activeFilter={activeFilter}
                    onSelectFilter={setActiveFilter}
                    counts={counts}
                  />
                )}

                {filteredSpaces.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredSpaces.map((space) => (
                      <SpaceCard
                        key={space.id}
                        space={space}
                        onDelete={deleteSpace}
                        onDuplicate={handleDuplicateRequest}
                        onRename={handleRenameRequest}
                        onArchive={archiveSpace}
                        onRestore={restoreSpace}
                      />
                    ))}
                  </div>
                ) : (
                  <DashboardEmptyState
                    isTotalEmpty={spaces.length === 0}
                    activeFilter={activeFilter}
                    onCreateSpace={handleOpenCreateModal}
                    onResetFilter={() => setActiveFilter('all')}
                  />
                )}
              </div>
            </Container>

            <CreateSpaceModal
              key={duplicateTarget ? `dup-${duplicateTarget.id}` : 'new'}
              isOpen={isCreateModalOpen}
              onClose={() => {
                setIsCreateModalOpen(false)
                setDuplicateTarget(null)
              }}
              sourceSpaceId={duplicateTarget?.id}
              initialTitle={
                duplicateTarget ? `${duplicateTarget.title} (Copy)` : undefined
              }
              initialRecipientName={duplicateTarget?.recipientName}
              onDuplicate={(sourceId, title, recipient) => {
                if (!validateSpaceCreation(spaces.length, confirm, true)) return
                duplicateSpace(sourceId, title, recipient)
              }}
            />

            {renameTarget && (
              <RenameSpaceModal
                key={renameTarget.id}
                isOpen={Boolean(renameTarget)}
                onClose={() => setRenameTarget(null)}
                spaceId={renameTarget.id}
                currentTitle={renameTarget.title}
                currentRecipient={renameTarget.recipientName}
                onRename={(id, newTitle, newRecipient) => {
                  renameSpace(id, newTitle, newRecipient)
                }}
              />
            )}
          </div>
        )
      }}
    </ProtectedRoute>
  )
}
