import QRCodeStyling from 'qr-code-styling'
import type { FoldableCardData } from './foldable-card-types'
import { isDarkColor, resolveCardFont } from './card-canvas-types'
import { drawRoundedRect, buildQrCodeOptions } from './card-canvas-helpers'

export class FoldableCardRenderer {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly data: FoldableCardData

  private readonly width = 2480
  private readonly height = 1754
  private readonly margin = 100
  private readonly midX = 1240

  constructor(data: FoldableCardData) {
    this.data = data
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width
    this.canvas.height = this.height

    const context = this.canvas.getContext('2d')
    if (!context) throw new Error('Could not get 2D canvas context')
    this.ctx = context
  }

  public async render(): Promise<HTMLCanvasElement> {
    this.drawPaperBase()
    if (this.data.includeCutGuides !== false) this.drawCropMarks()
    if (this.data.includeFoldLine !== false) this.drawFoldGuide()
    this.drawLeftDedicationPanel()
    await this.drawRightQrPanel()
    return this.canvas
  }

  private drawPaperBase(): void {
    const { ctx, width, height, margin, data } = this
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, width, height)

    // Inner card background
    const cardBg = data.cardBg || '#FFFDF9'
    ctx.fillStyle = cardBg
    ctx.fillRect(margin, margin, width - margin * 2, height - margin * 2)

