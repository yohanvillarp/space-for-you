import { CardCanvasRenderer } from '@/features/create-space/lib/CardCanvasRenderer'
import type { KeepsakeCardData } from '@/features/create-space/lib/CardCanvasRenderer'

export type { KeepsakeCardData }
export { CardCanvasRenderer }

/**
 * Renders a Keepsake Gift Card onto an HTML5 Canvas using the CardCanvasRenderer OOP class.
 */
export async function generateKeepsakeCardCanvas(
  data: KeepsakeCardData,
): Promise<HTMLCanvasElement> {
  const renderer = new CardCanvasRenderer(data)
  return renderer.render()
}

/**
 * Copies the Keepsake Card directly to the system clipboard as a PNG image
 */
export async function copyCardImageToClipboard(
  canvas: HTMLCanvasElement,
): Promise<boolean> {
  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        resolve(false)
        return
      }

      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ])
        resolve(true)
      } catch (err) {
        console.error('Failed to copy card image to clipboard:', err)
        resolve(false)
      }
    }, 'image/png')
  })
}

/**
 * Triggers a download of the Keepsake Card PNG file
 */
export function downloadCardImage(
  canvas: HTMLCanvasElement,
  filename = 'invitation-card.png',
): void {
  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}
