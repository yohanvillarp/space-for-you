import { Link } from 'react-router'
import { Mic, Mail, Lock, QrCode, ArrowRight } from 'lucide-react'
import { ROUTES } from '@/shared/config'
import { Card, Button } from '@/shared/ui'

const SPACE_CAPABILITIES = [
  {
    icon: Mic,
    title: 'Interactive Canvas & Voice Notes',
    description:
      'Arrange Polaroid photos, record personal voice messages, and place dynamic keepsakes, notes, and postcards on a 16:9 stage.',
    accent: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: Mail,
    title: 'Heartfelt Letters',
    description:
      'Write a collection of letters with custom stationery and wax seals that open in a dedicated reading view.',
    accent: 'text-primary bg-primary/10 border-primary/20',
  },
  {
    icon: Lock,
    title: 'Passcode Vault & Time Locks',
    description:
      'Protect the space with a secret code or schedule individual scenes to unlock on a special date.',
    accent: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: QrCode,
    title: 'Printable QR Keepsake Card',
    description:
      'Download a dedication card with a QR code so your recipient can open their space without an account.',
    accent: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
  },
]

export function HomeSanctuaryPillars() {
  return (
    <section className="space-y-10 py-16 sm:py-20">
      <div className="mx-auto max-w-xl space-y-2.5 text-center">
        <h2 className="font-heading text-text-primary text-2xl font-medium tracking-tight sm:text-3xl">
          What lives inside a space
        </h2>
        <p className="text-text-secondary font-sans text-sm leading-relaxed">
          Combine an interactive canvas, voice recordings, handwritten letters,
          and private locks inside a single link.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {SPACE_CAPABILITIES.map((item) => {
          const Icon = item.icon
          return (
            <Card
              key={item.title}
              className="border-border-base/80 bg-bg-surface/80 space-y-2.5 border p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border ${item.accent}`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="font-heading text-text-primary text-lg font-medium">
                  {item.title}
                </h3>
              </div>
              <p className="text-text-secondary font-sans text-xs leading-relaxed sm:text-sm">
                {item.description}
              </p>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-center pt-2">
        <Button asChild variant="outline" size="md" className="gap-2">
          <Link to={ROUTES.EXAMPLES}>
            <span>Explore interactive stages</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
