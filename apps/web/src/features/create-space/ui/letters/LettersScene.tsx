import { useState } from 'react'
import { Compass } from 'lucide-react'
import type {
  LettersScene as LettersSceneType,
  LetterItem,
} from '@/features/create-space/model/scenes.types'
import type { SpaceTemplateId } from '@/entities/space'
import { THEME_REGISTRY } from '@/features/space-themes'
import { LetterEnvelope } from '@/features/create-space/ui/letters/LetterEnvelope'
import { AddLetterCard } from '@/features/create-space/ui/letters/AddLetterCard'
import { LetterReaderModal } from '@/features/create-space/ui/letters/LetterReaderModal'
import { useLettersContextMenu } from '@/features/create-space/ui/letters/useLettersContextMenu'
import { LettersContextMenu } from '@/features/create-space/ui/letters/LettersContextMenu'
import { useLettersDragReorder } from '@/features/create-space/ui/letters/useLettersDragReorder'
import { useStudioBehavior } from '@/features/create-space/ui/editor/useStudioBehavior'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface LettersSceneProps {
  scene: LettersSceneType
  templateId?: SpaceTemplateId
  isStudioPreview?: boolean
  selectedLetterId?: string | null
  openLetterId?: string | null
  onSelectLetter?: (letterId: string | null) => void
  onOpenLetter?: (letterId: string | null) => void
  onUpdateLetter?: (updatedLetter: LetterItem) => void
  onAddLetter?: () => void
  onDuplicateLetter?: (letterId: string) => void
  onDeleteLetter?: (letterId: string) => void
  onReorderLetters?: (fromIndex: number, toIndex: number) => void
  onUpdateScene?: (updates: { title?: string; subtitle?: string }) => void
  onBackToHub: () => void
  className?: string
}

