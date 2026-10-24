import { playSpatialSfx } from '@/shared/lib'

export interface LetterReaderPhotoEnclosureProps {
  imageUrl?: string
  date?: string
  title: string
  isStudioPreview?: boolean
  onRemovePhoto?: () => void
}

export function LetterReaderPhotoEnclosure({
  imageUrl,
  date,
  title,
  isStudioPreview = false,
  onRemovePhoto,
}: LetterReaderPhotoEnclosureProps) {
  if (!imageUrl) return null

  return (
    <div className="group/photo relative mx-auto my-3 max-w-sm rotate-[-1deg] overflow-hidden rounded-xl border-4 border-white bg-white p-1 shadow-md transition-all hover:rotate-0 hover:shadow-lg">
      <div className="aspect-4/3 w-full overflow-hidden rounded-lg bg-stone-100">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between px-1 pt-1.5 pb-0.5">
        <span className="font-heading text-[10px] tracking-wider text-stone-500 italic">
          {date || 'Enclosed memory'}
        </span>
        {isStudioPreview && onRemovePhoto && (
          <button
            type="button"
            onClick={() => {
              playSpatialSfx('note-peel')
              onRemovePhoto()
            }}
            title="Remove enclosed photograph"
            className="cursor-pointer font-sans text-[10px] text-rose-600 opacity-0 transition-opacity group-hover/photo:opacity-100 hover:text-rose-800"
          >
            Remove photo
          </button>
        )}
      </div>
    </div>
  )
}
