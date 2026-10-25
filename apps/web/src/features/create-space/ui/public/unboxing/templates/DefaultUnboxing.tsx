import { Sparkles, Heart } from 'lucide-react'
import type { TemplateUnboxingProps } from '../unboxing.types'
import { cn } from '@/shared/lib'

export function DefaultUnboxing({
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
      {/* Luminous Keepsake Emblem Artifact */}
      <div
        className={cn(
          'group relative mb-8 flex h-40 w-40 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-gradient-to-b from-white/10 to-white/5 shadow-2xl backdrop-blur-md transition-all duration-700 hover:scale-105 active:scale-95',
          isUnwrapping && 'scale-125 opacity-50 blur-xs',
        )}
        onClick={stage === 'sealed' ? onTriggerOpen : undefined}
      >
        <div
          className="absolute inset-0 rounded-full opacity-20 blur-xl transition-opacity group-hover:opacity-40"
          style={{ backgroundColor: accentColor }}
        />
        <Heart
          className="h-14 w-14 transition-transform duration-300 group-hover:scale-110"
          style={{ color: accentColor, fill: `${accentColor}33` }}
        />
      </div>

      <span
        className="font-heading text-xs font-semibold tracking-widest uppercase sm:text-sm"
        style={{ color: accentColor }}
      >
        A Private Digital Sanctuary
      </span>

      <h1 className="font-heading mt-2 text-3xl font-medium tracking-tight text-[#FAF6F0] sm:text-4xl">
        {spaceTitle}
      </h1>

      <p className="mt-3 max-w-md font-sans text-sm text-stone-300 sm:text-base">
        Crafted with love for{' '}
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

      <div className="mt-8">
        <button
          type="button"
          onClick={onTriggerOpen}
          disabled={stage !== 'sealed'}
          className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full border px-8 py-3.5 font-sans text-sm font-semibold text-white shadow-2xl transition-all hover:scale-105 active:scale-95 disabled:pointer-events-none"
          style={{
            borderColor: `${accentColor}88`,
            backgroundColor: `${accentColor}33`,
          }}
        >
          <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          <span>Open Sanctuary</span>
        </button>
      </div>
    </div>
  )
}
