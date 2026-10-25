export type {
  AppwriteSpaceDocument,
  AppwriteSceneDocument,
  SpaceWithScenes,
} from './types'

export {
  toUserSpace,
  toSpaceScene,
  generateSpaceSlug,
} from './space-converters'

export {
  fetchUserSpaces,
  fetchSpaceById,
  fetchSpaceBySlug,
  saveSpaceToDatabase,
  deleteSpaceFromDatabase,
} from './space-database'
export type { SaveSpaceParams } from './space-database'

export { unlockSpaceViaFunction } from './space-database-unlock'
export type {
  UnlockSpaceParams,
  UnlockSpaceResult,
} from './space-database-unlock'
