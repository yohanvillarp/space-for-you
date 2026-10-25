import { useState, useEffect } from 'react'
import { Volume2, VolumeX, Heart, ArrowRight } from 'lucide-react'
import type { SpaceWithScenes, SpaceTemplateId } from '@/entities/space'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import { getPresetTrackForTemplate } from '@/entities/audio'
import { THEME_REGISTRY } from '@/features/space-themes'
import { LettersScene } from '@/features/create-space/ui/letters/LettersScene'
import { PublicStageCanvas } from '@/features/create-space/ui/public/PublicStageCanvas'
import { PublicSceneDock } from '@/features/create-space/ui/public/PublicSceneDock'
import { useSpatialAudioPlayer, cn, playSpatialSfx } from '@/shared/lib'

export interface PublicSanctuaryViewerProps {
  data: SpaceWithScenes
}

export function PublicSanctuaryViewer({ data }: PublicSanctuaryViewerProps) {
  const { space, scenes } = data
  const templateId = (space.templateId || 'birthday') as SpaceTemplateId
  const activeTheme = THEME_REGISTRY[templateId] ?? THEME_REGISTRY.birthday

  const [activeSceneId, setActiveSceneId] = useState<string>('hub')

  const presetTrack = getPresetTrackForTemplate(templateId)
  const { isPlaying, togglePlay } = useSpatialAudioPlayer({
    trackUrl: presetTrack?.url || '',
    loop: true,
  })

  // Dynamic Document Title
  useEffect(() => {
    if (space?.title) {
      document.title = `${space.title} • Space For You`
    }
    return () => {
      document.title = 'Space For You'
    }
  }, [space?.title])

  const activeScene = scenes.find((s) => s.id === activeSceneId) as
    SpaceScene | undefined

  const handleEnterSanctuary = () => {
    playSpatialSfx('tactile-tap')
    if (scenes.length > 0) {
      setActiveSceneId(scenes[0].id)
    }
    if (!isPlaying) {
      togglePlay()
    }
  }

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden bg-[#0D0907] text-[#FAF6F0] select-none">
      {/* Background Ambient Theme Aura */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 -z-10 bg-radial opacity-35 blur-3xl transition-all duration-1000',
          activeTheme.ambientGlow,
        )}
        aria-hidden="true"
      />

      {/* Intimate Public Top Bar */}
      <header className="relative z-30 flex h-14 w-full items-center justify-between border-b border-white/10 bg-[#120D0B]/80 px-4 backdrop-blur-md sm:px-8">
        <div className="flex items-center gap-3">
          <span className="font-heading text-sm text-amber-300/90 italic sm:text-base">
            Space For You
          </span>
          <span className="text-white/20">•</span>
          <span className="max-w-[160px] truncate font-sans text-xs font-medium text-stone-300 sm:max-w-xs">
            {space.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {presetTrack && (
            <button
              type="button"
              onClick={() => {
                playSpatialSfx('tactile-tap')
                togglePlay()
              }}
              title={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 font-sans text-xs font-medium transition-all',
                isPlaying
                  ? 'border border-amber-400/40 bg-amber-400/15 text-amber-200'
                  : 'border border-white/10 bg-white/5 text-stone-400 hover:text-white',
              )}
            >
              {isPlaying ? (
                <>
                  <div className="flex h-3.5 w-3 items-end gap-0.5">
                    <span className="h-2 w-0.5 animate-pulse rounded-full bg-amber-300" />
                    <span className="h-3.5 w-0.5 animate-pulse rounded-full bg-amber-300" />
                    <span className="h-2.5 w-0.5 animate-pulse rounded-full bg-amber-300" />
                  </div>
                  <span className="hidden sm:inline">Soundscape</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Play Music</span>
                </>
              )}
            </button>
          )}
        </div>
      </header>

      {/* Scene Viewport */}
      <main className="relative flex h-[calc(100vh-56px)] w-full flex-1 overflow-hidden">
        {activeSceneId === 'hub' && (
          <div className="animate-fade-in flex flex-1 flex-col items-center justify-center p-6 text-center">
            <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10 shadow-2xl">
              <Heart className="h-9 w-9 fill-amber-300/20 text-amber-300" />
            </div>

            <span className="font-heading text-sm tracking-wide text-amber-300 uppercase">
              A private digital sanctuary
            </span>
            <h1 className="font-heading mt-2 text-3xl font-medium tracking-tight text-white sm:text-5xl">
              {space.title}
            </h1>
            <p className="mt-3 max-w-md font-sans text-sm text-stone-400 sm:text-base">
              Crafted with heartfelt love for{' '}
              <strong className="font-medium text-stone-100">
                {space.recipientName || 'Someone Special'}
              </strong>
              {data.senderName ? ` by ${data.senderName}` : ''}.
            </p>

            {data.dedicationMessage && (
              <div className="mt-8 max-w-lg rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-xl backdrop-blur-md">
                <p className="font-heading text-center text-base leading-relaxed text-stone-200 italic">
                  “{data.dedicationMessage}”
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={handleEnterSanctuary}
              className="mt-8 inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-amber-400/50 bg-amber-400/20 px-7 py-3 font-sans text-sm font-semibold text-amber-200 shadow-xl transition-all hover:scale-105 hover:bg-amber-400/30"
            >
              <span>Explore Sanctuary</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {presetTrack && (
              <button
                type="button"
                onClick={togglePlay}
                className="mt-4 inline-flex cursor-pointer items-center gap-1.5 font-sans text-xs text-amber-300/70 transition-colors hover:text-amber-200"
              >
                {isPlaying ? (
                  <Volume2 className="h-3 w-3" />
                ) : (
                  <VolumeX className="h-3 w-3" />
                )}
                <span>
                  {isPlaying
                    ? 'Ambient soundtrack active'
                    : 'Tap to enable ambient sound'}
                </span>
              </button>
            )}
          </div>
        )}

        {activeScene?.type === 'letters' && (
          <LettersScene
            scene={activeScene}
            templateId={templateId}
            isStudioPreview={false}
            onBackToHub={() => setActiveSceneId('hub')}
          />
        )}

        {activeScene?.type === 'free-canvas' && (
          <PublicStageCanvas
            templateId={templateId}
            items={activeScene.items || []}
          />
        )}
      </main>

      {/* Floating Bottom Scene Dock */}
      <PublicSceneDock
        scenes={scenes}
        activeSceneId={activeSceneId}
        onSelectScene={setActiveSceneId}
        hasHub={true}
      />
    </div>
  )
}
