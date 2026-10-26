import { useState } from 'react'
import { Eye, Layers, Scissors } from 'lucide-react'
import { cn } from '@/shared/lib'

export interface PrintableSheetPreviewProps {
  sheetImageUrl: string | null
  isGenerating: boolean
  cardBg?: string
}

export function PrintableSheetPreview({
  sheetImageUrl,
  isGenerating,
  cardBg: _cardBg,
}: PrintableSheetPreviewProps) {
  const [viewMode, setViewMode] = useState<'sheet' | 'folded'>('sheet')

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* View Mode Toggle */}
      <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1 text-xs">
        <button
          type="button"
          onClick={() => setViewMode('sheet')}
          className={cn(
            'flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1 font-sans transition-colors',
            viewMode === 'sheet'
              ? 'bg-[#CF7056] text-white shadow-xs'
              : 'text-stone-400 hover:text-stone-200',
          )}
        >
          <Scissors className="h-3.5 w-3.5" />
          <span>Sheet Layout (Flat)</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode('folded')}
          className={cn(
            'flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1 font-sans transition-colors',
            viewMode === 'folded'
              ? 'bg-[#CF7056] text-white shadow-xs'
              : 'text-stone-400 hover:text-stone-200',
          )}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Folded Spread (A6 / 4x6")</span>
        </button>
      </div>

      {/* Preview Stage */}
      <div className="relative flex aspect-14/10 w-full max-w-2xl items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#120E0C] p-4 shadow-2xl">
        {isGenerating ? (
          <div className="flex flex-col items-center gap-2 text-stone-400">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-stone-500 border-t-amber-400" />
            <span className="font-sans text-xs">Composing print sheet...</span>
          </div>
        ) : sheetImageUrl ? (
          viewMode === 'sheet' ? (
            <div className="relative max-h-full max-w-full overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black/20">
              <img
                src={sheetImageUrl}
                alt="Printable Keepsake Sheet"
                className="max-h-[380px] w-auto object-contain"
              />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Left Panel Half Preview */}
              <div className="relative h-[320px] w-[220px] overflow-hidden rounded-l-xl border-r-2 border-dashed border-stone-300 bg-white shadow-2xl ring-1 ring-black/10">
                <img
                  src={sheetImageUrl}
                  alt="Inside Left Dedication"
                  className="absolute top-0 left-0 h-full max-w-none object-cover"
                  style={{ width: '200%' }}
                />
              </div>

              {/* Right Panel Half Preview */}
              <div className="relative h-[320px] w-[220px] overflow-hidden rounded-r-xl bg-white shadow-2xl ring-1 ring-black/10">
                <img
                  src={sheetImageUrl}
                  alt="Inside Right Scannable Key"
                  className="absolute top-0 right-0 h-full max-w-none object-cover"
                  style={{ width: '200%' }}
                />
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center gap-2 text-stone-400">
            <Eye className="h-6 w-6 text-stone-500" />
            <span className="font-sans text-xs">Preview unavailable</span>
          </div>
        )}
      </div>
    </div>
  )
}
