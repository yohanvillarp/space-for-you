import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router'
import { appwriteAccount, setSessionHint } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { Card, Container, Button } from '@/shared/ui'

export function AuthSuccessPage() {
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(true)
  const isExecutingRef = useRef(false)

  useEffect(() => {
    if (isExecutingRef.current) return
    isExecutingRef.current = true

    let isMounted = true

    async function processOAuthCallback() {
      try {
        const url = new URL(window.location.href)
        const secret = url.searchParams.get('secret')
        const userId = url.searchParams.get('userId')

        // 1. If token credentials are present, exchange them for a session
        if (secret && userId) {
          try {
            await appwriteAccount.createSession({ userId, secret })
          } catch (sessionErr) {
            // Secret might have already been consumed or session already active
            console.warn('OAuth token exchange notice:', sessionErr)
          }
        }

        // 2. Verify that an active session exists in Appwrite
        const user = await appwriteAccount.get()
        if (user) {
          setSessionHint(true)
          if (isMounted) {
            window.location.assign(ROUTES.DASHBOARD)
            return
          }
        }

        throw new Error('Missing active session. Please sign in again.')
      } catch (err) {
        if (isMounted) {
          // Fallback check: verify if the session was established despite token exchange warning
          try {
            const user = await appwriteAccount.get()
            if (user) {
              setSessionHint(true)
              window.location.assign(ROUTES.DASHBOARD)
              return
            }
          } catch {
            // Truly unauthenticated
          }

          setIsProcessing(false)
          setError(
            err instanceof Error
              ? err.message
              : 'An error occurred while establishing your session.',
          )
        }
      }
    }

    void processOAuthCallback()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 sm:py-20">
      <Container className="mx-auto w-full max-w-md">
        <Card className="border-border-base/80 space-y-6 p-6 text-center sm:p-8">
          {isProcessing ? (
            <div className="space-y-4 py-6">
              <div className="border-primary/30 border-t-primary mx-auto h-10 w-10 animate-spin rounded-full border-2" />
              <div className="space-y-1">
                <h1 className="font-heading text-text-primary text-xl font-medium">
                  Establishing your session...
                </h1>
                <p className="text-text-secondary font-sans text-sm">
                  Connecting with Appwrite and finalizing credentials.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-5 py-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-600 dark:bg-red-950/40 dark:text-red-400">
                !
              </div>
              <div className="space-y-2">
                <h1 className="font-heading text-text-primary text-xl font-medium">
                  Authentication Failed
                </h1>
                <p className="text-text-secondary font-sans text-sm leading-relaxed">
                  {error}
                </p>
              </div>
              <div className="pt-2">
                <Button
                  asChild
                  variant="primary"
                  className="w-full justify-center"
                >
                  <Link to={ROUTES.AUTH}>Return to Sign in</Link>
                </Button>
              </div>
            </div>
          )}
        </Card>
      </Container>
    </div>
  )
}
