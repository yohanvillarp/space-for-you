import { useState } from 'react'
import { Heart, Lock } from 'lucide-react'
import {
  WaxSeal,
  PolaroidFrame,
  VinylPlayer,
  WashiTape,
} from '@/features/space-themes/shared'
import './romantic.css'

export function RomanticUniverse() {
  const [sealBroken, setSealBroken] = useState(false)

  return (
    <div className="universe-romantic romantic-desk-surface animate-fade-in relative flex min-h-[calc(100dvh-57px)] w-full flex-1 flex-col justify-between overflow-hidden px-4 py-8 select-none sm:px-8 sm:py-12 md:px-12">
      {/* Soft Scattered Dried Rose Petals across the whole desk */}
      <div className="pointer-events-none absolute top-12 right-24 rotate-45 text-lg text-rose-500/40">
        ❧
      </div>
      <div className="pointer-events-none absolute top-36 left-16 -rotate-12 text-sm text-rose-400/35">
        ❧
      </div>
      <div className="pointer-events-none absolute bottom-24 left-28 rotate-90 text-base text-rose-600/35">
        ❧
      </div>
      <div className="pointer-events-none absolute right-36 bottom-16 rotate-30 text-sm text-rose-500/30">
        ❧
      </div>

      <div className="mx-auto my-auto w-full max-w-5xl space-y-8">
        {/* Stage Header Note */}
        <div className="space-y-1 pb-2 text-center">
          <span className="rose-foil-text font-heading text-xs font-semibold tracking-widest uppercase italic">
            The Romantic Setting
          </span>
          <h3 className="font-heading text-2xl font-medium tracking-tight text-stone-100 sm:text-3xl">
            Antique Love Letter Desk
          </h3>
          <p className="mx-auto max-w-sm font-sans text-xs text-stone-400">
            A private candlelit desk with a wax-sealed love letter, instant
            couple polaroid, and vintage vinyl player.
          </p>
        </div>

        {/* Physical Keepsake Artifacts Grid on Desk */}
        <div className="grid grid-cols-1 items-start gap-8 pt-2 sm:grid-cols-2">
          {/* Folded Parchment Envelope with 3D Wax Seal */}
          <div className="linen-envelope relative rotate-1 transform space-y-5 rounded-2xl p-6 shadow-2xl transition-transform hover:rotate-0 sm:p-7">
            <div className="absolute -top-3 left-8">
              <WashiTape color="rose" tilt="right" />
            </div>

            <div className="flex items-center justify-between border-b border-rose-500/20 pt-1 pb-2.5">
              <span className="font-heading text-primary text-xs font-semibold italic">
                A Private Love Letter
              </span>
              <div className="flex items-center gap-1.5 font-sans text-[10px] text-stone-400">
                <Lock className="text-primary h-3 w-3" />
                <span>For Their Eyes Only</span>
              </div>
            </div>

            {/* Letter Content or Sealed State */}
            {sealBroken ? (
              <div className="animate-fade-in space-y-2 pt-1">
                <p className="font-heading text-xs leading-relaxed text-stone-800 italic sm:text-sm dark:text-stone-200">
                  &ldquo;In Step 2, you will write your private love story,
                  memories, and unspoken vows directly onto this letter.&rdquo;
                </p>
                <p className="text-primary pt-1 font-sans text-[11px] font-medium">
                  — Yours, always & forever
                </p>
              </div>
            ) : (
              <div className="animate-fade-in flex flex-col items-center justify-center space-y-1.5 py-5 text-center">
                <p className="font-heading max-w-[240px] text-xs text-stone-700 italic dark:text-stone-300">
                  Protected by an unbroken wax seal.
                </p>
                <p className="font-sans text-[10px] text-stone-400">
                  Tap seal below to preview opening
                </p>
              </div>
            )}

            {/* Interactive Wax Seal on Envelope */}
            <div className="flex justify-center border-t border-rose-500/15 pt-2">
              <WaxSeal
                variant="terracotta"
                symbol="heart"
                label={
                  sealBroken
                    ? 'Seal broken • Click to reseal'
                    : 'Break wax seal & inspect'
                }
                defaultOpen={sealBroken}
                onToggle={(open) => setSealBroken(open)}
              />
            </div>
          </div>

          {/* Propped Polaroid on Desk */}
          <div className="flex justify-center sm:justify-end">
            <PolaroidFrame
              caption="Our Favorite Memory"
              date="Ready for your photo"
              rotation="left"
              tapeColor="rose"
              className="max-w-[260px] shadow-2xl"
            >
              <div className="from-primary/30 flex h-full w-full flex-col items-center justify-center space-y-1.5 bg-gradient-to-tr via-rose-500/20 to-amber-200/20 p-5 text-center">
                <Heart className="text-primary/80 fill-primary/30 h-9 w-9" />
                <p className="font-heading text-xs font-medium text-stone-800 italic dark:text-stone-200">
                  Add Your Couple Photo
                </p>
                <span className="font-sans text-[10px] text-stone-500 dark:text-stone-400">
                  Step 2 Upload
                </span>
              </div>
            </PolaroidFrame>
          </div>
        </div>

        {/* Tangible Spinning Vinyl Player on Desk */}
        <div className="pt-6">
          <VinylPlayer
            trackTitle="Our Special Song"
            artist="Waiting for your chosen song in Step 2"
            labelColor="#A34835"
          />
        </div>
      </div>

      {/* Subtle discreet note on desk edge */}
      <div className="pt-8 text-center font-sans text-[11px] text-stone-500">
        <p>A private keepsake space crafted with Space for You</p>
      </div>
    </div>
  )
}
