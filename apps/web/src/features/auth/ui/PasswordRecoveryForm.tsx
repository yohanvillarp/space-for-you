import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  Mail,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { sendPasswordRecovery, formatAuthError } from '@/shared/api'
import { Button, Input } from '@/shared/ui'

interface PasswordRecoveryFormProps {
  initialEmail?: string
  onBackToSignIn: () => void
}

export function PasswordRecoveryForm({
  initialEmail = '',
  onBackToSignIn,
}: PasswordRecoveryFormProps) {
  const [email, setEmail] = useState(initialEmail)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)

    const trimmed = email.trim()
    if (!trimmed) {
      setErrorMessage('Please enter your email address.')
      return
    }

    setLoading(true)
    try {
      await sendPasswordRecovery(trimmed)
      setIsSuccess(true)
    } catch (err) {
      setErrorMessage(formatAuthError(err))
    } finally {
      setLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="animate-fade-in space-y-4 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h3 className="font-heading text-text-primary text-base font-medium">
            Recovery Email Sent
          </h3>
          <p className="text-text-secondary font-sans text-xs leading-relaxed">
            If an account exists for{' '}
            <span className="text-text-primary font-medium">{email}</span>, you
            will receive instructions to reset your password shortly.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full justify-center text-xs"
          onClick={onBackToSignIn}
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
          Back to sign in
        </Button>
      </div>
    )
  }

  return (
    <div className="animate-fade-in w-full space-y-4">
      <div className="space-y-1 text-left">
        <h3 className="font-heading text-text-primary text-sm font-medium">
          Reset your password
        </h3>
        <p className="text-text-secondary font-sans text-xs">
          Enter your email and we will send you a secure link to reset your
          password.
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
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          autoComplete="email"
          leftIcon={<Mail className="h-4 w-4" />}
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
              Sending link...
            </span>
          ) : (
            'Send recovery link'
          )}
        </Button>

        <button
          type="button"
          onClick={onBackToSignIn}
          className="text-text-muted hover:text-text-primary inline-flex w-full items-center justify-center gap-1 font-sans text-xs transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Cancel and sign in
        </button>
      </form>
    </div>
  )
}
