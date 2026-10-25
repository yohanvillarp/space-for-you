import QRCodeStyling from 'qr-code-styling'
import type { KeepsakeCardData } from './card-canvas-types'
import { isDarkColor, resolveCardFont } from './card-canvas-types'
import { drawRoundedRect, buildQrCodeOptions } from './card-canvas-helpers'

export type { KeepsakeCardData }

/**
 * OOP Renderer generating high-resolution Keepsake Gift Cards matching the customizer.
 */
export class CardCanvasRenderer {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly data: KeepsakeCardData

  private readonly width = 800
  private readonly height = 1000
  private readonly cardX = 70
  private readonly cardY = 70
  private readonly cardW = 800 - 140
  private readonly cardH = 1000 - 140
  private readonly cardRadius = 36

  constructor(data: KeepsakeCardData) {
    this.data = data
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width
    this.canvas.height = this.height

    const context = this.canvas.getContext('2d')
    if (!context) throw new Error('Could not get 2D canvas context')
    this.ctx = context
  }

  public async render(): Promise<HTMLCanvasElement> {
    this.drawBackground()
    this.drawCardBase()
    this.drawWashiTape()
    this.drawHeaderTypography()
    await this.drawQRCode()
    this.drawFooterTypography()
    return this.canvas
  }

  private drawBackground(): void {
    const { ctx, width, height } = this
    const outerGrad = ctx.createLinearGradient(0, 0, width, height)
    outerGrad.addColorStop(0, '#1A1412')
    outerGrad.addColorStop(1, '#0F0B0A')
    ctx.fillStyle = outerGrad
    ctx.fillRect(0, 0, width, height)
  }

  private drawCardBase(): void {
    const { ctx, cardX, cardY, cardW, cardH, cardRadius, data } = this
    const bg = data.cardBg || '#FFFDF9'
    const isDark = isDarkColor(bg)

    // Outer card shadow
    ctx.save()
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)'
    ctx.shadowBlur = 35
    ctx.shadowOffsetY = 15
    ctx.fillStyle = bg
    drawRoundedRect(ctx, cardX, cardY, cardW, cardH, cardRadius)
    ctx.fill()
    ctx.restore()

    // Delicate inner border matching preview
    ctx.save()
    ctx.strokeStyle = isDark
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(0, 0, 0, 0.08)'
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
  }

  private drawWashiTape(): void {
    const { ctx, width, cardY, data } = this
    const tapeW = 140
    const tapeH = 34
    const tapeY = cardY - 14

    ctx.save()
    ctx.translate(width / 2, tapeY + tapeH / 2)
    ctx.rotate(-0.04)

    ctx.fillStyle =
      data.tapeColor === 'rose'
        ? 'rgba(244, 63, 94, 0.75)'
        : data.tapeColor === 'sage'
          ? 'rgba(20, 184, 166, 0.75)'
          : 'rgba(245, 158, 11, 0.75)'

    ctx.fillRect(-tapeW / 2, -tapeH / 2, tapeW, tapeH)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)'
    ctx.lineWidth = 1
    ctx.strokeRect(-tapeW / 2, -tapeH / 2, tapeW, tapeH)
    ctx.restore()
  }

  private drawHeaderTypography(): void {
    const { ctx, width, cardY, data } = this
    const textColor = data.textColor || '#221915'
    ctx.save()
    ctx.textAlign = 'center'

    // Main Heading: "For [Recipient]"
    ctx.fillStyle = textColor
    ctx.font = resolveCardFont(data.fontFamily, 44, '500')
    const recipient = data.recipientName
      ? `For ${data.recipientName}`
      : 'A Space for You'
    ctx.fillText(recipient, width / 2, cardY + 85)

    // Subtitle Note
    ctx.fillStyle = textColor
    ctx.globalAlpha = 0.85
    ctx.font = resolveCardFont(data.fontFamily, 18, '400', true)
    const subtitle = data.note || 'A quiet, private world meant solely for you.'
    ctx.fillText(subtitle, width / 2, cardY + 125)

    ctx.restore()
  }

  private async drawQRCode(): Promise<void> {
    const { ctx, width, cardY, data } = this
    const qrSize = 360

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

    const qrX = width / 2 - qrSize / 2
    const qrY = cardY + 180

    // White base card with soft shadow
    ctx.save()
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)'
    ctx.shadowBlur = 22
    ctx.shadowOffsetY = 8
    ctx.fillStyle = '#FFFFFF'
    drawRoundedRect(ctx, qrX - 16, qrY - 16, qrSize + 32, qrSize + 32, 24)
    ctx.fill()

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)'
    ctx.lineWidth = 1
    drawRoundedRect(ctx, qrX - 16, qrY - 16, qrSize + 32, qrSize + 32, 24)
    ctx.stroke()
    ctx.restore()

    ctx.drawImage(img, qrX, qrY, qrSize, qrSize)
    URL.revokeObjectURL(qrUrl)
  }

  private drawFooterTypography(): void {
    const { ctx, width, cardX, cardY, cardW, data } = this
    const textColor = data.textColor || '#221915'
    const isDark = isDarkColor(data.cardBg)
    ctx.save()
    ctx.textAlign = 'center'

    // Scan instruction
    ctx.fillStyle = textColor
    ctx.globalAlpha = 0.75
    ctx.font = resolveCardFont(data.fontFamily, 16, '400', true)
    ctx.fillText('Scan with your camera to open', width / 2, cardY + 630)
    ctx.globalAlpha = 1

    // Subtle divider
    ctx.strokeStyle = isDark
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(0, 0, 0, 0.08)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(cardX + 120, cardY + 675)
    ctx.lineTo(cardX + cardW - 120, cardY + 675)
    ctx.stroke()

    // Signature
    ctx.fillStyle = data.accentColor
    ctx.font = resolveCardFont(data.fontFamily, 15, '500', true)
    ctx.fillText('✦ Created with love ✦', width / 2, cardY + 725)

    ctx.restore()
  }
}
