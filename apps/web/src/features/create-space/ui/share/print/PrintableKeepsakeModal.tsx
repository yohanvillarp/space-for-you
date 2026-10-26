import { useState, useEffect, useRef } from 'react'
import { Printer, Download, X, Sparkles } from 'lucide-react'
import { Button } from '@/shared/ui'
import type {
  FoldableCardData,
  FoldablePaperSize,
} from '@/features/create-space/lib/foldable-card-types'
import {
  generateFoldableCardCanvas,
  downloadFoldableCardImage,
} from '@/features/create-space/lib/foldable-card-generator'
import { PrintableSheetPreview } from './PrintableSheetPreview'
import './printable-card.css'

export interface PrintableKeepsakeModalProps {
  isOpen: boolean
  onClose: () => void
  baseCardData: FoldableCardData
}

export function PrintableKeepsakeModal({
  isOpen,
  onClose,
  baseCardData,
}: PrintableKeepsakeModalProps) {
  const [paperSize, setPaperSize] = useState<FoldablePaperSize>('a4')
  const [includeCutGuides, setIncludeCutGuides] = useState(true)
  const [includeFoldLine, setIncludeFoldLine] = useState(true)
  const [includeHandwrittenLines, setIncludeHandwrittenLines] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [sheetImageUrl, setSheetImageUrl] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    let isMounted = true

    const updateCanvas = async () => {
      setIsGenerating(true)
      try {
        const fullData: FoldableCardData = {
          ...baseCardData,
          paperSize,
          includeCutGuides,
          includeFoldLine,
          includeHandwrittenLines,
        }
        const canvas = await generateFoldableCardCanvas(fullData)
        if (isMounted) {
          canvasRef.current = canvas
          setSheetImageUrl(canvas.toDataURL('image/png'))
        }
      } catch (err) {
        console.error('Failed to generate printable card sheet:', err)
      } finally {
        if (isMounted) setIsGenerating(false)
      }
    }

    updateCanvas()
    return () => {
      isMounted = false
    }
  }, [
    isOpen,
    baseCardData,
    paperSize,
    includeCutGuides,
    includeFoldLine,
    includeHandwrittenLines,
  ])

  if (!isOpen) return null

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    if (canvasRef.current) {
      downloadFoldableCardImage(
        canvasRef.current,
        `keepsake-card-${baseCardData.recipientName || 'gift'}.png`,
      )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#171311] text-[#FAF6F0] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#CF7056]/20 text-[#CF7056]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-heading text-base font-semibold">
                Print Foldable Keepsake Card
              </h3>
              <p className="font-sans text-xs text-stone-400">
                A standard A6 / 4x6" greeting card spread ready to fold
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-stone-400 hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          {/* Options Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 font-sans text-xs">
            {/* Paper Size */}
            <div className="flex items-center gap-2">
              <span className="text-stone-400">Paper:</span>
              <div className="inline-flex rounded-lg border border-white/10 bg-black/30 p-0.5">
                {(['a4', 'letter'] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setPaperSize(size)}
                    className={`cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium uppercase transition-colors ${
                      paperSize === size
                        ? 'bg-[#CF7056] text-white'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Guide Toggles */}
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex cursor-pointer items-center gap-1.5 text-stone-300 select-none">
                <input
                  type="checkbox"
                  checked={includeCutGuides && includeFoldLine}
                  onChange={(e) => {
                    setIncludeCutGuides(e.target.checked)
                    setIncludeFoldLine(e.target.checked)
                  }}
                  className="rounded border-white/20 bg-white/10 accent-[#CF7056]"
                />
                <span>Cut & Fold Guides</span>
              </label>

              <label className="flex cursor-pointer items-center gap-1.5 text-stone-300 select-none">
                <input
                  type="checkbox"
                  checked={includeHandwrittenLines}
                  onChange={(e) => setIncludeHandwrittenLines(e.target.checked)}
                  className="rounded border-white/20 bg-white/10 accent-[#CF7056]"
                />
                <span>Handwritten Note Area</span>
              </label>
            </div>
          </div>

          {/* Interactive Preview */}
          <PrintableSheetPreview
            sheetImageUrl={sheetImageUrl}
            isGenerating={isGenerating}
            cardBg={baseCardData.cardBg}
          />

          {/* Print Recommendation Note */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 font-sans text-xs text-amber-200/90">
            💡 <strong>Paper Recommendation:</strong> For an intimate keepsake,
            print at 100% scale without page margins on heavy paper or cardstock
            (200–250g opalina). Fold down the center dashed line after trimming.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-white/10 px-5 py-3.5">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleDownload}
            disabled={isGenerating || !sheetImageUrl}
            className="cursor-pointer gap-2"
          >
            <Download className="h-4 w-4" />
            <span>Download High-Res PNG</span>
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handlePrint}
            disabled={isGenerating || !sheetImageUrl}
            className="cursor-pointer gap-2"
          >
            <Printer className="h-4 w-4" />
            <span>Print Card Now</span>
          </Button>
        </div>
      </div>

      {/* Hidden container targeted specifically by @media print */}
      <div id="printable-keepsake-stage" style={{ display: 'none' }}>
        {sheetImageUrl && (
          <img src={sheetImageUrl} alt="Printable keepsake card" />
        )}
      </div>
    </div>
  )
}
