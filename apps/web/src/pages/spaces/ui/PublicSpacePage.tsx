import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { ROUTES } from '@/shared/config'
import { Container, Card, Button } from '@/shared/ui'
import { Heart, Home, ArrowRight, Loader2, Compass } from 'lucide-react'
import { fetchSpaceBySlug, fetchSpaceById } from '@/entities/space'
import type { SpaceWithScenes } from '@/entities/space'

const CURRENT_YEAR = new Date().getFullYear()

export function PublicSpacePage() {
  const { slug } = useParams<{ slug: string }>()
  const [data, setData] = useState<SpaceWithScenes | null>(null)
  const [isLoading, setIsLoading] = useState(() => Boolean(slug))

  useEffect(() => {
    if (!slug) return

    let isMounted = true

    // Attempt fetching by slug first, then fallback to ID
    fetchSpaceBySlug(slug)
      .then(async (result) => {
        if (result) return result
        return fetchSpaceById(slug)
      })
      .then((spaceData) => {
        if (isMounted) {
          setData(spaceData)
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (isMounted) {
          setData(null)
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [slug])

  const space = data?.space
  const recipient = space?.recipientName || slug || 'Someone Special'
  const studioHref = space
    ? `${ROUTES.STUDIO}?spaceId=${space.id}&template=${space.templateId}`
    : ROUTES.HOME

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
      </div>

      <Container className="my-auto max-w-2xl space-y-6 py-8 text-center">
        <div className="relative inline-flex items-center justify-center">
          <div className="bg-primary/10 animate-glow absolute -inset-2 rounded-full blur-xl" />
          <div className="bg-primary/10 text-primary relative flex h-16 w-16 items-center justify-center rounded-full">
            {isLoading ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
              <Heart className="fill-primary/20 text-primary h-8 w-8" />
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            <h1 className="font-heading text-text-primary text-2xl font-medium sm:text-3xl">
              Opening Sanctuary...
            </h1>
            <p className="text-text-secondary font-sans text-sm">
              Gathering memories and letters from the cloud.
            </p>
          </div>
        ) : space ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="font-heading text-primary text-base italic">
                A personal sanctuary for
              </span>
              <h1 className="font-heading text-text-primary text-3xl font-medium tracking-tight sm:text-4xl">
                {space.title}
              </h1>
              <p className="text-text-secondary mx-auto max-w-md font-sans text-sm leading-relaxed">
                Dedicated to{' '}
                <span className="text-text-primary font-medium">
                  {recipient}
                </span>
                {data.senderName ? ` by ${data.senderName}` : ''}.
              </p>
            </div>

            <Card className="border-border-base bg-bg-surface/90 space-y-4 p-8 text-left backdrop-blur-sm sm:p-10">
              <p className="font-heading text-text-primary text-center text-base leading-relaxed italic sm:text-lg">
                “
                {data.dedicationMessage ||
                  'An intimate collection of moments, letters, and memories curated just for you.'}
                ”
              </p>
              <div className="border-border-subtle text-text-muted flex items-center justify-center gap-4 border-t pt-4 text-xs">
                <span>{space.scenesCount} scenes</span>
                <span>•</span>
                <span>{space.artifactsCount} memories</span>
                <span>•</span>
                <span className="capitalize">{space.templateId} Theme</span>
              </div>
            </Card>

            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
              <Button
                asChild
                variant="primary"
                size="lg"
                className="w-full gap-2 sm:w-auto"
              >
                <Link to={studioHref}>
                  <span>Enter Sanctuary</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="font-heading text-text-primary text-3xl font-medium tracking-tight sm:text-4xl">
                Sanctuary Not Found
              </h1>
              <p className="text-text-secondary mx-auto max-w-md font-sans text-sm leading-relaxed">
                The space you are looking for has not been published yet or the
                link has expired.
              </p>
            </div>

            <Card className="border-border-base bg-bg-surface/90 space-y-4 p-8 text-center backdrop-blur-sm sm:p-10">
              <Compass className="text-primary mx-auto h-8 w-8 opacity-70" />
              <p className="text-text-secondary font-sans text-sm">
                You can create a meaningful digital sanctuary for someone
                special in just a few minutes.
              </p>
            </Card>

            <div>
              <Button asChild variant="primary" size="md">
                <Link to={ROUTES.HOME}>Create a Sanctuary</Link>
              </Button>
            </div>
          </div>
        )}
      </Container>

      <div className="border-border-subtle text-text-muted mx-auto w-full max-w-4xl border-t pt-6 text-center font-sans text-xs">
        <span>&copy; {CURRENT_YEAR} Space For You. Private & Intimate.</span>
      </div>
    </div>
  )
}
