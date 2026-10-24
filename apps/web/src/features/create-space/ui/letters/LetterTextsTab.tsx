import type { LetterItem } from '@/features/create-space/model/scenes.types'
import {
  AlignLeft,
  AlignCenter,
  AlignJustify,
  Type,
  Plus,
  Quote,
  Feather,
} from 'lucide-react'
import {
  FONT_STYLE_OPTIONS,
  TEXT_ALIGN_OPTIONS,
  FONT_SIZE_OPTIONS,
  TITLE_PRESETS,
  MESSAGE_SNIPPETS,
  SIGNATURE_PRESETS,
} from './letter-text-presets'
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

  const handleApplyTitle = (preset: string) => {
    playSpatialSfx('tactile-tap')
    onUpdateLetter({ ...letter, title: preset })
  }

  const handleAppendText = (snippet: string) => {
    playSpatialSfx('paper-rustle')
    const existing = letter.content ? letter.content.trim() : ''
    const separator = existing ? '\n\n' : ''
    onUpdateLetter({ ...letter, content: `${existing}${separator}${snippet}` })
  }

  const handleAppendSignature = (sig: string) => {
    playSpatialSfx('tactile-tap')
    const existing = letter.content ? letter.content.trim() : ''
    const separator = existing ? '\n\n' : ''
    onUpdateLetter({ ...letter, content: `${existing}${separator}${sig}` })
  }

  return (
    <div className="space-y-4 p-1 font-sans text-xs">
      {/* 1. Typography Style Options */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 px-1">
          <Type className="h-3.5 w-3.5 text-amber-300" />
          <h4 className="font-heading text-xs font-semibold text-amber-200">
            Typography &amp; Style
          </h4>
        </div>

        {/* Font Family Cards */}
        <div className="grid grid-cols-2 gap-1.5">
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
                  'flex cursor-pointer items-center justify-between rounded-xl border p-2 text-left transition-all',
                  isSelected
                    ? 'border-amber-400/80 bg-amber-400/10 text-amber-200 shadow-xs'
                    : 'border-[#3B302A] bg-[#1E1815] text-stone-300 hover:border-white/20 hover:text-white',
                )}
              >
                <div className="min-w-0">
                  <p className="font-heading truncate text-xs font-medium">
                    {opt.name}
                  </p>
                  <p className={cn('text-sm opacity-80', opt.className)}>
                    {opt.sample}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Alignment & Sizing Controls */}
        <div className="flex items-center gap-2 pt-1">
          {/* Alignment */}
          <div className="flex flex-1 items-center rounded-lg border border-[#3B302A] bg-[#1E1815] p-0.5">
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
                  title={`Align ${opt.label}`}
                  className={cn(
                    'flex flex-1 cursor-pointer items-center justify-center rounded py-1 transition-all',
                    isSelected
                      ? 'bg-[#2A221E] text-amber-300 shadow-xs'
                      : 'text-stone-400 hover:text-stone-200',
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              )
            })}
          </div>

          {/* Size */}
          <div className="flex flex-1 items-center rounded-lg border border-[#3B302A] bg-[#1E1815] p-0.5">
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
                  title={`Size ${opt.label}`}
                  className={cn(
                    'flex flex-1 cursor-pointer items-center justify-center rounded py-1 text-[11px] transition-all',
                    isSelected
                      ? 'bg-[#2A221E] font-medium text-amber-300 shadow-xs'
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

      {/* 2. Title Suggestions */}
      <div className="space-y-1.5 border-t border-[#3B302A] pt-3">
        <div className="flex items-center gap-1.5 px-1">
          <Feather className="h-3.5 w-3.5 text-amber-300" />
          <h4 className="font-heading text-xs font-semibold text-amber-200">
            Suggested Letter Titles
          </h4>
        </div>
        <div className="space-y-1">
          {TITLE_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handleApplyTitle(preset)}
              className="group flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#3B302A]/80 bg-[#1A1512] px-2.5 py-1.5 text-left text-[11px] text-stone-300 transition-all hover:border-amber-400/40 hover:bg-[#221B17] hover:text-white"
            >
              <span className="font-heading truncate">{preset}</span>
              <span className="ml-1 shrink-0 text-[10px] text-stone-500 group-hover:text-amber-300">
                Apply
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Thoughtful Paragraph Snippets */}
      <div className="space-y-1.5 border-t border-[#3B302A] pt-3">
        <div className="flex items-center gap-1.5 px-1">
          <Quote className="h-3.5 w-3.5 text-amber-300" />
          <h4 className="font-heading text-xs font-semibold text-amber-200">
            Thoughtful Snippets &amp; Openings
          </h4>
        </div>
        <div className="space-y-1.5">
          {MESSAGE_SNIPPETS.map((snip) => (
            <div
              key={snip.label}
              className="rounded-xl border border-[#3B302A]/80 bg-[#1A1512] p-2 text-stone-300"
            >
              <div className="flex items-center justify-between pb-1">
                <span className="text-[10px] font-medium text-amber-300/90">
                  {snip.label}
                </span>
                <button
                  type="button"
                  onClick={() => handleAppendText(snip.text)}
                  className="inline-flex cursor-pointer items-center gap-1 text-[10px] text-stone-400 transition-colors hover:text-amber-200"
                >
                  <Plus className="h-2.5 w-2.5" />
                  <span>Insert</span>
                </button>
              </div>
              <p className="line-clamp-2 text-[10.5px] leading-relaxed text-stone-400 italic">
                "{snip.text}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Closings & Sign-offs */}
      <div className="space-y-1.5 border-t border-[#3B302A] pt-3 pb-2">
        <h4 className="font-heading px-1 text-xs font-semibold text-amber-200">
          Closings &amp; Signatures
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {SIGNATURE_PRESETS.map((sig) => (
            <button
              key={sig}
              type="button"
              onClick={() => handleAppendSignature(sig)}
              className="flex cursor-pointer items-center justify-between rounded-lg border border-[#3B302A]/80 bg-[#1A1512] px-2 py-1.5 text-left text-[10.5px] text-stone-300 transition-all hover:border-amber-400/40 hover:bg-[#221B17] hover:text-white"
            >
              <span className="truncate font-serif italic">{sig}</span>
              <Plus className="h-2.5 w-2.5 shrink-0 text-stone-500" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
