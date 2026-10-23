import type { SVGProps } from 'react'
import { cn } from '@/shared/lib'

export interface LogomarkProps extends SVGProps<SVGSVGElement> {
  size?: number | string
}

export function Logomark({
  size = 32,
  className,
  ...props
}: LogomarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="14 14 68 68"
      width={size}
      height={size}
      fill="none"
      role="img"
      aria-label="Space for You"
      className={cn('inline-block shrink-0 transition-colors', className)}
      {...props}
    >
      {/* Upper-Left Maker Frame: uses text-text-primary (Espresso in light, Marfil in dark) */}
      <path
        className="fill-text-primary transition-colors duration-200"
        d="
          M 18.0 26.0
          A 8.0 8.0 0 0 1 26.0 18.0
          H 57.0
          A 5.0 5.0 0 0 1 62.0 23.0
          V 25.0
          A 5.0 5.0 0 0 1 57.0 30.0
          H 33.0
          A 3.0 3.0 0 0 0 30.0 33.0
          V 57.0
          A 5.0 5.0 0 0 1 25.0 62.0
          H 23.0
          A 5.0 5.0 0 0 1 18.0 57.0
          Z
        "
      />

      {/* Lower-Right Recipient Frame: uses primary (Terracotta) */}
      <path
        className="fill-primary transition-colors duration-200"
        d="
          M 78.0 70.0
          A 8.0 8.0 0 0 1 70.0 78.0
          H 39.0
          A 5.0 5.0 0 0 1 34.0 73.0
          V 71.0
          A 5.0 5.0 0 0 1 39.0 66.0
          H 63.0
          A 3.0 3.0 0 0 0 66.0 63.0
          V 39.0
          A 5.0 5.0 0 0 1 71.0 34.0
          H 73.0
          A 5.0 5.0 0 0 1 78.0 39.0
          Z
        "
      />

      {/* Central Bespoke Token / Spark: uses primary (Terracotta) */}
      <path
        className="fill-primary transition-colors duration-200"
        d="
          M 46.6 38.6
          A 2.0 2.0 0 0 1 49.4 38.6
          L 57.4 46.6
          A 2.0 2.0 0 0 1 57.4 49.4
          L 49.4 57.4
          A 2.0 2.0 0 0 1 46.6 57.4
          L 38.6 49.4
          A 2.0 2.0 0 0 1 38.6 46.6
          Z
        "
      />
    </svg>
  )
}
