import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import type {
  SpatialItem,
  SpatialItemType,
} from '@/features/create-space/model/spatial-stage.types'

export const MAX_USER_SPACES = 3
export const MAX_SPACE_SCENES = 5
export const MAX_SPACE_ARTIFACTS = 15
export const MAX_SPACE_PHOTOS = 3
export const MAX_SPACE_MUSIC = 1
export const MAX_SPACE_VOICE_NOTES = 3

export function isMusicItemType(type: SpatialItemType): boolean {
  return (
    type === 'music-box' || type === 'vinyl-player' || type === 'vintage-radio'
  )
}

export function isVoiceNoteItemType(type: SpatialItemType): boolean {
  return type === 'cassette-tape'
}

export function countTotalArtifacts(
  scenes: SpaceScene[],
  activeItems: SpatialItem[],
  activeSceneId: string,
): number {
  let total = activeItems.length
  for (const s of scenes) {
    if (s.id !== activeSceneId && s.type === 'free-canvas') {
      total += s.items?.length || 0
    }
  }
  return total
}

export function countTotalMusicItems(
  scenes: SpaceScene[],
  activeItems: SpatialItem[],
  activeSceneId: string,
): number {
  let count = activeItems.filter((it) => isMusicItemType(it.type)).length
  for (const s of scenes) {
    if (s.id !== activeSceneId && s.type === 'free-canvas') {
      count += (s.items || []).filter((it) => isMusicItemType(it.type)).length
    }
  }
  return count
}

export function countTotalVoiceNoteItems(
  scenes: SpaceScene[],
  activeItems: SpatialItem[],
  activeSceneId: string,
): number {
  let count = activeItems.filter((it) => isVoiceNoteItemType(it.type)).length
  for (const s of scenes) {
    if (s.id !== activeSceneId && s.type === 'free-canvas') {
      count += (s.items || []).filter((it) =>
        isVoiceNoteItemType(it.type),
      ).length
    }
  }
  return count
}

export function countTotalPhotos(
  scenes: SpaceScene[],
  activeItems: SpatialItem[],
  activeSceneId: string,
): number {
  let photoCount = 0

  for (const scene of scenes) {
    if (scene.type === 'letters') {
      photoCount += scene.letters.filter((l) => Boolean(l.imageUrl)).length
    } else if (scene.id !== activeSceneId && scene.type === 'free-canvas') {
      photoCount += (scene.items || []).filter(
        (it) => it.type === 'polaroid' || Boolean(it.data?.photoUrl),
      ).length
    }
  }

  return (
    photoCount +
    activeItems.filter(
      (it) => it.type === 'polaroid' || Boolean(it.data?.photoUrl),
    ).length
  )
}

export type ConfirmAlertFn = (options: {
  title: string
  description?: React.ReactNode
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'warning' | 'info' | 'success'
  showCancel?: boolean
}) => Promise<boolean>

export function validateItemAddition(
  type: SpatialItemType,
  scenes: SpaceScene[],
  activeItems: SpatialItem[],
  activeSceneId: string,
  confirm: ConfirmAlertFn,
): boolean {
  if (
    countTotalArtifacts(scenes, activeItems, activeSceneId) >=
    MAX_SPACE_ARTIFACTS
  ) {
    confirm({
      title: 'Artifact Limit Reached',
      description: `You can place up to ${MAX_SPACE_ARTIFACTS} keepsakes across your space to keep it lightweight and elegant.`,
      confirmText: 'Got It',
      type: 'info',
      showCancel: false,
    })
    return false
  }

  if (
    isMusicItemType(type) &&
    countTotalMusicItems(scenes, activeItems, activeSceneId) >= MAX_SPACE_MUSIC
  ) {
    confirm({
      title: 'One Melody per Space',
      description:
        'Each space features a single ambient soundtrack to preserve a serene mood. You can customize the existing music player melody.',
      confirmText: 'Understood',
      type: 'info',
      showCancel: false,
    })
    return false
  }

  if (
    isVoiceNoteItemType(type) &&
    countTotalVoiceNoteItems(scenes, activeItems, activeSceneId) >=
      MAX_SPACE_VOICE_NOTES
  ) {
    confirm({
      title: 'Voice Notes Limit',
      description: `Each space can feature up to ${MAX_SPACE_VOICE_NOTES} personal voice note cassettes. You can re-record or replace an existing cassette anytime.`,
      confirmText: 'Understood',
      type: 'info',
      showCancel: false,
    })
    return false
  }

  if (
    type === 'polaroid' &&
    countTotalPhotos(scenes, activeItems, activeSceneId) >= MAX_SPACE_PHOTOS
  ) {
    confirm({
      title: 'Photo Memories Limit',
      description: `Each space can feature up to ${MAX_SPACE_PHOTOS} personal photographs. You can replace an existing photo anytime.`,
      confirmText: 'Understood',
      type: 'info',
      showCancel: false,
    })
    return false
  }

  return true
}

export function validateSceneAddition(
  scenesCount: number,
  confirm: ConfirmAlertFn,
  isDuplicate = false,
): boolean {
  if (scenesCount >= MAX_SPACE_SCENES) {
    confirm({
      title: 'Maximum Scenes Limit',
      description: isDuplicate
        ? `Each space can hold up to ${MAX_SPACE_SCENES} scenes. Please delete a scene before creating a duplicate.`
        : `Each space can hold up to ${MAX_SPACE_SCENES} scenes to maintain an intimate, lightweight experience.`,
      confirmText: 'Understood',
      type: 'info',
      showCancel: false,
    })
    return false
  }
  return true
}

export function validateSpaceCreation(
  currentSpacesCount: number,
  confirm: ConfirmAlertFn,
  isDuplicate = false,
): boolean {
  if (currentSpacesCount >= MAX_USER_SPACES) {
    confirm({
      title: 'Spaces Limit Reached',
      description: isDuplicate
        ? `You have reached the limit of ${MAX_USER_SPACES} spaces on this plan. Please delete an existing space before creating a duplicate.`
        : `You have reached the limit of ${MAX_USER_SPACES} spaces on this plan. You can edit, personalize, or delete an existing space anytime.`,
      confirmText: 'Understood',
      type: 'info',
      showCancel: false,
    })
    return false
  }
  return true
}
