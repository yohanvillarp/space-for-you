import { useEffect } from 'react'
import { X, Heart, ChevronUp, ChevronDown } from 'lucide-react'
import type { LetterItem } from '@/features/create-space/model/scenes.types'
import {
  PAPER_STYLES,
  DEFAULT_LETTER_BLOCKS,
} from '@/features/create-space/ui/letters/letter-sheet-colors'
import { LetterReaderPhotoEnclosure } from '@/features/create-space/ui/letters/LetterReaderPhotoEnclosure'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface LetterReaderModalProps {
  letter: LetterItem | null
  isOpen: boolean
  onClose: () => void
  isStudioPreview?: boolean
  onUpdateLetter?: (updated: LetterItem) => void
}

const FONT_CLASSES: Record<string, string> = {
  handwriting: 'font-serif italic tracking-wide',
  sans: 'font-sans',
  mono: 'font-mono',
}

const ALIGN_CLASSES: Record<string, string> = {
  center: 'text-center',
  justify: 'text-justify',
}

const SIZE_CLASSES: Record<string, string> = {
  sm: 'text-sm',
  lg: 'text-lg sm:text-xl',
}

export function LetterReaderModal({
  letter,
  isOpen,
  onClose,
  isStudioPreview = false,
  onUpdateLetter,
}: LetterReaderModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        playSpatialSfx('tactile-tap')
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !letter) return null

  const paper = PAPER_STYLES[letter.paperColor || 'ivory'] ?? PAPER_STYLES.ivory
  const blocksOrder = letter.blocksOrder ?? DEFAULT_LETTER_BLOCKS
  const fontClass =
    FONT_CLASSES[letter.fontStyle || ''] ?? 'font-heading font-serif'
  const alignClass = ALIGN_CLASSES[letter.textAlign || ''] ?? 'text-left'
  const sizeClass =
    SIZE_CLASSES[letter.fontSize || ''] ?? 'text-base sm:text-lg'

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= blocksOrder.length) return
    playSpatialSfx('tactile-tap')
    const next = [...blocksOrder]
    const [moved] = next.splice(index, 1)
    next.splice(targetIndex, 0, moved)
    onUpdateLetter?.({ ...letter, blocksOrder: next })
  }

  const renderTitle = () => (
    <div>
      {isStudioPreview && onUpdateLetter ? (
        <input
          type="text"
          value={letter.title}
          onChange={(e) => onUpdateLetter({ ...letter, title: e.target.value })}
          placeholder="Letter title..."
          aria-label="Edit Letter Title"
          className={cn(
            'w-full rounded border-b border-[#D8C7B5] bg-transparent pb-1 text-2xl font-semibold tracking-tight text-[#302621] focus:border-[#A34835] focus:outline-hidden sm:text-3xl',
            fontClass,
            alignClass,
          )}
        />
      ) : (
        <h2
          className={cn(
            'text-2xl font-semibold tracking-tight text-[#302621] sm:text-3xl',
            fontClass,
            alignClass,
          )}
        >
          {letter.title}
        </h2>
      )}
    </div>
  )

  const renderPhoto = () => (
    <LetterReaderPhotoEnclosure
      imageUrl={letter.imageUrl}
      date={letter.date}
      title={letter.title}
      isStudioPreview={isStudioPreview}
      onRemovePhoto={() => onUpdateLetter?.({ ...letter, imageUrl: undefined })}
    />
  )

  const renderText = () => (
    <div>
      {isStudioPreview && onUpdateLetter ? (
        <textarea
          rows={8}
          value={letter.content}
          onChange={(e) =>
            onUpdateLetter({ ...letter, content: e.target.value })
          }
          placeholder="Write your personal letter here..."
          aria-label="Edit Letter Content"
          className={cn(
            'w-full resize-none rounded-lg border border-[#E3D6C6] bg-white/50 p-4 leading-relaxed text-[#302621] placeholder-[#A99B90] focus:border-[#A34835] focus:bg-white focus:outline-hidden',
            fontClass,
            alignClass,
            sizeClass,
          )}
        />
      ) : (
        <div
          className={cn(
            'min-h-[160px] leading-relaxed whitespace-pre-wrap text-[#4A3C34]',
            fontClass,
            alignClass,
            sizeClass,
          )}
        >
          {letter.content}
        </div>
      )}
    </div>
  )

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playSpatialSfx('tactile-tap')
          onClose()
        }
      }}
      className={cn(
        'animate-fade-in flex items-center justify-center p-4 select-none sm:p-6',
        isStudioPreview
          ? 'absolute inset-0 z-20 bg-black/40 backdrop-blur-xs'
          : 'fixed inset-0 z-50 bg-black/60 backdrop-blur-xs',
      )}
    >
      <div
        className={cn(
          'relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-2xl border p-6 shadow-2xl transition-all duration-300 sm:p-8',
          paper.bg,
          paper.border,
          paper.text,
        )}
      >
        <div className="flex items-center justify-between border-b border-[#E3D6C6]/80 pb-4">
          <div className="mr-4 flex flex-1 items-center gap-2 text-[#A34835]">
            <Heart className="h-4 w-4 shrink-0 fill-current" />
            {isStudioPreview && onUpdateLetter ? (
              <input
                type="text"
                value={letter.date || ''}
                onChange={(e) =>
                  onUpdateLetter({ ...letter, date: e.target.value })
                }
                placeholder="A cherished memory, date, or dedication..."
                aria-label="Edit dedication or date"
                className="font-heading w-full border-b border-transparent bg-transparent text-xs tracking-wider text-[#A34835] italic placeholder-[#A34835]/50 transition-colors focus:border-[#A34835]/60 focus:outline-hidden"
              />
            ) : (
              <span className="font-heading text-xs tracking-wider italic">
                {letter.date || 'A heartfelt note'}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              playSpatialSfx('tactile-tap')
              onClose()
            }}
            aria-label="Fold and close letter"
            className="cursor-pointer rounded-full p-1 text-[#8B7367] transition-colors hover:bg-black/5 hover:text-[#302621]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="my-6 space-y-4">
          {blocksOrder.map((blockId, index) => {
            if (blockId === 'photo' && !letter.imageUrl) return null

            return (
              <div key={blockId} className="group/block relative">
                {isStudioPreview && onUpdateLetter && (
                  <div className="absolute -top-2.5 right-1 z-20 hidden items-center gap-0.5 rounded-md border border-[#D8C7B5] bg-white/95 px-1 py-0.5 shadow-xs group-hover/block:flex">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMoveBlock(index, 'up')}
                      title="Move block up"
                      className="cursor-pointer p-0.5 text-stone-500 hover:text-stone-900 disabled:opacity-20"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      disabled={index === blocksOrder.length - 1}
                      onClick={() => handleMoveBlock(index, 'down')}
                      title="Move block down"
                      className="cursor-pointer p-0.5 text-stone-500 hover:text-stone-900 disabled:opacity-20"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                )}

                {blockId === 'title' && renderTitle()}
                {blockId === 'photo' && renderPhoto()}
                {blockId === 'text' && renderText()}
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-between border-t border-[#E3D6C6]/80 pt-4 font-sans text-xs text-[#8B7367]">
          <span>Sealed with love</span>
          <button
            type="button"
            onClick={() => {
              playSpatialSfx('tactile-tap')
              onClose()
            }}
            className="cursor-pointer rounded-lg bg-[#302621] px-4 py-2 font-medium text-[#FAF6F0] shadow-sm transition-colors hover:bg-[#4A3C34]"
          >
            Fold & Close
          </button>
        </div>
      </div>
    </div>
  )
}
