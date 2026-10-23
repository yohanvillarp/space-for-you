import { Link, useParams } from 'react-router'
import { ROUTES } from '@/shared/config'
import { Container, Card, Button, Badge } from '@/shared/ui'
import { Heart, Sparkles, Home } from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

export function PublicSpacePage() {
  const { slug } = useParams<{ slug: string }>()

  return (
    <div className="animate-fade-in bg-bg-base text-text-primary flex min-h-screen flex-col justify-between px-4 py-12 sm:px-6">
      <div className="border-border-subtle mx-auto flex w-full max-w-4xl items-center justify-between border-b pb-6">
        <Link
          to={ROUTES.HOME}
          className="group text-text-secondary hover:text-text-primary inline-flex items-center gap-2 font-sans text-xs transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Space For You</span>
        </Link>
        <Badge variant="accent" className="text-[10px]">
          Dedicated Sanctuary
        </Badge>
      </div>

      <Container className="my-auto max-w-2xl space-y-6 py-8 text-center">
        <div className="relative inline-flex items-center justify-center">
          <div className="bg-primary/10 animate-glow absolute -inset-2 rounded-full blur-xl" />
          <div className="bg-primary/10 text-primary relative flex h-16 w-16 items-center justify-center rounded-full">
            <Heart className="fill-primary/20 text-primary h-8 w-8" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-heading text-text-primary text-3xl font-medium tracking-tight sm:text-4xl">
            A Space Created For You
          </h1>
          <p className="text-text-secondary mx-auto max-w-md font-sans text-sm leading-relaxed">
            You are viewing the dedicated sanctuary for{' '}
            <span className="text-text-primary font-mono font-medium">
              {slug || 'someone special'}
            </span>
            .
          </p>
        </div>

        <Card className="border-border-base bg-bg-surface/90 space-y-4 p-8 backdrop-blur-sm sm:p-10">
          <div className="space-y-2">
            <p className="font-heading text-text-primary text-base leading-relaxed italic sm:text-lg">
              “This space was designed with care to keep our quiet moments,
              letters, and shared stories close at hand.”
            </p>
          </div>
          <div className="text-text-muted flex items-center justify-center gap-2 pt-2 font-sans text-xs">
            <Sparkles className="text-primary h-3.5 w-3.5" />
            <span>Interactive recipient viewing experience coming soon</span>
          </div>
        </Card>

        <div>
          <Button asChild variant="outline" size="sm">
            <Link to={ROUTES.HOME}>
              Create a space for someone you care about
            </Link>
          </Button>
        </div>
      </Container>

      <div className="border-border-subtle text-text-muted mx-auto w-full max-w-4xl border-t pt-6 text-center font-sans text-xs">
        <span>&copy; {CURRENT_YEAR} Space For You. Private & Intimate.</span>
      </div>
    </div>
  )
}
