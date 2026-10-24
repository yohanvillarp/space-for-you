import { Link } from 'react-router'
import {
  ArrowLeft,
  RotateCcw,
  Check,
  Layers,
  SlidersHorizontal,
  Trash2,
  Save,
} from 'lucide-react'
import type { ThemeRegistryEntry } from '@/features/space-themes'
import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui'
import { StudioModeSwitch } from '@/features/create-space/ui/editor/StudioModeSwitch'

export interface EditorTopHeaderProps {
  activeTheme: ThemeRegistryEntry
  showSidebar: boolean
  onToggleSidebar: () => void
  itemCount: number
  selectedId: string | null
  onDeleteSelected: (id: string) => void
  onResetToDefaults: () => void
}

export function EditorTopHeader({
  activeTheme,
  showSidebar,
  onToggleSidebar,
  itemCount,
  selectedId,
  onDeleteSelected,
  onResetToDefaults,
}: EditorTopHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-black/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <Link
          to={ROUTES.NEW_SPACE}
          className="group inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-sans text-xs text-stone-200 transition-colors hover:bg-white/20"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Return to Studio</span>
        </Link>

        <div className="hidden items-center gap-2 font-sans text-xs text-stone-300 sm:flex">
          <span
            className="h-2 w-2 rounded-full shadow-xs"
            style={{ backgroundColor: activeTheme.accentColor }}
          />
          <span className="font-heading text-stone-200 italic">
            {activeTheme.title} — {activeTheme.stageName}
          </span>
        </div>
      </div>

      {/* Center / Right Pro Controls */}
      <div className="flex items-center gap-2.5">
        {/* Studio Mode Switcher (Editor vs User Behavior) */}
        <StudioModeSwitch />

        {/* Toggle Studio Library Sidebar Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onToggleSidebar}
          className="cursor-pointer gap-1.5 border-white/20 text-xs text-stone-300 transition-colors hover:bg-white/10"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">
            {showSidebar ? 'Hide Library' : 'Open Library'}
          </span>
        </Button>

        {/* Item Counter */}
        <div className="hidden items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 font-sans text-xs text-stone-400 md:flex">
          <Layers className="h-3.5 w-3.5" />
          <span>{itemCount} artifacts</span>
        </div>

        {/* Delete Selected Item Button */}
        {selectedId && (
          <button
            type="button"
            onClick={() => onDeleteSelected(selectedId)}
            title="Delete selected element (Delete or Backspace key)"
            className="animate-fade-in inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-rose-500/40 bg-rose-500/20 px-2.5 py-1.5 font-sans text-xs text-rose-300 shadow-xs transition-colors hover:bg-rose-500 hover:text-white"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
            <kbd className="py-0.2 hidden rounded bg-black/40 px-1 font-mono text-[9px] text-rose-200 sm:inline-block">
              Del
            </kbd>
          </button>
        )}

        {/* Reset Stage to Defaults */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onResetToDefaults}
          className="cursor-pointer gap-1 text-xs text-stone-400 hover:bg-white/10 hover:text-stone-200"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </Button>

        {/* Save Button (UI only, logic pending) */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {}}
          className="cursor-pointer gap-1.5 border-white/20 text-xs text-[#F3EAE1] shadow-xs transition-colors hover:border-white/30 hover:bg-white/10"
        >
          <Save className="h-3.5 w-3.5 text-[#CF7056]" />
          <span>Save Space</span>
        </Button>

        {/* Primary Action: Use This Stage */}
        <Button
          asChild
          variant="primary"
          size="sm"
          className="cursor-pointer gap-1.5 text-xs shadow-md"
        >
          <Link to={ROUTES.NEW_SPACE}>
            <Check className="h-3.5 w-3.5" />
            <span>Use this Setting</span>
          </Link>
        </Button>
      </div>
    </header>
  )
}
