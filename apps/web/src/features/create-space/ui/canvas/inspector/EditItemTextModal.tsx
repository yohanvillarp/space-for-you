import { useState } from 'react'
import { X, Check, PenLine } from 'lucide-react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { Button } from '@/shared/ui'
import { playSpatialSfx } from '@/shared/lib'

export interface EditItemTextModalProps {
  isOpen: boolean
  item: SpatialItem | null
  onClose: () => void
  onSave: (id: string, updates: Partial<SpatialItem['data']>) => void
}

const ITEM_NAMES: Record<string, string> = {
  'greeting-card': 'Dedication Card',
  polaroid: 'Polaroid Photo',
  'sticky-note': 'Handwritten Note',
  'airmail-postcard': 'Airmail Postcard',
  'wax-envelope': 'Sealed Love Letter',
  'cassette-tape': 'Voice Note Cassette',
}

interface FormProps {
  item: SpatialItem
  onClose: () => void
  onSave: (id: string, updates: Partial<SpatialItem['data']>) => void
}

function EditItemTextForm({ item, onClose, onSave }: FormProps) {
  const [title, setTitle] = useState(item.data.title || '')
  const [text, setText] = useState(item.data.text || '')
  const [caption, setCaption] = useState(item.data.caption || '')
  const [date, setDate] = useState(item.data.date || '')
  const [subtitle, setSubtitle] = useState(
    item.data.subtitle || item.data.artist || '',
  )

  const isPolaroid = item.type === 'polaroid'
  const isStickyNote = item.type === 'sticky-note'
  const isAudioItem =
    item.type === 'cassette-tape' ||
    item.type === 'vinyl-player' ||
    item.type === 'vintage-radio' ||
    item.type === 'music-box'
  const isCardOrLetter =
    item.type === 'greeting-card' ||
    item.type === 'airmail-postcard' ||
    item.type === 'wax-envelope'

  const handleSave = () => {
    playSpatialSfx('tactile-tap')
    const updates: Partial<SpatialItem['data']> = {}

    if (isPolaroid) {
      updates.caption = caption.trim()
      updates.date = date.trim()
    } else if (isStickyNote) {
      updates.text = text.trim()
      if (title.trim()) updates.title = title.trim()
    } else if (isAudioItem) {
      updates.title = title.trim()
      if (item.type === 'cassette-tape') {
        updates.subtitle = subtitle.trim()
      } else {
        updates.artist = subtitle.trim()
      }
    } else if (isCardOrLetter) {
      updates.title = title.trim()
      updates.text = text.trim()
    } else {
      if (title) updates.title = title.trim()
      if (text) updates.text = text.trim()
    }

    onSave(item.id, updates)
    onClose()
  }

  const typeName = ITEM_NAMES[item.type] || item.label || 'Stage Keepsake'

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#17120F] p-6 text-[#FAF6F0] shadow-2xl">
      <div className="flex items-start justify-between pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-300">
            <PenLine className="h-4 w-4" />
          </div>
          <div>
            <h2
              id="edit-item-text-title"
              className="font-heading text-lg font-medium text-stone-100"
            >
              Edit {typeName}
            </h2>
            <p className="font-sans text-xs text-stone-400">
              Personalize words for your recipient
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="cursor-pointer rounded-full p-1.5 text-stone-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSave()
        }}
        className="space-y-4 pt-1"
      >
        {(isCardOrLetter || isAudioItem) && (
          <div className="space-y-1.5">
            <label
              htmlFor="item-title-input"
              className="font-sans text-xs font-medium text-amber-200/90"
            >
              {isAudioItem ? 'Cassette Title / Label' : 'Header / Title'}
            </label>
            <input
              id="item-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                isAudioItem
                  ? 'e.g., For Leo • Voice Message'
                  : 'e.g., Birthday Dedication'
              }
              maxLength={45}
              className="font-heading w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-stone-100 outline-none select-text focus:border-amber-400 focus:bg-white/10"
            />
          </div>
        )}

        {isAudioItem && (
          <div className="space-y-1.5">
            <label
              htmlFor="item-subtitle-input"
              className="font-sans text-xs font-medium text-amber-200/90"
            >
              Subtitle / Memo
            </label>
            <input
              id="item-subtitle-input"
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g., October 25 • Special Note"
              maxLength={40}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-sans text-xs text-stone-200 outline-none select-text focus:border-amber-400 focus:bg-white/10"
            />
          </div>
        )}

        {isPolaroid && (
          <>
            <div className="space-y-1.5">
              <label
                htmlFor="polaroid-caption-input"
                className="font-sans text-xs font-medium text-amber-200/90"
              >
                Photo Caption
              </label>
              <input
                id="polaroid-caption-input"
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g., Unforgettable Moment"
                maxLength={40}
                className="font-heading w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-stone-100 outline-none select-text focus:border-amber-400 focus:bg-white/10"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="polaroid-date-input"
                className="font-sans text-xs font-medium text-amber-200/90"
              >
                Date / Location Tag
              </label>
              <input
                id="polaroid-date-input"
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g., Summer in Paris • 2026"
                maxLength={30}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-sans text-xs text-stone-200 outline-none select-text focus:border-amber-400 focus:bg-white/10"
              />
            </div>
          </>
        )}

        {(isCardOrLetter || isStickyNote) && (
          <div className="space-y-1.5">
            <label
              htmlFor="item-body-input"
              className="font-sans text-xs font-medium text-amber-200/90"
            >
              {isStickyNote ? 'Note Message' : 'Dedication Message / Quote'}
            </label>
            <textarea
              id="item-body-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="Write your heartfelt note for them..."
              maxLength={240}
              className="font-heading w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs leading-relaxed text-stone-100 italic outline-none select-text focus:border-amber-400 focus:bg-white/10"
            />
            <span className="block text-right font-mono text-[10px] text-stone-500">
              {text.length}/240
            </span>
          </div>
        )}

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="border-white/15 bg-white/5 text-stone-300 hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="flex items-center gap-1.5 font-medium"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Apply Changes</span>
          </Button>
        </div>
      </form>
    </div>
  )
}

export function EditItemTextModal({
  isOpen,
  item,
  onClose,
  onSave,
}: EditItemTextModalProps) {
  if (!isOpen || !item) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-item-text-title"
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs select-none"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <EditItemTextForm
        key={item.id}
        item={item}
        onClose={onClose}
        onSave={onSave}
      />
    </div>
  )
}
