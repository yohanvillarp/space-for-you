import { FoldableCardRenderer } from './FoldableCardRenderer'
import type { FoldableCardData } from './foldable-card-types'

export type { FoldableCardData }
export { FoldableCardRenderer }

export async function generateFoldableCardCanvas(
  data: FoldableCardData,
): Promise<HTMLCanvasElement> {
  const renderer = new FoldableCardRenderer(data)
  return renderer.render()
}

export function downloadFoldableCardImage(
  canvas: HTMLCanvasElement,
  filename = 'keepsake-foldable-card.png',
): void {
  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}

export async function copyFoldableCardImageToClipboard(
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
        console.error('Failed to copy foldable card to clipboard:', err)
        resolve(false)
      }
    }, 'image/png')
  })
}
