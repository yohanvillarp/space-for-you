export interface WaveAnalyserSession {
  context: AudioContext
  analyser: AnalyserNode
  source: MediaStreamAudioSourceNode
  cleanup: () => void
}

export function createWaveAnalyser(
  stream: MediaStream,
): WaveAnalyserSession | null {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    if (!AudioContextClass) return null

    const context = new AudioContextClass()
    if (context.state === 'suspended') {
      context.resume().catch(() => {})
    }

    const analyser = context.createAnalyser()
    analyser.fftSize = 64
    analyser.smoothingTimeConstant = 0.8

    const source = context.createMediaStreamSource(stream)
    source.connect(analyser)

    const cleanup = () => {
      try {
        source.disconnect()
        analyser.disconnect()
        if (context.state !== 'closed') {
          context.close().catch(() => {})
        }
      } catch {
        // Ignore cleanup errors
      }
    }

    return { context, analyser, source, cleanup }
  } catch {
    return null
  }
}

export function sampleWaveLevels(
  analyser: AnalyserNode,
  barCount = 18,
): number[] {
  const dataArray = new Uint8Array(analyser.frequencyBinCount)
  analyser.getByteFrequencyData(dataArray)

  const step = Math.floor(dataArray.length / barCount) || 1
  const levels: number[] = []

  for (let i = 0; i < barCount; i += 1) {
    const value = dataArray[i * step] || 0
    const normalized = Math.min(1, Math.max(0.1, value / 255))
    levels.push(normalized)
  }

  return levels
}
