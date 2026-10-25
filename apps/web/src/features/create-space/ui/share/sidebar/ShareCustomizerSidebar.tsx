import { useState } from 'react'
import { Search, X, QrCode, Palette, Type } from 'lucide-react'
import type {
  QrStyleType,
  ShareFontFamily,
  ShareColorTarget,
} from '@/features/create-space/ui/share/share-customizer.types'
import { QrStylesSection } from './QrStylesSection'
import { ColorsSection } from './ColorsSection'
import { FontsSection } from './FontsSection'
import { cn, playSpatialSfx } from '@/shared/lib'

export type ShareSidebarTab = 'qrs' | 'colors' | 'fonts'

export interface ShareCustomizerSidebarProps {
  currentQrStyle: QrStyleType
  onSelectQrStyle: (style: QrStyleType) => void
  selectedTarget: ShareColorTarget
  onSelectTarget: (target: ShareColorTarget) => void
  currentQrColor: string
  currentCardBg: string
  currentTextColor: string
  onApplyColor: (hex: string) => void
  onApplyPalette: (palette: {
    qrColor: string
    cardBg: string
    textColor: string
  }) => void
  currentFont: ShareFontFamily
  onSelectFont: (font: ShareFontFamily) => void
  isCompact?: boolean
  className?: string
}

export function ShareCustomizerSidebar({
  currentQrStyle,
  onSelectQrStyle,
  selectedTarget: _selectedTarget,
  onSelectTarget: _onSelectTarget,
  currentQrColor,
  currentCardBg,
  currentTextColor,
  onApplyColor: _onApplyColor,
  onApplyPalette,
  currentFont,
  onSelectFont,
  isCompact: _isCompact = false,
  className,
}: ShareCustomizerSidebarProps) {
  const [activeTab, setActiveTab] = useState<ShareSidebarTab>('qrs')
  const [searchQuery, setSearchQuery] = useState('')

  const handleTabChange = (tab: ShareSidebarTab) => {
    playSpatialSfx('tactile-tap')
    setActiveTab(tab)
  }

  return (
    <aside
      className={cn(
        'flex h-full w-full flex-col bg-[#16120F] text-[#F3EAE1] select-none',
        className,
      )}
    >
      {/* Top Header & Search Bar */}
      <div className="space-y-3 border-b border-white/10 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-heading text-sm font-semibold tracking-tight text-[#FAF6F0]">
              Keepsake Customizer
            </h3>
            <p className="font-sans text-[11px] text-[#A99B90]">
              Style the QR, color surfaces & typography
            </p>
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search styles, colors, fonts..."
            aria-label="Search customization options"
            className="w-full rounded-xl border border-white/10 bg-black/40 py-2 pr-8 pl-9 font-sans text-xs text-stone-200 transition-colors placeholder:text-stone-500 focus:border-amber-400/70 focus:bg-black/60 focus:ring-1 focus:ring-amber-400/40 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-2.5 cursor-pointer rounded-full p-1 text-stone-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Section Tabs Switcher */}
        <div className="grid grid-cols-3 gap-1 rounded-xl border border-white/10 bg-black/40 p-1">
          <button
            type="button"
            onClick={() => handleTabChange('qrs')}
            className={cn(
              'flex cursor-pointer items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-all',
              activeTab === 'qrs'
                ? 'bg-amber-400/20 text-amber-200 shadow-xs ring-1 ring-amber-400/50'
                : 'text-stone-400 hover:text-stone-200',
            )}
          >
            <QrCode className="h-3.5 w-3.5" />
            <span>QRs</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('colors')}
            className={cn(
              'flex cursor-pointer items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-all',
              activeTab === 'colors'
                ? 'bg-amber-400/20 text-amber-200 shadow-xs ring-1 ring-amber-400/50'
                : 'text-stone-400 hover:text-stone-200',
            )}
          >
            <Palette className="h-3.5 w-3.5" />
            <span>Colors</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('fonts')}
            className={cn(
              'flex cursor-pointer items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-all',
              activeTab === 'fonts'
                ? 'bg-amber-400/20 text-amber-200 shadow-xs ring-1 ring-amber-400/50'
                : 'text-stone-400 hover:text-stone-200',
            )}
          >
            <Type className="h-3.5 w-3.5" />
            <span>Fonts</span>
          </button>
        </div>
      </div>

      {/* Tabbed Content Body */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        {activeTab === 'qrs' && (
          <QrStylesSection
            currentStyle={currentQrStyle}
            onSelectStyle={onSelectQrStyle}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'colors' && (
          <ColorsSection
            currentQrColor={currentQrColor}
            currentCardBg={currentCardBg}
            currentTextColor={currentTextColor}
            onApplyPalette={onApplyPalette}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'fonts' && (
          <FontsSection
            currentFont={currentFont}
            onSelectFont={onSelectFont}
            searchQuery={searchQuery}
          />
        )}
      </div>
    </aside>
  )
}
