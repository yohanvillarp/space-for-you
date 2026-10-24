import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { SpaceTemplateId } from '@/entities/space'
import { DEFAULT_TEMPLATE_ID, createNewSpace } from '@/entities/space'
import {
  ProtectedRoute,
  StagePreviewPanel,
  ThemeModeSelector,
  THEME_REGISTRY,
} from '@/features'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Button, Container } from '@/shared/ui'

export function NewSpacePage() {
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<SpaceTemplateId>(DEFAULT_TEMPLATE_ID)
  const navigate = useNavigate()

  const activeTheme =
    THEME_REGISTRY[selectedTemplateId] ?? THEME_REGISTRY.birthday

  const handleStartCrafting = () => {
    const newSpace = createNewSpace(
      selectedTemplateId,
      `${activeTheme.title} Sanctuary`,
      'Someone Special',
    )
    navigate(
      `${ROUTES.STUDIO}?template=${encodeURIComponent(selectedTemplateId)}&spaceId=${encodeURIComponent(newSpace.id)}`,
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
              <h1 className="font-heading text-text-primary text-2xl font-medium tracking-tight sm:text-3xl">
                Craft a New Space
              </h1>
              <p className="text-text-secondary font-sans text-xs sm:text-sm">
                Select the physical stage where their memories will live.
              </p>
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
