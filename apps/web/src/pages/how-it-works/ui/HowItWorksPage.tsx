import { Container, Card } from '@/shared/ui'

export function HowItWorksPage() {
  const steps = [
    {
      number: '1',
      title: 'Curate the Moments',
      description:
        'Write letters, upload cherished photographs, add meaningful dates, and embed their favorite songs.',
    },
    {
      number: '2',
      title: 'Craft the Atmosphere',
      description:
        'Tailor the color palette, choose subtle background tunes, and shape a space that feels deeply personal.',
    },
    {
      number: '3',
      title: 'Share Privately',
      description:
        'Generate an encrypted link with optional passcode protection or schedule an unforgettable unlock date.',
    },
  ]

  return (
    <div className="animate-fade-in py-12 sm:py-20">
      <Container className="max-w-5xl space-y-12">
        <div className="space-y-3 text-center">
          <h1 className="font-heading text-text-primary text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            A Gentle, Intentional Process
          </h1>
          <p className="text-text-secondary mx-auto max-w-xl font-sans text-sm leading-relaxed sm:text-base">
            Creating a personalized digital sanctuary takes only a few
            thoughtful steps.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <Card
              key={step.number}
              className="border-border-base/80 bg-bg-surface flex flex-col justify-between space-y-4 border p-6"
            >
              <div className="space-y-3">
                <span className="font-heading text-primary/40 block text-3xl font-medium">
                  0{step.number}
                </span>
                <h3 className="font-heading text-text-primary text-xl font-medium">
                  {step.title}
                </h3>
                <p className="text-text-secondary font-sans text-xs leading-relaxed sm:text-sm">
                  {step.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  )
}
