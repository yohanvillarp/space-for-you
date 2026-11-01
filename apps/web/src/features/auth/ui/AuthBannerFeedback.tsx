import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/shared/ui'

interface AuthBannerFeedbackProps {
  infoMessage: string | null
  errorMessage: string | null
  isAccountExistsError: boolean
  onSwitchToSignIn: () => void
}

export function AuthBannerFeedback({
  infoMessage,
  errorMessage,
  isAccountExistsError,
  onSwitchToSignIn,
}: AuthBannerFeedbackProps) {
  return (
    <>
      {infoMessage && (
        <div
          role="status"
          className="animate-slide-down flex items-start gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-50/70 p-3 text-left dark:bg-emerald-950/20"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <p className="font-sans text-xs leading-relaxed text-emerald-800 dark:text-emerald-200">
            {infoMessage}
          </p>
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="animate-slide-down space-y-2 rounded-lg border border-red-500/20 bg-red-50/70 p-3 text-left dark:bg-red-950/20"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
            <p className="font-sans text-xs leading-relaxed text-red-800 dark:text-red-200">
              {errorMessage}
            </p>
          </div>
          {isAccountExistsError && (
            <div className="pt-1 pl-6.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-red-300/40 text-xs text-red-700 hover:bg-red-100/50 dark:text-red-300 dark:hover:bg-red-900/30"
                onClick={onSwitchToSignIn}
              >
                <span>Sign in with this email</span>
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
