import type { SpaceTemplateId, UserSpace } from '@/entities/space'
import {
  DEFAULT_TEMPLATE_ID,
  createNewSpace,
  getSpaceById,
  saveSpace,
  useUserSpaces,
} from '@/entities/space'
import {
  getSpaceStorageKeys,
  saveToStorage,
  createInitialScenesForTemplate,
} from '@/features/create-space/ui/editor/multi-scene-storage'
import {
  ProtectedRoute,
  StagePreviewPanel,
  THEME_REGISTRY,
  ThemeModeSelector,
  validateSpaceCreation,
} from '@/features'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Button, Container, useConfirmDialog } from '@/shared/ui'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'

export function NewSpacePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { spaces } = useUserSpaces()
  const { confirm } = useConfirmDialog()

  const rawRecipient = searchParams.get('recipient')?.trim()
  const rawTitle = searchParams.get('title')?.trim()
  const recipientName = rawRecipient || 'Someone Special'

  const [selectedTemplateId, setSelectedTemplateId] =
    useState<SpaceTemplateId>(DEFAULT_TEMPLATE_ID)

  const activeTheme =
    THEME_REGISTRY[selectedTemplateId] ?? THEME_REGISTRY.birthday

  const spaceTitle =
    rawTitle ||
    (rawRecipient
      ? `${rawRecipient}'s ${activeTheme.title} Sanctuary`
      : `${activeTheme.title} Sanctuary`)

  const handleStartCrafting = () => {
    if (!validateSpaceCreation(spaces.length, confirm)) {
      navigate(ROUTES.DASHBOARD)
      return
    }

    const activeDraftId =
      searchParams.get('spaceId')?.trim() ||
      (typeof window !== 'undefined'
        ? sessionStorage.getItem('sfy_active_creation_draft')
        : null)

    const existingDraft = activeDraftId
      ? getSpaceById(activeDraftId)
      : undefined
    let spaceToOpen: UserSpace

    if (existingDraft && existingDraft.status === 'draft') {
      const keys = getSpaceStorageKeys(existingDraft.id, selectedTemplateId)
      if (existingDraft.templateId !== selectedTemplateId) {
        saveToStorage(
          keys.scenesKey,
          createInitialScenesForTemplate(selectedTemplateId),
        )
      }
      spaceToOpen = saveSpace({
        ...existingDraft,
        templateId: selectedTemplateId,
        title: spaceTitle,
        recipientName,
        updatedAt: new Date().toISOString(),
      })
    } else {
      spaceToOpen = createNewSpace(
        selectedTemplateId,
        spaceTitle,
        recipientName,
      )
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('sfy_active_creation_draft', spaceToOpen.id)
      }
    }

    navigate(
      `${ROUTES.STUDIO}?template=${encodeURIComponent(selectedTemplateId)}&spaceId=${encodeURIComponent(spaceToOpen.id)}`,
      { replace: true },
    )
  }

  return (
    <ProtectedRoute>
      {() => (
        <div className="animate-fade-in relative min-h-[calc(100vh-80px)] py-6 sm:py-8">
          {/* Dynamic Ambient Full-Screen Atmosphere */}
          <div
            className={cn(
              'pointer-events-none fixed inset-0 -z-10 bg-radial opacity-20 blur-3xl transition-all duration-1000',
              activeTheme.ambientGlow,
            )}
            aria-hidden="true"
          />

          <Container className="max-w-[1360px] space-y-6">
            {/* Minimalist Top Studio Bar */}
            <div className="border-border-base/40 flex items-center justify-between border-b pb-4">
              <Link
                to={ROUTES.DASHBOARD}
                className="group text-text-secondary hover:text-text-primary inline-flex items-center gap-2 font-sans text-xs transition-colors"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Dashboard</span>
              </Link>

              <div className="text-text-muted flex items-center gap-2 font-sans text-xs">
                <span className="bg-primary h-1.5 w-1.5 rounded-full" />
                <span>Creation Studio</span>
              </div>
            </div>

            {/* Page Title Header */}
            <div className="space-y-1 text-center">
              <h3 className="text-text-secondary font-sans text-xs sm:text-sm">
                {rawRecipient
                  ? `Select the physical stage where ${rawRecipient}'s memories will live.`
                  : 'Select the physical stage where their memories will live.'}
              </h3>
            </div>

            {/* Main Stage Selection Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
              {/* Left: Dynamic Vertical Mode Selector */}
              <aside className="flex flex-col lg:col-span-5 xl:col-span-4">
                <ThemeModeSelector
                  selectedTemplateId={selectedTemplateId}
                  onSelectTemplate={setSelectedTemplateId}
                  orientation="vertical"
                />
              </aside>

              {/* Right: Stage Preview Panel */}
              <main className="flex flex-col lg:col-span-7 xl:col-span-8">
                <StagePreviewPanel
                  key={selectedTemplateId}
                  templateId={selectedTemplateId}
                />
              </main>
            </div>

            {/* Action Button: Directly Enter Studio */}
            <div className="flex justify-center pt-4 pb-8">
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleStartCrafting}
                className="group cursor-pointer gap-2 px-8 py-3 shadow-md"
              >
                <span>Start Crafting in Studio</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </Container>
        </div>
      )}
    </ProtectedRoute>
  )
}
