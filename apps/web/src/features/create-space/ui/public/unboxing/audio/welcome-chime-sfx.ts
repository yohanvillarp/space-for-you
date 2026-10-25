import { getAudioContext } from '@/shared/lib/audio/sfx/sfx-engine'

/**
 * Procedural synthesis of a celestial welcome chime chord using Web Audio API.
 * 0 bytes network payload, zero latency, 100% offline.
 */
export function playWelcomeChime(volume = 0.5): void {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  // Celestial F# Major 7th ascending frequencies (warm & celebratory)
  const notes = [369.99, 466.16, 554.37, 698.46, 739.99]
  const noteDelay = 0.08
  const duration = 2.4

  notes.forEach((freq, index) => {
    const startTime = now + index * noteDelay
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = index % 2 === 0 ? 'sine' : 'triangle'
    osc.frequency.setValueAtTime(freq, startTime)

    // Soft lowpass filter for silky, organic acoustic feel
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(2800, startTime)
    filter.frequency.exponentialRampToValueAtTime(600, startTime + duration)

    // Envelope: Gentle attack, lush decay
    const peakVolume = (volume * 0.28) / (1 + index * 0.15)
    gain.gain.setValueAtTime(0.0001, startTime)
    gain.gain.linearRampToValueAtTime(peakVolume, startTime + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start(startTime)
    osc.stop(startTime + duration)
  })
}
