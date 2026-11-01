import { useState } from 'react'
import { Mail, CheckCircle2, Loader2 } from 'lucide-react'
import { sendEmailVerification, formatAuthError } from '@/shared/api'
import { Button } from '@/shared/ui'

interface UnverifiedEmailBannerProps {
  email: string
}

export function UnverifiedEmailBanner({ email }: UnverifiedEmailBannerProps) {
  const [sendingVerification, setSendingVerification] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationError, setVerificationError] = useState<string | null>(
    null,
  )

  const handleResend = async () => {
    setSendingVerification(true)
    setVerificationError(null)
    try {
      await sendEmailVerification()
      setVerificationSent(true)
    } catch (err) {
      setVerificationError(formatAuthError(err))
    } finally {
      setSendingVerification(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-3 rounded-xl border border-amber-500/20 bg-amber-50/60 p-4 sm:flex-row sm:items-center sm:justify-between dark:bg-amber-950/20">
        <div className="flex items-center gap-2.5">
          <Mail className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="font-sans text-xs text-amber-900 dark:text-amber-200">
            Your email address (<span className="font-medium">{email}</span>) is
            not verified yet.
          </p>
        </div>
        {verificationSent ? (
          <span className="inline-flex items-center gap-1 font-sans text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Verification email sent
          </span>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResend}
            disabled={sendingVerification}
            className="border-amber-300 text-xs text-amber-800 hover:bg-amber-100/60 dark:border-amber-800 dark:text-amber-200"
          >
            {sendingVerification ? (
              <span className="flex items-center gap-1.5">
                <Loader2 className="h-3 w-3 animate-spin" />
                Sending...
              </span>
            ) : (
              'Resend verification link'
            )}
          </Button>
        )}
      </div>
      {verificationError && (
        <p className="font-sans text-xs text-red-600">{verificationError}</p>
      )}
    </div>
  )
}
