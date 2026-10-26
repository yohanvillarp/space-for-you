import { cn } from '@/shared/lib'

export interface AudioWaveformVisualizerProps {
  levels: number[]
  isRecording: boolean
  className?: string
}

export function AudioWaveformVisualizer({
  levels,
  isRecording,
  className,
}: AudioWaveformVisualizerProps) {
  const bars = levels && levels.length > 0 ? levels : Array(18).fill(0.15)

  return (
    <div
      className={cn(
        'flex h-16 w-full items-center justify-center gap-1.5 px-4',
        className,
      )}
      aria-label="Audio waveform visualizer"
    >
      {bars.map((level, i) => {
        // Height between 12% and 100%
        const heightPercent = isRecording
          ? Math.max(12, Math.min(100, level * 100))
          : Math.max(15, (Math.sin(i * 0.4) + 1.2) * 22)

        return (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: Fixed static index bars
            key={`bar-${i}`}
            className={cn(
              'w-1.5 rounded-full transition-all duration-75',
              isRecording
                ? level > 0.6
                  ? 'bg-amber-400'
                  : 'bg-[#CF7056]'
                : 'bg-white/20',
            )}
            style={{
              height: `${heightPercent}%`,
            }}
          />
        )
      })}
    </div>
  )
}
