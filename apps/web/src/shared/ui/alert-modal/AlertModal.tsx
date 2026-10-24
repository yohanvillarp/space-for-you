import { useEffect, useRef } from 'react'
import { AlertTriangle, AlertCircle, Info, Check, X } from 'lucide-react'
import type { AlertModalProps, AlertModalType } from './alert-modal.types'
import { cn, playSpatialSfx } from '@/shared/lib'

const TYPE_CONFIGS: Record<
  AlertModalType,
  {
    badgeClass: string
    pulseColor: string
    defaultConfirmText: string
    confirmButtonClass: string
    ambientGlow: string
    DefaultIcon: React.ComponentType<{ className?: string }>
  }
> = {
  danger: {
    badgeClass: 'bg-[#A34835]/20 text-[#E27D60] border border-[#A34835]/40',
    pulseColor: 'rgba(163, 72, 53, 0.4)',
    defaultConfirmText: 'Confirm & Proceed',
    confirmButtonClass:
      'bg-[#A34835] hover:bg-[#8E3827] text-white shadow-lg shadow-[#A34835]/25 ring-1 ring-white/15',
    ambientGlow: 'from-[#A34835]/25 via-transparent to-transparent',
    DefaultIcon: AlertTriangle,
  },
  warning: {
    badgeClass: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
    pulseColor: 'rgba(245, 158, 11, 0.4)',
    defaultConfirmText: 'Proceed',
    confirmButtonClass:
      'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/25 ring-1 ring-white/15',
    ambientGlow: 'from-amber-500/20 via-transparent to-transparent',
    DefaultIcon: AlertCircle,
  },
  info: {
    badgeClass: 'bg-sky-500/20 text-sky-300 border border-sky-500/40',
    pulseColor: 'rgba(56, 189, 248, 0.4)',
    defaultConfirmText: 'Understood',
    confirmButtonClass:
      'bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/25 ring-1 ring-white/15',
    ambientGlow: 'from-sky-500/20 via-transparent to-transparent',
    DefaultIcon: Info,
  },
  success: {
    badgeClass:
      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
    pulseColor: 'rgba(16, 185, 129, 0.4)',
    defaultConfirmText: 'Continue',
    confirmButtonClass:
      'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-white/15',
    ambientGlow: 'from-emerald-500/20 via-transparent to-transparent',
    DefaultIcon: Check,
  },
}

export function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText = 'Cancel',
  type = 'warning',
  icon,
  isLoading = false,
  showCancel = true,
  closeOnBackdropClick = true,
  className,
}: AlertModalProps) {
  const confirmBtnRef = useRef<HTMLButtonElement>(null)
  const config = TYPE_CONFIGS[type] ?? TYPE_CONFIGS.warning
  const IconComponent = config.DefaultIcon

  useEffect(() => {
    if (!isOpen) return

    playSpatialSfx('tactile-tap')
    const timer = setTimeout(() => confirmBtnRef.current?.focus(), 60)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleConfirmClick = () => {
    playSpatialSfx('tactile-tap')
    onConfirm?.()
  }

  const handleCancelClick = () => {
    playSpatialSfx('tactile-tap')
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none sm:p-6"
    >
      {/* Blurred Backdrop */}
      <div
        onClick={closeOnBackdropClick ? handleCancelClick : undefined}
        className="animate-fade-in absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
      />

      {/* SweetAlert2 Style Modal Card */}
      <div
        className={cn(
          'animate-swal-pop relative w-full max-w-md overflow-hidden rounded-3xl border border-[#3B302A] bg-[#16120F] p-6 shadow-2xl backdrop-blur-xl sm:p-8',
          className,
        )}
      >
        {/* Soft Radial Mood Glow */}
        <div
          className={cn(
            'pointer-events-none absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-radial opacity-50 blur-3xl',
            config.ambientGlow,
          )}
        />

        {/* Close Button Top Right */}
        <button
          type="button"
          onClick={handleCancelClick}
          aria-label="Close modal"
          className="absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Pulsing Animated Icon Badge */}
        <div className="flex justify-center pt-1 pb-5">
          <div
            className={cn(
              'animate-swal-pulse relative flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-transform duration-300',
              config.badgeClass,
            )}
          >
            {icon ? (
              icon
            ) : (
              <IconComponent className="h-8 w-8 stroke-[2.2] transition-transform" />
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-2 text-center">
          <h3 className="font-heading text-xl font-medium tracking-tight text-[#FAF6F0] sm:text-2xl">
            {title}
          </h3>
          {description && (
            <div className="font-sans text-xs leading-relaxed text-[#A99B90] sm:text-sm">
              {description}
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-center sm:gap-3">
          {showCancel && (
            <button
              type="button"
              onClick={handleCancelClick}
              disabled={isLoading}
              className="flex-1 cursor-pointer rounded-xl border border-[#3B302A] bg-[#1E1815] px-4 py-2.5 font-sans text-xs font-medium text-stone-300 transition-all hover:border-white/20 hover:bg-[#261E1A] hover:text-white active:scale-95 disabled:opacity-50 sm:text-sm"
            >
              {cancelText}
            </button>
          )}

          <button
            ref={confirmBtnRef}
            type="button"
            onClick={handleConfirmClick}
            disabled={isLoading}
            className={cn(
              'flex-1 cursor-pointer rounded-xl px-4 py-2.5 font-sans text-xs font-medium transition-all active:scale-95 disabled:opacity-50 sm:text-sm',
              config.confirmButtonClass,
            )}
          >
            {isLoading
              ? 'Processing...'
              : confirmText || config.defaultConfirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
