import { useCallback, useMemo } from 'react'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import type {
  SpatialItem,
  SpatialItemType,
  SpatialItemData,
} from '@/features/create-space/model/spatial-stage.types'
import type { useSpatialStageItems } from './useSpatialStageItems'
import type { UseMultiSceneStateReturn } from './useMultiSceneState'
import { useStageKeyboardShortcuts } from './useStageKeyboardShortcuts'
import {
  validateItemAddition,
  validateSceneAddition,
  type ConfirmAlertFn,
} from '@/features/create-space/lib/space-tier-limits'

interface UseEditorStageWorkflowOptions {
  multiScene: UseMultiSceneStateReturn
  stage: ReturnType<typeof useSpatialStageItems>
  confirm: ConfirmAlertFn
  setIsAddSceneModalOpen: (open: boolean) => void
  selectedItem?: SpatialItem | null
  showSidebar?: boolean
  onOpenSidebar?: () => void
}

export function useEditorStageWorkflow({
  multiScene,
  stage,
  confirm,
  setIsAddSceneModalOpen,
  selectedItem,
  showSidebar,
  onOpenSidebar,
}: UseEditorStageWorkflowOptions) {
  const {
    scenes,
    setScenes,
    activeSceneId,
    setActiveSceneId,
    handleAddScene,
    handleDuplicateScene,
  } = multiScene
  const { items, setItems, setSelectedId, copiedItem } = stage

  const activeScene = scenes.find((s) => s.id === activeSceneId)

  // Commit current items to active scene and switch smoothly to target scene
  const handleOpenScene = useCallback(
    (targetSceneId: string) => {
      if (targetSceneId === activeSceneId) return

      if (activeScene?.type === 'free-canvas') {
        setScenes((prev) =>
          prev.map((s) =>
            s.id === activeSceneId && s.type === 'free-canvas'
              ? { ...s, items }
              : s,
          ),
        )
      }

      const target = scenes.find((s) => s.id === targetSceneId)
      if (target && target.type === 'free-canvas') {
        setItems(target.items || [])
        setSelectedId(null)
      }

      setActiveSceneId(targetSceneId)
    },
    [
      activeScene,
      activeSceneId,
      items,
      scenes,
      setActiveSceneId,
      setItems,
      setSelectedId,
      setScenes,
    ],
  )

  const handleOpenAddScene = useCallback(() => {
    if (!validateSceneAddition(scenes.length, confirm)) return
    setIsAddSceneModalOpen(true)
  }, [scenes.length, confirm, setIsAddSceneModalOpen])

  const handleGuardedAddScene = useCallback(
    (newScene: SpaceScene) => {
      if (!validateSceneAddition(scenes.length, confirm)) return

      if (activeScene?.type === 'free-canvas') {
        setScenes((prev) =>
          prev.map((s) =>
            s.id === activeSceneId && s.type === 'free-canvas'
              ? { ...s, items }
              : s,
          ),
        )
      }

      handleAddScene(newScene)

      if (newScene.type === 'free-canvas' && activeSceneId !== 'hub') {
        setItems(newScene.items || [])
        setSelectedId(null)
      }
    },
    [
      scenes.length,
      activeScene,
      activeSceneId,
      items,
      setScenes,
      handleAddScene,
      setItems,
      setSelectedId,
      confirm,
    ],
  )

  const handleGuardedDuplicateScene = useCallback(
    (sceneId: string) => {
      if (!validateSceneAddition(scenes.length, confirm, true)) return
      handleDuplicateScene(sceneId)
    },
    [scenes.length, handleDuplicateScene, confirm],
  )

  const handleGuardedAddItem = useCallback(
    (
      type: SpatialItemType,
      dropX?: number,
      dropY?: number,
      customData?: Partial<SpatialItemData>,
    ) => {
      if (!validateItemAddition(type, scenes, items, activeSceneId, confirm))
        return
      stage.handleAddItem(type, dropX, dropY, customData)
    },
    [scenes, items, activeSceneId, stage, confirm],
  )

  const handleGuardedDuplicateItem = useCallback(
    (id: string) => {
      const target = items.find((it) => it.id === id)
      if (
        target &&
        !validateItemAddition(
          target.type,
          scenes,
          items,
          activeSceneId,
          confirm,
        )
      ) {
        return
      }
      stage.handleDuplicateItem(id)
    },
    [scenes, items, activeSceneId, stage, confirm],
  )

  const handleGuardedPasteItem = useCallback(
    (x?: number, y?: number) => {
      if (!copiedItem) return
      if (
        !validateItemAddition(
          copiedItem.type,
          scenes,
          items,
          activeSceneId,
          confirm,
        )
      ) {
        return
      }
      stage.handlePasteItem(x, y)
    },
    [copiedItem, scenes, items, activeSceneId, stage, confirm],
  )

  const isFreeCanvas = activeScene?.type === 'free-canvas'

  useStageKeyboardShortcuts({
    selectedItem: selectedItem ?? null,
    copiedItem,
    canUndo: isFreeCanvas && stage.canUndo,
    canRedo: isFreeCanvas && stage.canRedo,
    onUndo: stage.handleUndo,
    onRedo: stage.handleRedo,
    onCopyItem: stage.handleCopyItem,
    onPasteItem: handleGuardedPasteItem,
    onDuplicateItem: handleGuardedDuplicateItem,
    onDeleteItem: stage.handleDeleteItem,
    onBringToFront: stage.handleBringToFront,
    onSendToBack: stage.handleSendToBack,
    onResetRotation: stage.handleResetRotation,
    showSidebar,
    onOpenSidebar,
  })

  const resolvedScenes = useMemo(() => {
    const primaryCanvasId = scenes.find((s) => s.type === 'free-canvas')?.id
    const targetCanvasId =
      activeScene?.type === 'free-canvas' ? activeSceneId : primaryCanvasId
    return scenes.map((s) =>
      s.id === targetCanvasId && s.type === 'free-canvas' ? { ...s, items } : s,
    )
  }, [scenes, activeScene, activeSceneId, items])

  return {
    activeScene,
    resolvedScenes,
    handleOpenScene,
    handleOpenAddScene,
    handleGuardedAddScene,
    handleGuardedDuplicateScene,
    handleGuardedAddItem,
    handleGuardedDuplicateItem,
    handleGuardedPasteItem,
  }
}
