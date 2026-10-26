import { Link } from 'react-router'
import { Sparkles, Image, Mail, QrCode, ArrowRight } from 'lucide-react'
import { ROUTES } from '@/shared/config'
import { Container, Card, Button } from '@/shared/ui'

const WORKFLOW_STEPS = [
  {
    number: '01',
    icon: Sparkles,
    title: 'Choose a Stage',
    description:
      'Select the Candlelit Celebration Table, the Love Letter Desk, or the Memory Corkboard and write your opening dedication.',
  },
  {
    number: '02',
    icon: Image,
    title: 'Arrange the Interactive Canvas',
    description:
      'Place Polaroid photos, record personal voice messages, and arrange dynamic keepsakes, postcards, and notes on a proportional 16:9 stage.',
  },
  {
    number: '03',
    icon: Mail,
    title: 'Seal Letters & Set Locks',
    description:
      'Write heartfelt letters with custom wax seals, and optionally lock the space with a secret passcode or a future unlock date.',
  },
  {
    number: '04',
    icon: QrCode,
    title: 'Share a Link or QR Card',
    description:
      'Send a private link or print a dedication card with a QR code. Your recipient opens their space without needing an account.',
  },
]

export function HowItWorksPage() {
  return (
    <div className="animate-fade-in py-12 sm:py-16">
      <Container className="max-w-5xl space-y-12">
        <div className="space-y-3 text-center">
          <h1 className="font-heading text-text-primary text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            How It Works
          </h1>
          <p className="text-text-secondary mx-auto max-w-xl font-sans text-sm leading-relaxed sm:text-base">
            Create an interactive space in the studio and share it as a private
            keepsake.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {WORKFLOW_STEPS.map((step) => {
            const Icon = step.icon
            return (
              <Card
                key={step.number}
                className="border-border-base/80 bg-bg-surface/85 flex flex-col justify-between space-y-4 border p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="bg-primary/15 text-primary flex h-9 w-9 items-center justify-center rounded-xl">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-heading text-primary/40 text-2xl font-medium">
                    {step.number}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-heading text-text-primary text-xl font-medium">
                    {step.title}
                  </h2>
                  <p className="text-text-secondary font-sans text-xs leading-relaxed sm:text-sm">
                    {step.description}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="flex justify-center pt-2">
          <Button asChild variant="primary" size="md" className="gap-2">
            <Link to={ROUTES.DASHBOARD}>
              <span>Create a space</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  )
}
