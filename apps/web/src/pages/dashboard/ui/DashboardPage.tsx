import { useState } from 'react'
import { Link } from 'react-router'
import { ProtectedRoute } from '@/features'
import { signOut } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { Button, Card, Container } from '@/shared/ui'
import { Logomark } from '@/shared/ui/logo'

export function DashboardPage() {
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      await signOut()
    } catch {
      setIsSigningOut(false)
      window.location.assign(ROUTES.AUTH)
    }
  }

  return (
    <ProtectedRoute>
      {(user) => {
        const displayName = user.name || user.email

        return (
          <div className="animate-fade-in py-8 sm:py-12 md:py-16">
            <Container className="max-w-5xl space-y-10">
              {/* Header section with user greeting and actions */}
              <div className="border-border-base flex flex-col gap-6 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1.5">
                  <span className="font-heading text-primary text-lg italic">
                    Welcome back,
                  </span>
                  <h1 className="font-heading text-text-primary text-3xl font-medium tracking-tight sm:text-4xl">
                    {displayName}
                  </h1>
                  <p className="text-text-secondary font-sans text-sm">
                    Manage your personal spaces, invitations, and sanctuary
                    settings.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button asChild variant="primary" size="md">
                    <Link to={ROUTES.NEW_SPACE}>+ Create space</Link>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="text-red-600 hover:border-red-200 hover:bg-red-50 dark:text-red-400 dark:hover:border-red-900/50 dark:hover:bg-red-950/30"
                  >
                    {isSigningOut ? 'Signing out...' : 'Sign out'}
                  </Button>
                </div>
              </div>

              {/* Spaces Overview */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-text-primary text-xl font-medium">
                    Your Spaces
                  </h2>
                  <Button asChild variant="outline" size="sm">
                    <Link to={ROUTES.NEW_SPACE}>+ Create a space</Link>
                  </Button>
                </div>

                <Card className="space-y-4 border-2 border-dashed px-6 py-16 text-center">
                  <div className="bg-secondary/20 text-primary mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
                    <Logomark className="h-7 w-7" />
                  </div>
                  <div className="mx-auto max-w-md space-y-1.5">
                    <h3 className="font-heading text-text-primary text-xl font-medium">
                      No spaces created yet
                    </h3>
                    <p className="text-text-secondary font-sans text-sm leading-relaxed">
                      Start crafting an intimate digital space with heartfelt
                      notes, photographs, and thoughtful music.
                    </p>
                  </div>
                  <div className="pt-3">
                    <Button asChild variant="primary" size="md">
                      <Link to={ROUTES.NEW_SPACE}>Start your first space</Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </Container>
          </div>
        )
      }}
    </ProtectedRoute>
  )
}
