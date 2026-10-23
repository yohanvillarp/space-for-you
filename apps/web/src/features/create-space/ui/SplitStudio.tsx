import { useState } from 'react'
import { Sparkles, QrCode, Palette } from 'lucide-react'
import type { SpaceTemplateId } from '@/entities/space'
import { ThemeSelectorList } from './ThemeSelectorList'
import { StageExperienceHub } from './StageExperienceHub'
import { cn } from '@/shared/lib'

export interface SplitStudioProps {
  selectedTemplateId: SpaceTemplateId
  onSelectTemplate: (id: SpaceTemplateId) => void
}

type MobileTab = 'selector' | 'qr_preview'

export function SplitStudio({
  selectedTemplateId,
  onSelectTemplate,
}: SplitStudioProps) {
  const [mobileTab, setMobileTab] = useState<MobileTab>('selector')

  return (
    <div className="space-y-6">
      {/* Mobile-only Segmented View Switcher */}
      <div className="flex items-center justify-center lg:hidden">
        <div className="bg-bg-subtle/80 border-border-base/50 flex items-center rounded-full border p-1 shadow-xs">
          <button
            type="button"
            onClick={() => setMobileTab('selector')}
            className={cn(
              'flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-xs font-medium transition-all select-none',
              mobileTab === 'selector'
                ? 'bg-bg-surface text-text-primary shadow-xs'
                : 'text-text-secondary hover:text-text-primary',
            )}
          >
            <Palette className="h-3.5 w-3.5" />
            <span>Select Setting</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('qr_preview')}
            className={cn(
              'flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-xs font-medium transition-all select-none',
              mobileTab === 'qr_preview'
                ? 'bg-bg-surface text-text-primary shadow-xs'
                : 'text-text-secondary hover:text-text-primary',
            )}
          >
            <QrCode className="h-3.5 w-3.5" />
            <span>Mobile QR & Preview</span>
          </button>
        </div>
      </div>

      {/* Main Responsive Split Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start xl:gap-10">
        {/* Left Column: Stage Selector Panel (~45%) */}
        <div
          className={cn(
            'space-y-6 lg:col-span-5 lg:block',
            mobileTab === 'qr_preview' && 'hidden lg:block',
          )}
        >
          <div className="space-y-1">
            <h2 className="font-heading text-text-primary text-xl font-medium tracking-tight sm:text-2xl">
              Select the Setting & Atmosphere
            </h2>
            <p className="text-text-secondary font-sans text-xs leading-relaxed sm:text-sm">
              Choose the tangible stage where their memories will live. In Step
              2 you will pen your letters and upload photographs.
            </p>
          </div>

          <ThemeSelectorList
            selectedTemplateId={selectedTemplateId}
            onSelectTemplate={(id) => {
              onSelectTemplate(id)
            }}
          />

          <div className="text-text-muted hidden items-center gap-2 pt-1 font-sans text-xs lg:flex">
            <Sparkles className="text-primary h-3.5 w-3.5" />
            <span>
              Every letter, photo, and playlist will be personalized next.
            </span>
          </div>
        </div>

        {/* Right Column: Live QR Code & Fullscreen Experience Portal (~55%) */}
        <div
          className={cn(
            'lg:col-span-7 lg:block',
            mobileTab === 'selector' && 'hidden lg:block',
          )}
        >
          <StageExperienceHub templateId={selectedTemplateId} />
        </div>
      </div>
    </div>
  )
}
