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
export { useUserSpaces } from './model/useUserSpaces'
export type { UseUserSpacesReturn } from './model/useUserSpaces'
export { SpaceCard } from './ui/SpaceCard'
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
  toUserSpace,
  toSpaceScene,
  generateSpaceSlug,
} from './api'
export type { SpaceWithScenes, SaveSpaceParams } from './api'
