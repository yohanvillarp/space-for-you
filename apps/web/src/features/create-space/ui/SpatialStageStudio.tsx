import { useState } from 'react'
import {
  ExternalLink,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Layers,
} from 'lucide-react'
import type { SpaceTemplateId } from '@/entities/space'
import { THEME_REGISTRY } from '@/features/space-themes'
import { SpatialStageCanvas } from './SpatialStageCanvas'
import { SpatialToolboxSidebar } from './SpatialToolboxSidebar'
import { Button } from '@/shared/ui'
import { cn } from '@/shared/lib'
import { useSpatialStageItems } from './editor/useSpatialStageItems'
import { countStagePhotos } from '../lib/stage-photo-limit'

export interface SpatialStageStudioProps {
  templateId: SpaceTemplateId
  className?: string
}

export function SpatialStageStudio({
  templateId,
  className,
}: SpatialStageStudioProps) {
  const {
    items,
    selectedId,
    setSelectedId,
    handleUpdatePosition,
    handleRotateItem,
    handleBringToFront,
    handleDeleteItem,
    handleUpdateItemData,
    handleAssignItemPhoto,
    handleAddItem,
    handleResetToDefaults,
  } = useSpatialStageItems(templateId)

  const [copiedLink, setCopiedLink] = useState(false)
  const activeTheme = THEME_REGISTRY[templateId] ?? THEME_REGISTRY.birthday

  const selectedItem = items.find((it) => it.id === selectedId)
  const isMusicSelected =
    selectedItem?.type === 'music-box' ||
    selectedItem?.type === 'vinyl-player' ||
    selectedItem?.type === 'cassette-tape'
  const selectedMusicItem = isMusicSelected ? selectedItem : null

  const isPhotoSelected = selectedItem?.type === 'polaroid'
  const selectedPhotoItem = isPhotoSelected ? selectedItem : null

  const previewPath = `/spaces/preview/${templateId}`
  const fullPreviewUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${previewPath}`
      : previewPath

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullPreviewUrl)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2500)
    } catch {
      // Fallback
    }
  }

  const handleAssignPhoto = (photoUrl: string, file?: File) => {
    const target =
      selectedPhotoItem || items.find((it) => it.type === 'polaroid')

    if (target) {
      handleAssignItemPhoto(target.id, photoUrl, file)
    }
  }

  return (
    <div className={cn('relative w-full space-y-4', className)}>
      {/* Dynamic Ambient Radiant Glow Backlight */}
      <div
        className={cn(
          'pointer-events-none absolute -inset-4 rounded-3xl bg-radial opacity-60 blur-3xl transition-all duration-700',
          activeTheme.ambientGlow,
        )}
      />

      {/* Top Studio Control Bar */}
      <div className="border-border-base/70 bg-bg-surface/85 relative flex flex-col gap-3 rounded-2xl border p-4 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-3 w-3 shrink-0 rounded-full shadow-xs"
            style={{ backgroundColor: activeTheme.accentColor }}
            aria-hidden="true"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-text-primary text-base font-medium">
                {activeTheme.stageName}
              </h3>
              <span className="bg-primary/10 text-primary border-primary/20 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-sans text-[10px] font-medium">
                <Sparkles className="h-3 w-3" />
                <span>Interactive Studio</span>
              </span>
            </div>
            <p className="text-text-secondary font-sans text-xs">
              Drag, tilt, and personalize elements freely across the space.
            </p>
          </div>
        </div>

        {/* Action Controls: Fullscreen Preview, Reset, Copy Link */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Element Counter */}
          <div className="bg-bg-subtle text-text-muted border-border-base/60 hidden items-center gap-1 rounded-lg border px-2.5 py-1.5 font-sans text-xs sm:flex">
            <Layers className="h-3.5 w-3.5" />
            <span>{items.length} items</span>
          </div>

          {/* Reset to Defaults */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleResetToDefaults}
            title="Reset stage to initial layout"
            className="text-text-muted hover:text-text-primary cursor-pointer gap-1.5 text-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Reset Stage</span>
          </Button>

          {/* Copy Preview Link */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="cursor-pointer gap-1.5 text-xs"
          >
            {copiedLink ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400">
                  Link Copied!
                </span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </Button>

          {/* Open Live Fullscreen */}
          <Button
            asChild
            variant="primary"
            size="sm"
            className="cursor-pointer gap-1.5 text-xs shadow-xs"
          >
            <a href={previewPath} target="_blank" rel="noopener noreferrer">
              <span>Fullscreen Preview</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>

      {/* Main Studio Area: Canvas + Docked Sidebar Toolkit */}
      <div className="relative grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
        {/* Left / Center: Interactive Drag & Drop Spatial Canvas */}
        <div className="lg:col-span-8 xl:col-span-9">
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
            onOpenPhotoPicker={(item) => setSelectedId(item.id)}
          />
        </div>

        {/* Right: Docked Toolbox Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3">
          <SpatialToolboxSidebar
            templateId={templateId}
            onAddItem={handleAddItem}
            selectedMusicItem={selectedMusicItem}
            selectedPhotoItem={selectedPhotoItem}
            onAssignPhoto={handleAssignPhoto}
            photoCount={countStagePhotos(items)}
          />
        </div>
      </div>
    </div>
  )
}
