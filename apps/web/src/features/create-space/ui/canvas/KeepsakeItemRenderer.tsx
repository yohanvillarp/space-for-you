import { Heart } from 'lucide-react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import {
  CandleFlame,
  WaxSeal,
  VinylPlayer,
  CassetteTape,
  MusicBox,
  VintageRadio,
  WashiTape,
} from '@/features/space-themes/shared'
import { playSpatialSfx } from '@/shared/lib'

export interface KeepsakeItemRendererProps {
  item: SpatialItem
  isEditingText: boolean
  localText: string
  onSetLocalText: (text: string) => void
  onSaveText: () => void
  onStartEditText: () => void
  onUpdateData: (id: string, updates: Partial<SpatialItem['data']>) => void
  onRecordVoiceNote?: (id: string) => void
  isEditorMode?: boolean
}

export function KeepsakeItemRenderer({
  item,
  isEditingText,
  localText,
  onSetLocalText,
  onSaveText,
  onStartEditText,
  onUpdateData,
  onRecordVoiceNote,
  isEditorMode,
}: KeepsakeItemRendererProps) {
  switch (item.type) {
    case 'candle':
      return (
        <div className="flex flex-col items-center">
          {item.data.isLit && (
            <div className="pointer-events-none absolute -top-4 h-28 w-28 animate-pulse rounded-full bg-amber-400/20 blur-2xl" />
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              playSpatialSfx(item.data.isLit ? 'candle-blow' : 'candle-spark')
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
      )

    case 'wax-envelope':
      return (
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
                    onChange={(e) => onSetLocalText(e.target.value)}
                    rows={3}
                    className="font-heading focus:ring-primary w-full rounded-md border border-rose-500/30 bg-white/70 p-1.5 text-xs text-stone-800 italic outline-none focus:ring-1 dark:bg-stone-900/70 dark:text-stone-200"
                  />
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={onSaveText}
                      className="bg-primary text-text-inverse rounded-md px-2 py-0.5 font-sans text-[10px] font-medium"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p
                  onDoubleClick={onStartEditText}
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
      )

    case 'vinyl-player':
      return (
        <div className="w-64 sm:w-72">
          <VinylPlayer
            trackTitle={item.data.title || 'Our Special Song'}
            artist={item.data.artist || 'Atelier Soundscape'}
            trackUrl={item.data.audioUrl}
            labelColor="#A34835"
            className="shadow-2xl"
          />
        </div>
      )

    case 'cassette-tape':
      return (
        <div className="w-64 sm:w-72">
          <CassetteTape
            label={item.data.title || 'Roadtrip Mixtape • Side A'}
            subtitle={item.data.subtitle || 'Memories & Melodies'}
            trackUrl={item.data.audioUrl}
            duration={item.data.duration}
            isVoiceNote={item.data.isVoiceNote ?? Boolean(item.data.audioUrl)}
            onRecordClick={
              onRecordVoiceNote ? () => onRecordVoiceNote(item.id) : undefined
            }
            isEditorMode={isEditorMode}
            className="shadow-2xl"
          />
        </div>
      )

    case 'music-box':
      return (
        <div className="w-64 sm:w-72">
          <MusicBox
            title={item.data.title || 'Happy Birthday (Music Box)'}
            artist={item.data.artist || 'Oleg Kirilkov'}
            trackUrl={item.data.audioUrl}
            className="shadow-2xl"
          />
        </div>
      )

    case 'vintage-radio':
      return (
        <div className="w-64 sm:w-72">
          <VintageRadio
            title={item.data.title || 'Roadtrip Mixtape • Side A'}
            artist={item.data.artist || 'Atelier Soundscape'}
            trackUrl={item.data.audioUrl}
            className="shadow-2xl"
          />
        </div>
      )

    default:
      return null
  }
}
