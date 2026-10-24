import { useState, useEffect } from 'react'
import { X, Sparkles, Mail, Check } from 'lucide-react'
import type {
  SceneType,
  SpaceScene,
} from '@/features/create-space/model/scenes.types'
import { INITIAL_LETTERS_DATA } from '@/features/create-space/model/scenes.types'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface AddSceneModalProps {
  isOpen: boolean
  onClose: () => void
  onAddScene: (newScene: SpaceScene) => void
  existingScenesCount: number
}

export function AddSceneModal({
  isOpen,
  onClose,
  onAddScene,
  existingScenesCount,
}: AddSceneModalProps) {
  const [selectedType, setSelectedType] = useState<SceneType>('free-canvas')
  const [sceneTitle, setSceneTitle] = useState('Memory Canvas')
  const [sceneSubtitle, setSceneSubtitle] = useState(
    'An open stage for cherished keepsakes',
  )

  const handleSelectType = (type: SceneType) => {
    playSpatialSfx('tactile-tap')
    setSelectedType(type)
    if (type === 'free-canvas') {
      setSceneTitle('Memory Canvas')
      setSceneSubtitle('An open stage for cherished keepsakes')
    } else {
      setSceneTitle('Heartfelt Letters')
      setSceneSubtitle('Read what I wrote for you')
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleCreate = () => {
    playSpatialSfx('tactile-tap')
    const id = `scene-${Date.now()}`
    const order = existingScenesCount + 1

    if (selectedType === 'letters') {
      const newLettersScene: SpaceScene = {
        id,
        type: 'letters',
        title: sceneTitle.trim() || 'Letters',
        subtitle: sceneSubtitle.trim() || 'Personal envelopes for you',
        icon: 'Mail',
        order,
        letters: [...INITIAL_LETTERS_DATA],
      }
      onAddScene(newLettersScene)
    } else {
      const newCanvasScene: SpaceScene = {
        id,
        type: 'free-canvas',
        title: sceneTitle.trim() || 'Memory Canvas',
        subtitle: sceneSubtitle.trim() || 'Interactive stage',
        icon: 'Sparkles',
        order,
        items: [],
      }
      onAddScene(newCanvasScene)
    }
    onClose()
  }

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-lg space-y-6 rounded-2xl border border-white/15 bg-[#1C1613] p-6 text-[#FAF6F0] shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#3B302A] pb-3">
          <div>
            <h2 className="font-heading text-lg font-semibold text-amber-100">
              Add New Scene to Space
            </h2>
            <p className="font-sans text-xs text-[#A99B90]">
              Choose the type of experience to craft for this chapter
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="cursor-pointer rounded-lg p-1 text-stone-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scene Type Cards Selection (Exclusively Free Canvas or Letters) */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Option 1: Free-form Canvas */}
          <button
            type="button"
            onClick={() => handleSelectType('free-canvas')}
            className={cn(
              'relative flex cursor-pointer flex-col rounded-xl border p-4 text-left transition-all',
              selectedType === 'free-canvas'
                ? 'border-amber-400 bg-amber-500/15 shadow-md ring-1 ring-amber-400/50'
                : 'border-[#3B302A] bg-[#221B17] hover:border-white/20 hover:bg-[#28201B]',
            )}
          >
            {selectedType === 'free-canvas' && (
              <span className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-black">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </span>
            )}
            <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-sm font-semibold text-white">
              Free-form Canvas
            </h3>
            <p className="mt-1 line-clamp-3 font-sans text-xs text-[#A99B90]">
              Spatial 2D desk with stickers, photos, and audio keepsakes.
            </p>
          </button>

          {/* Option 2: Letters Hub */}
          <button
            type="button"
            onClick={() => handleSelectType('letters')}
            className={cn(
              'relative flex cursor-pointer flex-col rounded-xl border p-4 text-left transition-all',
              selectedType === 'letters'
                ? 'border-amber-400 bg-amber-500/15 shadow-md ring-1 ring-amber-400/50'
                : 'border-[#3B302A] bg-[#221B17] hover:border-white/20 hover:bg-[#28201B]',
            )}
          >
            {selectedType === 'letters' && (
              <span className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-black">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </span>
            )}
            <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-sm font-semibold text-white">
              Letters & Envelopes
            </h3>
            <p className="mt-1 line-clamp-3 font-sans text-xs text-[#A99B90]">
              Collection of sealed envelopes with intimate personal letters.
            </p>
          </button>
        </div>

        {/* Scene Title & Subtitle Inputs */}
        <div className="space-y-3 pt-1">
          <div className="space-y-1">
            <label className="font-sans text-xs font-medium text-amber-200">
              Scene Title
            </label>
            <input
              type="text"
              value={sceneTitle}
              onChange={(e) => setSceneTitle(e.target.value)}
              placeholder="e.g. Memory Canvas or Letters for You"
              className="w-full rounded-lg border border-[#3B302A] bg-[#120E0C] px-3 py-2 font-sans text-xs text-white focus:border-amber-400 focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="font-sans text-xs font-medium text-amber-200">
              Scene Subtitle
            </label>
            <input
              type="text"
              value={sceneSubtitle}
              onChange={(e) => setSceneSubtitle(e.target.value)}
              placeholder="e.g. Read what I wrote for you"
              className="w-full rounded-lg border border-[#3B302A] bg-[#120E0C] px-3 py-2 font-sans text-xs text-white focus:border-amber-400 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 border-t border-[#3B302A] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg px-4 py-2 font-sans text-xs font-medium text-stone-300 transition-colors hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreate}
            className="cursor-pointer rounded-lg bg-amber-500 px-4 py-2 font-sans text-xs font-semibold text-black shadow-md transition-all hover:bg-amber-400"
          >
            Create Scene
          </button>
        </div>
      </div>
    </div>
  )
}
