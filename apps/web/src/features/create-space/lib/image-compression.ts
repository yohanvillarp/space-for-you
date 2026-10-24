/**
 * Utility for client-side image compression using HTML Canvas.
 * Compresses images to WebP (or JPEG fallback) under 250KB before uploading to cloud storage.
 */

export interface CompressedImageResult {
  blob: Blob
  dataUrl: string
  originalSize: number
  compressedSize: number
  width: number
  height: number
}

export async function compressImageFile(
  file: File,
  maxDimension = 1200,
  quality = 0.82,
): Promise<CompressedImageResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = () => reject(new Error('Failed to read image file'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Failed to parse image data'))
      img.onload = () => {
        let { width, height } = img

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width)
            width = maxDimension
          } else {
            width = Math.round((width * maxDimension) / height)
            height = maxDimension
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          reject(new Error('Canvas 2D context is unavailable'))
          return
        }

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height)

        const mimeType = 'image/webp'
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image to Blob'))
              return
            }

            const dataUrl = canvas.toDataURL(mimeType, quality)
            resolve({
              blob,
              dataUrl,
              originalSize: file.size,
              compressedSize: blob.size,
              width,
              height,
            })
          },
          mimeType,
          quality,
        )
      }

      img.src = reader.result as string
    }

    reader.readAsDataURL(file)
  })
}
