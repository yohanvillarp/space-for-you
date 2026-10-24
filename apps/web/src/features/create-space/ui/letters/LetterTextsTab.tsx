import type { LetterItem } from '@/features/create-space/model/scenes.types'
import { AlignLeft, AlignCenter, AlignJustify, Type } from 'lucide-react'
import {
  FONT_STYLE_OPTIONS,
  TEXT_ALIGN_OPTIONS,
  FONT_SIZE_OPTIONS,
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

  return (
    <div className="space-y-5 p-1 font-sans text-xs">
      {/* 1. Header with Editorial Description */}
      <div className="space-y-1 px-1">
        <div className="flex items-center gap-1.5">
          <Type className="h-3.5 w-3.5 text-amber-300" />
          <h4 className="font-heading text-xs font-semibold text-amber-200">
            Typography &amp; Style
          </h4>
        </div>
        <p className="text-[11px] text-stone-400">
          Refine the typeface, reading proportion, and alignment for this
          stationery.
        </p>
      </div>

      {/* 2. Typeface Selection (Spacious 2x2 Grid) */}
      <div className="space-y-2">
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
                    ? 'border-amber-400/90 bg-amber-400/10 text-amber-200 shadow-sm ring-1 ring-amber-400/30'
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

      {/* 3. Proportion & Reading Scale (Dedicated Full-Width Row with 3 spacious cards) */}
      <div className="space-y-2 border-t border-[#3B302A]/80 pt-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10.5px] font-medium tracking-wider text-stone-400 uppercase">
            Proportion
          </span>
          <span className="text-[10px] text-stone-500">Reading scale</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
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
                className={cn(
                  'group flex cursor-pointer flex-col items-center justify-center rounded-xl border px-2 py-2.5 text-center transition-all',
                  isSelected
                    ? 'border-amber-400/90 bg-amber-400/10 text-amber-200 shadow-sm ring-1 ring-amber-400/30'
                    : 'border-[#3B302A] bg-[#1E1815] text-stone-300 hover:border-amber-400/40 hover:bg-[#251E1A] hover:text-white',
                )}
              >
                <span
                  className={cn(
                    'font-heading leading-none font-medium',
                    opt.id === 'sm' && 'text-xs',
                    opt.id === 'base' && 'text-sm',
                    opt.id === 'lg' && 'text-base',
                    isSelected ? 'text-amber-300' : 'text-stone-400',
                  )}
                >
                  Aa
                </span>
                <span className="mt-1 text-[11px] font-medium">
                  {opt.label}
                </span>
                <span className="text-[9.5px] text-stone-500 group-hover:text-stone-400">
                  {opt.scale}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 4. Alignment Controls (Dedicated Full-Width Row with 3 spacious buttons) */}
      <div className="space-y-2 border-t border-[#3B302A]/80 pt-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10.5px] font-medium tracking-wider text-stone-400 uppercase">
            Alignment
          </span>
          <span className="text-[10px] text-stone-500">Text layout</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
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
                className={cn(
                  'flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-2 py-2.5 text-xs transition-all',
                  isSelected
                    ? 'border-amber-400/90 bg-amber-400/10 text-amber-200 shadow-sm ring-1 ring-amber-400/30'
                    : 'border-[#3B302A] bg-[#1E1815] text-stone-300 hover:border-amber-400/40 hover:bg-[#251E1A] hover:text-white',
                )}
              >
                <Icon
                  className={cn(
                    'h-3.5 w-3.5',
                    isSelected ? 'text-amber-300' : 'text-stone-400',
                  )}
                />
                <span className="text-[11px] font-medium">{opt.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
