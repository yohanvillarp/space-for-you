import { useState, useEffect, useCallback, useRef } from 'react'
import { AlertCircle, ShieldAlert, Lock, Loader2 } from 'lucide-react'
import {
  verifyPasscode,
  checkPasscodeRateLimit,
  recordFailedPasscodeAttempt,
  resetPasscodeRateLimit,
} from '@/features/space-lock/lib/crypto'
import { playSpatialSfx, cn } from '@/shared/lib'
import { KEYPAD_STYLES } from './keypad-styles'
import { LockKeypadButtons } from './LockKeypadButtons'
import type { LockKeypadProps } from './lock-keypad.types'

export type { LockKeypadProps }

export function LockKeypad({
  expectedPasscode,
  passcodeLength,
  passcodeHash,
  passcodeSalt,
  rateLimitKey = 'global_vault',
  isUnlocked,
  onUnlockSuccess,
  onVerifyPasscode,
  theme = 'classic',
}: LockKeypadProps) {
  const [digits, setDigits] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isValidating, setIsValidating] = useState<boolean>(false)
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0)
  const isVerifyingRef = useRef(false)
  const targetLength =
    passcodeLength ?? Math.max(3, expectedPasscode?.length || 4)
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
      setIsValidating(true)
      setErrorMessage(null)

      if (onVerifyPasscode) {
        try {
          const res = await onVerifyPasscode(codeToTest)
          if (res.success) {
            resetPasscodeRateLimit(rateLimitKey)
            setErrorMessage(null)
            playSpatialSfx('pop-snap')
            onUnlockSuccess()
          } else {
            setErrorMessage(res.errorMessage || 'Incorrect secret combination.')
            playSpatialSfx('paper-rustle')
            setTimeout(() => setDigits(''), 500)
          }
        } catch {
          setErrorMessage('Unable to verify code. Please try again.')
          playSpatialSfx('paper-rustle')
          setTimeout(() => setDigits(''), 500)
        } finally {
          setIsValidating(false)
          isVerifyingRef.current = false
        }
        return
      }

      const rateStatus = checkPasscodeRateLimit(rateLimitKey)
      if (!rateStatus.allowed) {
        setLockoutRemaining(rateStatus.lockoutRemainingSeconds)
        setErrorMessage(
          `Too many attempts. Locked for ${rateStatus.lockoutRemainingSeconds}s`,
        )
        setDigits('')
        setIsValidating(false)
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
      } else if (!passcodeHash) {
        isMatch = codeToTest === '1234'
      }

      if (isMatch) {
        resetPasscodeRateLimit(rateLimitKey)
        setErrorMessage(null)
        playSpatialSfx('pop-snap')
        onUnlockSuccess()
      } else {
        const failure = recordFailedPasscodeAttempt(rateLimitKey)
        playSpatialSfx('paper-rustle')
        setErrorMessage(
          !failure.allowed
            ? `Too many attempts. Locked for ${failure.lockoutRemainingSeconds}s`
            : failure.remainingAttempts <= 2
              ? `Incorrect passcode. ${failure.remainingAttempts} attempts left.`
              : 'Incorrect passcode. Please try again.',
        )
        setTimeout(() => setDigits(''), 500)
      }
      setIsValidating(false)
      isVerifyingRef.current = false
    },
    [
      onVerifyPasscode,
      rateLimitKey,
      onUnlockSuccess,
      passcodeHash,
      passcodeSalt,
      expectedPasscode,
    ],
  )

  const isKeypadDisabled = isUnlocked || lockoutRemaining > 0 || isValidating

  const handlePressDigit = useCallback(
    (d: string) => {
      if (isKeypadDisabled || isVerifyingRef.current) return
      playSpatialSfx(style.sfx)
      setErrorMessage(null)
      setDigits((prev) => {
        if (prev.length >= targetLength) return prev
        const next = prev + d
        if (next.length === targetLength)
          setTimeout(() => handleVerify(next), 100)
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
      )
        return
      if (/^[0-9]$/.test(e.key)) handlePressDigit(e.key)
      else if (e.key === 'Backspace') handleDelete()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isKeypadDisabled, handlePressDigit, handleDelete])

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className={cn(
          'flex items-center justify-center gap-2.5 transition-transform duration-300',
          errorMessage && 'animate-shake',
          isValidating && 'scale-105',
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
                isValidating &&
                  'animate-pulse border-amber-400/80 bg-amber-400/20 text-amber-200 shadow-md shadow-amber-500/20',
              )}
            >
              {isFilled ? '●' : '—'}
            </div>
          )
        })}
      </div>

      {isValidating ? (
        <div className="animate-fade-in flex items-center gap-1.5 font-sans text-xs text-amber-300">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />
          <span>Opening secret vault...</span>
        </div>
      ) : errorMessage ? (
        <div className="animate-fade-in flex items-center gap-1.5 font-sans text-xs text-rose-400">
          {lockoutRemaining > 0 ? (
            <ShieldAlert className="h-4 w-4 shrink-0 text-rose-400" />
          ) : (
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          )}
          <span>{errorMessage}</span>
        </div>
      ) : null}

      <LockKeypadButtons
        style={style}
        isKeypadDisabled={isKeypadDisabled}
        hasDigits={digits.length > 0}
        onPressDigit={handlePressDigit}
        onClear={() => setDigits('')}
        onDelete={handleDelete}
      />

      {lockoutRemaining > 0 && (
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-amber-400/90">
          <Lock className="h-3 w-3" />
          <span>Cooldown: {lockoutRemaining}s</span>
        </div>
      )}
    </div>
  )
}