    // Subtle hairline inner border
    ctx.strokeStyle = isDarkColor(cardBg)
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(0, 0, 0, 0.08)'
    ctx.lineWidth = 2
    ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2)
  }

  private drawCropMarks(): void {
    const { ctx, width, height, margin } = this
    const len = 35
    ctx.save()
    ctx.strokeStyle = '#9CA3AF'
    ctx.lineWidth = 1.5

    // 4 Corner outer crop marks
    const corners = [
      [margin, margin, -len, 0, 0, -len],
      [width - margin, margin, len, 0, 0, -len],
      [margin, height - margin, -len, 0, 0, len],
      [width - margin, height - margin, len, 0, 0, len],
    ]
    for (const [x, y, dx1, dy1, dx2, dy2] of corners) {
      ctx.beginPath()
      ctx.moveTo(x, y + dy1)
      ctx.lineTo(x, y)
      ctx.lineTo(x + dx1, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x + dx2, y)
      ctx.lineTo(x, y)
      ctx.lineTo(x, y + dy2)
      ctx.stroke()
    }
    ctx.restore()
  }

  private drawFoldGuide(): void {
    const { ctx, midX, margin, height, data } = this
    ctx.save()
    ctx.setLineDash([16, 14])
    ctx.strokeStyle = isDarkColor(data.cardBg)
      ? 'rgba(255, 255, 255, 0.3)'
      : 'rgba(0, 0, 0, 0.2)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(midX, margin)
    ctx.lineTo(midX, height - margin)
    ctx.stroke()

    // Fold instruction label
    ctx.setLineDash([])
    ctx.textAlign = 'center'
    ctx.fillStyle = isDarkColor(data.cardBg) ? '#D1D5DB' : '#6B7280'
    ctx.font = '18px "DM Sans", sans-serif'
    ctx.fillText('✂ - - - - FOLD ALONG CENTER - - - -', midX, margin - 20)
    ctx.restore()
  }

  private drawLeftDedicationPanel(): void {
    const { ctx, midX, margin, height, data } = this
    const leftCenterX = (margin + midX) / 2
    const textColor = data.textColor || '#221915'
    ctx.save()
    ctx.textAlign = 'center'

    // Heading
    ctx.fillStyle = textColor
    ctx.font = resolveCardFont(data.fontFamily, 58, '600')
    const recipient = data.recipientName
      ? `For ${data.recipientName}`
      : 'A Space for You'
    ctx.fillText(recipient, leftCenterX, margin + 220)

    // Subtitle Note
    ctx.fillStyle = textColor
    ctx.globalAlpha = 0.85
    ctx.font = resolveCardFont(data.fontFamily, 26, '400', true)
    const note = data.note || 'A quiet, private world crafted solely for you.'
    ctx.fillText(note, leftCenterX, margin + 290)

    // Handwritten blank lines if enabled
    if (data.includeHandwrittenLines !== false) {
      const lineYStart = margin + 460
      const lineWidth = 700
      ctx.strokeStyle = isDarkColor(data.cardBg)
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(0, 0, 0, 0.14)'
      ctx.lineWidth = 1.5
      ctx.setLineDash([8, 8])

      for (let i = 0; i < 5; i += 1) {
        const y = lineYStart + i * 90
        ctx.beginPath()
        ctx.moveTo(leftCenterX - lineWidth / 2, y)
        ctx.lineTo(leftCenterX + lineWidth / 2, y)
        ctx.stroke()
      }
      ctx.setLineDash([])

      ctx.fillStyle = isDarkColor(data.cardBg) ? '#9CA3AF' : '#8A7A70'
      ctx.font = 'italic 20px "Lora", serif'
      ctx.fillText(
        '(Write a personal thought here)',
        leftCenterX,
        lineYStart - 20,
      )
    }

    // Signature
    const author = data.senderName
      ? `With love, ${data.senderName}`
      : '✦ Created with love ✦'
    ctx.fillStyle = data.accentColor
    ctx.font = resolveCardFont(data.fontFamily, 28, '500', true)
    ctx.fillText(author, leftCenterX, height - margin - 140)
    ctx.restore()
  }

  private async drawRightQrPanel(): Promise<void> {
    const { ctx, width, midX, margin, height, data } = this
    const rightCenterX = (midX + width - margin) / 2
    const textColor = data.textColor || '#221915'
    const qrSize = 580

    const qrCode = new QRCodeStyling(buildQrCodeOptions(data, qrSize))
    const rawQr = await qrCode.getRawData('png')
    if (!rawQr || !(rawQr instanceof Blob)) return

    const qrUrl = URL.createObjectURL(rawQr)
    const img = new Image()
    img.src = qrUrl
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('Failed to load QR image'))
    })

    const qrX = rightCenterX - qrSize / 2
    const qrY = margin + 240

    // White base card with soft shadow
    ctx.save()
    ctx.shadowColor = 'rgba(0, 0, 0, 0.12)'
    ctx.shadowBlur = 24
    ctx.shadowOffsetY = 8
    ctx.fillStyle = '#FFFFFF'
    drawRoundedRect(ctx, qrX - 24, qrY - 24, qrSize + 48, qrSize + 48, 32)
    ctx.fill()
    ctx.restore()

    ctx.drawImage(img, qrX, qrY, qrSize, qrSize)
    URL.revokeObjectURL(qrUrl)

    // QR Typography
    ctx.save()
    ctx.textAlign = 'center'
    ctx.fillStyle = textColor
    ctx.font = resolveCardFont(data.fontFamily, 32, '600')
    ctx.fillText('Your Personal Sanctuary', rightCenterX, margin + 180)

    ctx.fillStyle = textColor
    ctx.globalAlpha = 0.8
    ctx.font = resolveCardFont(data.fontFamily, 24, '400', true)
    ctx.fillText(
      'Scan with your camera to step inside',
      rightCenterX,
      qrY + qrSize + 70,
    )

    // Short URL fallback
    ctx.fillStyle = data.accentColor
    ctx.globalAlpha = 1
    ctx.font = '22px ui-monospace, SFMono-Regular, monospace'
    ctx.fillText(data.url, rightCenterX, qrY + qrSize + 115)

    // Bottom Branding
    ctx.fillStyle = textColor
    ctx.globalAlpha = 0.65
    ctx.font = resolveCardFont(data.fontFamily, 20, '400')
    ctx.fillText('space-for-you.app', rightCenterX, height - margin - 140)
    ctx.restore()
  }
}
