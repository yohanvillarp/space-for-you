import { useEffect, useState, useRef } from 'react'
import { Link, useSearchParams } from 'react-router'
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react'
import { verifyEmail, formatAuthError } from '@/shared/api'
import { useSession } from '@/entities/session'
import { ROUTES } from '@/shared/config'
import { Card, Container, Button } from '@/shared/ui'

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const { isAuthenticated, refreshSession } = useSession()

  const userId = searchParams.get('userId')
  const secret = searchParams.get('secret')
  const hasValidParams = Boolean(userId && secret)

  const [loading, setLoading] = useState(hasValidParams)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const isExecutingRef = useRef(false)

  useEffect(() => {
    if (!hasValidParams || isExecutingRef.current) return
    isExecutingRef.current = true

    async function executeVerification(uid: string, sec: string) {
      try {
        await verifyEmail(uid, sec)

        try {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          )
        } catch {
          // ignore
        }

        setSuccess(true)
        void refreshSession()
      } catch (err) {
        setErrorMessage(
          formatAuthError(err) ||
            'This verification link has expired or has already been used.',
        )
      } finally {
        setLoading(false)
      }
    }

    void executeVerification(userId as string, secret as string)
  }, [hasValidParams, userId, secret, refreshSession])

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 sm:py-20">
      <Container className="mx-auto w-full max-w-md">
        <Card className="border-border-base/80 space-y-6 p-6 text-center sm:p-8">
          {!hasValidParams ? (
            <div className="animate-fade-in space-y-5 py-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h1 className="font-heading text-text-primary text-xl font-medium">
                  Invalid Verification Link
                </h1>
                <p className="text-text-secondary font-sans text-xs leading-relaxed">
                  The verification link is incomplete or missing credentials.
                  Please check your email or request a new verification link
                  from your dashboard.
                </p>
              </div>
              <div className="pt-2">
                <Button
                  asChild
                  variant="primary"
                  className="w-full justify-center"
                >
                  <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.AUTH}>
                    {isAuthenticated ? 'Go to Dashboard' : 'Sign In'}
                  </Link>
                </Button>
              </div>
            </div>
          ) : loading ? (
            <div className="space-y-4 py-6">
              <Loader2 className="text-primary mx-auto h-10 w-10 animate-spin" />
              <div className="space-y-1">
                <h1 className="font-heading text-text-primary text-xl font-medium">
                  Verifying your email...
                </h1>
                <p className="text-text-secondary font-sans text-xs">
                  Confirming your email address with Appwrite.
                </p>
              </div>
            </div>
          ) : success ? (
            <div className="animate-fade-in space-y-5 py-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h1 className="font-heading text-text-primary text-2xl font-medium">
                  Email Verified
                </h1>
                <p className="text-text-secondary font-sans text-sm leading-relaxed">
                  Your email address has been successfully verified. You are all
                  set to craft and share your personal spaces.
                </p>
              </div>
              <div className="pt-2">
                <Button
                  asChild
                  variant="primary"
                  className="w-full justify-center"
                >
                  <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.AUTH}>
                    <span>
                      {isAuthenticated ? 'Go to Dashboard' : 'Sign In'}
                    </span>
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in space-y-5 py-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h1 className="font-heading text-text-primary text-xl font-medium">
                  Verification Unsuccessful
                </h1>
                <p className="text-text-secondary font-sans text-sm leading-relaxed">
                  {errorMessage}
                </p>
              </div>
              <div className="space-y-2 pt-2">
                <Button
                  asChild
                  variant="primary"
                  className="w-full justify-center"
                >
                  <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.AUTH}>
                    {isAuthenticated ? 'Return to Dashboard' : 'Go to Sign In'}
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </Card>
      </Container>
    </div>
  )
}
