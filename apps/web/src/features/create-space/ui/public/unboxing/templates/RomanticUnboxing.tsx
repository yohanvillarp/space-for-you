import { Heart, Flame } from 'lucide-react'
import type { TemplateUnboxingProps } from '../unboxing.types'
import { cn } from '@/shared/lib'

export function RomanticUnboxing({
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
      {/* Drifting Rose Embers */}
      <div className="pointer-events-none absolute -inset-10 -z-10 flex items-center justify-center">
        <span className="absolute top-2 left-10 animate-pulse text-sm text-rose-400">
          ✦
        </span>
        <span className="absolute top-28 -right-8 animate-pulse text-xs text-rose-300">
          ❦
        </span>
        <span className="absolute -bottom-6 left-1/4 animate-pulse text-xs text-rose-500">
          ✦
        </span>
      </div>

      {/* Wax-Sealed Parchment Envelope Artifact */}
      <div
        className={cn(
          'group relative mb-8 flex h-44 w-64 cursor-pointer items-center justify-center rounded-2xl border border-rose-900/40 bg-gradient-to-b from-[#2B1713] via-[#1E110E] to-[#140A08] shadow-2xl shadow-rose-950/80 transition-all duration-700 hover:scale-105 active:scale-95',
          isUnwrapping && 'scale-110 opacity-70 blur-xs',
        )}
        onClick={stage === 'sealed' ? onTriggerOpen : undefined}
      >
        {/* Ambient Warm Halo Glow */}
        <div className="absolute inset-0 rounded-2xl bg-rose-600/10 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

        {/* Envelope Top Triangle Flap */}
        <div
          className={cn(
            'absolute inset-x-0 top-0 h-20 origin-top rounded-t-2xl border-b border-rose-800/30 bg-[#251310] shadow-sm transition-transform duration-700',
            isUnwrapping && '-rotate-180 opacity-20',
          )}
        />

        {/* Wax Seal Centered */}
        <div
          className={cn(
            'relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#833324] bg-gradient-to-br from-[#A34835] via-[#853424] to-[#5A2015] text-amber-100 shadow-xl transition-all duration-500',
            isUnwrapping && 'scale-125 rotate-45 opacity-0',
          )}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/20">
            <Heart className="h-7 w-7 fill-current text-rose-200 transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>
      </div>

      {/* Literary Typography */}
      <span
        className="font-heading text-xs font-semibold tracking-widest uppercase sm:text-sm"
        style={{ color: accentColor }}
      >
        An Intimate Love Letter
      </span>

      <h1 className="font-heading mt-2 text-3xl font-medium tracking-tight text-[#FAF6F0] sm:text-4xl">
        {spaceTitle}
      </h1>

      <p className="mt-3 max-w-md font-sans text-sm text-stone-300 sm:text-base">
        An intimate space created solely for{' '}
        <strong className="font-medium text-white">
          {recipientName || 'My Beloved'}
        </strong>
        {senderName ? ` by ${senderName}` : ''}.
      </p>

      {dedicationMessage && (
        <div className="mt-5 max-w-md rounded-2xl border border-rose-500/20 bg-white/5 p-4 shadow-lg backdrop-blur-md">
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
          className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-rose-500/50 bg-gradient-to-r from-rose-600/20 via-rose-500/30 to-rose-600/20 px-8 py-3.5 font-sans text-sm font-semibold text-rose-100 shadow-2xl transition-all hover:scale-105 active:scale-95 disabled:pointer-events-none"
        >
          <Flame className="h-4 w-4 text-rose-300 transition-transform duration-300 group-hover:scale-110" />
          <span>Break the Seal & Step Inside</span>
        </button>
      </div>
    </div>
  )
}
