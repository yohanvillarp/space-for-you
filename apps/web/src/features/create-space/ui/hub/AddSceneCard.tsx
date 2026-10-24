import { Plus } from 'lucide-react'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface AddSceneCardProps {
  onAddScene: () => void
  onContextMenu?: (e: React.MouseEvent) => void
  accentColor?: string
  className?: string
}

export function AddSceneCard({
  onAddScene,
  onContextMenu,
  accentColor: _accentColor = '#CF7056',
  className,
}: AddSceneCardProps) {
  const handleClick = () => {
    playSpatialSfx('tactile-tap')
    onAddScene()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onContextMenu={onContextMenu}
      className={cn(
        'group relative flex min-h-[170px] w-full cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-dashed border-[#3B302A] bg-[#181310]/60 p-6 text-center transition-all duration-300 hover:border-amber-400/60 hover:bg-[#201A16] hover:shadow-xl sm:min-h-[190px]',
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#3B302A] bg-[#221B17] text-stone-400 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:border-amber-400/50 group-hover:text-amber-300">
        <Plus className="h-6 w-6" />
      </div>

      <div className="space-y-1">
        <h3 className="font-heading text-base font-semibold text-stone-300 transition-colors group-hover:text-amber-200">
          Add New Scene
        </h3>
        <p className="font-sans text-xs text-stone-500 group-hover:text-stone-400">
          Add letters or a free-form canvas
        </p>
      </div>
    </button>
  )
}
