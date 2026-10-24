import { useEffect, useRef } from 'react'
import QRCodeStyling from 'qr-code-styling'
import { cn } from '@/shared/lib'

export interface StylizedQrCodeProps {
  url: string
  accentColor?: string
  size?: number
  qrStyle?: 'minimal' | 'vintage' | 'celestial' | 'stamp' | 'pill'
  className?: string
}

export function StylizedQrCode({
  url,
  accentColor = '#A34835',
  size = 200,
  qrStyle = 'minimal',
  className,
}: StylizedQrCodeProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const dotsType =
      qrStyle === 'vintage'
        ? 'classy'
        : qrStyle === 'celestial'
          ? 'dots'
          : qrStyle === 'stamp'
            ? 'classy-rounded'
            : qrStyle === 'pill'
              ? 'extra-rounded'
              : 'rounded'

    const cornerSquareType =
      qrStyle === 'vintage'
        ? 'square'
        : qrStyle === 'pill'
          ? 'dot'
          : 'extra-rounded'

    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      type: 'svg',
      data: url,
      margin: 4,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q',
      },
      dotsOptions: {
        color: accentColor,
        type: dotsType,
      },
      backgroundOptions: {
        color: '#FFFFFF',
      },
      cornersSquareOptions: {
        color: accentColor,
        type: cornerSquareType,
      },
      cornersDotOptions: {
        color: accentColor,
        type: 'dot',
      },
    })

    container.innerHTML = ''
    qrCode.append(container)

    return () => {
      container.innerHTML = ''
    }
  }, [size, url, accentColor, qrStyle])

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-2xl border border-stone-200/80 bg-white p-3 shadow-md transition-transform duration-300 hover:scale-[1.02]',
        className,
      )}
    >
      <div ref={containerRef} className="overflow-hidden rounded-xl" />
    </div>
  )
}
