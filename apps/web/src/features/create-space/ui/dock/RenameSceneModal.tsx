import { useState, useEffect, useRef } from 'react'
import { Pencil, X } from 'lucide-react'
import { playSpatialSfx } from '@/shared/lib'

export interface RenameSceneModalProps {
  isOpen: boolean
  currentTitle: string
  onClose: () => void
  onSave: (newTitle: string) => void
}

export function RenameSceneModal({
  isOpen,
  currentTitle,
  onClose,
  onSave,
}: RenameSceneModalProps) {
  const [title, setTitle] = useState(currentTitle)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    playSpatialSfx('tactile-tap')
    onSave(trimmed)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs select-none">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rename-scene-title"
        className="w-full max-w-sm rounded-2xl border border-[#3B302A] bg-[#1A1411] p-5 shadow-2xl ring-1 ring-white/10"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300">
              <Pencil className="h-3.5 w-3.5" />
            </div>
            <h2
              id="rename-scene-title"
              className="font-serif text-base font-medium text-stone-100"
            >
              Rename Scene
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-stone-400 hover:bg-white/5 hover:text-stone-200"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="scene-title-input"
              className="mb-1.5 block text-xs font-medium text-stone-400"
            >
              Scene Name
            </label>
            <input
              id="scene-title-input"
              ref={inputRef}
              type="text"
              value={title}
              maxLength={40}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-[#4A3B33] bg-[#241C18] px-3.5 py-2 font-sans text-sm text-stone-100 placeholder-stone-500 shadow-inner focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 focus:outline-none"
              placeholder="e.g. Our Starlit Night"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
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
              className="cursor-pointer rounded-xl border border-amber-400/40 bg-amber-400/20 px-4 py-1.5 font-sans text-xs font-medium text-amber-200 shadow-xs hover:bg-amber-400/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
