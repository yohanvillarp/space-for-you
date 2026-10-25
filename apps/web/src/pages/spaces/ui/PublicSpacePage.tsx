import { useState, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router'
import { ROUTES } from '@/shared/config'
import { Container, Card, Button } from '@/shared/ui'
import { Home, Loader2, Compass } from 'lucide-react'
import { fetchSpaceBySlug, fetchSpaceById } from '@/entities/space'
import type { SpaceWithScenes } from '@/entities/space'
import {
  LockGateScene,
  DEFAULT_PROTECTION_CONFIG,
  type SpaceProtectionConfig,
} from '@/features/space-lock'
import { PublicSanctuaryViewer } from '@/features/create-space/ui/public'

const CURRENT_YEAR = new Date().getFullYear()

export function PublicSpacePage() {
  const { slug } = useParams<{ slug: string }>()
  const [data, setData] = useState<SpaceWithScenes | null>(null)
  const [isLoading, setIsLoading] = useState(() => Boolean(slug))
  const [isUnlocked, setIsUnlocked] = useState(false)

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
          if (!spaceData?.space?.isProtected) {
            setIsUnlocked(true)
          }
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

  const protectionConfig: SpaceProtectionConfig = useMemo(() => {
    let parsedTheme: Partial<SpaceProtectionConfig> = {}
    try {
      if (data?.protectionTheme) parsedTheme = JSON.parse(data.protectionTheme)
    } catch {
      parsedTheme = {}
    }
    return {
      ...DEFAULT_PROTECTION_CONFIG,
      ...parsedTheme,
      enabled: Boolean(space?.isProtected),
      passcodeHash: data?.passcodeHash,
      passcodeSalt: data?.passcodeSalt,
      hint: data?.passcodeHint,
    }
  }, [data, space?.isProtected])

  if (!isLoading && space?.isProtected && !isUnlocked) {
    return (
      <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col overflow-hidden bg-[#0F0B09]">
        <LockGateScene
          config={protectionConfig}
          spaceTitle={space.title}
          recipientName={space.recipientName}
          onProceedToStage={() => setIsUnlocked(true)}
        />
      </div>
    )
  }

  // Once unlocked and loaded, render the immersive read-only public viewer
  if (!isLoading && data && isUnlocked) {
    return <PublicSanctuaryViewer data={data} />
  }

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
              <Compass className="text-primary h-8 w-8" />
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
