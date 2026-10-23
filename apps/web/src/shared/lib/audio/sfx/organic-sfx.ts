import { createNoiseBuffer } from './sfx-engine'

export function playCandleBlow(
  ctx: AudioContext,
  now: number,
  volume: number,
): void {
  const noise = ctx.createBufferSource()
  noise.buffer = createNoiseBuffer(ctx, 0.4)

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(650, now)
  filter.frequency.exponentialRampToValueAtTime(180, now + 0.35)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0, now)
  gain.gain.linearRampToValueAtTime(0.25 * volume, now + 0.06)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38)

  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  noise.start(now)
  noise.stop(now + 0.4)
}

export function playCandleSpark(
  ctx: AudioContext,
  now: number,
  volume: number,
): void {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(750, now)
  osc.frequency.exponentialRampToValueAtTime(220, now + 0.08)

  gain.gain.setValueAtTime(0.2 * volume, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.09)

  const noise = ctx.createBufferSource()
  noise.buffer = createNoiseBuffer(ctx, 0.06)
  const filter = ctx.createBiquadFilter()
  filter.type = 'highpass'
  filter.frequency.setValueAtTime(2200, now)

  const noiseGain = ctx.createGain()
  noiseGain.gain.setValueAtTime(0.18 * volume, now)
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)

  noise.connect(filter)
  filter.connect(noiseGain)
  noiseGain.connect(ctx.destination)

  noise.start(now)
  noise.stop(now + 0.07)
}

export function playWaxCrack(
  ctx: AudioContext,
  now: number,
  volume: number,
): void {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(320, now)
  osc.frequency.exponentialRampToValueAtTime(80, now + 0.12)

  gain.gain.setValueAtTime(0.3 * volume, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.13)

  const noise = ctx.createBufferSource()
  noise.buffer = createNoiseBuffer(ctx, 0.1)
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(1400, now)
  filter.Q.setValueAtTime(3, now)

  const nGain = ctx.createGain()
  nGain.gain.setValueAtTime(0.35 * volume, now)
  nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09)

  noise.connect(filter)
  filter.connect(nGain)
  nGain.connect(ctx.destination)
  noise.start(now)
  noise.stop(now + 0.1)
}

export function playSealStamp(
  ctx: AudioContext,
  now: number,
  volume: number,
): void {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(180, now)
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.14)

  gain.gain.setValueAtTime(0.35 * volume, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.15)
}

export function playPaperRustle(
  ctx: AudioContext,
  now: number,
  volume: number,
): void {
  const noise = ctx.createBufferSource()
  noise.buffer = createNoiseBuffer(ctx, 0.2)
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(950, now)
  filter.frequency.linearRampToValueAtTime(1600, now + 0.18)
  filter.Q.setValueAtTime(2, now)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0, now)
  gain.gain.linearRampToValueAtTime(0.2 * volume, now + 0.04)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.19)

  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  noise.start(now)
  noise.stop(now + 0.2)
}

export function playNotePeel(
  ctx: AudioContext,
  now: number,
  volume: number,
): void {
  const noise = ctx.createBufferSource()
  noise.buffer = createNoiseBuffer(ctx, 0.16)
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(700, now)
  filter.frequency.exponentialRampToValueAtTime(1800, now + 0.15)
  filter.Q.setValueAtTime(1.5, now)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.05 * volume, now)
  gain.gain.linearRampToValueAtTime(0.18 * volume, now + 0.06)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)

  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  noise.start(now)
  noise.stop(now + 0.16)
}

export function playPetalRustle(
  ctx: AudioContext,
  now: number,
  volume: number,
): void {
  const noise = ctx.createBufferSource()
  noise.buffer = createNoiseBuffer(ctx, 0.28)
  const filter = ctx.createBiquadFilter()
  filter.type = 'highpass'
  filter.frequency.setValueAtTime(2800, now)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0, now)
  gain.gain.linearRampToValueAtTime(0.09 * volume, now + 0.08)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.27)

  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  noise.start(now)
  noise.stop(now + 0.28)
}

export function playSparkleChime(
  ctx: AudioContext,
  now: number,
  volume: number,
): void {
  const frequencies = [1046.5, 1318.51, 1567.98, 2093.0]
  frequencies.forEach((freq, idx) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const startTime = now + idx * 0.045

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, startTime)

    gain.gain.setValueAtTime(0.18 * volume, startTime)
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(startTime)
    osc.stop(startTime + 0.36)
  })
}
