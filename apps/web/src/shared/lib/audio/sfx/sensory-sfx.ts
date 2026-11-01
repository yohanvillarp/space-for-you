/**
 * Procedural Audio Synthesis for Sensory and Tangible Keepsakes.
 * Pure Web Audio API — 0 external audio files, 0 network latency, 100% offline.
 */

import { createNoiseBuffer } from './sfx-engine'

/**
 * Satisfying acoustic cork pop for opening keepsake glass jars and bottles.
 */
export function playCorkPop(
  ctx: AudioContext,
  now: number,
  volume = 0.5,
): void {
  // Resonance cavity oscillator (rapid downward frequency drop)
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(520, now)
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.07)

  gain.gain.setValueAtTime(volume * 0.9, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.08)

  // Transient air rush puff
  const noise = ctx.createBufferSource()
  noise.buffer = createNoiseBuffer(ctx, 0.06)
  const noiseFilter = ctx.createBiquadFilter()
  noiseFilter.type = 'bandpass'
  noiseFilter.frequency.setValueAtTime(450, now)
  noiseFilter.Q.setValueAtTime(2.5, now)

  const noiseGain = ctx.createGain()
  noiseGain.gain.setValueAtTime(volume * 0.5, now)
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)

  noise.connect(noiseFilter)
  noiseFilter.connect(noiseGain)
  noiseGain.connect(ctx.destination)
  noise.start(now)
  noise.stop(now + 0.06)
}

/**
 * Ascending crystal bell arpeggio for floating firefly lights.
 */
export function playFireflyChime(
  ctx: AudioContext,
  now: number,
  volume = 0.5,
): void {
  const notes = [1318.51, 1661.22, 1975.53] // E6, G#6, B6
  notes.forEach((freq, idx) => {
    const noteTime = now + idx * 0.075
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, noteTime)

    gain.gain.setValueAtTime(0.001, noteTime)
    gain.gain.linearRampToValueAtTime(volume * 0.35, noteTime + 0.015)
    gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.38)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(noteTime)
    osc.stop(noteTime + 0.4)
  })
}

/**
 * Organic wood-wick crackle and warm embers snap.
 */
export function playWoodWickCrackle(
  ctx: AudioContext,
  now: number,
  volume = 0.5,
): void {
  const duration = 0.22
  const noise = ctx.createBufferSource()
  noise.buffer = createNoiseBuffer(ctx, duration)

  const filter = ctx.createBiquadFilter()
  filter.type = 'highpass'
  filter.frequency.setValueAtTime(1400, now)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(volume * 0.6, now)
  // Irregular crackle pulses
  gain.gain.setValueAtTime(volume * 0.7, now + 0.03)
  gain.gain.setValueAtTime(volume * 0.2, now + 0.07)
  gain.gain.setValueAtTime(volume * 0.8, now + 0.11)
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  noise.start(now)
  noise.stop(now + duration)
}

/**
 * Whispering sand and stardust grains flowing through glass hourglass.
 */
export function playHourglassCascade(
  ctx: AudioContext,
  now: number,
  volume = 0.5,
): void {
  const duration = 0.42
  const noise = ctx.createBufferSource()
  noise.buffer = createNoiseBuffer(ctx, duration)

  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(2600, now)
  filter.frequency.exponentialRampToValueAtTime(3200, now + duration)
  filter.Q.setValueAtTime(4.0, now)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.001, now)
  gain.gain.linearRampToValueAtTime(volume * 0.45, now + 0.06)
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  noise.start(now)
  noise.stop(now + duration)
}

/**
 * Crisp metallic hole punch and heavy paper perforation.
 */
export function playTicketPunch(
  ctx: AudioContext,
  now: number,
  volume = 0.5,
): void {
  // High-frequency mechanical shear click
  const osc = ctx.createOscillator()
  const oscGain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(2800, now)
  osc.frequency.exponentialRampToValueAtTime(420, now + 0.035)

  oscGain.gain.setValueAtTime(volume * 0.8, now)
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

  osc.connect(oscGain)
  oscGain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.04)

  // Cardboard punch thud
  const thud = ctx.createOscillator()
  const thudGain = ctx.createGain()
  thud.type = 'sine'
  thud.frequency.setValueAtTime(150, now)
  thud.frequency.exponentialRampToValueAtTime(45, now + 0.06)

  thudGain.gain.setValueAtTime(volume * 0.65, now)
  thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.065)

  thud.connect(thudGain)
  thudGain.connect(ctx.destination)
  thud.start(now)
  thud.stop(now + 0.065)
}

/**
 * Fine heirloom jewelry box latch click and polished hinge movement.
 */
export function playLocketClick(
  ctx: AudioContext,
  now: number,
  volume = 0.5,
): void {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(2450, now)
  osc.frequency.exponentialRampToValueAtTime(850, now + 0.045)

  gain.gain.setValueAtTime(volume * 0.55, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.05)
}

/**
 * Delicate dried flower rustle against clean herbarium glass.
 */
export function playHerbariumRustle(
  ctx: AudioContext,
  now: number,
  volume = 0.5,
): void {
  const duration = 0.16
  const noise = ctx.createBufferSource()
  noise.buffer = createNoiseBuffer(ctx, duration)

  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(3600, now)
  filter.Q.setValueAtTime(2.2, now)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(volume * 0.4, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  noise.start(now)
  noise.stop(now + duration)
}
