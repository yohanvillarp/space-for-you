import { useEffect, useRef } from 'react'
import type { SpaceTemplateId } from '@/entities/space'
import { fetchSpaceById, saveSpace } from '@/entities/space'
import type {
  SpaceMeta,
  SpaceScene,
  FreeCanvasScene,
} from '@/features/create-space/model/scenes.types'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import {
  DEFAULT_PROTECTION_CONFIG,
  type SpaceProtectionConfig,
} from '@/features/space-lock'
import {
  getSpaceStorageKeys,
  saveToStorage,
} from '@/features/create-space/ui/editor/multi-scene-storage'

export interface UseRemoteStudioHydrationOptions {
  spaceId?: string
  templateId: SpaceTemplateId
  setScenes: React.Dispatch<React.SetStateAction<SpaceScene[]>>
  setItems: (
    next: SpatialItem[] | ((prev: SpatialItem[]) => SpatialItem[]),
  ) => void
  setSpaceMeta: React.Dispatch<React.SetStateAction<SpaceMeta>>
  setProtectionConfig: React.Dispatch<
    React.SetStateAction<SpaceProtectionConfig>
  >
}

/**
 * Hydrates studio scenes, canvas items, metadata, and lock settings from
 * Appwrite Cloud when opening a space on a secondary device or fresh session.
 */
export function useRemoteStudioHydration({
  spaceId,
  templateId,
  setScenes,
  setItems,
  setSpaceMeta,
  setProtectionConfig,
}: UseRemoteStudioHydrationOptions): void {
  const hydratedSpaceIdRef = useRef<string | null>(null)
  const hadLocalScenesOnMountRef = useRef<boolean>(
    typeof window !== 'undefined' && spaceId
      ? localStorage.getItem(
          getSpaceStorageKeys(spaceId, templateId).scenesKey,
        ) !== null
      : false,
  )

  useEffect(() => {
    if (!spaceId || hydratedSpaceIdRef.current === spaceId) return
    hydratedSpaceIdRef.current = spaceId

    let isMounted = true
    const keys = getSpaceStorageKeys(spaceId, templateId)

    fetchSpaceById(spaceId)
      .then((remote) => {
        if (!isMounted || !remote) return

        if (remote.scenes.length > 0 || !hadLocalScenesOnMountRef.current) {
          if (remote.scenes.length > 0) {
            saveToStorage(keys.scenesKey, remote.scenes)
            setScenes(remote.scenes)

            const canvasScene = remote.scenes.find(
              (s): s is FreeCanvasScene => s.type === 'free-canvas',
            )
            if (canvasScene && Array.isArray(canvasScene.items)) {
              setItems(canvasScene.items)
            }
          }

          setSpaceMeta((prev) => {
            const nextMeta: SpaceMeta = {
              ...prev,
              title: remote.space.title || prev.title,
              recipientName: remote.space.recipientName || prev.recipientName,
              senderName: remote.senderName ?? prev.senderName ?? '',
              dedicationMessage:
                remote.dedicationMessage ?? prev.dedicationMessage ?? '',
              status:
                remote.space.status === 'published' ? 'published' : 'draft',
            }
            saveToStorage(keys.metaKey, nextMeta)
            return nextMeta
          })

          let parsedTheme: Partial<SpaceProtectionConfig> = {}
          try {
            if (remote.protectionTheme) {
              parsedTheme = JSON.parse(remote.protectionTheme)
            }
          } catch {
            parsedTheme = {}
          }

          setProtectionConfig((prev) => {
            const nextProtection: SpaceProtectionConfig = {
              ...DEFAULT_PROTECTION_CONFIG,
              ...prev,
              ...parsedTheme,
              enabled: Boolean(remote.space.isProtected),
              passcodeHash: remote.passcodeHash ?? prev.passcodeHash,
              passcodeSalt: remote.passcodeSalt ?? prev.passcodeSalt,
              hint: remote.passcodeHint ?? prev.hint,
            }
            saveToStorage(keys.protectionKey, nextProtection)
            return nextProtection
          })

          saveSpace(remote.space)
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [
    spaceId,
    templateId,
    setScenes,
    setItems,
    setSpaceMeta,
    setProtectionConfig,
  ])
}
