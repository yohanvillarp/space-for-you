import { Link } from 'react-router'
import {
  ArrowLeft,
  RotateCcw,
  Check,
  Layers,
  SlidersHorizontal,
  Trash2,
  Save,
  Share2,
} from 'lucide-react'
import type { ThemeRegistryEntry } from '@/features/space-themes'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
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
  onOpenShare?: () => void
  onSave?: () => void
  isSaved?: boolean
}

export function EditorTopHeader({
  activeTheme,
  showSidebar,
  onToggleSidebar,
  itemCount,
  selectedId,
  onDeleteSelected,
  onResetToDefaults,
  onOpenShare,
  onSave,
  isSaved = false,
}: EditorTopHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-black/90 px-3 py-3 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to={ROUTES.DASHBOARD}
          title="Back to Dashboard"
          aria-label="Back to Dashboard"
          className="group inline-flex items-center gap-1.5 rounded-full bg-white/10 p-2 font-sans text-xs text-stone-200 transition-colors hover:bg-white/20 sm:px-3 sm:py-1.5"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span className="hidden md:inline">Dashboard</span>
        </Link>

        {/* Space & Stage Title: hidden on small/medium screens to prevent multi-line overflow */}
        <div className="hidden min-w-0 items-center gap-2 font-sans text-xs text-stone-300 xl:flex">
          <span
            className="h-2 w-2 shrink-0 rounded-full shadow-xs"
            style={{ backgroundColor: activeTheme.accentColor }}
          />
          <span className="font-heading truncate text-stone-200 italic">
            {activeTheme.title} — {activeTheme.stageName}
          </span>
        </div>
      </div>

      {/* Center / Right Pro Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Studio Mode Switcher (Editor vs User Behavior) */}
        <StudioModeSwitch />

        {/* Toggle Studio Library Sidebar Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onToggleSidebar}
          title={showSidebar ? 'Hide Library' : 'Open Library'}
          aria-label={showSidebar ? 'Hide Library' : 'Open Library'}
          className="cursor-pointer gap-1.5 border-white/20 px-2.5 text-xs text-stone-300 transition-colors hover:bg-white/10 sm:px-3"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="hidden lg:inline">
            {showSidebar ? 'Hide Library' : 'Open Library'}
          </span>
        </Button>

        {/* Item Counter */}
        <div className="hidden items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 font-sans text-xs text-stone-400 xl:flex">
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
          title="Reset Stage to Defaults"
          aria-label="Reset Stage to Defaults"
          className="cursor-pointer gap-1 text-xs text-stone-400 hover:bg-white/10 hover:text-stone-200"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span className="hidden xl:inline">Reset</span>
        </Button>

        {/* Save Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onSave}
          title={isSaved ? 'Space saved!' : 'Save Space'}
          aria-label={isSaved ? 'Space saved!' : 'Save Space'}
          className={cn(
            'cursor-pointer gap-1.5 px-2.5 text-xs shadow-xs transition-all sm:px-3',
            isSaved
              ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
              : 'border-white/20 text-[#F3EAE1] hover:border-white/30 hover:bg-white/10',
          )}
        >
          {isSaved ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Save className="h-3.5 w-3.5 text-[#CF7056]" />
          )}
          <span className="hidden md:inline">{isSaved ? 'Saved' : 'Save'}</span>
        </Button>

        {/* Share Sanctuary Keepsake Card Button */}
        {onOpenShare && (
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onOpenShare}
            title="Share Sanctuary Card"
            aria-label="Share Sanctuary Card"
            className="cursor-pointer gap-1.5 border-none bg-[#CF7056] px-2.5 text-xs text-white shadow-md transition-all hover:bg-[#B85F47] sm:px-3"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        )}

        {/* Primary Action: Done / Dashboard */}
        <Button
          asChild
          variant="primary"
          size="sm"
          className="cursor-pointer gap-1.5 px-2.5 text-xs shadow-md sm:px-3"
        >
          <Link
            to={ROUTES.DASHBOARD}
            title="Finish & Return to Dashboard"
            aria-label="Finish & Return to Dashboard"
          >
            <Check className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Done</span>
          </Link>
        </Button>
      </div>
    </header>
  )
}
