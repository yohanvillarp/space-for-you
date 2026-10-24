import { useState, useEffect, useCallback } from 'react'
import { Delete, AlertCircle } from 'lucide-react'
import { playSpatialSfx, cn } from '@/shared/lib'

export interface LockKeypadProps {
  expectedPasscode: string
  isUnlocked: boolean
  onUnlockSuccess: () => void
  accentColor?: string
}

export function LockKeypad({
  expectedPasscode,
  isUnlocked,
  onUnlockSuccess,
  accentColor: _accentColor = '#EACABC',
}: LockKeypadProps) {
  const [digits, setDigits] = useState<string>('')
  const [hasError, setHasError] = useState(false)
  const targetLength = Math.max(3, expectedPasscode.length || 4)

  const handleVerify = useCallback(
    (codeToTest: string) => {
      if (codeToTest === expectedPasscode) {
        setHasError(false)
        playSpatialSfx('pop-snap')
        onUnlockSuccess()
      } else {
        setHasError(true)
        playSpatialSfx('paper-rustle')
        setTimeout(() => {
          setDigits('')
          setHasError(false)
        }, 650)
      }
    },
    [expectedPasscode, onUnlockSuccess],
  )

  const handlePressDigit = useCallback(
    (d: string) => {
      if (isUnlocked || hasError) return
      playSpatialSfx('tactile-tap')

      setDigits((prev) => {
        if (prev.length >= targetLength) return prev
        const next = prev + d
        if (next.length === targetLength) {
          setTimeout(() => handleVerify(next), 120)
        }
        return next
      })
    },
    [isUnlocked, hasError, targetLength, handleVerify],
  )

  const handleDelete = useCallback(() => {
    if (isUnlocked || hasError) return
    playSpatialSfx('tactile-tap')
    setDigits((prev) => prev.slice(0, -1))
  }, [isUnlocked, hasError])

  // Listen to physical keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isUnlocked) return
      if (/^[0-9]$/.test(e.key)) {
        handlePressDigit(e.key)
      } else if (e.key === 'Backspace') {
        handleDelete()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isUnlocked, handlePressDigit, handleDelete])

  return (
    <div className="flex flex-col items-center space-y-5">
      {/* Code Indicator Slots */}
      <div
        className={cn(
          'flex items-center justify-center gap-3 transition-transform',
          hasError && 'animate-shake',
        )}
      >
        {Array.from({ length: targetLength }).map((_, idx) => {
          const isFilled = idx < digits.length
          return (
            <div
              key={idx}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl border font-mono text-sm font-semibold transition-all duration-200',
                isFilled
                  ? 'border-white/50 bg-white/20 text-white shadow-md'
                  : 'border-white/10 bg-black/40 text-stone-500',
                hasError && 'border-rose-500 bg-rose-500/20 text-rose-300',
              )}
            >
              {isFilled ? '●' : '—'}
            </div>
          )
        })}
      </div>

      {/* Error Message */}
      {hasError && (
        <div className="animate-fade-in flex items-center gap-1.5 font-sans text-xs text-rose-400">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>Incorrect passcode. Please try again.</span>
        </div>
      )}

      {/* 3x4 Touch Keypad */}
      <div className="grid grid-cols-3 gap-2.5 pt-1">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => handlePressDigit(key)}
            disabled={isUnlocked}
            className="flex h-12 w-14 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 font-mono text-base font-medium text-stone-200 shadow-sm transition-all hover:border-white/30 hover:bg-white/15 active:scale-95"
          >
            {key}
          </button>
        ))}

        {/* Clear All */}
        <button
          type="button"
          onClick={() => {
            playSpatialSfx('tactile-tap')
            setDigits('')
          }}
          disabled={isUnlocked || digits.length === 0}
          className="flex h-12 w-14 cursor-pointer items-center justify-center rounded-xl border border-transparent font-sans text-xs text-stone-400 transition-colors hover:text-stone-200 disabled:opacity-30"
        >
          Clear
        </button>

        {/* Zero Digit */}
        <button
          type="button"
          onClick={() => handlePressDigit('0')}
          disabled={isUnlocked}
          className="flex h-12 w-14 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 font-mono text-base font-medium text-stone-200 shadow-sm transition-all hover:border-white/30 hover:bg-white/15 active:scale-95"
        >
          0
        </button>

        {/* Backspace */}
        <button
          type="button"
          onClick={handleDelete}
          disabled={isUnlocked || digits.length === 0}
          title="Delete last digit"
          className="flex h-12 w-14 cursor-pointer items-center justify-center rounded-xl border border-transparent text-stone-400 transition-colors hover:text-stone-200 active:scale-95 disabled:opacity-30"
        >
          <Delete className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
