import type { ContextMenuSection } from '@/features/create-space/shared/context-menu/ContextMenuAction'
import { playSpatialSfx, cn } from '@/shared/lib'

export interface FloatingContextMenuProps {
  isOpen: boolean
  x: number
  y: number
  sections: ContextMenuSection[]
  onClose: () => void
  dataAttribute?: string
  minWidth?: number
  className?: string
}

export function FloatingContextMenu({
  isOpen,
  x,
  y,
  sections,
  onClose,
  dataAttribute = 'data-floating-context-menu',
  minWidth = 195,
  className,
}: FloatingContextMenuProps) {
  if (!isOpen || sections.length === 0) return null

  const handleActionClick = (actionHandler: () => void) => {
    playSpatialSfx('tactile-tap')
    actionHandler()
    onClose()
  }

  const customAttrs: Record<string, string> = { [dataAttribute]: 'true' }

  return (
    <div
      {...customAttrs}
      style={{ left: `${x}px`, top: `${y}px`, minWidth: `${minWidth}px` }}
      className={cn(
        'animate-in fade-in zoom-in-95 fixed z-50 rounded-xl border border-[#3B302A] bg-[#16120F]/95 p-1.5 shadow-2xl ring-1 ring-white/10 backdrop-blur-md duration-100 select-none',
        className,
      )}
    >
      {sections.map((section, sIndex) => (
        <div key={section.id} className="space-y-0.5">
          {sIndex > 0 && <div className="my-1 h-px bg-white/10" />}

          {section.title && (
            <div className="truncate px-2.5 py-1 text-[10px] font-semibold tracking-wider text-stone-500 uppercase">
              {section.title}
            </div>
          )}

          {section.actions.map((action) => {
            const isDanger = action.variant === 'danger'
            const isAccent = action.variant === 'accent'

            return (
              <button
                key={action.id}
                type="button"
                disabled={action.disabled}
                onClick={() => handleActionClick(action.handler)}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 font-sans text-xs font-medium transition-colors',
                  action.disabled &&
                    'pointer-events-none cursor-not-allowed opacity-35',
                  !action.disabled &&
                    isDanger &&
                    'text-rose-400 hover:bg-rose-500/20 hover:text-rose-200',
                  !action.disabled &&
                    isAccent &&
                    'text-amber-200 hover:bg-amber-400/10 hover:text-amber-100',
                  !action.disabled &&
                    !isDanger &&
                    !isAccent &&
                    'text-stone-300 hover:bg-white/10 hover:text-stone-100',
                )}
              >
                <span className="shrink-0">{action.icon}</span>
                <span className="truncate">{action.label}</span>
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
