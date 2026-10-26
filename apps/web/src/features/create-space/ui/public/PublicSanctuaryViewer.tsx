import { useState, useEffect, useMemo } from 'react'
import { VolumeX, Gift } from 'lucide-react'
import type { SpaceWithScenes, SpaceTemplateId } from '@/entities/space'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import { getPresetTrackForTemplate } from '@/entities/audio'
import { THEME_REGISTRY } from '@/features/space-themes'
import { LettersScene } from '@/features/create-space/ui/letters/LettersScene'
import { SpaceHubScene } from '@/features/create-space/ui/hub/SpaceHubScene'
import { PublicStageCanvas } from '@/features/create-space/ui/public/PublicStageCanvas'
import { PublicSceneDock } from '@/features/create-space/ui/public/PublicSceneDock'
import {
  SanctuaryUnboxingCeremony,
  hasSanctuaryBeenUnboxed,
} from '@/features/create-space/ui/public/unboxing'
import { SceneTeaserModal } from '@/features/create-space/ui/public/SceneTeaserModal'
import { isSceneTimeLocked } from '@/features/create-space/lib/scene-schedule-utils'
import { useSpatialAudioPlayer, cn, playSpatialSfx } from '@/shared/lib'

export interface PublicSanctuaryViewerProps {
  data: SpaceWithScenes
}

export function PublicSanctuaryViewer({ data }: PublicSanctuaryViewerProps) {
  const { space, scenes } = data
  const templateId = (space.templateId || 'birthday') as SpaceTemplateId
  const activeTheme = THEME_REGISTRY[templateId] ?? THEME_REGISTRY.birthday

  const [activeSceneId, setActiveSceneId] = useState<string>('hub')
  const [openLetterId, setOpenLetterId] = useState<string | null>(null)
  const [hasSeenWelcome, setHasSeenWelcome] = useState<boolean>(() =>
    hasSanctuaryBeenUnboxed(space.id),
  )
  const [teaserScene, setTeaserScene] = useState<SpaceScene | null>(null)

  const presetTrack = getPresetTrackForTemplate(templateId)
  const { isPlaying, togglePlay } = useSpatialAudioPlayer({
    trackUrl: presetTrack?.url || '',
    loop: true,
  })

  // Filter out empty scenes so the recipient only experiences populated memories
  const visibleScenes = useMemo(() => {
    const populated = scenes.filter((scene) => {
      if (scene.type === 'free-canvas') {
        return Boolean(scene.items && scene.items.length > 0)
      }
      if (scene.type === 'letters') {
        return Boolean(scene.letters && scene.letters.length > 0)
      }
      return true
    })
    return populated.length > 0 ? populated : scenes
  }, [scenes])

  const handleSelectScene = (sceneId: string) => {
    setOpenLetterId(null)
    if (sceneId === 'hub') {
      setActiveSceneId('hub')
      return
    }
    const target = visibleScenes.find((s) => s.id === sceneId)
    if (target && isSceneTimeLocked(target)) {
      setTeaserScene(target)
      return
    }
    setActiveSceneId(sceneId)
  }

  const handleEnterSanctuary = () => {
    setHasSeenWelcome(true)
    setActiveSceneId('hub')
  }

  // Dynamic Document Title
  useEffect(() => {
    if (space?.title) {
      document.title = `${space.title} • Space For You`
    }
    return () => {
      document.title = 'Space For You'
    }
  }, [space?.title])

  const activeScene = visibleScenes.find((s) => s.id === activeSceneId) as
    SpaceScene | undefined

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

        <div className="flex items-center gap-2 sm:gap-3">
          {hasSeenWelcome && (
            <button
              type="button"
              onClick={() => {
                playSpatialSfx('tactile-tap')
                setHasSeenWelcome(false)
              }}
              title="Replay welcome intro"
              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-stone-400 transition-colors hover:border-white/20 hover:text-white"
            >
              <Gift className="h-3.5 w-3.5 text-amber-300/80" />
              <span className="hidden font-sans text-xs sm:inline">
                Replay Intro
              </span>
            </button>
          )}

          {presetTrack && (
            <button
              type="button"
              onClick={() => {
                playSpatialSfx('tactile-tap')
                togglePlay()
              }}
              title={
                isPlaying ? 'Mute background music' : 'Play background music'
              }
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
                  <span className="hidden sm:inline">Music</span>
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
        {!hasSeenWelcome ? (
          <SanctuaryUnboxingCeremony
            spaceId={space.id}
            spaceTitle={space.title}
            recipientName={space.recipientName}
            senderName={data.senderName}
            dedicationMessage={data.dedicationMessage}
            templateId={templateId}
            accentColor={activeTheme.accentColor}
            ambientGlow={activeTheme.ambientGlow}
            isPlayingAudio={isPlaying}
            hasAudioTrack={Boolean(presetTrack)}
            onToggleAudio={togglePlay}
            onComplete={handleEnterSanctuary}
          />
        ) : (
          <>
            {activeSceneId === 'hub' && (
              <SpaceHubScene
                templateId={templateId}
                meta={{
                  title: space.title,
                  recipientName: space.recipientName,
                  senderName: data.senderName || '',
                  dedicationMessage: data.dedicationMessage || '',
                }}
                scenes={visibleScenes}
                isStudioPreview={false}
                onOpenScene={handleSelectScene}
                onOpenAddScene={() => {}}
              />
            )}

            {activeScene &&
              !isSceneTimeLocked(activeScene) &&
              activeScene.type === 'letters' && (
                <LettersScene
                  scene={activeScene}
                  templateId={templateId}
                  isStudioPreview={false}
                  openLetterId={openLetterId}
                  onOpenLetter={setOpenLetterId}
                  onBackToHub={() => setActiveSceneId('hub')}
                />
              )}

            {activeScene &&
              !isSceneTimeLocked(activeScene) &&
              activeScene.type === 'free-canvas' && (
                <PublicStageCanvas
                  templateId={templateId}
                  items={activeScene.items || []}
                />
              )}
          </>
        )}
      </main>

      {/* Floating Bottom Scene Dock (rendered only after entering and when no letter is open) */}
      {hasSeenWelcome && !openLetterId && (
        <PublicSceneDock
          scenes={visibleScenes}
          activeSceneId={activeSceneId}
          onSelectScene={handleSelectScene}
          hasHub={true}
          accentColor={activeTheme.accentColor}
        />
      )}

      {/* Recipient Scene Teaser Modal */}
      {teaserScene && (
        <SceneTeaserModal
          isOpen={true}
          scene={teaserScene}
          onClose={() => setTeaserScene(null)}
        />
      )}
    </div>
  )
}
