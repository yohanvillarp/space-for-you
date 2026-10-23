import { useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import {
  RotateCcw,
  RotateCw,
  Trash2,
  BringToFront,
  Sparkles,
  Heart,
  GripHorizontal,
} from 'lucide-react'
import type { SpatialItem } from '../model/spatial-stage.types'
import {
  CandleFlame,
  WaxSeal,
  VinylPlayer,
  CassetteTape,
  PolaroidFrame,
  WashiTape,
  PushPin,
} from '@/features/space-themes/shared'
import { cn } from '@/shared/lib'

export interface SpatialCanvasItemProps {
  item: SpatialItem
  isSelected: boolean
  isDragging: boolean
  onSelect: (id: string) => void
  onStartDrag: (id: string, e: ReactPointerEvent) => void
  onRotate: (id: string, delta: number) => void
  onBringToFront: (id: string) => void
  onDelete: (id: string) => void
  onUpdateData: (id: string, updates: Partial<SpatialItem['data']>) => void
}

export function SpatialCanvasItem({
  item,
  isSelected,
  isDragging,
  onSelect,
  onStartDrag,
  onRotate,
  onBringToFront,
  onDelete,
  onUpdateData,
}: SpatialCanvasItemProps) {
  const [isEditingText, setIsEditingText] = useState(false)
  const [localText, setLocalText] = useState(
    item.data.text || item.data.caption || '',
  )

  const handlePointerDown = (e: ReactPointerEvent) => {
    // Prevent dragging when clicking inner action buttons/inputs
    const target = e.target as HTMLElement
    if (
      target.closest('button') ||
      target.closest('input') ||
      target.closest('textarea')
    ) {
      return
    }
    e.stopPropagation()
    onSelect(item.id)
    onStartDrag(item.id, e)
  }

  const handleSaveText = () => {
    setIsEditingText(false)
    if (item.type === 'polaroid') {
      onUpdateData(item.id, { caption: localText })
    } else {
      onUpdateData(item.id, { text: localText })
    }
  }

  return (
    <div
      id={`spatial-item-${item.id}`}
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
        zIndex: isDragging ? 9999 : item.zIndex,
      }}
      onPointerDown={handlePointerDown}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(item.id)
      }}
      className={cn(
        'group absolute touch-none transition-shadow select-none',
        isDragging
          ? 'scale-102 cursor-grabbing shadow-2xl ring-2 ring-amber-500/70'
          : 'cursor-grab hover:shadow-xl',
        isSelected &&
          !isDragging &&
          'ring-primary/80 ring-2 ring-offset-2 ring-offset-transparent',
      )}
    >
      {/* Micro Floating Toolbar when Item is Selected */}
      {isSelected && (
        <div
          onPointerDown={(e) => e.stopPropagation()}
          className="bg-bg-surface/95 border-border-base/80 text-text-primary animate-fade-in absolute -top-11 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border px-2 py-1 shadow-lg backdrop-blur-md"
        >
          {/* Drag Handle Indicator */}
          <div className="text-text-muted px-1">
            <GripHorizontal className="h-3.5 w-3.5" />
          </div>

          {/* Rotate Counter-Clockwise */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRotate(item.id, -5)
            }}
            title="Tilt left (-5°)"
            className="hover:bg-bg-subtle text-text-secondary hover:text-text-primary cursor-pointer rounded-full p-1 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
          </button>

          {/* Rotate Clockwise */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRotate(item.id, 5)
            }}
            title="Tilt right (+5°)"
            className="hover:bg-bg-subtle text-text-secondary hover:text-text-primary cursor-pointer rounded-full p-1 transition-colors"
          >
            <RotateCw className="h-3 w-3" />
          </button>

          {/* Bring to Front */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onBringToFront(item.id)
            }}
            title="Bring to front"
            className="hover:bg-bg-subtle text-text-secondary hover:text-text-primary cursor-pointer rounded-full p-1 transition-colors"
          >
            <BringToFront className="h-3 w-3" />
          </button>

          <div className="bg-border-base/60 mx-0.5 h-3 w-px" />

          {/* Delete Object */}
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation()
              onDelete(item.id)
            }}
            title="Delete element (Del)"
            className="cursor-pointer rounded-full p-1 text-rose-400 transition-colors hover:bg-rose-500/20 hover:text-rose-200"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* RENDER SPECIFIC OBJECT BASED ON TYPE */}

      {/* 1. Interactive Candle */}
      {item.type === 'candle' && (
        <div className="flex flex-col items-center">
          {item.data.isLit && (
            <div className="pointer-events-none absolute -top-4 h-28 w-28 animate-pulse rounded-full bg-amber-400/20 blur-2xl" />
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onUpdateData(item.id, { isLit: !item.data.isLit })
            }}
            className="group/candle flex cursor-pointer flex-col items-center transition-transform outline-none hover:scale-105"
            title={
              item.data.isLit ? 'Click to make a wish' : 'Click to relight'
            }
          >
            {item.data.isLit ? (
              <CandleFlame size="md" />
            ) : (
              <div className="flex flex-col items-center py-2">
                <span className="font-heading text-[10px] text-amber-300 italic">
                  ~ wish made ~
                </span>
                <div className="my-1 h-3 w-0.5 rounded-full bg-stone-600" />
                <div className="h-16 w-8 rounded-t-sm bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 shadow-md" />
              </div>
            )}
            <div className="mt-1 h-3 w-20 rounded-full border border-stone-500/40 bg-gradient-to-r from-stone-600 via-stone-400 to-stone-600 shadow-md" />
          </button>

          <span className="mt-1.5 font-sans text-[10px] font-medium text-amber-300/90 drop-shadow-xs">
            {item.data.isLit ? 'Tap candle to blow flame' : 'Tap to relight'}
          </span>
        </div>
      )}

      {/* 2. Wax-Sealed Parchment Envelope */}
      {item.type === 'wax-envelope' && (
        <div className="linen-envelope relative w-64 space-y-3 rounded-2xl p-4 shadow-2xl sm:w-72 sm:p-5">
          <div className="absolute -top-3 left-6">
            <WashiTape color="rose" tilt="right" />
          </div>

          <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
            <span className="font-heading text-primary text-xs font-semibold italic">
              {item.data.title || 'A Private Love Letter'}
            </span>
            <Heart className="text-primary/70 h-3 w-3" />
          </div>

          {item.data.isSealed ? (
            <div className="py-2 text-center">
              <p className="font-heading text-xs text-stone-700 italic dark:text-stone-300">
                Protected by an unbroken wax seal.
              </p>
              <p className="font-sans text-[10px] text-stone-400">
                Click seal below to break & read
              </p>
            </div>
          ) : (
            <div className="animate-fade-in space-y-2 py-1">
              {isEditingText ? (
                <div className="space-y-1.5">
                  <textarea
                    value={localText}
                    onChange={(e) => setLocalText(e.target.value)}
                    rows={3}
                    className="font-heading focus:ring-primary w-full rounded-md border border-rose-500/30 bg-white/70 p-1.5 text-xs text-stone-800 italic outline-none focus:ring-1 dark:bg-stone-900/70 dark:text-stone-200"
                  />
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={handleSaveText}
                      className="bg-primary text-text-inverse rounded-md px-2 py-0.5 font-sans text-[10px] font-medium"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p
                  onDoubleClick={() => setIsEditingText(true)}
                  className="font-heading cursor-text text-xs leading-relaxed text-stone-800 italic dark:text-stone-200"
                  title="Double click to edit note"
                >
                  &ldquo;{item.data.text || 'Write your private note here...'}
                  &rdquo;
                </p>
              )}
            </div>
          )}

          <div className="flex justify-center border-t border-rose-500/15 pt-2">
            <WaxSeal
              variant="terracotta"
              symbol="heart"
              label={item.data.isSealed ? 'Break seal' : 'Seal envelope'}
              defaultOpen={!item.data.isSealed}
              onToggle={(open) => onUpdateData(item.id, { isSealed: !open })}
            />
          </div>
        </div>
      )}

      {/* 3. Vintage Vinyl Player */}
      {item.type === 'vinyl-player' && (
        <div className="w-64 sm:w-72">
          <VinylPlayer
            trackTitle={item.data.title || 'Our Special Song'}
            artist="Ambient Soundtrack"
            labelColor="#A34835"
            className="shadow-2xl"
          />
        </div>
      )}

      {/* 4. Vintage Cassette Tape */}
      {item.type === 'cassette-tape' && (
        <div className="w-64 sm:w-72">
          <CassetteTape
            label={item.data.title || 'Roadtrip Mixtape • Side A'}
            subtitle="Memories & Melodies"
            className="shadow-2xl"
          />
        </div>
      )}

      {/* 5. Polaroid Frame */}
      {item.type === 'polaroid' && (
        <div className="max-w-[220px] sm:max-w-[240px]">
          <PolaroidFrame
            caption={item.data.caption || 'Special Memory'}
            date={item.data.date || 'A moment in time'}
            tapeColor={item.data.tapeColor || 'gold'}
            className="shadow-2xl"
          >
            <div className="flex h-36 w-full flex-col items-center justify-center space-y-1.5 bg-gradient-to-tr from-amber-500/20 via-orange-400/15 to-rose-400/20 p-4 text-center">
              <span className="text-2xl drop-shadow-xs">📷</span>
              {isEditingText ? (
                <div className="space-y-1">
                  <input
                    type="text"
                    value={localText}
                    onChange={(e) => setLocalText(e.target.value)}
                    className="font-heading w-full rounded border border-amber-500/40 bg-white/80 px-1 py-0.5 text-center text-[11px] text-stone-800 outline-none dark:bg-stone-900/80 dark:text-stone-200"
                  />
                  <button
                    type="button"
                    onClick={handleSaveText}
                    className="bg-primary text-text-inverse rounded px-1.5 py-0.5 text-[9px]"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p
                  onDoubleClick={() => setIsEditingText(true)}
                  className="font-heading cursor-text text-xs font-medium text-stone-700 italic dark:text-stone-200"
                  title="Double click caption to edit"
                >
                  {item.data.caption || 'Your Memory Here'}
                </p>
              )}
              <span className="font-sans text-[10px] text-stone-400">
                Step 2 Photo
              </span>
            </div>
          </PolaroidFrame>
        </div>
      )}

      {/* 6. Deckled Cotton Greeting Card */}
      {item.type === 'greeting-card' && (
        <div className="deckled-card relative w-64 space-y-3 rounded-2xl p-5 shadow-2xl sm:w-72">
          <div className="absolute -top-3 left-6">
            <WashiTape color="gold" tilt="left" />
          </div>

          <div className="border-b border-amber-500/20 pb-2">
            <span className="font-heading text-xs font-semibold text-amber-700 italic dark:text-amber-400">
              {item.data.title || 'Birthday Dedication'}
            </span>
          </div>

          <div className="space-y-1.5">
            {isEditingText ? (
              <div className="space-y-1">
                <textarea
                  value={localText}
                  onChange={(e) => setLocalText(e.target.value)}
                  rows={3}
                  className="font-heading w-full rounded border border-amber-500/40 bg-white/70 p-1.5 text-xs text-stone-800 italic outline-none dark:bg-stone-900/70 dark:text-stone-200"
                />
                <button
                  type="button"
                  onClick={handleSaveText}
                  className="bg-primary text-text-inverse rounded px-2 py-0.5 text-[10px]"
                >
                  Save
                </button>
              </div>
            ) : (
              <p
                onDoubleClick={() => setIsEditingText(true)}
                className="font-heading cursor-text text-xs leading-relaxed text-stone-700 italic dark:text-stone-300"
                title="Double click to edit note"
              >
                &ldquo;{item.data.text || 'Write your personal wish...'}&rdquo;
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 pt-1 font-sans text-[10px] text-amber-700/80 dark:text-amber-400/80">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span>Heavy Cotton Finish</span>
          </div>
        </div>
      )}

      {/* 7. Airmail Travel Postcard */}
      {item.type === 'airmail-postcard' && (
        <div className="relative w-64 sm:w-72">
          <div className="absolute -top-3.5 left-6 z-20">
            <PushPin color="red" />
          </div>

          <div className="airmail-border shadow-2xl">
            <div className="postcard-inner space-y-3 p-4 sm:p-5">
              <div className="border-border-base/40 flex items-center justify-between border-b pb-2">
                <span className="font-heading text-xs font-semibold text-teal-700 italic dark:text-teal-400">
                  {item.data.title || 'Travel Postcard'}
                </span>
                <span className="font-mono text-[9px] tracking-wider text-stone-500">
                  AIR MAIL
                </span>
              </div>

              <div className="space-y-1">
                {isEditingText ? (
                  <div className="space-y-1">
                    <textarea
                      value={localText}
                      onChange={(e) => setLocalText(e.target.value)}
                      rows={3}
                      className="font-heading w-full rounded border border-teal-500/40 bg-white/80 p-1.5 text-xs text-stone-800 italic outline-none dark:bg-stone-900/80 dark:text-stone-200"
                    />
                    <button
                      type="button"
                      onClick={handleSaveText}
                      className="rounded bg-teal-600 px-2 py-0.5 text-[10px] text-white"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <p
                    onDoubleClick={() => setIsEditingText(true)}
                    className="font-heading cursor-text text-xs leading-relaxed text-stone-700 italic dark:text-stone-300"
                    title="Double click to edit message"
                  >
                    &ldquo;{item.data.text || 'Memories on the road...'}&rdquo;
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Sticky Note */}
      {item.type === 'sticky-note' && (
        <div className="relative w-52 rounded-xl border border-amber-300/60 bg-amber-50/95 p-4 shadow-xl backdrop-blur-xs sm:w-56 dark:border-amber-700/60 dark:bg-[#2A231C]">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <PushPin color="brass" />
          </div>

          <p className="font-heading pt-2 text-xs leading-relaxed text-stone-800 italic dark:text-stone-200">
            &ldquo;{item.data.text || 'A gentle keepsake reminder.'}&rdquo;
          </p>
        </div>
      )}

      {/* 9. Rose Petals Cluster */}
      {item.type === 'rose-petals' && (
        <div className="flex items-center gap-2 p-2 select-none">
          <span className="rotate-12 text-xl text-rose-500/70 drop-shadow-xs">
            ❧
          </span>
          <span className="-rotate-45 text-sm text-rose-600/60 drop-shadow-xs">
            ❧
          </span>
          <span className="rotate-30 text-base text-rose-400/70 drop-shadow-xs">
            ❧
          </span>
        </div>
      )}

      {/* 10. Washi Tape Strip */}
      {item.type === 'washi-tape' && (
        <div className="p-1">
          <WashiTape color={item.data.tapeColor || 'gold'} tilt="straight" />
        </div>
      )}

      {/* 11. Starlight / Confetti Sparkles */}
      {item.type === 'confetti-stars' && (
        <div className="flex items-center gap-3 p-2 select-none">
          <span className="animate-pulse text-sm text-amber-300 drop-shadow-xs">
            ✦
          </span>
          <span className="text-lg text-amber-400 drop-shadow-xs">✧</span>
          <span className="animate-pulse text-xs text-amber-200 drop-shadow-xs">
            ✦
          </span>
        </div>
      )}

      {/* 12. Scalable Vector Sticker */}
      {item.type === 'vector-sticker' && item.data.svgUrl && (
        <div className="group/sticker relative p-2 select-none">
          <img
            src={item.data.svgUrl}
            alt={item.data.stickerName || 'Vector Sticker'}
            className="pointer-events-none h-20 w-20 drop-shadow-lg transition-transform select-none hover:scale-105"
            loading="lazy"
            crossOrigin="anonymous"
          />
        </div>
      )}
    </div>
  )
}
