import { X, Heart, Mail } from 'lucide-react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { WashiTape, PushPin } from '@/features/space-themes/shared'

export interface PublicCardReaderModalProps {
  item: SpatialItem | null
  onClose: () => void
}

/**
 * Full-scale reading modal for keepsake cards, postcards, sticky notes,
 * and unsealed letters on the public Memory Canvas. Ensures intimate text
 * remains effortless to read at any screen size or zoom scale.
 */
export function PublicCardReaderModal({
  item,
  onClose,
}: PublicCardReaderModalProps) {
  if (!item) return null

  const title =
    item.data?.title ||
    (item.type === 'airmail-postcard'
      ? 'Travel Postcard'
      : item.type === 'wax-envelope'
        ? 'A Private Love Letter'
        : item.type === 'sticky-note'
          ? 'Handwritten Note'
          : 'Dedication Card')
  const text = item.data?.text || ''

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md select-none"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close card"
          className="absolute -top-3 -right-3 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/80 text-white/85 shadow-xl transition-colors hover:bg-black hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {item.type === 'sticky-note' && (
          <div className="relative rounded-2xl border border-amber-300/60 bg-amber-50/95 p-6 shadow-2xl sm:p-7 dark:border-amber-700/60 dark:bg-[#2A231C]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <PushPin color="brass" />
            </div>
            <p className="font-heading pt-2 text-base leading-relaxed whitespace-pre-wrap text-stone-800 italic sm:text-lg dark:text-stone-100">
              {text ? `\u201C${text}\u201D` : ''}
            </p>
          </div>
        )}

        {item.type === 'airmail-postcard' && (
          <div className="relative">
            <div className="absolute -top-3.5 left-7 z-20">
              <PushPin color="red" />
            </div>
            <div className="airmail-border shadow-2xl">
              <div className="postcard-inner space-y-4 p-6 sm:p-7">
                <div className="border-border-base/40 flex items-center justify-between border-b pb-3">
                  <span className="font-heading text-sm font-semibold text-teal-700 italic sm:text-base dark:text-teal-400">
                    {title}
                  </span>
                  <span className="font-mono text-[10px] tracking-wider text-stone-500">
                    AIR MAIL
                  </span>
                </div>
                <p className="font-heading text-base leading-relaxed whitespace-pre-wrap text-stone-700 italic sm:text-lg dark:text-stone-200">
                  {text ? `\u201C${text}\u201D` : ''}
                </p>
              </div>
            </div>
          </div>
        )}

        {item.type === 'wax-envelope' && (
          <div className="linen-envelope relative space-y-4 rounded-2xl p-6 shadow-2xl sm:p-7">
            <div className="absolute -top-3 left-7">
              <WashiTape color="rose" tilt="right" />
            </div>
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
              <span className="font-heading text-primary text-sm font-semibold italic sm:text-base">
                {title}
              </span>
              <Heart className="text-primary/70 h-4 w-4" />
            </div>
            <p className="font-heading text-base leading-relaxed whitespace-pre-wrap text-stone-800 italic sm:text-lg dark:text-stone-100">
              {text ? `\u201C${text}\u201D` : ''}
            </p>
          </div>
        )}

        {item.type !== 'sticky-note' &&
          item.type !== 'airmail-postcard' &&
          item.type !== 'wax-envelope' && (
            <div className="deckled-card relative space-y-4 rounded-2xl p-6 shadow-2xl sm:p-7">
              <div className="absolute -top-3 left-7">
                <WashiTape color="gold" tilt="left" />
              </div>
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <span className="font-heading text-sm font-semibold text-amber-700 italic sm:text-base dark:text-amber-400">
                  {title}
                </span>
                <Mail className="h-4 w-4 text-amber-500/70" />
              </div>
              <p className="font-heading text-base leading-relaxed whitespace-pre-wrap text-stone-700 italic sm:text-lg dark:text-stone-200">
                {text ? `\u201C${text}\u201D` : ''}
              </p>
            </div>
          )}
      </div>
    </div>
  )
}
