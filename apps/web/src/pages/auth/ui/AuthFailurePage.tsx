import { Link } from 'react-router'
import { ROUTES } from '@/shared/config'
import { Card, Container, Button } from '@/shared/ui'

export function AuthFailurePage() {
  const url = new URL(window.location.href)
  const failureMessage =
    url.searchParams.get('message') ||
    'The OAuth authorization request was canceled or failed to complete.'

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 sm:py-20">
      <Container className="mx-auto w-full max-w-md">
        <Card className="border-border-base/80 space-y-6 p-6 text-center sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-xl font-bold text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
            !
          </div>

          <div className="space-y-2">
            <h1 className="font-heading text-text-primary text-2xl font-medium">
              Authorization Unsuccessful
            </h1>
            <p className="text-text-secondary font-sans text-sm leading-relaxed">
              {failureMessage}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Button asChild variant="primary" className="w-full justify-center">
              <Link to={ROUTES.AUTH}>Try again</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="w-full justify-center text-sm"
            >
              <Link to={ROUTES.HOME}>Back to Home</Link>
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  )
}
