import { useState, useEffect, useCallback } from 'react'
import { Delete, AlertCircle } from 'lucide-react'
import type { LockKeypadTheme } from '@/features/space-lock/model/lock.types'
import { playSpatialSfx, cn } from '@/shared/lib'

export interface LockKeypadProps {
  expectedPasscode: string
  isUnlocked: boolean
  onUnlockSuccess: () => void
  theme?: LockKeypadTheme
}

const KEYPAD_STYLES: Record<
  LockKeypadTheme,
  {
    button: string
    slotBase: string
    slotFilled: string
    sfx: 'tactile-tap' | 'cassette-click' | 'pop-snap' | 'pin-thud'
  }
> = {
  classic: {
    button:
      'rounded-xl border border-white/10 bg-white/5 font-mono text-base font-medium text-stone-200 shadow-sm hover:border-white/30 hover:bg-white/15 active:scale-95',
    slotBase: 'rounded-xl border-white/10 bg-black/40 text-stone-500',
    slotFilled: 'border-white/50 bg-white/20 text-white shadow-md',
    sfx: 'tactile-tap',
  },
  'vintage-typewriter': {
    button:
      'rounded-full border-2 border-[#8C6239] bg-[#221711] font-serif text-base font-bold text-[#E8D7C3] shadow-md ring-1 ring-amber-600/30 hover:border-amber-500 hover:bg-[#2C1E16] active:translate-y-0.5',
    slotBase:
      'rounded-full border-2 border-[#8C6239]/60 bg-[#160E0A] font-serif text-[#E8D7C3]',
    slotFilled: 'border-amber-500 bg-[#382317] text-amber-200 shadow-md',
    sfx: 'cassette-click',
  },
  'golden-luxury': {
    button:
      'rounded-xl border border-amber-400/80 bg-gradient-to-b from-[#2A1D15] via-[#20150F] to-[#17100B] font-heading text-base font-semibold text-amber-200 shadow-md hover:border-amber-300 hover:shadow-amber-900/40 active:scale-95',
    slotBase:
      'rounded-xl border border-amber-400/50 bg-[#1A120D] text-amber-300',
    slotFilled:
      'border-amber-300 bg-amber-500/25 text-amber-100 shadow-md shadow-amber-400/20',
    sfx: 'pop-snap',
  },
  'celestial-crystal': {
    button:
      'rounded-2xl border border-pink-400/40 bg-gradient-to-tr from-purple-950/60 to-pink-900/40 font-sans text-base font-semibold text-pink-100 shadow-md hover:border-pink-300 hover:shadow-pink-500/30 active:scale-95',
    slotBase:
      'rounded-2xl border border-pink-400/40 bg-purple-950/70 text-pink-300',
    slotFilled:
      'border-pink-300 bg-pink-500/30 text-white shadow-md shadow-pink-400/30',
    sfx: 'pop-snap',
  },
  'clay-terracotta': {
    button:
      'rounded-xl border-2 border-[#A34835]/70 bg-gradient-to-b from-[#3D1A13] to-[#2B120D] font-mono text-base font-bold text-[#EACABC] shadow-md hover:border-[#CF7056] active:scale-95',
    slotBase: 'rounded-xl border border-[#A34835] bg-[#1E0C08] text-[#CF7056]',
    slotFilled: 'border-[#CF7056] bg-[#A34835]/30 text-[#FAF6F0] shadow-md',
    sfx: 'pin-thud',
  },
}

export function LockKeypad({
  expectedPasscode,
  isUnlocked,
  onUnlockSuccess,
  theme = 'classic',
}: LockKeypadProps) {
  const [digits, setDigits] = useState<string>('')
  const [hasError, setHasError] = useState(false)
  const targetLength = Math.max(3, expectedPasscode.length || 4)
  const style = KEYPAD_STYLES[theme] || KEYPAD_STYLES.classic

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
      playSpatialSfx(style.sfx)

      setDigits((prev) => {
        if (prev.length >= targetLength) return prev
        const next = prev + d
        if (next.length === targetLength) {
          setTimeout(() => handleVerify(next), 120)
        }
        return next
      })
    },
    [isUnlocked, hasError, targetLength, handleVerify, style.sfx],
  )

  const handleDelete = useCallback(() => {
    if (isUnlocked || hasError) return
    playSpatialSfx('tactile-tap')
    setDigits((prev) => prev.slice(0, -1))
  }, [isUnlocked, hasError])

  // Listen to physical keyboard events (ignore when typing in form inputs)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isUnlocked) return

      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }

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
                'flex h-10 w-10 items-center justify-center border font-mono text-sm font-semibold transition-all duration-200',
                isFilled ? style.slotFilled : style.slotBase,
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
            className={cn(
              'flex h-12 w-14 cursor-pointer items-center justify-center transition-all',
              style.button,
            )}
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
          className={cn(
            'flex h-12 w-14 cursor-pointer items-center justify-center transition-all',
            style.button,
          )}
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
