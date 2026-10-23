import { createNoiseBuffer } from './sfx-engine'

export function playVinylNeedle(
  ctx: AudioContext,
  now: number,
  volume: number,
): void {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(85, now)
  osc.frequency.exponentialRampToValueAtTime(35, now + 0.1)

  gain.gain.setValueAtTime(0.25 * volume, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.11)

  const noise = ctx.createBufferSource()
  noise.buffer = createNoiseBuffer(ctx, 0.12)
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(2400, now)
  filter.Q.setValueAtTime(4, now)

  const nGain = ctx.createGain()
  nGain.gain.setValueAtTime(0.2 * volume, now)
  nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.11)

  noise.connect(filter)
  filter.connect(nGain)
  nGain.connect(ctx.destination)
  noise.start(now)
  noise.stop(now + 0.12)
}

export function playCassetteClick(
  ctx: AudioContext,
  now: number,
  volume: number,
): void {
  const click1 = ctx.createOscillator()
  const g1 = ctx.createGain()
  click1.type = 'square'
  click1.frequency.setValueAtTime(520, now)
  click1.frequency.exponentialRampToValueAtTime(140, now + 0.035)
  g1.gain.setValueAtTime(0.22 * volume, now)
  g1.gain.exponentialRampToValueAtTime(0.001, now + 0.035)
  click1.connect(g1)
  g1.connect(ctx.destination)
  click1.start(now)
  click1.stop(now + 0.04)

  const click2 = ctx.createOscillator()
  const g2 = ctx.createGain()
  click2.type = 'triangle'
  click2.frequency.setValueAtTime(420, now + 0.035)
  click2.frequency.exponentialRampToValueAtTime(90, now + 0.075)
  g2.gain.setValueAtTime(0.25 * volume, now + 0.035)
  g2.gain.exponentialRampToValueAtTime(0.001, now + 0.075)
  click2.connect(g2)
  g2.connect(ctx.destination)
  click2.start(now + 0.035)
  click2.stop(now + 0.08)
}

export function playMusicboxChime(
  ctx: AudioContext,
  now: number,
  volume: number,
): void {
  ;[0, 0.038].forEach((offset) => {
    const click = ctx.createOscillator()
    const clickGain = ctx.createGain()
    click.type = 'triangle'
    click.frequency.setValueAtTime(680, now + offset)
    click.frequency.exponentialRampToValueAtTime(180, now + offset + 0.025)
    clickGain.gain.setValueAtTime(0.18 * volume, now + offset)
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.025)
    click.connect(clickGain)
    clickGain.connect(ctx.destination)
    click.start(now + offset)
    click.stop(now + offset + 0.03)
  })

  const notes = [1318.5, 1661.2, 1975.5]
  notes.forEach((freq, idx) => {
    const noteStart = now + 0.07 + idx * 0.065
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, noteStart)

    gain.gain.setValueAtTime(0.24 * volume, noteStart)
    gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.45)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(noteStart)
    osc.stop(noteStart + 0.46)
  })
}

export function playCameraShutter(
  ctx: AudioContext,
  now: number,
  volume: number,
): void {
  const osc1 = ctx.createOscillator()
  const g1 = ctx.createGain()
  osc1.type = 'triangle'
  osc1.frequency.setValueAtTime(1200, now)
  osc1.frequency.exponentialRampToValueAtTime(260, now + 0.04)
  g1.gain.setValueAtTime(0.25 * volume, now)
  g1.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
  osc1.connect(g1)
  g1.connect(ctx.destination)
  osc1.start(now)
  osc1.stop(now + 0.05)

  const osc2 = ctx.createOscillator()
  const g2 = ctx.createGain()
  osc2.type = 'square'
  osc2.frequency.setValueAtTime(780, now + 0.06)
  osc2.frequency.exponentialRampToValueAtTime(180, now + 0.11)
  g2.gain.setValueAtTime(0.28 * volume, now + 0.06)
  g2.gain.exponentialRampToValueAtTime(0.001, now + 0.11)
  osc2.connect(g2)
  g2.connect(ctx.destination)
  osc2.start(now + 0.06)
  osc2.stop(now + 0.12)
}

export function playPinThud(
  ctx: AudioContext,
  now: number,
  volume: number,
): void {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(1900, now)
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.04)
  gain.gain.setValueAtTime(0.25 * volume, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.05)

  const thud = ctx.createOscillator()
  const thudGain = ctx.createGain()
  thud.type = 'sine'
  thud.frequency.setValueAtTime(140, now)
  thud.frequency.exponentialRampToValueAtTime(50, now + 0.09)
  thudGain.gain.setValueAtTime(0.35 * volume, now)
  thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09)
  thud.connect(thudGain)
  thudGain.connect(ctx.destination)
  thud.start(now)
  thud.stop(now + 0.1)
}

export function playPopSnap(
  ctx: AudioContext,
  now: number,
  volume: number,
): void {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(580, now)
  osc.frequency.exponentialRampToValueAtTime(140, now + 0.07)

  gain.gain.setValueAtTime(0.28 * volume, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.08)
}

export function playTactileTap(
  ctx: AudioContext,
  now: number,
  volume: number,
): void {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(420, now)
  osc.frequency.exponentialRampToValueAtTime(160, now + 0.03)

  gain.gain.setValueAtTime(0.15 * volume, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.035)
}
