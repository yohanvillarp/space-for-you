import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowLeft, ArrowRight, Sparkles, Check } from 'lucide-react'
import {
  ProtectedRoute,
  ThemeSelectorList,
  StageExperienceHub,
  ShareableKeepsakeCard,
  THEME_REGISTRY,
} from '@/features'
import { DEFAULT_TEMPLATE_ID } from '@/entities/space'
import type { SpaceTemplateId, CreationStep } from '@/entities/space'
import { ROUTES } from '@/shared/config'
import { Container, Button, Card } from '@/shared/ui'
import { cn } from '@/shared/lib'

const CREATION_STEPS = [
  {
    id: 'template',
    number: 1,
    label: 'Choose Stage',
    hint: 'Select & preview setting',
  },
  {
    id: 'details',
    number: 2,
    label: 'Story & Photos',
    hint: 'Pen letters & add memories',
  },
  {
    id: 'preview',
    number: 3,
    label: 'Shareable Card',
    hint: 'Keepsake card & copy for chat',
  },
] as const

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

          <Container className="max-w-7xl space-y-6">
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
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start xl:gap-10">
              {/* Left Column: Clean Sidebar Controls (Col-Span 5) */}
              <aside className="space-y-6 lg:col-span-5 xl:col-span-4">
                {/* Title Narrative */}
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

                {/* Step 1 Controls: Theme Setting Options */}
                {currentStep === 'template' && (
                  <div className="animate-fade-in space-y-4">
                    <ThemeSelectorList
                      selectedTemplateId={selectedTemplateId}
                      onSelectTemplate={setSelectedTemplateId}
                    />

                    {/* Action Button to proceed */}
                    <div className="pt-2">
                      <Button
                        type="button"
                        variant="primary"
                        size="md"
                        onClick={handleNextStep}
                        className="group w-full cursor-pointer justify-center gap-2 py-3 shadow-xs"
                      >
                        <span>Continue to Personalize</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2 Controls: Story & Details (Next Step Placeholder) */}
                {currentStep === 'details' && (
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
                          Pen your letters, upload photos, and link playlists
                          tailored to the{' '}
                          <strong className="text-text-primary">
                            {activeTheme.title}
                          </strong>{' '}
                          stage.
                        </p>
                      </div>
                    </Card>

                    <div className="flex items-center gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="md"
                        onClick={handlePrevStep}
                        className="flex-1 cursor-pointer"
                      >
                        ← Back to Stage
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        size="md"
                        onClick={handleNextStep}
                        className="flex-1 cursor-pointer gap-1"
                      >
                        <span>Share Card</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3 Controls: Summary & Publish Action */}
                {currentStep === 'preview' && (
                  <div className="animate-fade-in space-y-4">
                    <Card className="border-border-base bg-bg-surface/70 space-y-3 border p-5">
                      <span className="font-heading text-primary text-xs font-semibold italic">
                        Sanctuary Ready
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
                        onClick={handlePrevStep}
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
                        <Link to={ROUTES.DASHBOARD}>Publish Sanctuary</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </aside>

              {/* Right Column: Central Step Progress + Content (Col-Span 7 or 8) */}
              <main className="animate-fade-in space-y-5 lg:col-span-7 xl:col-span-8">
                {/* Central Step Progress Bar positioned right above the main area */}
                <div className="border-border-base/70 bg-bg-surface/80 rounded-2xl border p-3.5 px-5 shadow-xs backdrop-blur-md">
                  <div className="flex items-center justify-between gap-3">
                    {CREATION_STEPS.map((step, idx) => {
                      const isCurrent = step.id === currentStep
                      const isCompleted =
                        (currentStep === 'details' && step.number === 1) ||
                        (currentStep === 'preview' && step.number <= 2)

                      return (
                        <div
                          key={step.id}
                          className="flex flex-1 items-center gap-3"
                        >
                          <button
                            type="button"
                            onClick={() => setCurrentStep(step.id)}
                            className={cn(
                              'flex cursor-pointer items-center gap-2.5 text-left transition-all select-none',
                              isCurrent && 'text-text-primary font-medium',
                              isCompleted &&
                                'text-text-secondary hover:text-text-primary',
                              !isCurrent &&
                                !isCompleted &&
                                'text-text-muted opacity-60',
                            )}
                          >
                            <div
                              className={cn(
                                'font-heading flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                                isCurrent &&
                                  'bg-primary text-text-inverse ring-primary/20 ring-2',
                                isCompleted && 'bg-primary/20 text-primary',
                                !isCurrent &&
                                  !isCompleted &&
                                  'bg-bg-subtle text-text-muted border-border-base/50 border',
                              )}
                            >
                              {isCompleted ? (
                                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                              ) : (
                                step.number
                              )}
                            </div>

                            <div className="hidden sm:block">
                              <p
                                className={cn(
                                  'font-heading text-xs',
                                  isCurrent && 'text-primary font-semibold',
                                )}
                              >
                                {step.label}
                              </p>
                              <p className="text-text-muted truncate font-sans text-[10px]">
                                {step.hint}
                              </p>
                            </div>
                          </button>

                          {idx < CREATION_STEPS.length - 1 && (
                            <div className="bg-border-base/60 mx-1 hidden h-[1px] flex-1 md:block" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Step 1 View: Live Stage Experience Hub */}
                {currentStep === 'template' && (
                  <StageExperienceHub templateId={selectedTemplateId} />
                )}

                {/* Step 2 View: Story placeholder hub */}
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

                {/* Step 3 View: Full Shareable Keepsake Card Studio */}
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
