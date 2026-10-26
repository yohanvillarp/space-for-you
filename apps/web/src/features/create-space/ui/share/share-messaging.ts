export interface ShareMessageContext {
  recipientName: string
  url: string
}

export function getWhatsAppShareMessage({
  recipientName,
  url,
}: ShareMessageContext): string {
  const target = recipientName.trim() ? recipientName.trim() : 'you'
  return `✨ For ${target}: I made a dedicated digital space just for you. Open it here: ${url}`
}

export function getTelegramShareMessage({
  recipientName,
  url,
}: ShareMessageContext): string {
  const target = recipientName.trim() ? recipientName.trim() : 'you'
  return `✨ A special digital space crafted for ${target}: ${url}`
}

export function getInstagramStoryCaption({
  recipientName,
  url,
}: ShareMessageContext): string {
  const target = recipientName.trim() ? recipientName.trim() : 'you'
  return `I made a dedicated space for ${target} ✦ Open it here: ${url}`
}

export function openWhatsAppShare(ctx: ShareMessageContext): void {
  const message = encodeURIComponent(getWhatsAppShareMessage(ctx))
  window.open(
    `https://api.whatsapp.com/send?text=${message}`,
    '_blank',
    'noopener,noreferrer',
  )
}

export function openTelegramShare(ctx: ShareMessageContext): void {
  const message = encodeURIComponent(getTelegramShareMessage(ctx))
  const targetUrl = encodeURIComponent(ctx.url)
  window.open(
    `https://t.me/share/url?url=${targetUrl}&text=${message}`,
    '_blank',
    'noopener,noreferrer',
  )
}

export async function shareViaWebShareOrClipboard(options: {
  title: string
  text: string
  url: string
  canvas?: HTMLCanvasElement | null
}): Promise<'shared' | 'copied' | 'failed'> {
  const { title, text, url, canvas } = options

  // Attempt Web Share API with image file if supported
  if (canvas && typeof navigator.share === 'function') {
    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png'),
      )
      if (blob) {
        const file = new File([blob], 'space-dedication-card.png', {
          type: 'image/png',
        })
        if (
          typeof navigator.canShare === 'function' &&
          navigator.canShare({ files: [file] })
        ) {
          await navigator.share({
            title,
            text,
            url,
            files: [file],
          })
          return 'shared'
        }
      }
    } catch {
      // Fall through to clipboard if user dismissed or unsupported
    }
  }

  // Fallback: Copy to clipboard
  try {
    await navigator.clipboard.writeText(`${text}\n${url}`)
    return 'copied'
  } catch {
    return 'failed'
  }
}
