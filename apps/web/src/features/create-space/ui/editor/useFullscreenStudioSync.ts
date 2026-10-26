import { useNavigate } from 'react-router'
import type { SpaceTemplateId } from '@/entities/space'
import type {
  SpaceMeta,
  SpaceScene,
} from '@/features/create-space/model/scenes.types'
import type { SpaceProtectionConfig } from '@/features/space-lock'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { countTotalArtifacts } from '@/features/create-space/lib/space-tier-limits'
import { useShareCardCustomizer } from '@/features/create-space/ui/share/useShareCardCustomizer'
import { useStudioSave } from '@/features/create-space/ui/editor/useStudioSave'
import { usePublishSanctuary } from '@/features/create-space/ui/editor/usePublishSanctuary'
import { useSanctuarySyncState } from '@/features/create-space/ui/editor/useSanctuarySyncState'
import { getCanonicalPublicUrl } from '@/features/create-space/lib/url-shortener'
import { generateSpaceSlug } from '@/entities/space/api/space-converters'
import { ROUTES } from '@/shared/config'

export interface UseFullscreenStudioSyncOptions {
  spaceId?: string
  templateId: SpaceTemplateId
  spaceMeta: SpaceMeta
  protectionConfig: SpaceProtectionConfig
  resolvedScenes: SpaceScene[]
  scenesCount: number
  items: SpatialItem[]
  activeSceneId: string
  pendingPhotos: Map<string, File>
  accentColor: string
  themeTitle: string
  onUpdateSpaceMeta: (meta: Partial<SpaceMeta>) => void
  onPhotosUploaded: (uploadedPhotos: Map<string, string>) => void
}

export function useFullscreenStudioSync({
  spaceId,
  templateId,
  spaceMeta,
  protectionConfig,
  resolvedScenes,
  scenesCount,
  items,
  activeSceneId,
  pendingPhotos,
  accentColor,
  themeTitle,
  onUpdateSpaceMeta,
  onPhotosUploaded,
}: UseFullscreenStudioSyncOptions) {
  const navigate = useNavigate()
  const isPublished = spaceMeta.status === 'published'

  const syncState = useSanctuarySyncState({
    spaceId,
    isPublished,
    spaceMeta,
    scenes: resolvedScenes,
    protectionConfig,
  })

  const publishState = usePublishSanctuary({
    spaceId,
    templateId,
    spaceMeta,
    scenes: resolvedScenes,
    protectionConfig,
    pendingPhotos,
    onPhotosUploaded,
    onPublishSuccess: () => {
      onUpdateSpaceMeta({ status: 'published' })
      syncState.markAsPublished()
    },
  })

  const shareUrl = spaceId
    ? getCanonicalPublicUrl(
        generateSpaceSlug(spaceMeta.title, spaceMeta.recipientName, spaceId),
      )
    : `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.STUDIO}?template=${encodeURIComponent(templateId)}`

  const shareCustomizer = useShareCardCustomizer(accentColor)

  const studioSave = useStudioSave({
    spaceId,
    templateId,
    spaceMeta,
    protectionConfig,
    scenes: resolvedScenes,
    scenesCount,
    artifactsCount: countTotalArtifacts(resolvedScenes, items, activeSceneId),
    fallbackTitle: `${themeTitle} Space`,
    pendingPhotos,
    onPhotosUploaded,
  })

  const handleBackToDashboard = async () => {
    if (studioSave.isDirty) await studioSave.flushSave()
    navigate(ROUTES.DASHBOARD)
  }

  return {
    isPublished,
    syncState,
    publishState,
    shareUrl,
    shareCustomizer,
    handleBackToDashboard,
    studioSave,
  }
}
