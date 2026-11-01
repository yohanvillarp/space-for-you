import { useState, useMemo } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router'
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
} from 'lucide-react'
import { resetPassword, formatAuthError } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { Card, Container, Button, Input } from '@/shared/ui'

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const userId = searchParams.get('userId')
  const secret = searchParams.get('secret')

  const isLinkValid = useMemo(() => Boolean(userId && secret), [userId, secret])

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!userId || !secret) {
      setErrorMessage(
        'Invalid recovery credentials. Please request a new link.',
      )
      return
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      await resetPassword({
        userId,
        secret,
        password,
      })

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
    } catch (err) {
      setErrorMessage(
        formatAuthError(err) ||
          'Unable to reset password. The link may have expired or already been used.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 sm:py-20">
      <Container className="mx-auto w-full max-w-md">
        <Card className="border-border-base/80 space-y-6 p-6 sm:p-8">
          {!isLinkValid ? (
            <div className="space-y-5 py-2 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h1 className="font-heading text-text-primary text-xl font-medium">
                  Invalid Recovery Link
                </h1>
                <p className="text-text-secondary font-sans text-xs leading-relaxed">
                  This password reset link is missing required parameters or is
                  malformed. Please request a new recovery link.
                </p>
              </div>
              <Button
                asChild
                variant="primary"
                className="w-full justify-center"
              >
                <Link to={ROUTES.AUTH}>Back to Sign In</Link>
              </Button>
            </div>
          ) : success ? (
            <div className="animate-fade-in space-y-5 py-2 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h1 className="font-heading text-text-primary text-xl font-medium">
                  Password Updated
                </h1>
                <p className="text-text-secondary font-sans text-xs leading-relaxed">
                  Your password has been reset successfully. You can now sign in
                  with your new credentials.
                </p>
              </div>
              <Button
                type="button"
                variant="primary"
                className="w-full justify-center"
                onClick={() => navigate(ROUTES.AUTH, { replace: true })}
              >
                <span>Sign in with new password</span>
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="space-y-1.5 text-center">
                <h1 className="font-heading text-text-primary text-2xl font-medium tracking-tight">
                  Choose a new password
                </h1>
                <p className="text-text-secondary font-sans text-xs leading-relaxed">
                  Create a secure password with at least 8 characters.
                </p>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="animate-slide-down flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-50/70 p-3 text-left dark:bg-red-950/20"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
                  <p className="font-sans text-xs leading-relaxed text-red-800 dark:text-red-200">
                    {errorMessage}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <Input
                  label="New password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  autoComplete="new-password"
                  leftIcon={<Lock className="h-4 w-4" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-text-muted hover:text-text-primary transition-colors focus:outline-none"
                      tabIndex={-1}
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  }
                  required
                />

                <Input
                  label="Confirm new password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Repeat your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  autoComplete="new-password"
                  leftIcon={<Lock className="h-4 w-4" />}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="mt-2 w-full justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Updating password...
                    </span>
                  ) : (
                    'Reset password'
                  )}
                </Button>
              </form>
            </div>
          )}
        </Card>
      </Container>
    </div>
  )
}
