import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { signInWithEmail, signUpWithEmail, formatAuthError } from '@/shared/api'
import { Button, Input } from '@/shared/ui'

export type AuthMode = 'signin' | 'signup'

interface EmailAuthFormProps {
  initialMode?: AuthMode
  onModeChange?: (mode: AuthMode) => void
}

export function EmailAuthForm({
  initialMode = 'signin',
  onModeChange,
}: EmailAuthFormProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleToggleMode = (newMode: AuthMode) => {
    setMode(newMode)
    setErrorMessage(null)
    onModeChange?.(newMode)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)

    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setErrorMessage('Please enter your email address.')
      return
    }

    if (!password) {
      setErrorMessage('Please enter your password.')
      return
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.')
      return
    }

    if (mode === 'signup' && !name.trim()) {
      setErrorMessage('Please enter your name or nickname.')
      return
    }

    setLoading(true)

    try {
      if (mode === 'signup') {
        await signUpWithEmail({
          email: trimmedEmail,
          password,
          name: name.trim(),
        })
      } else {
        await signInWithEmail({
          email: trimmedEmail,
          password,
        })
      }
    } catch (err) {
      setErrorMessage(formatAuthError(err))
      setLoading(false)
    }
  }

  return (
    <div className="w-full space-y-4">
      {/* Mode Switcher Tabs */}
      <div className="bg-bg-subtle border-border-base/40 grid grid-cols-2 rounded-lg border p-1">
        <button
          type="button"
          onClick={() => handleToggleMode('signin')}
          className={`rounded-md py-1.5 font-sans text-xs font-medium transition-all ${
            mode === 'signin'
              ? 'bg-bg-surface text-text-primary shadow-xs'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => handleToggleMode('signup')}
          className={`rounded-md py-1.5 font-sans text-xs font-medium transition-all ${
            mode === 'signup'
              ? 'bg-bg-surface text-text-primary shadow-xs'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          Create account
        </button>
      </div>

      {/* Error Feedback */}
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {mode === 'signup' && (
          <div className="animate-slide-down">
            <Input
              label="Your name or nickname"
              type="text"
              placeholder="e.g. Sophia or Mateo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              autoComplete="name"
              leftIcon={<User className="h-4 w-4" />}
              required
            />
          </div>
        )}

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

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-text-muted hover:text-text-primary transition-colors focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
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

        <Button
          type="submit"
          variant="primary"
          className="mt-2 w-full transition-transform hover:scale-[1.01] active:scale-[0.99]"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {mode === 'signup' ? 'Creating account...' : 'Signing in...'}
            </span>
          ) : mode === 'signup' ? (
            'Create your space'
          ) : (
            'Sign in with email'
          )}
        </Button>
      </form>
    </div>
  )
}
