import type { SpaceMeta } from '@/features/create-space/model/scenes.types'
import type { SpaceTemplateId } from '@/entities/space'
import { cn } from '@/shared/lib'

export interface SpaceHubHeroProps {
  meta: SpaceMeta
  templateId?: SpaceTemplateId
  accentColor?: string
  onChangeMeta?: (updates: Partial<SpaceMeta>) => void
  onContextMenu?: (e: React.MouseEvent) => void
  className?: string
}

export function SpaceHubHero({
  meta,
  templateId,
  accentColor = '#D97706',
  onChangeMeta,
  onContextMenu,
  className,
}: SpaceHubHeroProps) {
  const isEditable = Boolean(onChangeMeta)
  const isCork = templateId === 'friendship'
  const titleColor = isCork ? '#4A2E20' : accentColor
  const senderColor = isCork ? '#8B3A2B' : accentColor

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
            placeholder="Space Title (e.g. Roadtrip Memories)"
            aria-label="Space Title"
            maxLength={60}
            style={{ color: titleColor }}
            className={cn(
              'w-full rounded-lg border border-transparent bg-transparent py-0.5 text-center font-sans text-xs font-semibold tracking-widest uppercase transition-all focus:ring-1 focus:outline-none',
              isCork
                ? 'placeholder:text-[#8D6B53] hover:border-black/15 hover:bg-black/5 focus:border-[#4A2E20]/40 focus:bg-[#FAF6EE]/60'
                : 'hover:border-white/15 hover:bg-white/5 focus:border-white/30 focus:bg-black/30',
            )}
          />
        ) : (
          meta.title && (
            <span
              className={cn(
                'font-sans text-xs font-semibold tracking-widest uppercase',
                isCork &&
                  'rounded-full border border-[#D4C3B3] bg-[#FAF6EE]/80 px-3 py-1 shadow-xs',
              )}
              style={{ color: titleColor }}
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
            className={cn(
              'w-full rounded-xl border border-transparent bg-transparent py-1 text-center font-serif text-3xl font-normal tracking-tight transition-all focus:ring-1 focus:outline-none sm:text-5xl',
              isCork
                ? 'text-[#2B1810] placeholder:text-[#7A5B49] hover:border-black/15 hover:bg-black/5 focus:border-[#4A2E20]/40 focus:bg-[#FAF6EE]/60'
                : 'text-[#FAF6F0] hover:border-white/15 hover:bg-white/5 focus:border-white/30 focus:bg-black/30',
            )}
          />
        ) : (
          <h1
            className={cn(
              'font-serif text-3xl font-normal tracking-tight sm:text-5xl',
              isCork ? 'text-[#2B1810] drop-shadow-xs' : 'text-[#FAF6F0]',
            )}
          >
            {meta.recipientName || 'Someone Special'}
          </h1>
        )}
      </div>

      {/* 2: Sender Attribution (Intimate Editorial Subtitle) */}
      <div
        className={cn(
          'flex items-center justify-center gap-1.5 font-sans text-xs sm:text-sm',
          isCork ? 'text-[#5A3825]' : 'text-[#A99B90]',
        )}
      >
        <span
          className={cn(
            'font-normal',
            isCork ? 'text-[#5A3825]' : 'text-stone-400',
          )}
        >
          From:
        </span>
        {isEditable ? (
          <input
            type="text"
            value={meta.senderName}
            onChange={(e) => onChangeMeta?.({ senderName: e.target.value })}
            placeholder="Your Name..."
            aria-label="Sender Name"
            maxLength={30}
            style={{ color: senderColor }}
            className={cn(
              'rounded-lg border border-transparent bg-transparent px-2 py-0.5 font-sans text-xs font-medium transition-all focus:ring-1 focus:outline-none sm:text-sm',
              isCork
                ? 'placeholder:text-[#9F7A65] hover:border-black/15 hover:bg-black/5 focus:border-[#4A2E20]/40 focus:bg-[#FAF6EE]/60'
                : 'hover:border-white/15 hover:bg-white/5 focus:border-white/30 focus:bg-black/30',
            )}
          />
        ) : (
          <span className="font-medium" style={{ color: senderColor }}>
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
            className={cn(
              'w-full resize-none rounded-xl border border-transparent bg-transparent p-2 text-center font-sans text-xs leading-relaxed transition-all focus:ring-1 focus:outline-none sm:text-sm',
              isCork
                ? 'text-[#3B2219] placeholder:text-[#8D6B53] hover:border-black/15 hover:bg-black/5 focus:border-[#4A2E20]/40 focus:bg-[#FAF6EE]/60'
                : 'text-stone-300 hover:border-white/15 hover:bg-white/5 focus:border-white/30 focus:bg-black/30',
            )}
          />
        ) : (
          meta.dedicationMessage && (
            <div
              className={cn(
                'rounded-2xl px-5 py-3 shadow-sm backdrop-blur-md',
                isCork
                  ? 'border border-[#7C5A43]/25 bg-[#FAF6EE]/90 shadow-md'
                  : 'border border-white/10 bg-black/25',
              )}
            >
              <p
                className={cn(
                  'font-heading text-xs leading-relaxed italic sm:text-sm',
                  isCork ? 'text-[#3B2219]' : 'text-stone-200',
                )}
              >
                “{meta.dedicationMessage}”
              </p>
            </div>
          )
        )}
      </div>
    </header>
  )
}
