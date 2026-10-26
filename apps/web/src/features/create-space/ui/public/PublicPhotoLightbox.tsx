import { X, Calendar } from 'lucide-react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { cn } from '@/shared/lib'

export interface PublicPhotoLightboxProps {
  item: SpatialItem | null
  isRotated?: boolean
  onClose: () => void
}

/**
 * High-definition photograph modal viewer for public sanctuary visitors.
 */
export function PublicPhotoLightbox({
  item,
  isRotated = false,
  onClose,
}: PublicPhotoLightboxProps) {
  if (!item) return null

  const photoUrl = item.data?.photoUrl
  const caption = item.data?.caption || item.data?.title || item.label
  const date = item.data?.date

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md select-none"
      onClick={onClose}
    >
      <div
        className={cn(
          'relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-[#191411] p-5 shadow-2xl transition-transform',
          isRotated
            ? 'max-h-[88vw] w-[85vh] max-w-[540px] rotate-90'
            : 'max-h-[90vh] max-w-xl',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo"
          className="absolute top-4 right-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white/80 transition-colors hover:bg-black/90 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div
          className={cn(
            'relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-black/40',
            isRotated ? 'max-h-[58vw]' : 'max-h-[70vh]',
          )}
        >
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={caption || 'Dedicated space memory'}
              className={cn(
                'w-auto max-w-full rounded-md object-contain shadow-md',
                isRotated ? 'max-h-[54vw]' : 'max-h-[65vh]',
              )}
            />
          ) : (
            <div className="flex h-64 w-full items-center justify-center text-stone-400">
              No photograph available
            </div>
          )}
        </div>

        {(caption || date) && (
          <div className="mt-4 flex w-full flex-col items-center space-y-1 text-center">
            {caption && (
              <p className="font-heading text-lg font-medium text-stone-100">
                {caption}
              </p>
            )}
            {date && (
              <div className="flex items-center gap-1.5 text-xs text-amber-300/80">
                <Calendar className="h-3.5 w-3.5" />
                <span>{date}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
