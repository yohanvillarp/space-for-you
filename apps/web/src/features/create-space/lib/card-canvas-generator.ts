import QRCodeStyling from 'qr-code-styling'

export interface KeepsakeCardData {
  recipientName: string
  url: string
  accentColor: string
  tapeColor?: 'rose' | 'gold' | 'sage'
  note?: string
}

/**
 * Renders a pure, intimate high-resolution Keepsake Gift Card onto an HTML5 Canvas.
 * Free of all technical slogans, app marketing, or procedural labels.
 */
export async function generateKeepsakeCardCanvas(
  data: KeepsakeCardData,
): Promise<HTMLCanvasElement> {
  const width = 800
  const height = 1000
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not get canvas context')

  // 1. Draw outer ambient background
  const outerGrad = ctx.createLinearGradient(0, 0, width, height)
  outerGrad.addColorStop(0, '#1A1412')
  outerGrad.addColorStop(1, '#0F0B0A')
  ctx.fillStyle = outerGrad
  ctx.fillRect(0, 0, width, height)

  // 2. Draw card dimensions & drop shadow
  const cardX = 70
  const cardY = 70
  const cardW = width - 140
  const cardH = height - 140
  const cardRadius = 36

  ctx.save()
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)'
  ctx.shadowBlur = 35
  ctx.shadowOffsetY = 15

  // Draw card base shape (warm cotton paper)
  const cardGrad = ctx.createLinearGradient(cardX, cardY, cardX, cardY + cardH)
  cardGrad.addColorStop(0, '#FFFDF9')
  cardGrad.addColorStop(1, '#F8F4EC')
  ctx.fillStyle = cardGrad
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, cardRadius)
  ctx.fill()
  ctx.restore()

  // Delicate inner border
  ctx.save()
  ctx.strokeStyle = `${data.accentColor}33`
  ctx.lineWidth = 1.5
  drawRoundedRect(
    ctx,
    cardX + 16,
    cardY + 16,
    cardW - 32,
    cardH - 32,
    cardRadius - 8,
  )
  ctx.stroke()
  ctx.restore()

  // 3. Draw Washi Tape at the top center
  ctx.save()
  const tapeW = 140
  const tapeH = 34
  const tapeY = cardY - 14
  ctx.translate(width / 2, tapeY + tapeH / 2)
  ctx.rotate(-0.03)

  ctx.fillStyle =
    data.tapeColor === 'rose'
      ? 'rgba(214, 117, 100, 0.75)'
      : data.tapeColor === 'sage'
        ? 'rgba(45, 160, 145, 0.75)'
        : 'rgba(230, 175, 70, 0.75)'

  ctx.fillRect(-tapeW / 2, -tapeH / 2, tapeW, tapeH)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'
  ctx.lineWidth = 1
  ctx.strokeRect(-tapeW / 2, -tapeH / 2, tapeW, tapeH)
  ctx.restore()

  // 4. Draw Intimate Header Typography (Zero Tech Noise)
  ctx.save()
  ctx.textAlign = 'center'

  // Main Heading: For [Recipient]
  ctx.fillStyle = '#221915'
  ctx.font = '500 44px "Lora", Georgia, serif'
  const recipient = data.recipientName
    ? `For ${data.recipientName}`
    : 'A Space for You'
  ctx.fillText(recipient, width / 2, cardY + 85)

  // Subtitle / Dedication Note
  ctx.fillStyle = '#66554D'
  ctx.font = 'italic 18px "Lora", Georgia, serif'
  const subtitle = data.note || 'A quiet, private world meant solely for you.'
  ctx.fillText(subtitle, width / 2, cardY + 125)

  ctx.restore()

  // 5. Generate and Draw Stylized QR Code in the center
  const qrSize = 360
  const qrCode = new QRCodeStyling({
    width: qrSize,
    height: qrSize,
    type: 'svg',
    data: data.url,
    margin: 8,
    dotsOptions: {
      color: data.accentColor,
      type: 'rounded',
    },
    backgroundOptions: {
      color: '#FFFFFF',
    },
    cornersSquareOptions: {
      color: data.accentColor,
      type: 'extra-rounded',
    },
    cornersDotOptions: {
      color: data.accentColor,
      type: 'dot',
    },
  })

  const rawQr = await qrCode.getRawData('png')
  if (rawQr && rawQr instanceof Blob) {
    const qrUrl = URL.createObjectURL(rawQr)
    const img = new Image()
    img.src = qrUrl
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('Failed to load QR image'))
    })

    const qrX = width / 2 - qrSize / 2
    const qrY = cardY + 180

    // QR white base card with shadow
    ctx.save()
    ctx.shadowColor = 'rgba(0, 0, 0, 0.12)'
    ctx.shadowBlur = 20
    ctx.shadowOffsetY = 8
    ctx.fillStyle = '#FFFFFF'
    drawRoundedRect(ctx, qrX - 16, qrY - 16, qrSize + 32, qrSize + 32, 24)
    ctx.fill()
    ctx.restore()

    // QR Image
    ctx.drawImage(img, qrX, qrY, qrSize, qrSize)
    URL.revokeObjectURL(qrUrl)
  }

  // 6. Draw Clean, Intimate Bottom Note (Zero Tech Slogans)
  ctx.save()
  ctx.textAlign = 'center'

  // Simple scan guidance
  ctx.fillStyle = '#3A2E29'
  ctx.font = '500 16px "Lora", Georgia, serif'
  ctx.fillText('Scan with your camera to open', width / 2, cardY + 630)

  // Decorative divider
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(cardX + 120, cardY + 675)
  ctx.lineTo(cardX + cardW - 120, cardY + 675)
  ctx.stroke()

  // Delicate intimate signature
  ctx.fillStyle = data.accentColor
  ctx.font = 'italic 15px "Lora", Georgia, serif'
  ctx.fillText('✦ Created with love ✦', width / 2, cardY + 725)

  ctx.restore()

  return canvas
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
) {
  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}

/**
 * Helper to draw rounded rectangles on Canvas
 */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}
