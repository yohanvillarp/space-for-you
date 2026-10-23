import { Check } from 'lucide-react'
import type { CreationStep } from '@/entities/space'
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

export interface StepIndicatorProps {
  currentStep: CreationStep
  onSelectStep: (step: CreationStep) => void
}

export function StepIndicator({
  currentStep,
  onSelectStep,
}: StepIndicatorProps) {
  return (
    <div className="border-border-base/70 bg-bg-surface/80 rounded-2xl border p-3.5 px-5 shadow-xs backdrop-blur-md">
      <div className="flex items-center justify-between gap-3">
        {CREATION_STEPS.map((step, idx) => {
          const isCurrent = step.id === currentStep
          const isCompleted =
            (currentStep === 'details' && step.number === 1) ||
            (currentStep === 'preview' && step.number <= 2)

          return (
            <div key={step.id} className="flex flex-1 items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectStep(step.id)}
                className={cn(
                  'flex cursor-pointer items-center gap-2.5 text-left transition-all select-none',
                  isCurrent && 'text-text-primary font-medium',
                  isCompleted && 'text-text-secondary hover:text-text-primary',
                  !isCurrent && !isCompleted && 'text-text-muted opacity-60',
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
  )
}
