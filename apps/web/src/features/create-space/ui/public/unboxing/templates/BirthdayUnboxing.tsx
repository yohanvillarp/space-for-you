import { Sparkles, Gift } from 'lucide-react'
import type { TemplateUnboxingProps } from '../unboxing.types'
import { cn } from '@/shared/lib'

export function BirthdayUnboxing({
  recipientName,
  senderName,
  spaceTitle,
  dedicationMessage,
  accentColor,
  stage,
  onTriggerOpen,
}: TemplateUnboxingProps) {
  const isUnwrapping = stage === 'unwrapping' || stage === 'blooming'

  return (
    <div className="animate-fade-in relative flex max-w-lg flex-col items-center px-4 text-center select-none">
      {/* Floating Golden Stardust Ambient Particles */}
      <div className="pointer-events-none absolute -inset-10 -z-10 flex items-center justify-center">
        <span className="absolute -top-6 left-12 animate-pulse text-lg text-amber-300">
          ✦
        </span>
        <span className="absolute top-16 -right-6 animate-pulse text-sm text-amber-200">
          ✧
        </span>
        <span className="absolute -bottom-8 left-1/3 animate-pulse text-xs text-amber-400">
          ✦
        </span>
      </div>

      {/* Gift Box Artifact */}
      <div
        className={cn(
          'group relative mb-8 flex h-48 w-48 cursor-pointer items-center justify-center rounded-3xl border border-amber-400/30 bg-gradient-to-b from-[#251A14] to-[#16100D] shadow-2xl shadow-amber-950/60 transition-all duration-700 hover:scale-105 active:scale-95',
          isUnwrapping && 'scale-110 opacity-60 blur-xs',
        )}
        onClick={stage === 'sealed' ? onTriggerOpen : undefined}
      >
        {/* Soft Golden Halo Glow */}
        <div className="absolute inset-0 rounded-3xl bg-amber-500/15 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

        {/* Gift Box Body */}
        <div className="relative flex flex-col items-center">
          {/* Silk Ribbon Cross */}
          <div
            className={cn(
              'absolute inset-y-0 w-8 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 shadow-md transition-all duration-700',
              isUnwrapping && 'scale-y-0 rotate-12 opacity-0',
            )}
          />
          <div
            className={cn(
              'absolute inset-x-0 top-1/2 -mt-4 h-8 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-md transition-all duration-700',
              isUnwrapping && 'scale-x-0 -rotate-12 opacity-0',
            )}
          />

          {/* Golden Ribbon Bow Emblem */}
          <div
            className={cn(
              'relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-amber-300/60 bg-[#1F1612] text-amber-300 shadow-xl transition-all duration-500',
              isUnwrapping && 'scale-125 opacity-0',
            )}
          >
            <Gift className="h-9 w-9 text-amber-300 transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>
      </div>

      {/* Literary Typography */}
      <span
        className="font-heading text-xs font-semibold tracking-widest uppercase sm:text-sm"
        style={{ color: accentColor }}
      >
        A Birthday Space for {recipientName || 'Someone Special'}
      </span>

      <h1 className="font-heading mt-2 text-3xl font-medium tracking-tight text-[#FAF6F0] sm:text-4xl">
        {spaceTitle}
      </h1>

      <p className="mt-3 max-w-md font-sans text-sm text-stone-300 sm:text-base">
        A special space crafted with love for{' '}
        <strong className="font-medium text-white">
          {recipientName || 'Someone Special'}
        </strong>
        {senderName ? ` by ${senderName}` : ''}.
      </p>

      {dedicationMessage && (
        <div className="mt-5 max-w-md rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-md">
          <p className="font-heading text-center text-xs leading-relaxed text-stone-200 italic sm:text-sm">
            “{dedicationMessage}”
          </p>
        </div>
      )}

      {/* Action Button */}
      <div className="mt-8">
        <button
          type="button"
          onClick={onTriggerOpen}
          disabled={stage !== 'sealed'}
          className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-amber-400/60 bg-gradient-to-r from-amber-500/20 via-amber-500/30 to-amber-500/20 px-8 py-3.5 font-sans text-sm font-semibold text-amber-100 shadow-2xl transition-all hover:scale-105 active:scale-95 disabled:pointer-events-none"
        >
          <Sparkles className="h-4 w-4 text-amber-300 transition-transform duration-300 group-hover:rotate-12" />
          <span>Open Your Space</span>
        </button>
      </div>
    </div>
  )
}
