import { useState, useCallback } from 'react'
import type { SpaceTemplateId, UserSpace } from '@/entities/space'
import { saveSpaceToDatabase, saveSpace } from '@/entities/space'
import { generateSpaceSlug } from '@/entities/space/api/space-converters'
import { getCurrentUser } from '@/shared/api'
import type {
  SpaceMeta,
  SpaceScene,
} from '@/features/create-space/model/scenes.types'
import type { SpaceProtectionConfig } from '@/features/space-lock'
import { serializeProtectionTheme } from '@/features/space-lock'
import {
  derivePasscodeHash,
  generateCryptographicSalt,
} from '@/shared/lib/crypto'
import {
  validateSanctuaryForPublish,
  type SanctuaryPublishValidation,
} from '@/features/create-space/lib/sanctuary-publish-validator'
import {
  uploadAllPendingPhotos,
  applyUploadedUrlsToScenes,
} from '@/features/create-space/lib/stage-photo-upload'
import { shortenSanctuaryUrl } from '@/features/create-space/lib/url-shortener'

export type PublishStep =
  | 'idle'
  | 'preflight'
  | 'auth_prompt'
  | 'uploading'
  | 'persisting'
  | 'success'
  | 'error'

export interface UsePublishSanctuaryOptions {
  spaceId?: string
  templateId: SpaceTemplateId
  spaceMeta: SpaceMeta
  scenes: SpaceScene[]
  protectionConfig?: SpaceProtectionConfig
  pendingPhotos?: Map<string, File>
  onPhotosUploaded?: (uploadedMap: Map<string, string>) => void
  onPublishSuccess?: (space: UserSpace, shareUrl: string) => void
}

export interface UsePublishSanctuaryReturn {
  publishStep: PublishStep
  validation: SanctuaryPublishValidation | null
  isPublishing: boolean
  publishedUrl: string | null
  canonicalSlug: string | null
  shortenedUrl: string | null
  errorMessage: string | null
  openPublishModal: () => void
  closePublishModal: () => void
  confirmPublish: () => Promise<void>
  retryPublish: () => Promise<void>
}

export function usePublishSanctuary({
  spaceId,
  templateId,
  spaceMeta,
  scenes,
  protectionConfig,
  pendingPhotos,
  onPhotosUploaded,
  onPublishSuccess,
}: UsePublishSanctuaryOptions): UsePublishSanctuaryReturn {
  const [publishStep, setPublishStep] = useState<PublishStep>('idle')
  const [validation, setValidation] =
    useState<SanctuaryPublishValidation | null>(null)
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null)
  const [canonicalSlug, setCanonicalSlug] = useState<string | null>(null)
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const openPublishModal = useCallback(() => {
    const val = validateSanctuaryForPublish({
      spaceMeta,
      scenes,
      protectionConfig,
      pendingPhotosCount: pendingPhotos?.size || 0,
    })
    setValidation(val)
    setPublishStep('preflight')
  }, [spaceMeta, scenes, protectionConfig, pendingPhotos])

  const closePublishModal = useCallback(() => {
    if (publishStep === 'uploading' || publishStep === 'persisting') return
    setPublishStep('idle')
    setErrorMessage(null)
  }, [publishStep])

  const performPublish = useCallback(async () => {
    setErrorMessage(null)
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      setPublishStep('auth_prompt')
      return
    }

    try {
      let finalScenes = scenes
      if (pendingPhotos && pendingPhotos.size > 0) {
        setPublishStep('uploading')
        const uploadedUrls = await uploadAllPendingPhotos(pendingPhotos)
        onPhotosUploaded?.(uploadedUrls)
        finalScenes = applyUploadedUrlsToScenes(scenes, uploadedUrls)
      }

      setPublishStep('persisting')
      const targetId = spaceId || `space_${Date.now()}`
      const baseSlug = generateSpaceSlug(
        spaceMeta.title,
        spaceMeta.recipientName,
      )
      const slug = baseSlug

      const spacePayload: UserSpace = {
        id: targetId,
        title: spaceMeta.title.trim() || 'Untitled Sanctuary',
        recipientName: spaceMeta.recipientName.trim() || 'Someone Special',
        templateId,
        scenesCount: finalScenes.length,
        artifactsCount: finalScenes.reduce((acc, s) => {
          if (s.type === 'free-canvas') return acc + (s.items?.length || 0)
          if (s.type === 'letters') return acc + (s.letters?.length || 0)
          return acc
        }, 0),
        status: 'published',
        isProtected: Boolean(protectionConfig?.enabled),
        description: spaceMeta.dedicationMessage || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      let finalPasscodeHash = protectionConfig?.passcodeHash
      let finalPasscodeSalt = protectionConfig?.passcodeSalt

      if (protectionConfig?.enabled) {
        if (!finalPasscodeHash || !finalPasscodeSalt) {
          const rawCode = protectionConfig.passcode || '1234'
          finalPasscodeSalt = finalPasscodeSalt || generateCryptographicSalt()
          finalPasscodeHash = await derivePasscodeHash(
            rawCode,
            finalPasscodeSalt,
          )
        }
      }

      saveSpace(spacePayload)

      const persisted = await saveSpaceToDatabase({
        space: spacePayload,
        scenes: finalScenes,
        userId: currentUser.$id,
        senderName: spaceMeta.senderName,
        dedicationMessage: spaceMeta.dedicationMessage,
        slug,
        passcodeHash: finalPasscodeHash,
        passcodeSalt: finalPasscodeSalt,
        passcodeHint: protectionConfig?.hint,
        protectionTheme: protectionConfig
          ? serializeProtectionTheme({
              ...protectionConfig,
              passcodeHash: finalPasscodeHash,
              passcodeSalt: finalPasscodeSalt,
            })
          : undefined,
      })

      const rawShareUrl = `${window.location.origin}/s/${slug}`
      setCanonicalSlug(slug)
      setPublishedUrl(rawShareUrl)

      let resolvedShort = rawShareUrl
      try {
        resolvedShort = await shortenSanctuaryUrl(rawShareUrl)
      } catch {
        resolvedShort = rawShareUrl
      }
      setShortenedUrl(resolvedShort)

      setPublishStep('success')
      onPublishSuccess?.(persisted, resolvedShort)
    } catch (err) {
      console.error('Publishing failed:', err)
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Could not complete cloud publication. Your sanctuary is safely preserved locally.',
      )
      setPublishStep('error')
    }
  }, [
    spaceId,
    templateId,
    spaceMeta,
    scenes,
    protectionConfig,
    pendingPhotos,
    onPhotosUploaded,
    onPublishSuccess,
  ])

  const confirmPublish = useCallback(async () => {
    await performPublish()
  }, [performPublish])

  const retryPublish = useCallback(async () => {
    await performPublish()
  }, [performPublish])

  const isPublishing =
    publishStep === 'uploading' || publishStep === 'persisting'

  return {
    publishStep,
    validation,
    isPublishing,
    publishedUrl,
    canonicalSlug,
    shortenedUrl,
    errorMessage,
    openPublishModal,
    closePublishModal,
    confirmPublish,
    retryPublish,
  }
}
