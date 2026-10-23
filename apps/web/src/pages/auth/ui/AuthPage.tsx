import { PublicOnlyRoute, GoogleSignInButton } from '@/features'
import { Card, Container } from '@/shared/ui'
import { Logomark } from '@/shared/ui/logo'

export function AuthPage() {
  return (
    <PublicOnlyRoute>
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 sm:py-20">
        <Container className="mx-auto w-full max-w-md">
          <Card className="border-border-base/80 p-6 shadow-md sm:p-8">
            <div className="space-y-6 text-center">
              {/* Brand mark */}
              <div className="bg-primary/10 text-primary mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl">
                <Logomark className="h-6 w-6" />
              </div>

              {/* Headings */}
              <div className="space-y-2">
                <h1 className="font-heading text-text-primary text-2xl font-medium tracking-tight sm:text-3xl">
                  Welcome back
                </h1>
                <p className="text-text-secondary mx-auto max-w-xs font-sans text-sm leading-relaxed">
                  Sign in to cultivate and share intimate digital spaces for
                  someone special.
                </p>
              </div>

              {/* Primary OAuth CTA */}
              <div className="pt-2">
                <GoogleSignInButton />
              </div>

              {/* Subtle disclaimer */}
              <p className="text-text-muted border-border-base/50 border-t pt-4 font-sans text-xs">
                Secure authentication powered by Appwrite Auth OAuth2.
              </p>
            </div>
          </Card>
        </Container>
      </div>
    </PublicOnlyRoute>
  )
}
