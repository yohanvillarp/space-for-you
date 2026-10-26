import { useState, useId } from 'react'
import { X, Sparkles, Heart, Check } from 'lucide-react'
import { Button } from '@/shared/ui'

export interface RenameSpaceModalProps {
  isOpen: boolean
  onClose: () => void
  spaceId: string
  currentTitle: string
  currentRecipient?: string
  onRename: (spaceId: string, newTitle: string, newRecipient?: string) => void
}

export function RenameSpaceModal({
  isOpen,
  onClose,
  spaceId,
  currentTitle,
  currentRecipient = '',
  onRename,
}: RenameSpaceModalProps) {
  const [title, setTitle] = useState(currentTitle)
  const [recipient, setRecipient] = useState(currentRecipient)

  const titleId = useId()
  const recipientId = useId()

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onRename(
      spaceId,
      title.trim() || currentTitle,
      recipient.trim() || currentRecipient,
    )
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rename-space-modal-title"
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#161210] p-6 text-[#FAF6F0] shadow-2xl sm:p-7">
        <div className="flex items-start justify-between pb-4">
          <div className="space-y-1">
            <h2
              id="rename-space-modal-title"
              className="font-heading text-xl font-medium tracking-tight text-[#FAF6F0]"
            >
              Rename Space
            </h2>
            <p className="font-sans text-xs text-stone-400">
              Update the title and recipient dedication for this space.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="cursor-pointer rounded-full p-1.5 text-stone-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label
              htmlFor={titleId}
              className="flex items-center gap-1.5 font-sans text-xs font-medium text-stone-300"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Space title</span>
            </label>
            <input
              id={titleId}
              type="text"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Elena's 25th Birthday"
              maxLength={60}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 font-sans text-sm text-[#FAF6F0] transition-colors placeholder:text-stone-500 hover:border-white/20 focus:border-[#CF7056] focus:bg-white/[0.07] focus:ring-1 focus:ring-[#CF7056] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor={recipientId}
              className="flex items-center gap-1.5 font-sans text-xs font-medium text-stone-300"
            >
              <Heart className="h-3.5 w-3.5 text-[#CF7056]" />
              <span>Who is this space for?</span>
            </label>
            <input
              id={recipientId}
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Elena, Mom, Lucas..."
              maxLength={40}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 font-sans text-sm text-[#FAF6F0] transition-colors placeholder:text-stone-500 hover:border-white/20 focus:border-[#CF7056] focus:bg-white/[0.07] focus:ring-1 focus:ring-[#CF7056] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="cursor-pointer gap-2"
            >
              <Check className="h-4 w-4" />
              <span>Save Changes</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
