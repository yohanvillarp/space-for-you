import type { ReactNode } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { cn } from '@/shared/lib'

export interface EditorSidebarDrawerProps {
  showSidebar: boolean
  sidebarWidth: number
  isResizingSidebar: boolean
  activeSceneId: string
  onToggleSidebar: () => void
  onResizeStart: (e: React.PointerEvent) => void
  children: ReactNode
}

export function EditorSidebarDrawer({
  showSidebar,
  sidebarWidth,
  isResizingSidebar,
  activeSceneId,
  onToggleSidebar,
  onResizeStart,
  children,
}: EditorSidebarDrawerProps) {
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
      {/* Floating Cue Button to reopen sidebar when collapsed */}
      {!showSidebar && (
        <button
          type="button"
          onClick={onToggleSidebar}
          title="Open Workshop Sidebar"
          className="group absolute top-6 left-0 z-40 flex cursor-pointer items-center gap-1.5 rounded-r-xl border-t border-r border-b border-[#3B302A] bg-[#16120F]/90 px-2.5 py-2 text-xs font-medium text-[#F3EAE1] shadow-xl backdrop-blur-md transition-all hover:bg-[#1C1613] hover:pl-3.5"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#CF7056] transition-transform group-hover:rotate-90" />
          <span className="hidden font-sans text-[11px] sm:inline">
            {getSidebarBadgeLabel()}
          </span>
        </button>
      )}

      {/* Resizable Sidebar Container */}
      <div
        style={{ width: showSidebar ? `${sidebarWidth}px` : '0px' }}
        className={cn(
          'relative h-full shrink-0 overflow-hidden border-r border-[#3B302A] transition-[width] duration-150 ease-out',
          !showSidebar && 'pointer-events-none invisible border-none',
        )}
      >
        {children}

        {/* Resizer Handle on Right Edge of Left Sidebar */}
        <div
          onPointerDown={onResizeStart}
          role="separator"
          aria-orientation="vertical"
          title="Drag to resize"
          className={cn(
            'group absolute top-0 -right-2 bottom-0 z-50 flex w-4 cursor-col-resize items-center justify-center transition-colors',
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
