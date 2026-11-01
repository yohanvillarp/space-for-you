import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react'
import {
  signInWithEmail,
  signUpWithEmail,
  formatAuthError,
  isUserAlreadyExistsError,
  getSafeAuthReturnPath,
} from '@/shared/api'
import { useSession } from '@/entities/session'
import { Button, Input } from '@/shared/ui'
import { PasswordRecoveryForm } from './PasswordRecoveryForm.tsx'
import { AuthBannerFeedback } from './AuthBannerFeedback.tsx'
import { AuthModeSwitcher, type AuthMode } from './AuthModeSwitcher.tsx'

export type { AuthMode }

interface EmailAuthFormProps {
  initialMode?: AuthMode
  onModeChange?: (mode: AuthMode) => void
}

export function EmailAuthForm({
  initialMode = 'signin',
  onModeChange,
}: EmailAuthFormProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [isRecoveryMode, setIsRecoveryMode] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isAccountExistsError, setIsAccountExistsError] = useState(false)
  const [infoMessage, setInfoMessage] = useState<string | null>(null)

  const { setSessionUser, refreshSession } = useSession()
  const navigate = useNavigate()

  const handleToggleMode = (newMode: AuthMode) => {
    setMode(newMode)
    setIsRecoveryMode(false)
    setErrorMessage(null)
    setIsAccountExistsError(false)
    setInfoMessage(null)
    onModeChange?.(newMode)
  }

  const handleSwitchToSignInWithEmail = () => {
    setMode('signin')
    setErrorMessage(null)
    setIsAccountExistsError(false)
    setInfoMessage('Please enter your password to sign in with this account.')
    onModeChange?.('signin')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsAccountExistsError(false)
    setInfoMessage(null)

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
        const result = await signUpWithEmail({
          email: trimmedEmail,
          password,
          name: name.trim(),
        })

        if (result.sessionCreated && result.user) {
          setSessionUser(result.user)
          await refreshSession()
          navigate(getSafeAuthReturnPath(), { replace: true })
          return
        }

        setLoading(false)
        setMode('signin')
        setPassword('')
        setInfoMessage(
          'Account created successfully! Please sign in with your password to continue.',
        )
        onModeChange?.('signin')
      } else {
        const user = await signInWithEmail({
          email: trimmedEmail,
          password,
        })
        setSessionUser(user)
        await refreshSession()
        navigate(getSafeAuthReturnPath(), { replace: true })
      }
    } catch (err) {
      setLoading(false)
      if (mode === 'signup' && isUserAlreadyExistsError(err)) {
        setIsAccountExistsError(true)
        setErrorMessage(
          'An account with this email already exists. Would you like to sign in instead?',
        )
      } else {
        setErrorMessage(formatAuthError(err))
      }
    }
  }

  if (isRecoveryMode) {
    return (
      <PasswordRecoveryForm
        initialEmail={email}
        onBackToSignIn={() => setIsRecoveryMode(false)}
      />
    )
  }

  return (
    <div className="w-full space-y-4">
      <AuthModeSwitcher mode={mode} onSelectMode={handleToggleMode} />

      <AuthBannerFeedback
        infoMessage={infoMessage}
        errorMessage={errorMessage}
        isAccountExistsError={isAccountExistsError}
        onSwitchToSignIn={handleSwitchToSignInWithEmail}
      />

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

        <div className="space-y-1">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            autoComplete={
              mode === 'signup' ? 'new-password' : 'current-password'
            }
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

          {mode === 'signin' && (
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setIsRecoveryMode(true)}
                className="text-text-muted hover:text-text-primary font-sans text-[11px] transition-colors"
              >
                Forgot password?
              </button>
            </div>
          )}
        </div>

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
