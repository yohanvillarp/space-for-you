import type {
  SpaceMeta,
  SpaceScene,
} from '@/features/create-space/model/scenes.types'
import type { SpaceProtectionConfig } from '@/features/space-lock'

/**
 * Generates a deterministic content fingerprint for a sanctuary.
 * Only factors in fields that alter what the recipient views or hears.
 */
export function computeSanctuaryFingerprint(
  spaceMeta: SpaceMeta,
  scenes: SpaceScene[],
  protectionConfig?: SpaceProtectionConfig,
): string {
  const normalized = {
    title: spaceMeta.title?.trim() || '',
    recipient: spaceMeta.recipientName?.trim() || '',
    sender: spaceMeta.senderName?.trim() || '',
    dedication: spaceMeta.dedicationMessage?.trim() || '',
    protection: protectionConfig
      ? {
          enabled: Boolean(protectionConfig.enabled),
          passcode: protectionConfig.passcode || '',
          hint: protectionConfig.hint?.trim() || '',
        }
      : null,
    scenes: scenes.map((s) => ({
      id: s.id,
      type: s.type,
      title: s.title,
      subtitle: s.subtitle,
      order: s.order,
      schedule: s.schedule ?? null,
      items:
        s.type === 'free-canvas' && s.items
          ? s.items.map((it) => ({
              id: it.id,
              type: it.type,
              x: Math.round(it.x),
              y: Math.round(it.y),
              rotation: Math.round(it.rotation || 0),
              zIndex: it.zIndex,
              data: it.data ?? null,
            }))
          : null,
      letters:
        s.type === 'letters' && s.letters
          ? s.letters.map((l) => ({
              id: l.id,
              title: l.title,
              content: l.content,
              fontStyle: l.fontStyle ?? null,
              envelopeColor: l.envelopeColor,
              paperColor: l.paperColor ?? null,
              waxSeal: l.waxSeal,
              imageUrl: l.imageUrl ?? null,
              date: l.date ?? null,
            }))
          : null,
    })),
  }
  return JSON.stringify(normalized)
}

export function getPublishedFingerprintKey(spaceId?: string): string {
  return spaceId ? `sfy_pub_fp_${spaceId}` : 'sfy_pub_fp_draft'
}

export function getPublishedFingerprint(spaceId?: string): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(getPublishedFingerprintKey(spaceId))
}

export function setPublishedFingerprint(
  spaceId: string | undefined,
  fingerprint: string,
): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(getPublishedFingerprintKey(spaceId), fingerprint)
}
