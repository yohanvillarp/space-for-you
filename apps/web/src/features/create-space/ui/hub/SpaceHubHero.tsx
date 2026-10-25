import type { SpaceMeta } from '@/features/create-space/model/scenes.types'
import { cn } from '@/shared/lib'

export interface SpaceHubHeroProps {
  meta: SpaceMeta
  accentColor?: string
  onChangeMeta?: (updates: Partial<SpaceMeta>) => void
  onContextMenu?: (e: React.MouseEvent) => void
  className?: string
}

export function SpaceHubHero({
  meta,
  accentColor = '#D97706',
  onChangeMeta,
  onContextMenu,
  className,
}: SpaceHubHeroProps) {
  const isEditable = Boolean(onChangeMeta)

  return (
    <header
      onContextMenu={onContextMenu}
      className={cn(
        'flex flex-col items-center space-y-3.5 text-center select-none',
        className,
      )}
    >
      {/* 0: Space Title */}
      <div className="w-full max-w-md px-2">
        {isEditable ? (
          <input
            type="text"
            value={meta.title ?? ''}
            onChange={(e) => onChangeMeta?.({ title: e.target.value })}
            placeholder="Space Title (e.g. Birthday Sanctuary)"
            aria-label="Space Title"
            maxLength={60}
            style={{ color: accentColor }}
            className="w-full rounded-lg border border-transparent bg-transparent py-0.5 text-center font-sans text-xs font-semibold tracking-widest uppercase transition-all hover:border-white/15 hover:bg-white/5 focus:border-white/30 focus:bg-black/30 focus:ring-1 focus:outline-none"
          />
        ) : (
          meta.title && (
            <span
              className="font-sans text-xs font-semibold tracking-widest uppercase"
              style={{ color: accentColor }}
            >
              {meta.title}
            </span>
          )
        )}
      </div>

      {/* 1: Recipient Name (Primary Focal Point) */}
      <div className="w-full max-w-xl px-2">
        {isEditable ? (
          <input
            type="text"
            value={meta.recipientName}
            onChange={(e) => onChangeMeta?.({ recipientName: e.target.value })}
            placeholder="Recipient's Name..."
            aria-label="Recipient Name"
            maxLength={35}
            className="w-full rounded-xl border border-transparent bg-transparent py-1 text-center font-serif text-3xl font-normal tracking-tight text-[#FAF6F0] transition-all hover:border-white/15 hover:bg-white/5 focus:border-white/30 focus:bg-black/30 focus:ring-1 focus:outline-none sm:text-5xl"
          />
        ) : (
          <h1 className="font-serif text-3xl font-normal tracking-tight text-[#FAF6F0] sm:text-5xl">
            {meta.recipientName || 'Someone Special'}
          </h1>
        )}
      </div>

      {/* 2: Sender Attribution (Intimate Editorial Subtitle) */}
      <div className="flex items-center justify-center gap-1.5 font-sans text-xs text-[#A99B90] sm:text-sm">
        <span className="font-normal text-stone-400">From:</span>
        {isEditable ? (
          <input
            type="text"
            value={meta.senderName}
            onChange={(e) => onChangeMeta?.({ senderName: e.target.value })}
            placeholder="Your Name..."
            aria-label="Sender Name"
            maxLength={30}
            style={{ color: accentColor }}
            className="rounded-lg border border-transparent bg-transparent px-2 py-0.5 font-sans text-xs font-medium transition-all hover:border-white/15 hover:bg-white/5 focus:border-white/30 focus:bg-black/30 focus:ring-1 focus:outline-none sm:text-sm"
          />
        ) : (
          <span className="font-medium" style={{ color: accentColor }}>
            {meta.senderName || 'Anonymous'}
          </span>
        )}
      </div>

      {/* 3: Dedication Note (Poetic Opening) */}
      <div className="w-full max-w-lg px-3">
        {isEditable ? (
          <textarea
            rows={2}
            value={meta.dedicationMessage ?? ''}
            onChange={(e) =>
              onChangeMeta?.({ dedicationMessage: e.target.value })
            }
            placeholder="Write an intimate collection note for this space..."
            aria-label="Dedication Note"
            maxLength={180}
            className="w-full resize-none rounded-xl border border-transparent bg-transparent p-2 text-center font-sans text-xs leading-relaxed text-stone-300 transition-all hover:border-white/15 hover:bg-white/5 focus:border-white/30 focus:bg-black/30 focus:ring-1 focus:outline-none sm:text-sm"
          />
        ) : (
          meta.dedicationMessage && (
            <div className="rounded-2xl border border-white/10 bg-black/25 px-5 py-3 shadow-sm backdrop-blur-md">
              <p className="font-heading text-xs leading-relaxed text-stone-200 italic sm:text-sm">
                “{meta.dedicationMessage}”
              </p>
            </div>
          )
        )}
      </div>
    </header>
  )
}
