export { SPACE_TEMPLATES, DEFAULT_TEMPLATE_ID } from './model/templates'
export {
  getSavedSpaces,
  getSpaceById,
  saveSpace,
  deleteSpace,
  duplicateSpace,
  createNewSpace,
  SPACES_STORAGE_KEY,
  SPACES_CHANGED_EVENT,
} from './model/spaces-storage'
export {
  mergeSpaces,
  resolveSpaceDisplayStatus,
  type SpaceDisplayStatus,
} from './model/space-sync-engine'
export { getLocalSpaceWithScenes } from './model/local-space-resolver'
export { useUserSpaces } from './model/useUserSpaces'
export type { UseUserSpacesReturn } from './model/useUserSpaces'
export { SpaceCard } from './ui/SpaceCard'
export { SpaceStatusBadge } from './ui/SpaceStatusBadge'
export type { SpaceCardProps } from './ui/SpaceCard'
export type {
  SpaceTemplate,
  SpaceTemplateId,
  SpaceDraft,
  UserSpace,
  CreationStep,
} from './model/types'
export {
  fetchUserSpaces,
  fetchSpaceById,
  fetchSpaceBySlug,
  saveSpaceToDatabase,
  deleteSpaceFromDatabase,
  unlockSpaceViaFunction,
  toUserSpace,
  toSpaceScene,
  generateSpaceSlug,
} from './api'
export type {
  SpaceWithScenes,
  SaveSpaceParams,
  UnlockSpaceParams,
  UnlockSpaceResult,
} from './api'
