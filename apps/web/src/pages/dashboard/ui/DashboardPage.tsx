import { useState } from 'react'
import { Link } from 'react-router'
import { ProtectedRoute, ThemeToggle } from '@/features'
import { signOut } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { Button, Card, Container, Badge } from '@/shared/ui'
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
            <Container className="max-w-6xl space-y-10">
              {/* Header section with user greeting and sign out */}
              <div className="border-border-base flex flex-col gap-6 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="font-heading text-primary text-lg italic">
                      Welcome back,
                    </span>
                    <Badge variant="outline">Personal Sanctuary</Badge>
                  </div>
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

              {/* Main dashboard content */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left: Spaces Overview & Workshop Action */}
                <div className="space-y-6 lg:col-span-8">
                  <div className="flex items-center justify-between">
                    <h2 className="font-heading text-text-primary text-xl font-medium">
                      Your Spaces
                    </h2>
                    <Button asChild variant="primary" size="sm">
                      <Link to={ROUTES.NEW_SPACE}>+ Create a space</Link>
                    </Button>
                  </div>

                  <Card className="space-y-4 border-2 border-dashed px-6 py-12 text-center">
                    <div className="bg-secondary/20 text-primary mx-auto flex h-12 w-12 items-center justify-center rounded-2xl">
                      <Logomark className="h-6 w-6" />
                    </div>
                    <div className="mx-auto max-w-sm space-y-1">
                      <h3 className="font-heading text-text-primary text-lg font-medium">
                        No spaces created yet
                      </h3>
                      <p className="text-text-secondary font-sans text-sm leading-relaxed">
                        Start crafting an intimate digital space with heartfelt
                        notes, photographs, and thoughtful music.
                      </p>
                    </div>
                    <div className="pt-2">
                      <Button asChild variant="primary" size="md">
                        <Link to={ROUTES.NEW_SPACE}>
                          Start your first space
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* Right: Account & Session Profile Card */}
                <div className="space-y-6 lg:col-span-4">
                  <h2 className="font-heading text-text-primary text-xl font-medium">
                    Profile & Settings
                  </h2>

                  <Card className="bg-bg-surface space-y-4 p-5">
                    <div className="border-border-base/50 flex items-center gap-3 border-b pb-3">
                      <div className="bg-primary text-text-inverse font-heading flex h-10 w-10 items-center justify-center rounded-full text-lg font-medium uppercase">
                        {displayName.charAt(0)}
                      </div>
                      <div className="truncate">
                        <p className="text-text-primary truncate font-sans text-sm font-medium">
                          {user.name || 'Personal Account'}
                        </p>
                        <p className="text-text-secondary truncate font-sans text-xs">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="text-text-secondary space-y-2.5 font-sans text-xs">
                      <div className="border-border-base/30 flex justify-between border-b py-1">
                        <span>Account ID:</span>
                        <span className="text-text-primary max-w-[150px] truncate font-mono">
                          {user.$id}
                        </span>
                      </div>
                      <div className="border-border-base/30 flex justify-between border-b py-1">
                        <span>Email Verification:</span>
                        <span className="text-text-primary">
                          {user.emailVerification ? 'Verified' : 'Unverified'}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Member Since:</span>
                        <span className="text-text-primary">
                          {new Date(user.$createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Theme Appearance Setting in User Settings */}
                    <div className="border-border-base/40 space-y-2 border-t pt-3.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-text-primary font-sans text-xs font-medium">
                            Appearance
                          </p>
                          <p className="text-text-muted font-sans text-[11px]">
                            Auto-detects from machine by default
                          </p>
                        </div>
                        <ThemeToggle variant="segmented" size="sm" />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Container>
          </div>
        )
      }}
    </ProtectedRoute>
  )
}
