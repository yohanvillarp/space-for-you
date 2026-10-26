import { useState, useEffect, useRef } from 'react'
import { Pencil, X, Check } from 'lucide-react'
import { playSpatialSfx } from '@/shared/lib'

export interface EditSceneDetailsModalProps {
  isOpen: boolean
  currentTitle: string
  currentSubtitle?: string
  onClose: () => void
  onSave: (newTitle: string, newSubtitle: string) => void
}

export function EditSceneDetailsModal({
  isOpen,
  currentTitle,
  currentSubtitle = '',
  onClose,
  onSave,
}: EditSceneDetailsModalProps) {
  const [title, setTitle] = useState(currentTitle)
  const [subtitle, setSubtitle] = useState(currentSubtitle)
  const titleInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedTitle = title.trim()
    const trimmedSubtitle = subtitle.trim()
    if (!trimmedTitle) return
    playSpatialSfx('tactile-tap')
    onSave(trimmedTitle, trimmedSubtitle)
    onClose()
  }

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs select-none"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-scene-details-title"
        className="w-full max-w-md rounded-2xl border border-[#3B302A] bg-[#1A1411] p-5 shadow-2xl ring-1 ring-white/10"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300">
              <Pencil className="h-3.5 w-3.5" />
            </div>
            <div>
              <h2
                id="edit-scene-details-title"
                className="font-serif text-base font-medium text-stone-100"
              >
                Edit Scene Details
              </h2>
              <p className="font-sans text-[11px] text-stone-400">
                Personalize the title and description for this chapter
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-stone-400 hover:bg-white/5 hover:text-stone-200"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="edit-scene-title-input"
                className="text-xs font-medium text-stone-300"
              >
                Scene Title
              </label>
              <span className="font-mono text-[10px] text-stone-500">
                {title.length}/40
              </span>
            </div>
            <input
              id="edit-scene-title-input"
              ref={titleInputRef}
              autoFocus
              type="text"
              value={title}
              maxLength={40}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-[#4A3B33] bg-[#241C18] px-3.5 py-2 font-serif text-sm text-stone-100 placeholder-stone-500 shadow-inner focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 focus:outline-hidden"
              placeholder="e.g. Memory Canvas or Our Golden Memories"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="edit-scene-desc-input"
                className="text-xs font-medium text-stone-300"
              >
                Description / Subtitle
              </label>
              <span className="font-mono text-[10px] text-stone-500">
                {subtitle.length}/100
              </span>
            </div>
            <textarea
              id="edit-scene-desc-input"
              rows={3}
              value={subtitle}
              maxLength={100}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full rounded-xl border border-[#4A3B33] bg-[#241C18] px-3.5 py-2 font-sans text-xs leading-relaxed text-stone-200 placeholder-stone-500 shadow-inner focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 focus:outline-hidden"
              placeholder="e.g. An intimate collection of keepsakes and photographs for you"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl px-3.5 py-1.5 font-sans text-xs font-medium text-stone-400 hover:bg-white/5 hover:text-stone-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-amber-400/40 bg-amber-400/20 px-4 py-1.5 font-sans text-xs font-medium text-amber-200 shadow-xs hover:bg-amber-400/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
