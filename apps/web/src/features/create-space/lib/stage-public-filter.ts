import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'

export function filterPublicItems(rawItems: SpatialItem[]): SpatialItem[] {
  return rawItems.filter((item) => {
    if (item.type === 'cassette-tape') {
      const isSample =
        item.data?.isVoiceNoteSample ||
        !item.data?.audioUrl ||
        item.data.audioUrl.includes('6ade885600247e215323')
      return !isSample
    }
    if (item.type === 'polaroid' && !item.data?.photoUrl) {
      return false
    }
    return true
  })
}
