import type { LetterBlockId } from '@/features/create-space/model/scenes.types'
import {
  ArrowUp,
  ArrowDown,
  Type,
  Image as ImageIcon,
  AlignLeft,
  RotateCcw,
} from 'lucide-react'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface LetterOrderTabProps {
  blocksOrder?: LetterBlockId[]
  hasPhoto?: boolean
  title?: string
  content?: string
  onUpdateBlocksOrder: (order: LetterBlockId[]) => void
}

const DEFAULT_BLOCKS: LetterBlockId[] = ['title', 'photo', 'text']

interface BlockMeta {
  id: LetterBlockId
  label: string
  description: string
  icon: typeof Type
}

const BLOCK_METAS: Record<LetterBlockId, BlockMeta> = {
  title: {
    id: 'title',
    label: 'Letter Title',
    description: 'Header heading on stationery',
    icon: Type,
  },
  photo: {
    id: 'photo',
    label: 'Keepsake Photo',
    description: 'Enclosed keepsake photograph card',
    icon: ImageIcon,
  },
  text: {
    id: 'text',
    label: 'Message Content',
    description: 'Personal heartfelt letter text',
    icon: AlignLeft,
  },
}

export function LetterOrderTab({
  blocksOrder = DEFAULT_BLOCKS,
  hasPhoto = false,
  title = '',
  content = '',
  onUpdateBlocksOrder,
}: LetterOrderTabProps) {
  const currentOrder =
    blocksOrder && blocksOrder.length > 0 ? blocksOrder : DEFAULT_BLOCKS

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= currentOrder.length) return

    playSpatialSfx('tactile-tap')
    const updated = [...currentOrder]
    const [moved] = updated.splice(index, 1)
    updated.splice(targetIndex, 0, moved)
    onUpdateBlocksOrder(updated)
  }

  const handleReset = () => {
    playSpatialSfx('note-peel')
    onUpdateBlocksOrder(DEFAULT_BLOCKS)
  }

  return (
    <div className="space-y-4 p-1 font-sans text-xs">
      {/* Header and Explanation */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h4 className="font-heading text-xs font-semibold text-amber-200">
            Object Order &amp; Layout
          </h4>
          <p className="text-[10px] text-stone-400">
            Reorder the objects displayed on this letter sheet.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          title="Reset to default order"
          className="flex cursor-pointer items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-stone-400 hover:text-amber-200"
        >
          <RotateCcw className="h-2.5 w-2.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Ordered Blocks List */}
      <div className="space-y-2">
        {currentOrder.map((blockId, index) => {
          const meta = BLOCK_METAS[blockId]
          const Icon = meta.icon
          const isPhoto = blockId === 'photo'
          const isFirst = index === 0
          const isLast = index === currentOrder.length - 1

          return (
            <div
              key={blockId}
              className={cn(
                'group flex items-center justify-between rounded-xl border p-2.5 transition-all',
                isPhoto && !hasPhoto
                  ? 'border-[#3B302A]/50 bg-[#16120F] opacity-50'
                  : 'border-[#3B302A] bg-[#1E1815] hover:border-amber-400/40',
              )}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#2A221E] font-mono text-[10px] font-semibold text-amber-300">
                  {index + 1}
                </span>

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#3B302A] bg-[#2A221E] text-stone-300">
                  <Icon className="h-3.5 w-3.5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-heading truncate text-xs font-medium text-[#FAF6F0]">
                    {meta.label}
                  </p>
                  <p className="truncate text-[10px] text-stone-400">
                    {blockId === 'title'
                      ? title || meta.description
                      : blockId === 'photo'
                        ? hasPhoto
                          ? 'Photo attached'
                          : 'No photo attached yet'
                        : `${content.length} characters`}
                  </p>
                </div>
              </div>

              {/* Up and Down Action Buttons */}
              <div className="ml-2 flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  disabled={isFirst}
                  onClick={() => handleMove(index, 'up')}
                  title="Move up"
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded border border-[#3B302A] bg-[#2A221E] text-stone-300 transition-colors',
                    isFirst
                      ? 'cursor-not-allowed opacity-25'
                      : 'cursor-pointer hover:border-amber-400/50 hover:text-amber-200',
                  )}
                >
                  <ArrowUp className="h-3 w-3" />
                </button>

                <button
                  type="button"
                  disabled={isLast}
                  onClick={() => handleMove(index, 'down')}
                  title="Move down"
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded border border-[#3B302A] bg-[#2A221E] text-stone-300 transition-colors',
                    isLast
                      ? 'cursor-not-allowed opacity-25'
                      : 'cursor-pointer hover:border-amber-400/50 hover:text-amber-200',
                  )}
                >
                  <ArrowDown className="h-3 w-3" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Helpful Hint */}
      <div className="rounded-xl border border-white/5 bg-[#1B1613] p-3 text-[11px] leading-relaxed text-stone-400">
        <p>
          💡 You can edit all text and dedication dates directly on the
          stationery paper in the center workspace.
        </p>
      </div>
    </div>
  )
}
