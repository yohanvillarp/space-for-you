import type { LockKeypadTheme } from '@/features/space-lock/model/lock.types'

export interface LockKeypadProps {
  expectedPasscode?: string
  passcodeLength?: number
  passcodeHash?: string
  passcodeSalt?: string
  rateLimitKey?: string
  isUnlocked: boolean
  onUnlockSuccess: () => void
  onVerifyPasscode?: (
    code: string,
  ) => Promise<{ success: boolean; errorMessage?: string }>
  theme?: LockKeypadTheme
}
