import { useState } from 'react'
import { Link } from 'react-router'
import { Flame, Mail, Music, Lock, ArrowRight, Camera } from 'lucide-react'
import type { SpaceTemplateId } from '@/entities/space'
import { StagePreviewPanel } from '@/features/create-space'
import { THEME_REGISTRY } from '@/features/space-themes'
import { ROUTES } from '@/shared/config'
import { Container, Card, Button } from '@/shared/ui'
import { cn, usePageSeo } from '@/shared/lib'

interface SpaceExampleMeta {
  id: SpaceTemplateId
  headline: string
  story: string
  soundscape: string
  vaultPairing: string
  highlights: string[]
}

const SPACE_EXAMPLES: SpaceExampleMeta[] = [
  {
    id: 'birthday',
    headline: 'Candlelit Celebration Table',
    story:
      'Designed for milestone birthdays where distance or time makes you want to gift something unforgettable. The recipient can light or blow out the cake candles, wind the music box, and flip through Polaroid memories.',
    soundscape: 'Warm acoustic music box & gentle celebration chimes',
    vaultPairing: 'Velvet Jewelry Vault with a 4-digit birth year code',
    highlights: [
      'Interactive birthday cake with toggleable candle flames',
      'Polaroid photo frames with custom captions and dates',
      'Gold-foil greeting card and handwritten sticky notes',
      'Dedicated Heartfelt Letters scene with wax-sealed envelopes',
    ],
  },
  {
    id: 'anniversary',
    headline: 'Love Letter Desk',
    story:
      'An intimate midnight desk scattered with rose petals, a spinning vinyl record player, and wax-sealed parchment letters. Ideal for anniversaries, proposals, or quiet declarations of love.',
    soundscape: 'Crackling vinyl turntable & nocturnal piano melody',
    vaultPairing: 'Secret Leather Diary unlocked by your anniversary date',
    highlights: [
      'Interactive vinyl turntable that plays ambient melodies',
      'Wax-sealed love letters that open in a full reading modal',
      'Scattered rose petals and gold washi-taped Polaroids',
      'Time-locked scenes that unlock at midnight on your anniversary',
    ],
  },
  {
    id: 'friendship',
    headline: 'Memory Corkboard',
    story:
      'A warm cork bulletin board pinned with airmail postcards, instant snapshots, and a retro cassette player. Crafted for best friends, siblings, or farewells across time zones.',
    soundscape: 'Lo-fi roadtrip cassette tape & tactile paper rustles',
    vaultPairing: 'Dreamy Cloud Vault or Snowy Steel Safe with a shared joke',
    highlights: [
      'Airmail postcards and brass-pinned handwritten notes',
      'Retro cassette tape and vintage radio keepsakes',
      'Up to 5 high-resolution Polaroid memories per stage',
      'Printable QR keepsake card to tuck inside a physical gift',
    ],
  },
]

