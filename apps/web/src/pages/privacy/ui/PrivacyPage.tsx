import { Link } from 'react-router'
import {
  Lock,
  EyeOff,
  CalendarClock,
  UserCheck,
  ArrowRight,
} from 'lucide-react'
import { ROUTES } from '@/shared/config'
import { usePageSeo } from '@/shared/lib'
import { Container, Card, Button } from '@/shared/ui'

const PRIVACY_PILLARS = [
  {
    icon: Lock,
    title: 'Passcode Vault Protection',
    description:
      'Lock any space behind an interactive vault with a 4-to-8 digit secret code and a personal hint only your recipient knows.',
  },
  {
    icon: EyeOff,
    title: 'Unlisted & Never Indexed',
    description:
      'Your spaces never appear in search engines or public feeds. Only someone with your private link or QR card can open it.',
  },
  {
    icon: CalendarClock,
    title: 'Time-Locked Scenes',
    description:
      'Schedule a canvas or letter collection to remain locked until a specific date and hour arrives.',
  },
  {
    icon: UserCheck,
    title: 'No Account Needed for Recipients',
    description:
      'Your recipient can unlock the space, interact with the canvas, play voice recordings, and read letters without signing up.',
  },
]

export function PrivacyPage() {
  usePageSeo({
    title: 'Privacy & Passcode Protection',
    description:
      'Discover how Space for You protects personal spaces with interactive passcode vaults, time-locked scenes, unlisted URLs, and account-free recipient viewing.',
    canonicalPath: '/privacy',
  })

  return (
    <div className="animate-fade-in py-12 sm:py-16">
      <Container className="max-w-5xl space-y-12">
        <div className="space-y-3 text-center">
          <h1 className="font-heading text-text-primary text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            Privacy & Personal Spaces
          </h1>
          <p className="text-text-secondary mx-auto max-w-xl font-sans text-sm leading-relaxed sm:text-base">
            We believe personal letters and shared photographs belong strictly
            between the people they were made for.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PRIVACY_PILLARS.map((item) => {
            const Icon = item.icon
            return (
              <Card
                key={item.title}
                className="border-border-base/80 bg-bg-surface/85 space-y-3 border p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-primary/15 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h2 className="font-heading text-text-primary text-lg font-medium sm:text-xl">
                    {item.title}
                  </h2>
                </div>
                <p className="text-text-secondary font-sans text-xs leading-relaxed sm:text-sm">
                  {item.description}
                </p>
              </Card>
            )
          })}
        </div>

        <div className="flex justify-center pt-2">
          <Button asChild variant="primary" size="md" className="gap-2">
            <Link to={ROUTES.DASHBOARD}>
              <span>Create a private space</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  )
}
