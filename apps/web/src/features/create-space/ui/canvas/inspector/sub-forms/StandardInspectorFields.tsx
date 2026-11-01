import type { ItemFormType } from '@/features/create-space/model/spatial-item-capabilities'

interface StandardInspectorFieldsProps {
  formType: ItemFormType
  title: string
  subtitle: string
  caption: string
  date: string
  text: string
  onChangeTitle: (val: string) => void
  onChangeSubtitle: (val: string) => void
  onChangeCaption: (val: string) => void
  onChangeDate: (val: string) => void
  onChangeText: (val: string) => void
}

export function StandardInspectorFields({
  formType,
  title,
  subtitle,
  caption,
  date,
  text,
  onChangeTitle,
  onChangeSubtitle,
  onChangeCaption,
  onChangeDate,
  onChangeText,
}: StandardInspectorFieldsProps) {
  const isAudio = formType === 'audio'
  const isPolaroid = formType === 'polaroid'
  const isStickyNote = formType === 'sticky-note'
  const isCardOrLetter = formType === 'card-or-letter'

  return (
    <div className="space-y-3.5">
      {(isCardOrLetter || isAudio) && (
        <div className="space-y-1">
          <label
            htmlFor="item-title-input"
            className="font-sans text-xs font-medium text-amber-200/90"
          >
            {isAudio ? 'Player Label / Song Title' : 'Card Header / Title'}
          </label>
          <input
            id="item-title-input"
            type="text"
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
            placeholder={
              isAudio
                ? 'e.g., For Leo • Voice Message'
                : 'e.g., Birthday Dedication'
            }
            maxLength={45}
            className="font-heading w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-stone-100 outline-none select-text focus:border-amber-400 focus:bg-white/10"
          />
        </div>
      )}

      {isAudio && (
        <div className="space-y-1">
          <label
            htmlFor="item-subtitle-input"
            className="font-sans text-xs font-medium text-amber-200/90"
          >
            Subtitle / Artist / Memo Tag
          </label>
          <input
            id="item-subtitle-input"
            type="text"
            value={subtitle}
            onChange={(e) => onChangeSubtitle(e.target.value)}
            placeholder="e.g., October 25 • Special Note"
            maxLength={40}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-sans text-xs text-stone-200 outline-none select-text focus:border-amber-400 focus:bg-white/10"
          />
        </div>
      )}

      {isPolaroid && (
        <>
          <div className="space-y-1">
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
              onChange={(e) => onChangeCaption(e.target.value)}
              placeholder="e.g., Unforgettable Moment"
              maxLength={40}
              className="font-heading w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-stone-100 outline-none select-text focus:border-amber-400 focus:bg-white/10"
            />
          </div>
          <div className="space-y-1">
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
              onChange={(e) => onChangeDate(e.target.value)}
              placeholder="e.g., Summer in Paris • 2026"
              maxLength={30}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-sans text-xs text-stone-200 outline-none select-text focus:border-amber-400 focus:bg-white/10"
            />
          </div>
        </>
      )}

      {(isCardOrLetter || isStickyNote) && (
        <div className="space-y-1">
          <label
            htmlFor="item-body-input"
            className="font-sans text-xs font-medium text-amber-200/90"
          >
            {isStickyNote ? 'Note Message' : 'Dedication Message / Quote'}
          </label>
          <textarea
            id="item-body-input"
            value={text}
            onChange={(e) => onChangeText(e.target.value)}
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
    </div>
  )
}
