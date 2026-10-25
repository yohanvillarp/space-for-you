import type { Options } from 'qr-code-styling'
import type { KeepsakeCardData } from './card-canvas-types'

export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
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

export function buildQrCodeOptions(
  data: KeepsakeCardData,
  size: number,
): Options {
  const style = data.qrStyle || 'minimal'

  const dotsType =
    style === 'vintage'
      ? 'classy'
      : style === 'celestial'
        ? 'dots'
        : style === 'stamp'
          ? 'classy-rounded'
          : style === 'pill'
            ? 'extra-rounded'
            : 'rounded'

  const cornerSquareType =
    style === 'vintage' ? 'square' : style === 'pill' ? 'dot' : 'extra-rounded'

  return {
    width: size,
    height: size,
    type: 'svg',
    data: data.url,
    margin: 8,
    dotsOptions: { color: data.accentColor, type: dotsType },
    backgroundOptions: { color: '#FFFFFF' },
    cornersSquareOptions: { color: data.accentColor, type: cornerSquareType },
    cornersDotOptions: { color: data.accentColor, type: 'dot' },
  }
}
