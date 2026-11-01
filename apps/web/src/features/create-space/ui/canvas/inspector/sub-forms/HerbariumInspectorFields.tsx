import { Sparkles } from 'lucide-react'
import type { SpatialItemData } from '@/features/create-space/model/spatial-stage.types'
import { cn } from '@/shared/lib'

type BotanicalSpecimen = NonNullable<SpatialItemData['herbariumFlower']>

interface HerbariumInspectorFieldsProps {
  specimen: BotanicalSpecimen
  caption: string
  title: string
  onChangeSpecimen: (specimen: BotanicalSpecimen) => void
  onChangeCaption: (caption: string) => void
  onChangeTitle: (title: string) => void
}

const SPECIMENS: { id: BotanicalSpecimen; label: string; icon: string }[] = [
  { id: 'lavender', label: 'Wild Lavender', icon: '🪻' },
  { id: 'hydrangea', label: 'Blue Hydrangea', icon: '💠' },
  { id: 'ferns', label: 'Woodland Fern', icon: '🌿' },
  { id: 'pressed-rose', label: 'Vintage Rose', icon: '🌹' },
]

export function HerbariumInspectorFields({
  specimen,
  caption,
  title,
  onChangeSpecimen,
  onChangeCaption,
  onChangeTitle,
}: HerbariumInspectorFieldsProps) {
  return (
    <div className="space-y-3.5">
      <div className="space-y-1.5">
        <label className="font-sans text-xs font-medium text-amber-200/90">
          Preserved Specimen
        </label>
        <div className="grid grid-cols-2 gap-2">
          {SPECIMENS.map((s) => {
            const isSelected = specimen === s.id
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onChangeSpecimen(s.id)}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-xl border p-2 text-left font-sans text-xs transition-all active:scale-95',
                  isSelected
                    ? 'border-amber-400/80 bg-amber-500/15 text-amber-200 shadow-xs'
                    : 'border-white/10 bg-white/5 text-stone-300 hover:border-white/20 hover:bg-white/10',
                )}
              >
                <span className="text-base">{s.icon}</span>
                <span className="truncate font-medium">{s.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="herbarium-caption"
          className="flex items-center gap-1.5 font-sans text-xs font-medium text-amber-200/90"
        >
          <span>Glass Calligraphy Label</span>
          <Sparkles className="h-3 w-3 text-amber-400" />
        </label>
        <input
          id="herbarium-caption"
          type="text"
          value={caption}
          onChange={(e) => onChangeCaption(e.target.value)}
          placeholder="e.g., Herbarium No. 24"
          maxLength={30}
          className="font-heading w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-stone-100 outline-none select-text focus:border-amber-400 focus:bg-white/10"
        />
        <p className="font-sans text-[10px] text-stone-400">
          Appears engraved along the bottom glass edge of the brass frame.
        </p>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="herbarium-title"
          className="font-sans text-xs font-medium text-stone-300"
        >
          Specimen Name (Internal note)
        </label>
        <input
          id="herbarium-title"
          type="text"
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="e.g., Lavender from Provence"
          maxLength={40}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-sans text-xs text-stone-200 outline-none select-text focus:border-amber-400 focus:bg-white/10"
        />
      </div>
    </div>
  )
}
