import { Camera, Compass } from 'lucide-react'
import type { TemplateUnboxingProps } from '../unboxing.types'
import { cn } from '@/shared/lib'

export function FriendshipUnboxing({
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
      {/* Ambient Retro Sparks */}
      <div className="pointer-events-none absolute -inset-10 -z-10 flex items-center justify-center">
        <span className="absolute top-4 left-8 animate-pulse text-sm text-teal-300">
          ✦
        </span>
        <span className="absolute top-24 -right-6 animate-pulse text-xs text-teal-200">
          ✧
        </span>
        <span className="absolute -bottom-6 left-1/3 animate-pulse text-xs text-teal-400">
          ✦
        </span>
      </div>

      {/* Craft Paper Memory Parcel Artifact */}
      <div
        className={cn(
          'group relative mb-8 flex h-48 w-56 cursor-pointer items-center justify-center rounded-2xl border border-teal-800/40 bg-gradient-to-b from-[#182321] via-[#111A18] to-[#0A100F] shadow-2xl shadow-teal-950/80 transition-all duration-700 hover:scale-105 active:scale-95',
          isUnwrapping && 'scale-110 opacity-70 blur-xs',
        )}
        onClick={stage === 'sealed' ? onTriggerOpen : undefined}
      >
        {/* Soft Teal Halo Glow */}
        <div className="absolute inset-0 rounded-2xl bg-teal-500/10 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

        {/* Vintage Twine Cross */}
        <div
          className={cn(
            'absolute inset-y-0 w-3 border-x border-amber-600/30 bg-[#B58D5C] shadow-xs transition-all duration-700',
            isUnwrapping && 'scale-y-0 rotate-12 opacity-0',
          )}
        />
        <div
          className={cn(
            'absolute inset-x-0 top-1/2 -mt-1.5 h-3 border-y border-amber-600/30 bg-[#B58D5C] shadow-xs transition-all duration-700',
            isUnwrapping && 'scale-x-0 -rotate-12 opacity-0',
          )}
        />

        {/* Center Postage Stamp Emblem */}
        <div
          className={cn(
            'relative z-10 flex h-20 w-16 flex-col items-center justify-center rounded-lg border-2 border-dashed border-teal-300/60 bg-[#162220] p-1 shadow-lg transition-all duration-500',
            isUnwrapping && 'scale-125 opacity-0',
          )}
        >
          <Camera className="h-6 w-6 text-teal-300 transition-transform duration-300 group-hover:scale-110" />
          <span className="font-mono text-[9px] text-teal-200/80 uppercase">
            Airmail
          </span>
        </div>
      </div>

      {/* Literary Typography */}
      <span
        className="font-heading text-xs font-semibold tracking-widest uppercase sm:text-sm"
        style={{ color: accentColor }}
      >
        A Keepsake Memory Box
      </span>

      <h1 className="font-heading mt-2 text-3xl font-medium tracking-tight text-[#FAF6F0] sm:text-4xl">
        {spaceTitle}
      </h1>

      <p className="mt-3 max-w-md font-sans text-sm text-stone-300 sm:text-base">
        A treasure chest of shared adventures for{' '}
        <strong className="font-medium text-white">
          {recipientName || 'My Best Friend'}
        </strong>
        {senderName ? ` by ${senderName}` : ''}.
      </p>

      {dedicationMessage && (
        <div className="mt-5 max-w-md rounded-2xl border border-teal-500/20 bg-white/5 p-4 shadow-lg backdrop-blur-md">
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
          className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-teal-500/50 bg-gradient-to-r from-teal-600/20 via-teal-500/30 to-teal-600/20 px-8 py-3.5 font-sans text-sm font-semibold text-teal-100 shadow-2xl transition-all hover:scale-105 active:scale-95 disabled:pointer-events-none"
        >
          <Compass className="h-4 w-4 text-teal-300 transition-transform duration-300 group-hover:rotate-45" />
          <span>Untie Memories & Open</span>
        </button>
      </div>
    </div>
  )
}
