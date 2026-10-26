import { useState } from 'react'
import type { KeepsakeCardData } from '@/features/create-space/lib/card-canvas-generator'
import {
  copyCardImageToClipboard,
  downloadCardImage,
  generateKeepsakeCardCanvas,
} from '@/features/create-space/lib/card-canvas-generator'
import {
  shareViaWebShareOrClipboard,
  getInstagramStoryCaption,
} from './share-messaging'

export interface UseShareActionsOptions {
  cardData: KeepsakeCardData
  recipientName?: string
  title?: string
  shareUrl: string
}

export function useShareActions({
  cardData,
  recipientName,
  title,
  shareUrl,
}: UseShareActionsOptions) {
  const [copiedImage, setCopiedImage] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [socialFeedback, setSocialFeedback] = useState<
    'shared' | 'copied' | null
  >(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleCopyCardImage = async () => {
    setIsGenerating(true)
    try {
      const canvas = await generateKeepsakeCardCanvas(cardData)
      const success = await copyCardImageToClipboard(canvas)
      if (success) {
        setCopiedImage(true)
        setTimeout(() => setCopiedImage(false), 3500)
      } else {
        downloadCardImage(
          canvas,
          `invitation-for-${recipientName || 'you'}.png`,
        )
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadImage = async () => {
    setIsGenerating(true)
    try {
      const canvas = await generateKeepsakeCardCanvas(cardData)
      downloadCardImage(canvas, `invitation-for-${recipientName || 'you'}.png`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2500)
    } catch {}
  }

  const handleShareSocial = async () => {
    try {
      const canvas = await generateKeepsakeCardCanvas(cardData)
      const text = getInstagramStoryCaption({
        recipientName: recipientName || '',
        url: shareUrl,
      })
      const res = await shareViaWebShareOrClipboard({
        title: title || 'Sanctuary Keepsake',
        text,
        url: shareUrl,
        canvas,
      })
      if (res !== 'failed') {
        setSocialFeedback(res)
        setTimeout(() => setSocialFeedback(null), 3000)
      }
    } catch {}
  }

  return {
    isGenerating,
    copiedImage,
    copiedLink,
    socialFeedback,
    handleCopyCardImage,
    handleDownloadImage,
    handleCopyLink,
    handleShareSocial,
  }
}
