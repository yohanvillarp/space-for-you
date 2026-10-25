import type { SpaceTemplateId, UserSpace } from '@/entities/space'
import type {
  SpaceMeta,
  SpaceScene,
} from '@/features/create-space/model/scenes.types'
import type { SpaceProtectionConfig } from '@/features/space-lock'

export interface UseStudioSaveOptions {
  spaceId?: string
  templateId: SpaceTemplateId
  spaceMeta: SpaceMeta
  protectionConfig?: SpaceProtectionConfig
  scenes?: SpaceScene[]
  scenesCount: number
  artifactsCount: number
  fallbackTitle: string
  pendingPhotos?: Map<string, File>
  onPhotosUploaded?: (uploadedMap: Map<string, string>) => void
}

export interface UseStudioSaveReturn {
  isSaving: boolean
  isSaved: boolean
  isDirty: boolean
  handleSave: () => UserSpace
  flushSave: () => Promise<UserSpace>
}
