import { Users, Compass, Smile } from 'lucide-react'
import {
  PolaroidFrame,
  PushPin,
  CassetteTape,
} from '@/features/space-themes/shared'
import './friendship.css'

export function FriendshipUniverse() {
  return (
    <div className="universe-friendship corkboard-surface animate-fade-in relative flex min-h-[calc(100dvh-57px)] w-full flex-1 flex-col justify-between px-4 py-8 select-none sm:px-8 sm:py-12 md:px-12">
      <div className="mx-auto my-auto w-full max-w-5xl space-y-8">
        {/* Stage Inscription pinned to corkboard */}
        <div className="relative pb-2 text-center">
          <div className="relative inline-block -rotate-1 rounded-xl border border-stone-300 bg-[#FAF6EE] px-6 py-2.5 shadow-lg dark:border-stone-700 dark:bg-[#1E1B18]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <PushPin color="brass" />
            </div>
            <span className="teal-foil-text font-heading text-xs font-semibold tracking-widest uppercase italic">
              The Friendship Setting
            </span>
            <h3 className="font-heading text-xl font-medium tracking-tight text-stone-900 sm:text-2xl dark:text-stone-100">
              Memory Corkboard & Workshop
            </h3>
            <p className="mx-auto max-w-sm pt-0.5 font-sans text-xs text-stone-600 dark:text-stone-300">
              An authentic corkboard with metallic push pins, airmail postcards,
              and your roadtrip mixtape.
            </p>
          </div>
        </div>

        {/* Physical Keepsake Artifacts Pinned on Corkboard */}
        <div className="grid grid-cols-1 items-start gap-8 pt-2 sm:grid-cols-2">
          {/* Authentic Airmail Travel Postcard */}
          <div className="relative -rotate-2 transform transition-transform hover:rotate-0">
            {/* Real Push Pin pinning the postcard */}
            <div className="absolute -top-3.5 left-8 z-20">
              <PushPin color="red" />
            </div>

            <div className="airmail-border shadow-xl">
              <div className="postcard-inner relative space-y-4 p-6">
                <div className="border-border-base/40 flex items-center justify-between border-b pt-2 pb-2.5">
                  <span className="font-heading text-xs font-semibold text-teal-700 italic dark:text-teal-400">
                    Travel Postcard
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[10px] tracking-widest text-stone-500 uppercase">
                    <span>AIR MAIL • VINTAGE POST</span>
                  </div>
                </div>

                {/* Postcard Body Prompt */}
                <p className="font-heading pt-1 text-xs leading-relaxed text-stone-700 italic sm:text-sm dark:text-stone-200">
                  &ldquo;This postcard will hold your shared roadtrip memories,
                  inside jokes, and gratitude notes in Step 2.&rdquo;
                </p>

                <div className="border-border-base/30 flex items-center justify-between border-t pt-3 font-sans text-[11px]">
                  <div className="flex items-center gap-1.5 font-medium text-teal-700 dark:text-teal-400">
                    <Smile className="h-3.5 w-3.5" />
                    <span>Inside jokes & stories</span>
                  </div>
                  <Compass className="h-3.5 w-3.5 text-stone-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Polaroid Memory Pinned on Corkboard */}
          <div className="relative flex justify-center sm:justify-end">
            {/* Real Push Pin pinning the polaroid */}
            <div className="absolute -top-3.5 right-16 z-20 sm:right-28">
              <PushPin color="teal" />
            </div>

            <PolaroidFrame
              caption="Our Greatest Roadtrip"
              date="Ready for your photo"
              rotation="right"
              tapeColor="sage"
              className="max-w-[260px] shadow-2xl"
            >
              <div className="flex h-full w-full flex-col items-center justify-center space-y-1.5 bg-gradient-to-tr from-teal-500/30 via-emerald-400/20 to-amber-200/20 p-5 text-center">
                <Users className="h-9 w-9 text-teal-600 dark:text-teal-400" />
                <p className="font-heading text-xs font-medium text-stone-700 italic dark:text-stone-200">
                  Add Your Adventure Photo
                </p>
                <span className="font-sans text-[10px] text-stone-500 dark:text-stone-400">
                  Step 2 Upload
                </span>
              </div>
            </PolaroidFrame>
          </div>
        </div>

        {/* Retro Cassette Tape on Corkboard Shelf */}
        <div className="flex justify-center pt-6">
          <CassetteTape
            label="Roadtrip Mixtape • Side A"
            subtitle="Waiting for your 14 songs in Step 2"
          />
        </div>
      </div>

      {/* Subtle discreet note pinned to the bottom corner */}
      <div className="pt-8 text-center font-sans text-[11px] text-stone-800/80 dark:text-stone-200/80">
        <p>A private keepsake space crafted with Space for You</p>
      </div>
    </div>
  )
}
