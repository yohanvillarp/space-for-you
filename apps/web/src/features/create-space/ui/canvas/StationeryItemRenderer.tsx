import { Sparkles, Camera } from 'lucide-react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import {
  PolaroidFrame,
  WashiTape,
  PushPin,
} from '@/features/space-themes/shared'
import { playSpatialSfx } from '@/shared/lib'

export interface StationeryItemRendererProps {
  item: SpatialItem
  isEditingText: boolean
  localText: string
  onSetLocalText: (text: string) => void
  onSaveText: () => void
  onStartEditText: () => void
  onOpenPhotoPicker?: (item: SpatialItem) => void
}

export function StationeryItemRenderer({
  item,
  isEditingText,
  localText,
  onSetLocalText,
  onSaveText,
  onStartEditText,
  onOpenPhotoPicker,
}: StationeryItemRendererProps) {
  switch (item.type) {
    case 'polaroid':
      return (
        <div className="max-w-[220px] sm:max-w-[240px]">
          <PolaroidFrame
            caption={item.data.caption || 'Special Memory'}
            date={item.data.date || 'A moment in time'}
            tapeColor={item.data.tapeColor || 'gold'}
            className="shadow-2xl"
          >
            {item.data.photoUrl ? (
              <div
                onClick={() => {
                  playSpatialSfx('camera-shutter')
                  onOpenPhotoPicker?.(item)
                }}
                className="group relative flex h-36 w-full cursor-pointer items-center justify-center overflow-hidden bg-black/40"
                title="Click to change photo"
              >
                <img
                  src={item.data.photoUrl}
                  alt={item.data.caption || 'Memory'}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div className="flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white shadow-md backdrop-blur-xs">
                    <Camera className="h-3.5 w-3.5 text-amber-300" />
                    <span>Change Photo</span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  playSpatialSfx('camera-shutter')
                  onOpenPhotoPicker?.(item)
                }}
                className="group flex h-36 w-full cursor-pointer flex-col items-center justify-center space-y-1.5 bg-gradient-to-tr from-amber-500/15 via-orange-400/10 to-rose-400/15 p-4 text-center transition-all hover:bg-amber-500/25"
                title="Click to add photo"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 transition-transform group-hover:scale-110">
                  <Camera className="h-5 w-5" />
                </div>
                <span className="font-heading text-xs font-medium text-stone-700 dark:text-stone-200">
                  Add Photograph
                </span>
                <span className="font-sans text-[10px] text-stone-400">
                  Select from web or device
                </span>
              </div>
            )}
          </PolaroidFrame>
        </div>
      )

    case 'greeting-card':
      return (
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
                  onChange={(e) => onSetLocalText(e.target.value)}
                  rows={3}
                  className="font-heading w-full rounded border border-amber-500/40 bg-white/70 p-1.5 text-xs text-stone-800 italic outline-none dark:bg-stone-900/70 dark:text-stone-200"
                />
                <button
                  type="button"
                  onClick={onSaveText}
                  className="bg-primary text-text-inverse rounded px-2 py-0.5 text-[10px]"
                >
                  Save
                </button>
              </div>
            ) : (
              <p
                onDoubleClick={onStartEditText}
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
      )

    case 'airmail-postcard':
      return (
        <div className="relative w-64 sm:w-72">
          <div
            onClick={(e) => {
              e.stopPropagation()
              playSpatialSfx('pin-thud')
            }}
            className="absolute -top-3.5 left-6 z-20 cursor-pointer transition-transform hover:scale-110 active:scale-95"
            title="Push pin"
          >
            <PushPin color="red" />
          </div>

          <div
            onClick={() => playSpatialSfx('pin-thud')}
            className="airmail-border cursor-pointer shadow-2xl transition-transform hover:scale-[1.01]"
          >
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
                      onChange={(e) => onSetLocalText(e.target.value)}
                      rows={3}
                      className="font-heading w-full rounded border border-teal-500/40 bg-white/80 p-1.5 text-xs text-stone-800 italic outline-none dark:bg-stone-900/80 dark:text-stone-200"
                    />
                    <button
                      type="button"
                      onClick={onSaveText}
                      className="rounded bg-teal-600 px-2 py-0.5 text-[10px] text-white"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <p
                    onDoubleClick={onStartEditText}
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
      )

    case 'sticky-note':
      return (
        <div
          onClick={(e) => {
            e.stopPropagation()
            playSpatialSfx('note-peel')
          }}
          className="relative w-52 cursor-pointer rounded-xl border border-amber-300/60 bg-amber-50/95 p-4 shadow-xl backdrop-blur-xs transition-transform hover:scale-[1.02] active:scale-[0.99] sm:w-56 dark:border-amber-700/60 dark:bg-[#2A231C]"
          title="Click to peel note"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <PushPin color="brass" />
          </div>

          <p className="font-heading pt-2 text-xs leading-relaxed text-stone-800 italic dark:text-stone-200">
            &ldquo;{item.data.text || 'A gentle keepsake reminder.'}&rdquo;
          </p>
        </div>
      )

    default:
      return null
  }
}
