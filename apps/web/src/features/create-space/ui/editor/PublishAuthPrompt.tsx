import { Sparkles, ShieldCheck, ArrowRight } from 'lucide-react'
import { Button } from '@/shared/ui'
import { ROUTES } from '@/shared/config'

export interface PublishAuthPromptProps {
  onClose: () => void
  accentColor?: string
}

export function PublishAuthPrompt({
  onClose,
  accentColor = '#D97706',
}: PublishAuthPromptProps) {
  const handleProceedToAuth = () => {
    // Save return path so user lands right back in the studio after auth
    const currentPath = window.location.pathname + window.location.search
    sessionStorage.setItem('sfy_auth_return', currentPath)
    window.location.assign(ROUTES.AUTH)
  }

  return (
    <div className="space-y-6 text-center">
      {/* Visual Badge */}
      <div className="flex flex-col items-center space-y-2">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 shadow-xl"
          style={{ backgroundColor: `${accentColor}33` }}
        >
          <ShieldCheck className="h-7 w-7 text-amber-300" />
        </div>
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#FAF6F0]">
          Connect Account to Publish
        </h2>
        <p className="max-w-md font-sans text-xs text-stone-300">
          Your memories and letters are safely stored in this browser. Connect a
          free account to secure cloud storage and share your public link.
        </p>
      </div>

      {/* Assurance Box */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-left text-xs text-stone-300">
        <div className="flex items-center gap-2 font-medium text-amber-200">
          <Sparkles className="h-4 w-4" />
          <span>No work will be lost</span>
        </div>
        <p className="mt-1 font-sans text-[11px] text-stone-400">
          After logging in, you will be brought right back to this sanctuary
          with all your customizations intact.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-white/15 bg-white/5 text-stone-300 hover:bg-white/10"
        >
          Keep Editing
        </Button>
        <Button
          type="button"
          onClick={handleProceedToAuth}
          style={{ backgroundColor: accentColor }}
          className="flex items-center justify-center gap-2 font-medium text-[#1A120B]"
        >
          <span>Sign In / Create Account</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
