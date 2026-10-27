import type { SpaceMeta } from '@/features/create-space/model/scenes.types'
import type { UseMultiSceneStateReturn } from './useMultiSceneState'
import type { useSpatialStageItems } from './useSpatialStageItems'

import type {
  SpatialItemType,
  SpatialItemData,
} from '@/features/create-space/model/spatial-stage.types'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import {
  MAX_SPACE_PHOTOS,
  countTotalPhotos,
  type ConfirmAlertFn,
} from '@/features/create-space/lib/space-tier-limits'

interface UseFullscreenEditorHandlersOptions {
  multiScene: UseMultiSceneStateReturn
  stage: ReturnType<typeof useSpatialStageItems>
  confirm?: ConfirmAlertFn
  onAddItem?: (
    type: SpatialItemType,
    x?: number,
    y?: number,
    data?: Partial<SpatialItemData>,
  ) => void
  onDuplicateItem?: (id: string) => void
  onPasteItem?: (x?: number, y?: number) => void
  onAddScene?: (newScene: SpaceScene) => void
  onDuplicateScene?: (sceneId: string) => void
}

export function useFullscreenEditorHandlers({
  multiScene,
  stage,
  confirm,
  onAddItem,
  onDuplicateItem,
  onPasteItem,
  onAddScene,
  onDuplicateScene,
}: UseFullscreenEditorHandlersOptions) {
  const {
    setSelectedLetterId,
    setOpenLetterId,
    handleAddLetter,
    handleUpdateLetter,
    handleDeleteLetter,
    handleAddScene,
    handleRenameScene,
    handleUpdateScene,
    handleDuplicateScene,
    handleMoveScene,
    handleDeleteScene,
    setSpaceMeta,
  } = multiScene

  const handleAssignLetterPhoto = (
    letterId: string,
    url: string,
    file?: File,
  ) => {
    const targetScene = multiScene.scenes.find((s) => s.type === 'letters')
    if (targetScene && targetScene.type === 'letters') {
      const letter = targetScene.letters.find((l) => l.id === letterId)
      if (
        !letter?.imageUrl &&
        countTotalPhotos(
          multiScene.scenes,
          stage.items,
          multiScene.activeSceneId,
        ) >= MAX_SPACE_PHOTOS
      ) {
        confirm?.({
          title: 'Photo Memories Limit',
          description: `Each space can feature up to ${MAX_SPACE_PHOTOS} personal photographs. You can replace an existing photo anytime.`,
          confirmText: 'Understood',
          type: 'info',
          showCancel: false,
        })
        return
      }
      if (letter) handleUpdateLetter({ ...letter, imageUrl: url })
    }
    if (file) stage.setPendingPhoto(letterId, file)
  }

  const handlePhotosUploaded = (uploadedUrls: Map<string, string>) => {
    stage.setItems((prev) =>
      prev.map((it) =>
        uploadedUrls.has(it.id)
          ? { ...it, data: { ...it.data, photoUrl: uploadedUrls.get(it.id) } }
          : it,
      ),
    )
    multiScene.setScenes((prev) =>
      prev.map((sc) => {
        if (sc.type === 'free-canvas') {
          return {
            ...sc,
            items: sc.items.map((it) =>
              uploadedUrls.has(it.id)
                ? {
                    ...it,
                    data: { ...it.data, photoUrl: uploadedUrls.get(it.id)! },
                  }
                : it,
            ),
          }
        }
        if (sc.type === 'letters') {
          return {
            ...sc,
            letters: sc.letters.map((letItem) =>
              uploadedUrls.has(letItem.id)
                ? { ...letItem, imageUrl: uploadedUrls.get(letItem.id)! }
                : letItem,
            ),
          }
        }
        return sc
      }),
    )
    stage.clearPendingPhotos()
  }

  const letterHandlers = {
    selectedLetterId: multiScene.selectedLetterId,
    openLetterId: multiScene.openLetterId,
    onSelectLetter: setSelectedLetterId,
    onOpenLetter: setOpenLetterId,
    onAddLetter: handleAddLetter,
    onUpdateLetter: handleUpdateLetter,
    onDeleteLetter: handleDeleteLetter,
    onAssignLetterPhoto: handleAssignLetterPhoto,
  }

  const sceneCrudHandlers = {
    onAddScene: onAddScene || handleAddScene,
    onRenameScene: handleRenameScene,
    onUpdateScene: handleUpdateScene,
    onDuplicateScene: onDuplicateScene || handleDuplicateScene,
    onMoveScene: handleMoveScene,
    onDeleteScene: handleDeleteScene,
  }

  const stageItemHandlers = {
    onUpdateItemPosition: stage.handleUpdatePosition,
    onStartDragItem: stage.handleStartDragItem,
    onCommitItemPosition: stage.handleCommitItemPosition,
    onRotateItem: stage.handleRotateItem,
    onSetRotation: stage.handleSetItemRotation,
    onResetRotation: stage.handleResetRotation,
    onBringToFront: stage.handleBringToFront,
    onSendToBack: stage.handleSendToBack,
    onDeleteItem: stage.handleDeleteItem,
    onDuplicateItem: onDuplicateItem || stage.handleDuplicateItem,
    onToggleLock: stage.handleToggleLock,
    onCopyItem: stage.handleCopyItem,
    onPasteItem: onPasteItem || stage.handlePasteItem,
    onClearCanvas: stage.handleClearCanvas,
    onUpdateItemData: stage.handleUpdateItemData,
    onAddItem: onAddItem || stage.handleAddItem,
  }

  const handleUpdateSpaceMeta = (u: Partial<SpaceMeta>) =>
    setSpaceMeta((p) => ({ ...p, ...u }))

  return {
    letterHandlers,
    sceneCrudHandlers,
    stageItemHandlers,
    handleUpdateSpaceMeta,
    handlePhotosUploaded,
  }
}
