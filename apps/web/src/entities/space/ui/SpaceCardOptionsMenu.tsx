import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import {
  MoreVertical,
  CopyPlus,
  ExternalLink,
  Trash2,
  Pencil,
  Copy,
  Check,
  Archive,
  RotateCcw,
} from 'lucide-react'
import { useAlert } from '@/shared/ui'

export interface SpaceCardOptionsMenuProps {
  spaceId: string
  spaceTitle: string
  shareSceneUrl: string
  isPublished?: boolean
  isArchived?: boolean
  publicUrl?: string
  onDelete?: (id: string) => void
  onDuplicate?: (id: string) => void
  onRename?: (id: string) => void
  onArchive?: (id: string) => void
  onRestore?: (id: string) => void
}

export function SpaceCardOptionsMenu({
  spaceId,
  spaceTitle,
  shareSceneUrl,
  isPublished = false,
  isArchived = false,
  publicUrl,
  onDelete,
  onDuplicate,
  onRename,
  onArchive,
  onRestore,
}: SpaceCardOptionsMenuProps) {
  const navigate = useNavigate()
  const { confirm } = useAlert()
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const resolvedPublicUrl =
    publicUrl || `${window.location.origin}/s/${spaceId}`

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(resolvedPublicUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback ignore clipboard errors
    }
    setIsOpen(false)
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen((prev) => !prev)
        }}
        title="Space options"
        aria-label="Space options"
        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-white/10 hover:text-stone-200"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="animate-fade-in absolute top-full right-0 z-40 mt-1.5 w-48 rounded-xl border border-white/15 bg-[#1C1613] p-1 shadow-2xl ring-1 shadow-black/90 ring-black/50">
          {isPublished && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(false)
                  window.open(
                    resolvedPublicUrl,
                    '_blank',
                    'noopener,noreferrer',
                  )
                }}
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left font-sans text-xs text-stone-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ExternalLink className="h-3.5 w-3.5 text-[#CF7056]" />
                <span>View as Recipient</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left font-sans text-xs text-stone-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-stone-400" />
                )}
                <span>{copied ? 'Copied Link!' : 'Copy Public Link'}</span>
              </button>

              <div className="my-1 border-t border-white/10" />
            </>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
              onRename?.(spaceId)
            }}
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left font-sans text-xs text-stone-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Pencil className="h-3.5 w-3.5 text-stone-400" />
            <span>Change Title</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
              onDuplicate?.(spaceId)
            }}
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left font-sans text-xs text-stone-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <CopyPlus className="h-3.5 w-3.5 text-stone-400" />
            <span>Duplicate Space</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
              navigate(shareSceneUrl)
            }}
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left font-sans text-xs text-stone-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            <span>Open Keepsake Scene</span>
          </button>

          <div className="my-1 border-t border-white/10" />

          {isArchived ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
                onRestore?.(spaceId)
              }}
              className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left font-sans text-xs text-amber-300 transition-colors hover:bg-amber-500/15"
            >
              <RotateCcw className="h-3.5 w-3.5 text-amber-400" />
              <span>Restore Space</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
                onArchive?.(spaceId)
              }}
              className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left font-sans text-xs text-stone-400 transition-colors hover:bg-white/10 hover:text-stone-200"
            >
              <Archive className="h-3.5 w-3.5 text-stone-400" />
              <span>Archive Space</span>
            </button>
          )}

          <button
            type="button"
            onClick={async (e) => {
              e.stopPropagation()
              setIsOpen(false)
              const confirmed = await confirm({
                title: 'Delete Space?',
                description: `Are you sure you want to delete "${spaceTitle}"? This will permanently remove this space and all its memories.`,
                type: 'danger',
                confirmText: 'Delete Space',
                cancelText: 'Cancel',
              })
              if (confirmed) {
                onDelete?.(spaceId)
              }
            }}
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left font-sans text-xs text-rose-400 transition-colors hover:bg-rose-500/15"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete Space</span>
          </button>
        </div>
      )}
    </div>
  )
}
