import { Edit3, Eye } from 'lucide-react'
import { useStudioBehavior } from '@/features/create-space/ui/editor/useStudioBehavior'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface StudioModeSwitchProps {
  className?: string
}

export function StudioModeSwitch({ className }: StudioModeSwitchProps) {
  const { mode, setMode } = useStudioBehavior()

  const handleSelectMode = (newMode: 'editor' | 'user') => {
    if (newMode !== mode) {
      playSpatialSfx('tactile-tap')
      setMode(newMode)
    }
  }

  return (
    <div
      role="group"
      aria-label="Studio Behavior Mode"
      className={cn(
        'relative inline-flex items-center rounded-full border border-white/15 bg-black/40 p-0.5 shadow-inner backdrop-blur-md',
        className,
      )}
    >
      {/* Editor Behavior Button */}
      <button
        type="button"
        onClick={() => handleSelectMode('editor')}
        title="Editor Mode: Click selects elements, right-click opens actions"
        className={cn(
          'relative z-10 flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-xs font-medium transition-all duration-200',
          mode === 'editor'
            ? 'bg-amber-500/20 text-amber-200 shadow-xs ring-1 ring-amber-400/40'
            : 'text-stone-400 hover:text-stone-200',
        )}
      >
        <Edit3 className="h-3 w-3" />
        <span className="hidden sm:inline">Editor</span>
      </button>

      {/* User / Recipient Behavior Button */}
      <button
        type="button"
        onClick={() => handleSelectMode('user')}
        title="User Mode: Experience space exactly as recipient would"
        className={cn(
          'relative z-10 flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-xs font-medium transition-all duration-200',
          mode === 'user'
            ? 'bg-emerald-500/20 text-emerald-200 shadow-xs ring-1 ring-emerald-400/40'
            : 'text-stone-400 hover:text-stone-200',
        )}
      >
        <Eye className="h-3 w-3" />
        <span className="hidden sm:inline">User</span>
      </button>
    </div>
  )
}
