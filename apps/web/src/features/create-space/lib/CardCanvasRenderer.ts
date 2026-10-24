import QRCodeStyling from 'qr-code-styling'

export interface KeepsakeCardData {
  recipientName: string
  url: string
  accentColor: string
  tapeColor?: 'rose' | 'gold' | 'sage'
  note?: string
}

/**
 * OOP Renderer class generating high-resolution Keepsake Gift Cards on HTML5 Canvas.
 * Encapsulates dimension calculations, canvas state, and graphic primitives.
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
    if (!context) {
      throw new Error('Could not get 2D canvas rendering context')
    }
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

    // Outer card drop shadow
    ctx.save()
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)'
    ctx.shadowBlur = 35
    ctx.shadowOffsetY = 15

    const cardGrad = ctx.createLinearGradient(
      cardX,
      cardY,
      cardX,
      cardY + cardH,
    )
    cardGrad.addColorStop(0, '#FFFDF9')
    cardGrad.addColorStop(1, '#F8F4EC')
    ctx.fillStyle = cardGrad
    this.drawRoundedRect(cardX, cardY, cardW, cardH, cardRadius)
    ctx.fill()
    ctx.restore()

    // Delicate inner border
    ctx.save()
    ctx.strokeStyle = `${data.accentColor}33`
    ctx.lineWidth = 1.5
    this.drawRoundedRect(
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
  }

  private drawHeaderTypography(): void {
    const { ctx, width, cardY, data } = this
    ctx.save()
    ctx.textAlign = 'center'

    // Main Heading
    ctx.fillStyle = '#221915'
    ctx.font = '500 44px "Lora", Georgia, serif'
    const recipient = data.recipientName
      ? `For ${data.recipientName}`
      : 'A Space for You'
    ctx.fillText(recipient, width / 2, cardY + 85)

    // Subtitle Note
    ctx.fillStyle = '#66554D'
    ctx.font = 'italic 18px "Lora", Georgia, serif'
    const subtitle = data.note || 'A quiet, private world meant solely for you.'
    ctx.fillText(subtitle, width / 2, cardY + 125)

    ctx.restore()
  }

  private async drawQRCode(): Promise<void> {
    const { ctx, width, cardY, data } = this
    const qrSize = 360

    const qrCode = new QRCodeStyling({
      width: qrSize,
      height: qrSize,
      type: 'svg',
      data: data.url,
      margin: 8,
      dotsOptions: { color: data.accentColor, type: 'rounded' },
      backgroundOptions: { color: '#FFFFFF' },
      cornersSquareOptions: { color: data.accentColor, type: 'extra-rounded' },
      cornersDotOptions: { color: data.accentColor, type: 'dot' },
    })

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
    ctx.shadowColor = 'rgba(0, 0, 0, 0.12)'
    ctx.shadowBlur = 20
    ctx.shadowOffsetY = 8
    ctx.fillStyle = '#FFFFFF'
    this.drawRoundedRect(qrX - 16, qrY - 16, qrSize + 32, qrSize + 32, 24)
    ctx.fill()
    ctx.restore()

    ctx.drawImage(img, qrX, qrY, qrSize, qrSize)
    URL.revokeObjectURL(qrUrl)
  }

  private drawFooterTypography(): void {
    const { ctx, width, cardX, cardY, cardW, data } = this
    ctx.save()
    ctx.textAlign = 'center'

    // Scan instruction
    ctx.fillStyle = '#3A2E29'
    ctx.font = '500 16px "Lora", Georgia, serif'
    ctx.fillText('Scan with your camera to open', width / 2, cardY + 630)

    // Divider
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(cardX + 120, cardY + 675)
    ctx.lineTo(cardX + cardW - 120, cardY + 675)
    ctx.stroke()

    // Signature
    ctx.fillStyle = data.accentColor
    ctx.font = 'italic 15px "Lora", Georgia, serif'
    ctx.fillText('✦ Created with love ✦', width / 2, cardY + 725)

    ctx.restore()
  }

  private drawRoundedRect(
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ): void {
    const { ctx } = this
    if (typeof ctx.roundRect === 'function') {
      ctx.beginPath()
      ctx.roundRect(x, y, w, h, r)
      return
    }
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
  }
}
