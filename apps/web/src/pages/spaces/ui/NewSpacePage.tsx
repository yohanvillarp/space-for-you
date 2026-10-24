import type { CreationStep, SpaceTemplateId } from '@/entities/space'
import { DEFAULT_TEMPLATE_ID } from '@/entities/space'
import {
  ProtectedRoute,
  ShareableKeepsakeCard,
  StagePreviewPanel,
  THEME_REGISTRY,
} from '@/features'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Card, Container } from '@/shared/ui'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { DetailsStepSidebar } from './wizard/DetailsStepSidebar'
import { PreviewStepSidebar } from './wizard/PreviewStepSidebar'
import { StepIndicator } from './wizard/StepIndicator'
import { ThemeStepSidebar } from './wizard/ThemeStepSidebar'

export function NewSpacePage() {
  const [currentStep, setCurrentStep] = useState<CreationStep>('template')
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<SpaceTemplateId>(DEFAULT_TEMPLATE_ID)
  const [recipientName, setRecipientName] = useState('Sophia')
  const navigate = useNavigate()

  const activeTheme =
    THEME_REGISTRY[selectedTemplateId] ?? THEME_REGISTRY.birthday

  const previewPath = `/spaces/preview/${selectedTemplateId}`
  const fullShareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${previewPath}`
      : previewPath

  const handleNextStep = () => {
    if (currentStep === 'template') {
      setCurrentStep('details')
    } else if (currentStep === 'details') {
      setCurrentStep('preview')
    }
  }

  const handlePrevStep = () => {
    if (currentStep === 'details') {
      setCurrentStep('template')
    } else if (currentStep === 'preview') {
      setCurrentStep('details')
    } else {
      navigate(ROUTES.DASHBOARD)
    }
  }

  const getTapeColor = () => {
    switch (selectedTemplateId) {
      case 'birthday':
        return 'gold'
      case 'anniversary':
        return 'rose'
      case 'friendship':
        return 'sage'
      default:
        return 'rose'
    }
  }

  return (
    <ProtectedRoute>
      {() => (
        <div className="animate-fade-in relative min-h-[calc(100vh-80px)] py-6 sm:py-8 md:py-10">
          {/* Dynamic Ambient Full-Screen Atmosphere */}
          <div
            className={cn(
              'pointer-events-none fixed inset-0 -z-10 bg-radial opacity-20 blur-3xl transition-all duration-1000',
              activeTheme.ambientGlow,
            )}
            aria-hidden="true"
          />

          <Container className="max-w-[1520px] space-y-6">
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

            {/* Studio Lateral Layout Grid */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start xl:gap-8">
              {/* Left Column: Clean Sidebar Controls */}
              <aside className="space-y-6 lg:col-span-4 xl:col-span-3">
                <div className="space-y-1">
                  <h1 className="font-heading text-text-primary text-2xl font-medium tracking-tight sm:text-3xl">
                    {currentStep === 'preview'
                      ? 'Share Your Sanctuary'
                      : 'Craft a New Space'}
                  </h1>
                  <p className="text-text-secondary font-sans text-xs leading-relaxed sm:text-sm">
                    {currentStep === 'preview'
                      ? 'Copy your customized keepsake card image to paste in WhatsApp.'
                      : 'Select the physical stage where their memories will live.'}
                  </p>
                </div>

                {currentStep === 'template' && (
                  <ThemeStepSidebar
                    selectedTemplateId={selectedTemplateId}
                    onSelectTemplate={setSelectedTemplateId}
                    activeTheme={activeTheme}
                    onNextStep={handleNextStep}
                  />
                )}

                {currentStep === 'details' && (
                  <DetailsStepSidebar
                    activeTheme={activeTheme}
                    onPrevStep={handlePrevStep}
                    onNextStep={handleNextStep}
                  />
                )}

                {currentStep === 'preview' && (
                  <PreviewStepSidebar
                    activeTheme={activeTheme}
                    recipientName={recipientName}
                    onPrevStep={handlePrevStep}
                  />
                )}
              </aside>

              {/* Right Column: Central Step Progress + Content */}
              <main className="animate-fade-in space-y-5 lg:col-span-8 xl:col-span-9">
                <StepIndicator
                  currentStep={currentStep}
                  onSelectStep={setCurrentStep}
                />

                {currentStep === 'template' && (
                  <StagePreviewPanel
                    key={selectedTemplateId}
                    templateId={selectedTemplateId}
                  />
                )}

                {currentStep === 'details' && (
                  <Card className="border-border-base bg-bg-surface/60 space-y-4 border-2 border-dashed p-8 text-center sm:p-12">
                    <div className="bg-primary/10 text-primary mx-auto flex h-12 w-12 items-center justify-center rounded-2xl">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div className="mx-auto max-w-md space-y-1.5">
                      <h3 className="font-heading text-text-primary text-lg font-medium">
                        Story & Letters Hub
                      </h3>
                      <p className="text-text-secondary font-sans text-xs leading-relaxed sm:text-sm">
                        In this step you will write the personal letter,
                        dedicate the milestone songs, and attach photos for{' '}
                        <strong>{recipientName}</strong>.
                      </p>
                    </div>
                  </Card>
                )}

                {currentStep === 'preview' && (
                  <ShareableKeepsakeCard
                    recipientName={recipientName}
                    onRecipientNameChange={setRecipientName}
                    title={activeTheme.title}
                    stageName={activeTheme.stageName}
                    url={fullShareUrl}
                    accentColor={activeTheme.accentColor}
                    tapeColor={getTapeColor()}
                  />
                )}
              </main>
            </div>
          </Container>
        </div>
      )}
    </ProtectedRoute>
  )
}
