import { useState } from 'react'
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
import type { SpaceTemplateId } from '@/entities/space'
import type { SpatialItem, SpatialItemType } from '../model/spatial-stage.types'
import {
  getDefaultItemsForTemplate,
  TOOLBOX_ITEMS,
} from '../lib/spatial-stage-defaults'
import { THEME_REGISTRY } from '@/features/space-themes'
import { SpatialStageCanvas } from './SpatialStageCanvas'
import { SpatialToolboxSidebar } from './SpatialToolboxSidebar'
import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui'
import { cn } from '@/shared/lib'

export interface FullscreenSpatialEditorProps {
  templateId: SpaceTemplateId
  className?: string
}

export function FullscreenSpatialEditor({
  templateId,
  className,
}: FullscreenSpatialEditorProps) {
  const [items, setItems] = useState<SpatialItem[]>(() =>
    getDefaultItemsForTemplate(templateId),
  )
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showSidebar, setShowSidebar] = useState(true)

  const activeTheme = THEME_REGISTRY[templateId] ?? THEME_REGISTRY.birthday

  // Item Position Update
  const handleUpdatePosition = (id: string, x: number, y: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, x, y } : item)),
    )
  }

  // Item Rotation Update
  const handleRotateItem = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const newRotation = Math.max(-25, Math.min(25, item.rotation + delta))
        return { ...item, rotation: newRotation }
      }),
    )
  }

  // Bring to Front
  const handleBringToFront = (id: string) => {
    setItems((prev) => {
      const maxZ = prev.reduce((max, it) => Math.max(max, it.zIndex), 10)
      return prev.map((item) =>
        item.id === id ? { ...item, zIndex: maxZ + 1 } : item,
      )
    })
  }

  // Delete Item
  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  // Update Data
  const handleUpdateItemData = (
    id: string,
    updates: Partial<SpatialItem['data']>,
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, data: { ...item.data, ...updates } } : item,
      ),
    )
  }

  // Add Item
  const handleAddItem = (
    type: SpatialItemType,
    dropX?: number,
    dropY?: number,
    customData?: Partial<SpatialItem['data']>,
  ) => {
    const itemDef = TOOLBOX_ITEMS.find((it) => it.type === type)
    const newId = `${type}-${Date.now()}`
    const maxZ = items.reduce((max, it) => Math.max(max, it.zIndex), 10)

    const defaultX = dropX ?? Math.round(35 + Math.random() * 30)
    const defaultY = dropY ?? Math.round(40 + Math.random() * 25)
    const randomTilt = Math.round((Math.random() * 8 - 4) * 10) / 10

    const newItem: SpatialItem = {
      id: newId,
      type,
      label: itemDef?.label || 'Keepsake Item',
      x: defaultX,
      y: defaultY,
      rotation: randomTilt,
      zIndex: maxZ + 1,
      data: {
        ...(itemDef?.defaultData || {}),
        ...(customData || {}),
      },
    }

    setItems((prev) => [...prev, newItem])
    setSelectedId(newId)
  }

  const handleResetToDefaults = () => {
    setItems(getDefaultItemsForTemplate(templateId))
    setSelectedId(null)
  }

  return (
    <div
      className={cn(
        'selection:bg-primary relative flex min-h-dvh w-full flex-col justify-between overflow-x-hidden selection:text-white',
        className,
      )}
    >
      {/* Top Floating Pro Header Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-md sm:px-6">
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
          {/* Toggle Sidebar Tool Button */}
          <button
            type="button"
            onClick={() => setShowSidebar(!showSidebar)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 font-sans text-xs text-stone-300 transition-colors hover:bg-white/10"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">
              {showSidebar ? 'Hide Tools' : 'Show Tools'}
            </span>
          </button>

          {/* Item Counter */}
          <div className="hidden items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 font-sans text-xs text-stone-400 md:flex">
            <Layers className="h-3.5 w-3.5" />
            <span>{items.length} artifacts</span>
          </div>

          {/* Delete Selected Item Button */}
          {selectedId && (
            <button
              type="button"
              onClick={() => handleDeleteItem(selectedId)}
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
            onClick={handleResetToDefaults}
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

      {/* Main Fullscreen Workspace Area */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Left Side: Professional Sidebar Tool (collapsible) */}
        {showSidebar && (
          <div className="animate-fade-in relative z-30 w-72 shrink-0 border-r border-[#3B302A] bg-[#14110F] p-2.5 shadow-2xl sm:w-80">
            <SpatialToolboxSidebar
              templateId={templateId}
              onAddItem={handleAddItem}
              className="h-full border border-[#3B302A]"
            />
          </div>
        )}

        {/* Center / Full Canvas: Wide Spatial Stage Canvas */}
        <main className="relative flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <SpatialStageCanvas
            templateId={templateId}
            items={items}
            selectedId={selectedId}
            onSelectItem={setSelectedId}
            onUpdateItemPosition={handleUpdatePosition}
            onRotateItem={handleRotateItem}
            onBringToFront={handleBringToFront}
            onDeleteItem={handleDeleteItem}
            onUpdateItemData={handleUpdateItemData}
            onAddItem={handleAddItem}
            className="min-h-[calc(100dvh-120px)] w-full rounded-2xl"
          />
        </main>
      </div>
    </div>
  )
}
