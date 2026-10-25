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
  Loader2,
} from 'lucide-react'
import type { ThemeRegistryEntry } from '@/features/space-themes'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { StudioModeSwitch } from '@/features/create-space/ui/editor/StudioModeSwitch'
import { UndoRedoControls } from '@/features/create-space/ui/editor/UndoRedoControls'

export interface EditorTopHeaderProps {
  activeTheme: ThemeRegistryEntry
  showSidebar: boolean
  onToggleSidebar: () => void
  itemCount: number
  selectedId: string | null
  onDeleteSelected: (id: string) => void
  onResetToDefaults: () => void
  canUndo?: boolean
  canRedo?: boolean
  onUndo?: () => void
  onRedo?: () => void
  onOpenShare?: () => void
  onSave?: () => void
  onBackToDashboard?: () => void
  isSaved?: boolean
  isSaving?: boolean
  isDirty?: boolean
}

export function EditorTopHeader({
  activeTheme,
  showSidebar,
  onToggleSidebar,
  itemCount,
  selectedId,
  onDeleteSelected,
  onResetToDefaults,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  onOpenShare,
  onSave,
  onBackToDashboard,
  isSaved = false,
  isSaving = false,
  isDirty = false,
}: EditorTopHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-black/90 px-3 py-3 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-2 sm:gap-3">
        {onBackToDashboard ? (
          <button
            type="button"
            onClick={onBackToDashboard}
            title="Back to Dashboard"
            aria-label="Back to Dashboard"
            className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white/10 p-2 font-sans text-xs text-stone-200 transition-colors hover:bg-white/20 sm:px-3 sm:py-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden md:inline">Dashboard</span>
          </button>
        ) : (
          <Link
            to={ROUTES.DASHBOARD}
            title="Back to Dashboard"
            aria-label="Back to Dashboard"
            className="group inline-flex items-center gap-1.5 rounded-full bg-white/10 p-2 font-sans text-xs text-stone-200 transition-colors hover:bg-white/20 sm:px-3 sm:py-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
        )}

        {/* Space & Stage Title */}
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
        {/* Studio Mode Switcher */}
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

        {/* Undo / Redo History Controls */}
        <UndoRedoControls
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={onUndo}
          onRedo={onRedo}
        />

        {/* Reset Stage to Defaults */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onResetToDefaults}
          title="Reset stage to theme defaults"
          aria-label="Reset stage to theme defaults"
          className="cursor-pointer gap-1.5 border-white/20 px-2.5 text-xs text-stone-300 transition-colors hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-300 sm:px-3"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span className="hidden xl:inline">Reset</span>
        </Button>

        {/* Save Button with Auto-Save Status */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onSave}
          disabled={isSaving}
          title={
            isSaving
              ? 'Syncing to cloud...'
              : isSaved
                ? 'All changes saved'
                : isDirty
                  ? 'Auto-saving soon (click to sync now)'
                  : 'All changes saved'
          }
          aria-label={
            isSaving
              ? 'Syncing to cloud...'
              : isSaved
                ? 'All changes saved'
                : isDirty
                  ? 'Auto-saving soon (click to sync now)'
                  : 'All changes saved'
          }
          className={cn(
            'cursor-pointer gap-1.5 px-2.5 text-xs shadow-xs transition-all sm:px-3',
            isSaved
              ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
              : isDirty
                ? 'border-amber-500/40 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20'
                : 'border-white/20 text-[#F3EAE1] hover:border-white/30 hover:bg-white/10',
          )}
        >
          {isSaving ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-[#CF7056]" />
          ) : isSaved ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : isDirty ? (
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
          ) : (
            <Save className="h-3.5 w-3.5 text-[#CF7056]" />
          )}
          <span className="hidden md:inline">
            {isSaving
              ? 'Saving...'
              : isSaved
                ? 'Saved'
                : isDirty
                  ? 'Save'
                  : 'Saved'}
          </span>
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
      </div>
    </header>
  )
}