export function LettersScene(props: LettersSceneProps) {
  const {
    scene,
    templateId = 'birthday',
    isStudioPreview = false,
    selectedLetterId,
    openLetterId,
    onSelectLetter,
    onOpenLetter,
    onUpdateLetter,
    onAddLetter,
    onDuplicateLetter,
    onDeleteLetter,
    onReorderLetters,
    onUpdateScene,
    onBackToHub,
    className,
  } = props
  const { isEditorMode } = useStudioBehavior()
  const isEffectiveEditor = isStudioPreview && isEditorMode

  const {
    draggedIndex,
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  } = useLettersDragReorder({ onReorderLetters, enabled: isEffectiveEditor })

  const [internalActiveLetter, setInternalActiveLetter] =
    useState<LetterItem | null>(null)
  const [internalSelectedLetterId, setInternalSelectedLetterId] = useState<
    string | null
  >(null)
  const currentSelectedLetterId =
    selectedLetterId !== undefined ? selectedLetterId : internalSelectedLetterId

  const activeReadingLetter =
    openLetterId !== undefined
      ? (scene.letters.find((l) => l.id === openLetterId) ?? null)
      : internalActiveLetter

  const activeTheme = THEME_REGISTRY[templateId] ?? THEME_REGISTRY.birthday
  const { state: menuState, openMenu, closeMenu } = useLettersContextMenu()

  const handleOpenLetterModal = (letter: LetterItem) => {
    onSelectLetter?.(letter.id)
    onOpenLetter?.(letter.id)
    setInternalActiveLetter(letter)
  }

  const handleEnvelopeClick = (letter: LetterItem) => {
    if (!isEffectiveEditor || currentSelectedLetterId === letter.id) {
      playSpatialSfx('paper-rustle')
      handleOpenLetterModal(letter)
      return
    }
    onSelectLetter?.(letter.id)
    setInternalSelectedLetterId(letter.id)
  }

  const handleCloseModal = () => {
    onOpenLetter?.(null)
    setInternalActiveLetter(null)
  }

  const handleUpdateCurrentLetter = (updated: LetterItem) => {
    setInternalActiveLetter(updated)
    onUpdateLetter?.(updated)
  }

  const contextMenuHandlers = {
    totalLetters: scene.letters.length,
    onOpenLetter: handleOpenLetterModal,
    onSelectLetter: (id: string) => onSelectLetter?.(id),
    onDuplicateLetter,
    onDeleteLetter,
    onAddLetter,
    onBackToHub: !isEffectiveEditor ? onBackToHub : undefined,
  }

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden select-none',
        className,
      )}
    >
      {/* Dynamic Ambient Theme Glow */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 -z-10 bg-radial opacity-25 blur-3xl transition-all duration-1000',
          activeTheme.ambientGlow,
        )}
        aria-hidden="true"
      />

      {/* Scrollable Desk Workspace Area */}
      <div
        onContextMenu={(e) =>
          isEffectiveEditor && openMenu(e, { type: 'desk' })
        }
        className="@container relative flex h-full w-full flex-col items-center justify-between overflow-y-auto px-4 py-8 pb-24 sm:px-6 sm:py-10 sm:pb-28 lg:px-12"
      >
        {/* Main Scene Body */}
        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center space-y-8 sm:space-y-12">
          {/* Editorial Scene Header */}
          <div className="flex w-full max-w-xl flex-col items-center space-y-2 px-4 text-center">
            {isEffectiveEditor ? (
              <>
                <input
                  type="text"
                  value={scene.title}
                  onChange={(e) => onUpdateScene?.({ title: e.target.value })}
                  placeholder="Scene Title..."
                  aria-label="Scene Title"
                  maxLength={50}
                  className="font-heading w-full rounded-xl border border-transparent bg-transparent py-1 text-center text-3xl font-medium tracking-tight text-[#FAF6F0] transition-all select-text hover:border-white/15 hover:bg-white/5 focus:border-amber-400/70 focus:bg-black/30 focus:ring-1 focus:ring-amber-400/40 focus:outline-none sm:text-4xl"
                />
                <input
                  type="text"
                  value={scene.subtitle}
                  onChange={(e) =>
                    onUpdateScene?.({ subtitle: e.target.value })
                  }
                  placeholder="Scene Subtitle..."
                  aria-label="Scene Subtitle"
                  maxLength={100}
                  className="w-full max-w-md rounded-lg border border-transparent bg-transparent px-2 py-0.5 text-center font-sans text-xs text-[#A99B90] transition-all select-text hover:border-white/15 hover:bg-white/5 focus:border-amber-400/70 focus:bg-black/30 focus:ring-1 focus:ring-amber-400/40 focus:outline-none sm:text-sm"
                />
              </>
            ) : (
              <>
                <h2 className="font-heading text-3xl font-medium tracking-tight text-[#FAF6F0] sm:text-4xl">
                  {scene.title}
                </h2>
                <p className="max-w-md font-sans text-xs text-[#A99B90] sm:text-sm">
                  {scene.subtitle}
                </p>
              </>
            )}
          </div>

          {/* Envelopes Desk Grid: Responsive with breathing room */}
          <div className="grid w-full grid-cols-1 justify-items-center gap-8 @2xl:grid-cols-2 @2xl:gap-12 @5xl:grid-cols-3 @5xl:gap-14">
            {scene.letters.map((letter, index) => (
              <LetterEnvelope
                key={letter.id}
                letter={letter}
                index={index}
                isDraggable={isEffectiveEditor}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                isDragging={draggedIndex === index}
                isDragOver={dragOverIndex === index}
                isSelected={currentSelectedLetterId === letter.id}
                onOpen={handleEnvelopeClick}
                onDoubleClick={handleOpenLetterModal}
                onContextMenu={(e) =>
                  isEffectiveEditor && openMenu(e, { type: 'envelope', letter })
                }
              />
            ))}

            {/* Add New Letter Card (Strictly in editor mode) */}
            {onAddLetter && isEffectiveEditor && (
              <AddLetterCard onAddLetter={onAddLetter} />
            )}
          </div>
        </div>

        {/* Bottom Floating Return Button (Visible strictly in user mode) */}
        {!isEffectiveEditor && (
          <div className="relative z-10 mt-10 pt-4">
            <button
              type="button"
              onClick={() => {
                playSpatialSfx('tactile-tap')
                onBackToHub()
              }}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-[#17120F]/90 px-5 py-2 font-sans text-xs font-medium text-stone-200 shadow-xl backdrop-blur-md transition-all hover:border-amber-400 hover:text-amber-200 hover:shadow-2xl"
            >
              <Compass className="h-4 w-4 text-amber-300" />
              <span>Explore Space Hub</span>
            </button>
          </div>
        )}
      </div>

      {/* Letter Reading & Writing View - Scoped strictly to this right space panel */}
      {activeReadingLetter && (
        <LetterReaderModal
          letter={activeReadingLetter}
          isOpen={Boolean(activeReadingLetter)}
          onClose={handleCloseModal}
          isStudioPreview={isEffectiveEditor}
          onUpdateLetter={handleUpdateCurrentLetter}
        />
      )}

      {/* Context Menu for Letters Area */}
      <LettersContextMenu
        isOpen={menuState.isOpen}
        x={menuState.x}
        y={menuState.y}
        target={menuState.target}
        handlers={contextMenuHandlers}
        onClose={closeMenu}
      />
    </div>
  )
}
