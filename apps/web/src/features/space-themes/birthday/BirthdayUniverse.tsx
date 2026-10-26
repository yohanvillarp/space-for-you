import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import {
  CandleFlame,
  PolaroidFrame,
  WashiTape,
  MusicBox,
} from '@/features/space-themes/shared'
import { getPresetTrackForTemplate } from '@/entities/audio'
import { playSpatialSfx } from '@/shared/lib'
import './birthday.css'

export function BirthdayUniverse() {
  const [candleLit, setCandleLit] = useState(true)
  const birthdayTrack = getPresetTrackForTemplate('birthday')

  return (
    <div className="universe-birthday celebration-table-surface animate-fade-in relative flex min-h-[calc(100dvh-57px)] w-full flex-1 flex-col justify-between overflow-hidden px-4 py-8 select-none sm:px-8 sm:py-12 md:px-12">
      {/* Floating Starlight Dust in ambient air across the whole table */}
      <div className="absolute top-8 left-16 animate-pulse text-sm text-amber-400 opacity-70">
        ✦
      </div>
      <div className="animate-glow absolute top-24 right-28 text-base text-amber-300 opacity-80">
        ✧
      </div>
      <div className="absolute bottom-16 left-1/4 animate-pulse text-xs text-amber-500 opacity-60">
        ✦
      </div>
      <div className="animate-glow absolute top-1/2 right-16 text-sm text-amber-200 opacity-75">
        ✧
      </div>

      <div className="mx-auto my-auto w-full max-w-5xl space-y-8">
        {/* Stage Header Note */}
        <div className="space-y-1 pb-2 text-center">
          <span className="gold-foil-text font-heading text-xs font-semibold tracking-widest uppercase italic">
            The Celebration Setting
          </span>
          <h3 className="font-heading text-2xl font-medium tracking-tight text-stone-100 sm:text-3xl">
            Candlelit Celebration Table
          </h3>
          <p className="mx-auto max-w-sm font-sans text-xs text-stone-400">
            A warm tabletop stage with a flickering candle, gold-trimmed
            birthday card, and celebration melody.
          </p>
        </div>

        {/* Centerpiece: Interactive Celebration Candle */}
        <div className="relative my-4 flex flex-col items-center justify-center py-2">
          {/* Warm Candle Light Halo on Table */}
          {candleLit && (
            <div className="pointer-events-none absolute h-48 w-48 animate-pulse rounded-full bg-amber-500/15 blur-3xl" />
          )}

          {/* Candle Plate / Saucer */}
          <div className="relative flex flex-col items-center">
            {/* Candle Body & Flame */}
            <button
              type="button"
              onClick={() => {
                playSpatialSfx(candleLit ? 'candle-blow' : 'candle-spark')
                setCandleLit(!candleLit)
              }}
              className="group flex cursor-pointer flex-col items-center transition-transform outline-none hover:scale-105"
              title={
                candleLit
                  ? 'Click to make a wish & blow out flame'
                  : 'Click to relight the candle'
              }
            >
              {candleLit ? (
                <CandleFlame size="lg" />
              ) : (
                <div className="flex flex-col items-center">
                  <span className="animate-fade-in font-sans text-[10px] text-stone-400 italic">
                    ~ wish made ~
                  </span>
                  <div className="my-1 h-3 w-0.5 animate-pulse rounded-full bg-stone-600" />
                  <div className="h-16 w-8 rounded-t-sm bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 shadow-md" />
                </div>
              )}

              {/* Ceramic Saucer Plate */}
              <div className="mt-1 h-3 w-20 rounded-full border border-stone-500/40 bg-gradient-to-r from-stone-600 via-stone-400 to-stone-600 shadow-md" />
            </button>

            <span className="mt-2 font-sans text-[11px] font-medium text-amber-400/90">
              {candleLit
                ? 'Click candle to make a wish'
                : 'Click to relight candle'}
            </span>
          </div>
        </div>

        {/* Physical Keepsake Artifacts on Table */}
        <div className="grid grid-cols-1 items-start gap-8 pt-2 sm:grid-cols-2">
          {/* Deckled Cotton Birthday Card */}
          <div className="deckled-card relative -rotate-1 transform space-y-4 rounded-2xl p-6 shadow-2xl transition-transform hover:rotate-0 sm:p-7">
            <div className="absolute -top-3 left-8">
              <WashiTape color="gold" tilt="left" />
            </div>

            <div className="flex items-center justify-between border-b border-amber-500/20 pt-1 pb-2.5">
              <span className="font-heading text-xs font-semibold text-amber-700 italic dark:text-amber-400">
                Birthday Dedication Card
              </span>
              <span className="font-sans text-[10px] tracking-wider text-stone-400 uppercase">
                Heavy Cotton Paper
              </span>
            </div>

            <p className="font-heading pt-1 text-xs leading-relaxed text-stone-700 italic sm:text-sm dark:text-stone-300">
              &ldquo;May this year bring you quiet mornings, loud laughter, and
              every dream you have been patiently building toward.&rdquo;
            </p>

            <div className="flex items-center gap-2 pt-2 font-sans text-[11px] text-amber-700/80 dark:text-amber-400/80">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Happy Birthday, Elena</span>
            </div>
          </div>

          {/* Propped Polaroid Photo Frame */}
          <div className="flex justify-center sm:justify-end">
            <PolaroidFrame
              caption="Golden Hour by the Coast"
              date="October 14"
              rotation="right"
              tapeColor="gold"
              className="max-w-[260px] shadow-2xl"
            >
              <div className="flex h-full w-full flex-col items-center justify-center space-y-1.5 bg-gradient-to-tr from-amber-600/30 via-orange-500/20 to-yellow-200/30 p-5 text-center">
                <span className="text-3xl drop-shadow-xs">🌅</span>
                <p className="font-heading text-xs font-medium text-stone-700 italic dark:text-stone-200">
                  Sunset at Miramar
                </p>
                <span className="font-sans text-[10px] text-stone-500 dark:text-stone-400">
                  Polaroid Keepsake
                </span>
              </div>
            </PolaroidFrame>
          </div>
        </div>

        {/* Handcrafted Celebration Music Box on Table */}
        <div className="flex justify-center pt-6">
          <MusicBox
            title={birthdayTrack.title}
            artist={birthdayTrack.artist}
            trackUrl={birthdayTrack.url}
            className="w-full max-w-md shadow-2xl"
          />
        </div>
      </div>

      {/* Subtle discreet note on table edge */}
      <div className="pt-8 text-center font-sans text-[11px] text-stone-500">
        <p>A private keepsake space crafted with Space for You</p>
      </div>
    </div>
  )
}
