import { useState } from 'react'
import { useNavigate } from 'react-router'
import { MoreVertical, CopyPlus, ExternalLink, Trash2 } from 'lucide-react'

export interface SpaceCardOptionsMenuProps {
  spaceId: string
  spaceTitle: string
  shareSceneUrl: string
  onDelete?: (id: string) => void
  onDuplicate?: (id: string) => void
}

export function SpaceCardOptionsMenu({
  spaceId,
  spaceTitle,
  shareSceneUrl,
  onDelete,
  onDuplicate,
}: SpaceCardOptionsMenuProps) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
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
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
            }}
          />
          <div className="absolute top-full right-0 z-40 mt-1.5 w-48 rounded-xl border border-white/15 bg-[#1C1613] p-1 shadow-2xl ring-1 shadow-black/90 ring-black/50">
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

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
                if (window.confirm(`Delete "${spaceTitle}"?`)) {
                  onDelete?.(spaceId)
                }
              }}
              className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left font-sans text-xs text-rose-400 transition-colors hover:bg-rose-500/15"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete Space</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
