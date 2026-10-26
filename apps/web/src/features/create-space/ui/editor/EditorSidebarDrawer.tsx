import type { ReactNode } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { cn } from '@/shared/lib'

export interface EditorSidebarDrawerProps {
  showSidebar: boolean
  sidebarWidth: number
  isResizingSidebar: boolean
  activeSceneId: string
  onToggleSidebar: () => void
  onResizeStart: (e: React.PointerEvent) => void
  children: ReactNode
  hideSidebarDrawer?: boolean
}

export function EditorSidebarDrawer({
  showSidebar,
  sidebarWidth,
  isResizingSidebar,
  activeSceneId,
  onToggleSidebar,
  onResizeStart,
  children,
  hideSidebarDrawer = false,
}: EditorSidebarDrawerProps) {
  if (hideSidebarDrawer) return null

  const getSidebarBadgeLabel = () => {
    switch (activeSceneId) {
      case 'gate':
        return 'Lock Gate'
      case 'hub':
        return 'Space'
      default:
        return 'Workshop'
    }
  }

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {showSidebar && (
        <div
          onClick={onToggleSidebar}
          className="absolute inset-0 z-30 bg-black/60 backdrop-blur-xs md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Floating Cue Button to reopen sidebar when collapsed */}
      {!showSidebar && (
        <button
          type="button"
          onClick={onToggleSidebar}
          title="Open Workshop Sidebar"
          className="group absolute top-4 left-0 z-30 flex cursor-pointer items-center gap-1.5 rounded-r-xl border-t border-r border-b border-[#3B302A] bg-[#16120F]/90 px-2.5 py-2 text-xs font-medium text-[#F3EAE1] shadow-xl backdrop-blur-md transition-all hover:bg-[#1C1613] hover:pl-3.5"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#CF7056] transition-transform group-hover:rotate-90" />
          <span className="hidden font-sans text-[11px] sm:inline">
            {getSidebarBadgeLabel()}
          </span>
        </button>
      )}

      {/* Resizable Sidebar Container: Slide-over on mobile under header, inline flex child on desktop */}
      <div
        style={{ width: showSidebar ? `${sidebarWidth}px` : '0px' }}
        className={cn(
          'relative h-full overflow-hidden border-r border-[#3B302A] transition-all duration-200 ease-out',
          'absolute inset-y-0 left-0 z-40 max-w-[85vw] bg-[#16120F] shadow-2xl',
          'md:relative md:inset-auto md:z-auto md:max-w-none md:shrink-0',
          !showSidebar &&
            'pointer-events-none invisible -translate-x-full border-none md:translate-x-0',
        )}
      >
        {/* Mobile Quick-Dismiss Button */}
        {showSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Close sidebar"
            className="absolute top-2.5 right-2.5 z-50 flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 text-stone-300 backdrop-blur-xs hover:bg-black/80 hover:text-white md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {children}

        {/* Resizer Handle on Right Edge of Left Sidebar (Desktop Only) */}
        <div
          onPointerDown={onResizeStart}
          role="separator"
          aria-orientation="vertical"
          title="Drag to resize"
          className={cn(
            'group absolute top-0 -right-2 bottom-0 z-50 hidden w-4 cursor-col-resize items-center justify-center transition-colors md:flex',
            isResizingSidebar && 'bg-[#CF7056]/20',
          )}
        >
          <div
            className={cn(
              'h-8 w-1 rounded-full bg-[#3B302A] transition-all group-hover:h-14 group-hover:w-1.5 group-hover:bg-[#CF7056]',
              isResizingSidebar && 'h-20 w-1.5 bg-[#CF7056]',
            )}
          />
        </div>
      </div>
    </>
  )
}
