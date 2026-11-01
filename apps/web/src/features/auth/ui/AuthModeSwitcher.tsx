export type AuthMode = 'signin' | 'signup'

interface AuthModeSwitcherProps {
  mode: AuthMode
  onSelectMode: (mode: AuthMode) => void
}

export function AuthModeSwitcher({
  mode,
  onSelectMode,
}: AuthModeSwitcherProps) {
  return (
    <div className="bg-bg-subtle border-border-base/40 grid grid-cols-2 rounded-lg border p-1">
      <button
        type="button"
        onClick={() => onSelectMode('signin')}
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
        onClick={() => onSelectMode('signup')}
        className={`rounded-md py-1.5 font-sans text-xs font-medium transition-all ${
          mode === 'signup'
            ? 'bg-bg-surface text-text-primary shadow-xs'
            : 'text-text-muted hover:text-text-primary'
        }`}
      >
        Create account
      </button>
    </div>
  )
}
