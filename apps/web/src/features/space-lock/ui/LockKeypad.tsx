import { useState, useEffect, useCallback, useRef } from 'react'
import { Delete, AlertCircle, ShieldAlert, Lock } from 'lucide-react'
import type { LockKeypadTheme } from '@/features/space-lock/model/lock.types'
import {
  verifyPasscode,
  checkPasscodeRateLimit,
  recordFailedPasscodeAttempt,
  resetPasscodeRateLimit,
} from '@/features/space-lock/lib/crypto'
import { playSpatialSfx, cn } from '@/shared/lib'
import { KEYPAD_STYLES } from './keypad-styles'

export interface LockKeypadProps {
  expectedPasscode?: string
  passcodeHash?: string
  passcodeSalt?: string
  rateLimitKey?: string
  isUnlocked: boolean
  onUnlockSuccess: () => void
  theme?: LockKeypadTheme
}

export function LockKeypad({
  expectedPasscode,
  passcodeHash,
  passcodeSalt,
  rateLimitKey = 'global_vault',
  isUnlocked,
  onUnlockSuccess,
  theme = 'classic',
}: LockKeypadProps) {
  const [digits, setDigits] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0)
  const isVerifyingRef = useRef(false)
  const targetLength = Math.max(3, expectedPasscode?.length || 4)
  const style = KEYPAD_STYLES[theme] || KEYPAD_STYLES.classic

  useEffect(() => {
    const checkRate = () => {
      const status = checkPasscodeRateLimit(rateLimitKey)
      setLockoutRemaining(status.lockoutRemainingSeconds)
      if (!status.allowed) {
        setErrorMessage(
          `Too many attempts. Locked for ${status.lockoutRemainingSeconds}s`,
        )
      } else if (errorMessage?.startsWith('Too many attempts')) {
        setErrorMessage(null)
      }
    }

    checkRate()
    const timer = setInterval(checkRate, 1000)
    return () => clearInterval(timer)
  }, [rateLimitKey, errorMessage])

  const handleVerify = useCallback(
    async (codeToTest: string) => {
      if (isVerifyingRef.current) return
      isVerifyingRef.current = true

      const rateStatus = checkPasscodeRateLimit(rateLimitKey)
      if (!rateStatus.allowed) {
        setLockoutRemaining(rateStatus.lockoutRemainingSeconds)
        setErrorMessage(
          `Too many attempts. Locked for ${rateStatus.lockoutRemainingSeconds}s`,
        )
        setDigits('')
        isVerifyingRef.current = false
        return
      }

      let isMatch = false
      if (passcodeHash && passcodeSalt) {
        try {
          isMatch = await verifyPasscode(codeToTest, passcodeHash, passcodeSalt)
        } catch {
          isMatch = false
        }
      } else if (expectedPasscode) {
        isMatch = codeToTest === expectedPasscode
      }

      if (isMatch) {
        resetPasscodeRateLimit(rateLimitKey)
        setErrorMessage(null)
        playSpatialSfx('pop-snap')
        onUnlockSuccess()
      } else {
        const failure = recordFailedPasscodeAttempt(rateLimitKey)
        playSpatialSfx('paper-rustle')

        if (!failure.allowed) {
          setLockoutRemaining(failure.lockoutRemainingSeconds)
          setErrorMessage(
            `Too many attempts. Locked for ${failure.lockoutRemainingSeconds}s`,
          )
        } else {
          setErrorMessage(
            failure.remainingAttempts <= 2
              ? `Incorrect passcode. ${failure.remainingAttempts} attempts left.`
              : 'Incorrect passcode. Please try again.',
          )
        }
        setTimeout(() => setDigits(''), 500)
      }
      isVerifyingRef.current = false
    },
    [
      passcodeHash,
      passcodeSalt,
      expectedPasscode,
      rateLimitKey,
      onUnlockSuccess,
    ],
  )

  const isKeypadDisabled = isUnlocked || lockoutRemaining > 0

  const handlePressDigit = useCallback(
    (d: string) => {
      if (isKeypadDisabled || isVerifyingRef.current) return
      playSpatialSfx(style.sfx)
      setErrorMessage(null)

      setDigits((prev) => {
        if (prev.length >= targetLength) return prev
        const next = prev + d
        if (next.length === targetLength) {
          setTimeout(() => handleVerify(next), 100)
        }
        return next
      })
    },
    [isKeypadDisabled, targetLength, handleVerify, style.sfx],
  )

  const handleDelete = useCallback(() => {
    if (isKeypadDisabled || isVerifyingRef.current) return
    playSpatialSfx('tactile-tap')
    setDigits((prev) => prev.slice(0, -1))
  }, [isKeypadDisabled])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isKeypadDisabled) return
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }

      if (/^[0-9]$/.test(e.key)) handlePressDigit(e.key)
      else if (e.key === 'Backspace') handleDelete()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isKeypadDisabled, handlePressDigit, handleDelete])

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Code Indicator Slots */}
      <div
        className={cn(
          'flex items-center justify-center gap-2.5 transition-transform',
          errorMessage && 'animate-shake',
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
                errorMessage && 'border-rose-500 bg-rose-500/20 text-rose-300',
              )}
            >
              {isFilled ? '●' : '—'}
            </div>
          )
        })}
      </div>

      {/* Security Feedback */}
      {errorMessage && (
        <div className="animate-fade-in flex items-center gap-1.5 font-sans text-xs text-rose-400">
          {lockoutRemaining > 0 ? (
            <ShieldAlert className="h-4 w-4 shrink-0 text-rose-400" />
          ) : (
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          )}
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 3x4 Touch Keypad */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => handlePressDigit(key)}
            disabled={isKeypadDisabled}
            className={cn(
              'flex h-12 w-14 cursor-pointer items-center justify-center transition-all disabled:cursor-not-allowed disabled:opacity-40',
              style.button,
            )}
          >
            {key}
          </button>
        ))}

        <button
          type="button"
          onClick={() => {
            playSpatialSfx('tactile-tap')
            setDigits('')
          }}
          disabled={isKeypadDisabled || digits.length === 0}
          className="flex h-12 w-14 cursor-pointer items-center justify-center rounded-xl font-sans text-xs text-stone-400 transition-colors hover:text-stone-200 disabled:opacity-30"
        >
          Clear
        </button>

        <button
          type="button"
          onClick={() => handlePressDigit('0')}
          disabled={isKeypadDisabled}
          className={cn(
            'flex h-12 w-14 cursor-pointer items-center justify-center transition-all disabled:cursor-not-allowed disabled:opacity-40',
            style.button,
          )}
        >
          0
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isKeypadDisabled || digits.length === 0}
          title="Delete last digit"
          className="flex h-12 w-14 cursor-pointer items-center justify-center rounded-xl text-stone-400 transition-colors hover:text-stone-200 disabled:opacity-30"
        >
          <Delete className="h-4 w-4" />
        </button>
      </div>

      {lockoutRemaining > 0 && (
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-amber-400/90">
          <Lock className="h-3 w-3" />
          <span>Cooldown: {lockoutRemaining}s</span>
        </div>
      )}
    </div>
  )
}
