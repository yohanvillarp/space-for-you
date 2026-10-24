import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib'

export interface GiftLoaderProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

const SIZE_MAP = {
  sm: 'h-20 w-20',
  md: 'h-28 w-28 sm:h-32 sm:w-32',
  lg: 'h-36 w-36 sm:h-44 sm:w-44',
}

export function GiftLoader({
  label = 'Preparing your sanctuary...',
  hint = 'Crafted with care, just for someone special.',
  size = 'md',
  fullScreen = false,
  className,
  ...props
}: GiftLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'animate-fade-in flex flex-col items-center justify-center text-center select-none',
        fullScreen
          ? 'bg-bg-base/95 fixed inset-0 z-50 min-h-screen w-full px-4 backdrop-blur-md'
          : 'my-auto min-h-[80vh] w-full flex-1 px-4 py-12',
        className,
      )}
      {...props}
    >
      {/* Visual Ambient Light & Animated Gift */}
      <div className="relative flex items-center justify-center">
        {/* Breathing ambient warmth glow */}
        <div className="bg-primary/15 animate-glow pointer-events-none absolute -inset-6 rounded-full blur-2xl" />
        <div className="bg-accent/20 pointer-events-none absolute -inset-2 animate-pulse rounded-full blur-xl" />

        {/* SVG Animated Keepsake Gift Box */}
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(SIZE_MAP[size], 'relative drop-shadow-sm')}
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="giftBodyGrad"
              x1="25"
              y1="56"
              x2="95"
              y2="102"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--color-primary, #A34835)" />
              <stop
                offset="1"
                stopColor="var(--color-primary-hover, #8E3827)"
              />
            </linearGradient>
            <linearGradient
              id="giftLidGrad"
              x1="20"
              y1="42"
              x2="100"
              y2="57"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--color-primary-hover, #B35440)" />
              <stop offset="1" stopColor="var(--color-primary, #A34835)" />
            </linearGradient>
            <linearGradient
              id="ribbonGrad"
              x1="54"
              y1="36"
              x2="66"
              y2="102"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--color-accent, #EACABC)" />
              <stop offset="1" stopColor="var(--color-secondary, #D9B5A3)" />
            </linearGradient>
          </defs>

          {/* Dynamic Ground Shadow */}
          <ellipse
            cx="60"
            cy="110"
            rx="34"
            ry="6"
            className="animate-gift-shadow fill-text-primary/20 dark:fill-black/40"
          />

          {/* Floating Magic Sparkles emitting from the gift */}
          {/* Sparkle 1: Top Right */}
          <path
            d="M86 28 C86 31 89 33 92 33 C89 33 86 35 86 38 C86 35 83 33 80 33 C83 33 86 31 86 28 Z"
            className="animate-sparkle-1 fill-accent"
          />
          {/* Sparkle 2: Top Left */}
          <path
            d="M32 34 C32 36.5 34.5 38 37 38 C34.5 38 32 39.5 32 42 C32 39.5 29.5 38 27 38 C29.5 38 32 36.5 32 34 Z"
            className="animate-sparkle-2 fill-primary"
          />
          {/* Sparkle 3: High Center */}
          <path
            d="M60 14 C60 17 62.5 19 65 19 C62.5 19 60 21 60 24 C60 21 57.5 19 55 19 C57.5 19 60 17 60 14 Z"
            className="animate-sparkle-3 fill-accent"
          />

          {/* Animated Gift Box Group */}
          <g className="animate-gift-box">
            {/* Box Body */}
            <rect
              x="26"
              y="56"
              width="68"
              height="45"
              rx="9"
              fill="url(#giftBodyGrad)"
              className="stroke-border-base/15"
              strokeWidth="1"
            />

            {/* Vertical Ribbon on Body */}
            <rect
              x="53"
              y="56"
              width="14"
              height="45"
              fill="url(#ribbonGrad)"
            />

            {/* Horizontal Ribbon on Body */}
            <rect
              x="26"
              y="74"
              width="68"
              height="10"
              fill="url(#ribbonGrad)"
              opacity="0.9"
            />

            {/* Subtle highlight sheen */}
            <rect
              x="30"
              y="59"
              width="60"
              height="2"
              rx="1"
              fill="white"
              opacity="0.15"
            />

            {/* Animated Lid and Bow Group */}
            <g className="animate-gift-lid">
              {/* Box Lid */}
              <rect
                x="21"
                y="43"
                width="78"
                height="15"
                rx="6"
                fill="url(#giftLidGrad)"
                className="stroke-border-base/20"
                strokeWidth="1"
              />

              {/* Vertical Ribbon on Lid */}
              <rect
                x="53"
                y="43"
                width="14"
                height="15"
                fill="url(#ribbonGrad)"
              />

              {/* Elegant Tied Bow Loops */}
              {/* Left Bow Loop */}
              <path
                d="M57 41 C48 31 38 37 46 43 C51 47 56 43 57 41 Z"
                fill="url(#ribbonGrad)"
              />
              {/* Right Bow Loop */}
              <path
                d="M63 41 C72 31 82 37 74 43 C69 47 64 43 63 41 Z"
                fill="url(#ribbonGrad)"
              />

              {/* Central Bow Knot */}
              <circle cx="60" cy="42" r="4.5" className="fill-accent" />
              <circle cx="59" cy="41" r="2" fill="white" opacity="0.4" />

              {/* Hanging Ribbon Tails */}
              <path
                d="M58 44 C54 50 49 54 46 56"
                stroke="url(#ribbonGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M62 44 C66 50 71 54 74 56"
                stroke="url(#ribbonGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* Editorial Text Message */}
      <div className="mt-6 max-w-sm space-y-1.5 px-4">
        {label && (
          <h3 className="font-heading text-text-primary animate-slide-up text-lg font-medium tracking-tight sm:text-xl">
            {label}
          </h3>
        )}
        {hint && (
          <p className="text-text-secondary animate-slide-up font-sans text-xs leading-relaxed delay-100 sm:text-sm">
            {hint}
          </p>
        )}
      </div>
    </div>
  )
}
