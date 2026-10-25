import { useState, useId } from 'react'
import { useNavigate } from 'react-router'
import { X, Heart, Sparkles, ArrowRight, CopyPlus } from 'lucide-react'
import { useUserSpaces } from '@/entities/space'
import { validateSpaceCreation } from '@/features/create-space/lib/space-tier-limits'
import { ROUTES } from '@/shared/config'
import { Button, useConfirmDialog } from '@/shared/ui'

export interface CreateSpaceModalProps {
  isOpen: boolean
  onClose: () => void
  initialRecipientName?: string
  initialTitle?: string
  sourceSpaceId?: string
  onDuplicate?: (sourceId: string, title: string, recipient: string) => void
}

export function CreateSpaceModal({
  isOpen,
  onClose,
  initialRecipientName,
  initialTitle,
  sourceSpaceId,
  onDuplicate,
}: CreateSpaceModalProps) {
  const { spaces } = useUserSpaces()
  const { confirm } = useConfirmDialog()
  const [recipientName, setRecipientName] = useState(initialRecipientName ?? '')
  const [title, setTitle] = useState(initialTitle ?? '')
  const navigate = useNavigate()

  const recipientInputId = useId()
  const titleInputId = useId()

  if (!isOpen) return null

  const isDuplicating = Boolean(sourceSpaceId)
  const suggestedTitle = recipientName.trim()
    ? `${recipientName.trim()}'s Sanctuary`
    : 'Special Sanctuary'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateSpaceCreation(spaces.length, confirm, isDuplicating)) {
      onClose()
      return
    }

    const finalRecipient = recipientName.trim() || 'Someone Special'
    const finalTitle = title.trim() || suggestedTitle

    if (sourceSpaceId && onDuplicate) {
      onDuplicate(sourceSpaceId, finalTitle, finalRecipient)
      onClose()
      return
    }

    onClose()
    navigate(
      `${ROUTES.NEW_SPACE}?recipient=${encodeURIComponent(finalRecipient)}&title=${encodeURIComponent(finalTitle)}`,
    )
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-space-modal-title"
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#161210] p-6 text-[#FAF6F0] shadow-2xl sm:p-7">
        {/* Subtle Ambient Glow */}
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#CF7056] opacity-15 blur-3xl"
          aria-hidden="true"
        />

        {/* Modal Header */}
        <div className="relative z-10 flex items-start justify-between pb-4">
          <div className="space-y-1">
            <h2
              id="create-space-modal-title"
              className="font-heading text-xl font-medium tracking-tight text-[#FAF6F0] sm:text-2xl"
            >
              {isDuplicating ? 'Duplicate Space' : 'Craft a New Space'}
            </h2>
            <p className="font-sans text-xs text-stone-400">
              {isDuplicating
                ? 'Personalize title and recipient for this duplicated sanctuary.'
                : 'Dedicate a private digital sanctuary to someone you cherish.'}
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

        <form onSubmit={handleSubmit} className="relative z-10 space-y-5 pt-1">
          {/* Inputs Section */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor={recipientInputId}
                className="flex items-center gap-1.5 font-sans text-xs font-medium text-stone-300"
              >
                <Heart className="h-3.5 w-3.5 text-[#CF7056]" />
                <span>Who is this space for?</span>
              </label>
              <input
                id={recipientInputId}
                type="text"
                autoFocus
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g. Elena, Mom, Lucas..."
                maxLength={40}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 font-sans text-sm text-[#FAF6F0] transition-colors placeholder:text-stone-500 hover:border-white/20 focus:border-[#CF7056] focus:bg-white/[0.07] focus:ring-1 focus:ring-[#CF7056] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor={titleInputId}
                className="flex items-center gap-1.5 font-sans text-xs font-medium text-stone-300"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Space title</span>
              </label>
              <input
                id={titleInputId}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={suggestedTitle}
                maxLength={60}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 font-sans text-sm text-[#FAF6F0] transition-colors placeholder:text-stone-500 hover:border-white/20 focus:border-[#CF7056] focus:bg-white/[0.07] focus:ring-1 focus:ring-[#CF7056] focus:outline-none"
              />
            </div>
          </div>

          {/* Actions */}
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
              <span>{isDuplicating ? 'Duplicate Space' : 'Continue'}</span>
              {isDuplicating ? (
                <CopyPlus className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
