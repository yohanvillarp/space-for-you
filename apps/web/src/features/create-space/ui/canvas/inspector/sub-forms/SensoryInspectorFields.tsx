import type { SpatialItemType } from '@/features/create-space/model/spatial-stage.types'

interface SensoryInspectorFieldsProps {
  itemType: SpatialItemType
  title: string
  caption: string
  text: string
  onChangeTitle: (val: string) => void
  onChangeCaption: (val: string) => void
  onChangeText: (val: string) => void
}

export function SensoryInspectorFields({
  itemType,
  title,
  caption,
  text,
  onChangeTitle,
  onChangeCaption,
  onChangeText,
}: SensoryInspectorFieldsProps) {
  const isLocket = itemType === 'antique-locket'
  const isWishingJar = itemType === 'firefly-jar'
  const isHourglass = itemType === 'stardust-hourglass'
  const hasSecretText = isLocket || isWishingJar || isHourglass

  const textLabel = isLocket
    ? 'Secret Inscription Inside Locket'
    : isWishingJar
      ? 'Heartfelt Wish Inscribed in Jar'
      : 'Hourglass Inscription'

  const textPlaceholder = isLocket
    ? 'Write a secret message visible when the locket opens...'
    : isWishingJar
      ? 'Write a wish or blessing for them...'
      : 'Write an inscription about time together...'

  return (
    <div className="space-y-3.5">
      <div className="space-y-1">
        <label
          htmlFor="sensory-title"
          className="font-sans text-xs font-medium text-amber-200/90"
        >
          {isLocket ? 'Locket Title / Monogram' : 'Keepsake Title'}
        </label>
        <input
          id="sensory-title"
          type="text"
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder={
            isLocket ? 'e.g., Always With You' : 'e.g., Jar of 100 Wishes'
          }
          maxLength={45}
          className="font-heading w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-stone-100 outline-none select-text focus:border-amber-400 focus:bg-white/10"
        />
      </div>

      {hasSecretText ? (
        <div className="space-y-1">
          <label
            htmlFor="sensory-text"
            className="font-sans text-xs font-medium text-amber-200/90"
          >
            {textLabel}
          </label>
          <textarea
            id="sensory-text"
            rows={4}
            value={text}
            onChange={(e) => onChangeText(e.target.value)}
            placeholder={textPlaceholder}
            maxLength={200}
            className="font-heading w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs leading-relaxed text-stone-100 italic outline-none select-text focus:border-amber-400 focus:bg-white/10"
          />
          <span className="block text-right font-mono text-[10px] text-stone-500">
            {text.length}/200
          </span>
        </div>
      ) : (
        <div className="space-y-1">
          <label
            htmlFor="sensory-caption"
            className="font-sans text-xs font-medium text-amber-200/90"
          >
            Dedication / Scent / Caption Note
          </label>
          <input
            id="sensory-caption"
            type="text"
            value={caption}
            onChange={(e) => onChangeCaption(e.target.value)}
            placeholder="e.g., Hand-poured with Amber & Vanilla"
            maxLength={60}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-sans text-xs text-stone-200 outline-none select-text focus:border-amber-400 focus:bg-white/10"
          />
        </div>
      )}
    </div>
  )
}
