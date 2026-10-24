import type { LetterItem } from '@/features/create-space/model/scenes.types'
import {
  AlignLeft,
  AlignCenter,
  AlignJustify,
  Type,
  Sparkles,
  BookOpen,
} from 'lucide-react'
import {
  FONT_STYLE_OPTIONS,
  TEXT_ALIGN_OPTIONS,
  FONT_SIZE_OPTIONS,
} from './letter-text-presets'
import { PAPER_STYLES } from './letter-sheet-colors'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface LetterTextsTabProps {
  letter: LetterItem
  onUpdateLetter: (updated: LetterItem) => void
}

export function LetterTextsTab({
  letter,
  onUpdateLetter,
}: LetterTextsTabProps) {
  const currentFontStyle = letter.fontStyle || 'serif'
  const currentAlign = letter.textAlign || 'left'
  const currentFontSize = letter.fontSize || 'base'

  const activeFont =
    FONT_STYLE_OPTIONS.find((f) => f.id === currentFontStyle) ??
    FONT_STYLE_OPTIONS[0]
  const activePaper =
    PAPER_STYLES[letter.paperColor || 'ivory'] ?? PAPER_STYLES.ivory

  const fontClass =
    currentFontStyle === 'handwriting'
      ? 'font-serif italic tracking-wide'
      : currentFontStyle === 'sans'
        ? 'font-sans'
        : currentFontStyle === 'mono'
          ? 'font-mono'
          : 'font-heading font-serif'

  const alignClass =
    currentAlign === 'center'
      ? 'text-center'
      : currentAlign === 'justify'
        ? 'text-justify'
        : 'text-left'

  const sizeClass =
    currentFontSize === 'sm'
      ? 'text-[11px] leading-relaxed'
      : currentFontSize === 'lg'
        ? 'text-[13px] leading-relaxed'
        : 'text-xs leading-relaxed'

  const wordCount = letter.content
    ? letter.content.trim().split(/\s+/).filter(Boolean).length
    : 0
  const readingTime = Math.max(1, Math.ceil(wordCount / 180))

  return (
    <div className="space-y-4 p-1 font-sans text-xs">
      {/* 1. Header with Editorial Description */}
      <div className="space-y-1 px-1">
        <div className="flex items-center gap-1.5">
          <Type className="h-3.5 w-3.5 text-amber-300" />
          <h4 className="font-heading text-xs font-semibold text-amber-200">
            Typography &amp; Style
          </h4>
        </div>
        <p className="text-[11px] text-stone-400">
          Refine the typeface, alignment, and scale for this stationery.
        </p>
      </div>

      {/* 2. Typeface Selection (Spacious & Visual 2x2 Grid) */}
      <div className="space-y-1.5">
        <span className="px-1 text-[10.5px] font-medium tracking-wider text-stone-400 uppercase">
          Typeface
        </span>
        <div className="grid grid-cols-2 gap-2">
          {FONT_STYLE_OPTIONS.map((opt) => {
            const isSelected = currentFontStyle === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  playSpatialSfx('tactile-tap')
                  onUpdateLetter({ ...letter, fontStyle: opt.id })
                }}
                className={cn(
                  'group flex cursor-pointer flex-col justify-between rounded-xl border p-2.5 text-left transition-all',
                  isSelected
                    ? 'border-amber-400/90 bg-amber-400/10 text-amber-200 shadow-sm'
                    : 'border-[#3B302A] bg-[#1E1815] text-stone-300 hover:border-amber-400/40 hover:bg-[#251E1A] hover:text-white',
                )}
              >
                <div className="flex items-start justify-between gap-1">
                  <p className="font-heading truncate text-xs font-medium">
                    {opt.name}
                  </p>
                  <span
                    className={cn(
                      'text-lg leading-none transition-transform select-none group-hover:scale-105',
                      opt.className,
                      isSelected ? 'text-amber-300' : 'text-stone-400',
                    )}
                  >
                    {opt.sample}
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-stone-400 transition-colors group-hover:text-stone-300">
                  {opt.mood}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. Alignment & Scale Controls */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        {/* Alignment */}
        <div className="space-y-1.5">
          <span className="px-1 text-[10.5px] font-medium tracking-wider text-stone-400 uppercase">
            Alignment
          </span>
          <div className="flex items-center rounded-xl border border-[#3B302A] bg-[#1E1815] p-1">
            {TEXT_ALIGN_OPTIONS.map((opt) => {
              const isSelected = currentAlign === opt.id
              const Icon =
                opt.id === 'center'
                  ? AlignCenter
                  : opt.id === 'justify'
                    ? AlignJustify
                    : AlignLeft
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    playSpatialSfx('tactile-tap')
                    onUpdateLetter({ ...letter, textAlign: opt.id })
                  }}
                  title={`Align ${opt.label} • ${opt.desc}`}
                  className={cn(
                    'flex flex-1 cursor-pointer items-center justify-center rounded-lg py-1.5 transition-all',
                    isSelected
                      ? 'bg-[#2D241F] text-amber-300 shadow-xs'
                      : 'text-stone-400 hover:text-stone-200',
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              )
            })}
          </div>
        </div>

        {/* Size / Scale */}
        <div className="space-y-1.5">
          <span className="px-1 text-[10.5px] font-medium tracking-wider text-stone-400 uppercase">
            Proportion
          </span>
          <div className="flex items-center rounded-xl border border-[#3B302A] bg-[#1E1815] p-1">
            {FONT_SIZE_OPTIONS.map((opt) => {
              const isSelected = currentFontSize === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    playSpatialSfx('tactile-tap')
                    onUpdateLetter({ ...letter, fontSize: opt.id })
                  }}
                  title={`Size ${opt.label} • ${opt.scale}`}
                  className={cn(
                    'flex flex-1 cursor-pointer items-center justify-center rounded-lg py-1.5 text-[11px] transition-all',
                    isSelected
                      ? 'bg-[#2D241F] font-medium text-amber-300 shadow-xs'
                      : 'text-stone-400 hover:text-stone-200',
                  )}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 4. Live Stationery Typographic Specimen */}
      <div className="space-y-2 border-t border-[#3B302A] pt-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-amber-300">
            <Sparkles className="h-3 w-3" />
            <span className="text-[10.5px] font-medium tracking-wider text-stone-300 uppercase">
              Stationery Preview
            </span>
          </div>
          <span className="text-[10px] text-amber-300/80">
            {activeFont.name}
          </span>
        </div>

        <div
          className={cn(
            'relative overflow-hidden rounded-xl border p-4 shadow-inner transition-colors duration-200',
            activePaper.bg,
            activePaper.border,
            activePaper.text,
          )}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-black/10 pb-1.5 text-[10px] opacity-70">
              <span className="italic">{letter.date || 'Personal note'}</span>
              <span>Letter #{letter.id.replace('letter-', '')}</span>
            </div>

            <h5 className="font-heading text-sm font-semibold tracking-wide">
              {letter.title || 'Untitled Letter'}
            </h5>

            <p
              className={cn(
                'line-clamp-4 opacity-90 select-none',
                fontClass,
                alignClass,
                sizeClass,
              )}
            >
              {letter.content
                ? letter.content
                : 'I wanted to write these words down so you could return to them whenever you need a quiet reminder of how much you mean to me.'}
            </p>
          </div>
        </div>
      </div>

      {/* 5. Composition Metrics Footer */}
      <div className="flex items-center justify-between rounded-xl border border-[#3B302A]/70 bg-[#1A1512] px-3 py-2 text-[10.5px] text-stone-400">
        <div className="flex items-center gap-1.5">
          <BookOpen className="h-3 w-3 text-amber-300/80" />
          <span>
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </span>
        </div>
        <span>~{readingTime} min read</span>
      </div>
    </div>
  )
}
