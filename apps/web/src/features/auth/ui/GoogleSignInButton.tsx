import { useState } from 'react'
import { signInWithGoogle } from '@/shared/api'
import { GoogleIcon } from './GoogleIcon.tsx'

interface GoogleSignInButtonProps {
  className?: string
}

export function GoogleSignInButton({
  className = '',
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await signInWithGoogle()
    } catch (err) {
      setIsLoading(false)
      setError(
        err instanceof Error ? err.message : 'Failed to initiate sign in',
      )
    }
  }

  return (
    <div className="w-full space-y-2">
      <button
        type="button"
        onClick={handleSignIn}
        disabled={isLoading}
        className={`bg-primary text-text-inverse hover:bg-primary/95 focus-visible:ring-primary/40 inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl px-6 py-3.5 text-base font-medium shadow-sm transition-all duration-200 hover:shadow-md focus-visible:ring-2 focus-visible:outline-none active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      >
        <GoogleIcon className="text-text-inverse h-5 w-5 shrink-0" />
        <span>
          {isLoading ? 'Redirecting to Google...' : 'Sign in with Google'}
        </span>
      </button>

      {error && (
        <p className="text-center font-sans text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