export function ExamplesPage() {
  usePageSeo({
    title: 'Explore Interactive Space Stages & Examples',
    description:
      'Interact live with the Candlelit Celebration Table, Love Letter Desk, and Memory Corkboard stages featuring Polaroid photos, voice notes, and dynamic objects.',
    canonicalPath: '/examples',
  })

  const [selectedId, setSelectedId] = useState<SpaceTemplateId>('birthday')
  const activeExample =
    SPACE_EXAMPLES.find((ex) => ex.id === selectedId) ?? SPACE_EXAMPLES[0]

  return (
    <div className="animate-fade-in py-10 sm:py-16">
      <Container className="max-w-6xl space-y-14">
        {/* Header */}
        <div className="space-y-3 text-center">
          <h1 className="font-heading text-text-primary text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            Explore Real Spaces & Tactile Stages
          </h1>
          <p className="text-text-secondary mx-auto max-w-2xl font-sans text-sm leading-relaxed sm:text-base">
            Switch between the three stages below and interact directly with the
            dynamic objects—Polaroids, voice and music players, and keepsake
            notes just as your recipient will.
          </p>
        </div>

        {/* Stage Switcher Tabs */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SPACE_EXAMPLES.map((item) => {
              const theme = THEME_REGISTRY[item.id]
              const isSelected = item.id === selectedId
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    'flex cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2 font-sans text-xs font-medium transition-all sm:text-sm',
                    isSelected
                      ? 'border-primary bg-primary/15 text-text-primary shadow-md'
                      : 'border-border-base/80 bg-bg-surface/70 text-text-secondary hover:border-white/20 hover:text-white',
                  )}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: theme.accentColor }}
                  />
                  <span>{theme.stageName}</span>
                </button>
              )
            })}
          </div>

          {/* Live Interactive Stage Preview + Context Panel */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <StagePreviewPanel key={selectedId} templateId={selectedId} />
            </div>

            <Card className="border-border-base/80 bg-bg-surface/90 flex flex-col justify-between space-y-6 border p-6 lg:col-span-4">
              <div className="space-y-4">
                <h2 className="font-heading text-text-primary text-2xl font-medium">
                  {activeExample.headline}
                </h2>

                <p className="text-text-secondary font-sans text-xs leading-relaxed sm:text-sm">
                  {activeExample.story}
                </p>

                <div className="border-border-base/60 space-y-2.5 border-t pt-4 font-sans text-xs">
                  {activeExample.highlights.map((point) => (
                    <div
                      key={point}
                      className="text-text-secondary flex items-start gap-2"
                    >
                      <span className="text-primary mt-0.5">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-border-base/60 space-y-3 border-t pt-4">
                <div className="text-text-muted flex items-center gap-2 font-sans text-xs">
                  <Music className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                  <span>{activeExample.soundscape}</span>
                </div>
                <div className="text-text-muted flex items-center gap-2 font-sans text-xs">
                  <Lock className="text-primary h-3.5 w-3.5 shrink-0" />
                  <span>{activeExample.vaultPairing}</span>
                </div>
                <Button
                  asChild
                  variant="primary"
                  size="md"
                  className="mt-2 w-full justify-center gap-2"
                >
                  <Link to={ROUTES.DASHBOARD}>
                    <span>Create with this stage</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Anatomy of Every Space */}
        <div className="border-border-base/60 grid grid-cols-1 gap-6 border-t pt-12 md:grid-cols-3">
          <Card className="border-border-base/80 bg-bg-surface/75 space-y-2 border p-5">
            <div className="flex items-center gap-2.5">
              <Camera className="text-primary h-4 w-4 shrink-0" />
              <h3 className="font-heading text-text-primary text-base font-medium">
                Effortless on Desktop & Mobile
              </h3>
            </div>
            <p className="text-text-secondary font-sans text-xs leading-relaxed">
              Every 1280×720 stage scales proportionally across devices, with a
              landscape rotation toggle and full-screen modals for photos and
              notes.
            </p>
          </Card>

          <Card className="border-border-base/80 bg-bg-surface/75 space-y-2 border p-5">
            <div className="flex items-center gap-2.5">
              <Flame className="h-4 w-4 shrink-0 text-amber-400" />
              <h3 className="font-heading text-text-primary text-base font-medium">
                Combine Canvases & Letters
              </h3>
            </div>
            <p className="text-text-secondary font-sans text-xs leading-relaxed">
              Pair your interactive 2D table stage with a dedicated Heartfelt
              Letters view where envelopes open with custom wax seals.
            </p>
          </Card>

          <Card className="border-border-base/80 bg-bg-surface/75 space-y-2 border p-5">
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-teal-400" />
              <h3 className="font-heading text-text-primary text-base font-medium">
                A True Gift Presentation
              </h3>
            </div>
            <p className="text-text-secondary font-sans text-xs leading-relaxed">
              Recipients are greeted by a personalized dedication envelope and
              ambient music before stepping into the space you built.
            </p>
          </Card>
        </div>
      </Container>
    </div>
  )
}
