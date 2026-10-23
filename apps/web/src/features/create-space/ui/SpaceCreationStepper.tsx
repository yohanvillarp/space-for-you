import { Check } from 'lucide-react'
import type { CreationStep } from '@/entities/space'
import { cn } from '@/shared/lib'

export interface SpaceCreationStepperProps {
  currentStep: CreationStep
  onStepClick?: (step: CreationStep) => void
  orientation?: 'horizontal' | 'vertical'
}

interface StepConfig {
  id: CreationStep
  label: string
  description: string
  number: number
}

const STEPS: StepConfig[] = [
  {
    id: 'template',
    label: 'Setting & Atmosphere',
    description: 'Select your stage setting',
    number: 1,
  },
  {
    id: 'details',
    label: 'Story & Dedication',
    description: 'Letters, recipient & memories',
    number: 2,
  },
  {
    id: 'preview',
    label: 'Review & Publish',
    description: 'Private link & invitation',
    number: 3,
  },
]

export function SpaceCreationStepper({
  currentStep,
  onStepClick,
  orientation = 'horizontal',
}: SpaceCreationStepperProps) {
  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep)

  if (orientation === 'vertical') {
    return (
      <nav aria-label="Creation Progress" className="w-full">
        <ol className="flex flex-col space-y-1.5">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStepIndex
            const isCurrent = index === currentStepIndex
            const isClickable = Boolean(onStepClick && isCompleted)

            return (
              <li key={step.id}>
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick?.(step.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-all duration-200 select-none',
                    isCurrent &&
                      'border-primary/50 bg-bg-surface ring-primary/20 shadow-xs ring-1',
                    isCompleted &&
                      'border-border-base/70 bg-bg-subtle/50 hover:bg-bg-subtle cursor-pointer',
                    !isCurrent &&
                      !isCompleted &&
                      'cursor-not-allowed border-transparent bg-transparent opacity-50',
                  )}
                >
                  {/* Step Number or Completed Check */}
                  <div
                    className={cn(
                      'font-heading flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-colors',
                      isCurrent && 'bg-primary text-text-inverse',
                      isCompleted && 'bg-primary/15 text-primary',
                      !isCurrent &&
                        !isCompleted &&
                        'bg-bg-subtle text-text-muted',
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      step.number
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        'font-heading truncate text-xs font-medium',
                        isCurrent ? 'text-text-primary' : 'text-text-secondary',
                      )}
                    >
                      {step.label}
                    </p>
                  </div>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }

  return (
    <nav aria-label="Creation Progress" className="w-full">
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStepIndex
          const isCurrent = index === currentStepIndex
          const isClickable = Boolean(onStepClick && isCompleted)

          return (
            <li key={step.id}>
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick?.(step.id)}
                className={cn(
                  'flex w-full items-center gap-3.5 rounded-2xl border p-3.5 text-left transition-all duration-200 select-none',
                  isCurrent &&
                    'border-primary bg-bg-surface ring-primary/30 shadow-xs ring-1',
                  isCompleted &&
                    'border-border-base bg-bg-subtle/60 hover:bg-bg-subtle cursor-pointer',
                  !isCurrent &&
                    !isCompleted &&
                    'border-border-base/40 bg-bg-surface/30 cursor-not-allowed opacity-60',
                )}
              >
                {/* Step Number or Completed Check */}
                <div
                  className={cn(
                    'font-heading flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-medium transition-colors',
                    isCurrent && 'bg-primary text-text-inverse',
                    isCompleted && 'bg-accent/40 text-text-primary',
                    !isCurrent &&
                      !isCompleted &&
                      'bg-bg-subtle text-text-muted',
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : step.number}
                </div>

                {/* Step Label & Subtitle */}
                <div className="truncate">
                  <p
                    className={cn(
                      'font-sans text-xs font-semibold tracking-wide uppercase',
                      isCurrent ? 'text-primary' : 'text-text-secondary',
                    )}
                  >
                    Step {step.number}
                  </p>
                  <p className="font-heading text-text-primary truncate text-sm font-medium">
                    {step.label}
                  </p>
                </div>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
