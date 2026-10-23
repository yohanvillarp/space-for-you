import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib'

export interface CandleFlameProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

export function CandleFlame({
  size = 'md',
  className,
  ...props
}: CandleFlameProps) {
  const sizeMap = {
    sm: 'h-16 w-12',
    md: 'h-24 w-16',
    lg: 'h-32 w-20',
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative flex flex-col items-center justify-end select-none',
        sizeMap[size],
        className,
      )}
      {...props}
    >
      {/* Ambient Heat Corona Glow */}
      <div className="absolute -top-3 h-14 w-14 animate-pulse rounded-full bg-amber-400/25 blur-lg" />
      <div className="animate-glow absolute top-1 h-8 w-8 rounded-full bg-orange-500/20 blur-md" />

      {/* SVG Candle Flame with Multi-layer Flickering */}
      <svg
        viewBox="0 0 40 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full drop-shadow-sm"
      >
        <defs>
          <linearGradient
            id="flameOuter"
            x1="20"
            y1="5"
            x2="20"
            y2="45"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F59E0B" />
            <stop offset="0.6" stopColor="#EF4444" />
            <stop offset="1" stopColor="#B45309" />
          </linearGradient>
          <linearGradient
            id="flameInner"
            x1="20"
            y1="15"
            x2="20"
            y2="45"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FEF08A" />
            <stop offset="0.7" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#EA580C" />
          </linearGradient>
        </defs>

        {/* Outer Flame (Teardrop that gently dances) */}
        <path
          d="M20 6 C24 16 30 26 30 36 C30 43 25 47 20 47 C15 47 10 43 10 36 C10 26 16 16 20 6 Z"
          fill="url(#flameOuter)"
          className="origin-bottom animate-pulse"
        />

        {/* Inner Core Flame (Bright Yellow Heat) */}
        <path
          d="M20 18 C22 24 25 31 25 38 C25 43 23 45 20 45 C17 45 15 43 15 38 C15 31 18 24 20 18 Z"
          fill="url(#flameInner)"
          className="animate-glow origin-bottom"
        />

        {/* Blue Base of Fire */}
        <ellipse
          cx="20"
          cy="46"
          rx="3.5"
          ry="1.5"
          fill="#38BDF8"
          opacity="0.7"
        />

        {/* Black Wick */}
        <line
          x1="20"
          y1="45"
          x2="20"
          y2="52"
          stroke="#451A03"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Wax Candle Body Top */}
        <rect
          x="8"
          y="52"
          width="24"
          height="18"
          rx="3"
          fill="#FFFBEB"
          className="dark:fill-[#D97706]/40"
        />
        <ellipse
          cx="20"
          cy="52"
          rx="12"
          ry="2.5"
          fill="#FEF3C7"
          className="dark:fill-[#B45309]/60"
        />
      </svg>
    </div>
  )
}
