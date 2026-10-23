/**
 * Spatial Keepsake Sound Effects Engine
 * Pure Web Audio API procedural synthesis — 0 network requests, 0 latency, 100% offline reliability.
 * Generates tactile, organic acoustic sound effects for digital keepsake artifacts.
 */

import { getAudioContext } from './sfx/sfx-engine'
import {
  playVinylNeedle,
  playCassetteClick,
  playMusicboxChime,
  playCameraShutter,
  playPinThud,
  playPopSnap,
  playTactileTap,
} from './sfx/mechanical-sfx'
import {
  playCandleBlow,
  playCandleSpark,
  playWaxCrack,
  playSealStamp,
  playPaperRustle,
  playNotePeel,
  playPetalRustle,
  playSparkleChime,
} from './sfx/organic-sfx'

export type SpatialSfxName =
  | 'candle-blow'
  | 'candle-spark'
  | 'wax-crack'
  | 'seal-stamp'
  | 'vinyl-needle'
  | 'cassette-click'
  | 'musicbox-chime'
  | 'camera-shutter'
  | 'paper-rustle'
  | 'pin-thud'
  | 'note-peel'
  | 'petal-rustle'
  | 'sparkle-chime'
  | 'pop-snap'
  | 'tactile-tap'

/**
 * Procedurally synthesizes and plays a tactile sound effect
 */
export function playSpatialSfx(sfx: SpatialSfxName, volume = 0.5): void {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  switch (sfx) {
    case 'candle-blow':
      playCandleBlow(ctx, now, volume)
      break
    case 'candle-spark':
      playCandleSpark(ctx, now, volume)
      break
    case 'wax-crack':
      playWaxCrack(ctx, now, volume)
      break
    case 'seal-stamp':
      playSealStamp(ctx, now, volume)
      break
    case 'vinyl-needle':
      playVinylNeedle(ctx, now, volume)
      break
    case 'cassette-click':
      playCassetteClick(ctx, now, volume)
      break
    case 'musicbox-chime':
      playMusicboxChime(ctx, now, volume)
      break
    case 'camera-shutter':
      playCameraShutter(ctx, now, volume)
      break
    case 'paper-rustle':
      playPaperRustle(ctx, now, volume)
      break
    case 'pin-thud':
      playPinThud(ctx, now, volume)
      break
    case 'note-peel':
      playNotePeel(ctx, now, volume)
      break
    case 'petal-rustle':
      playPetalRustle(ctx, now, volume)
      break
    case 'sparkle-chime':
      playSparkleChime(ctx, now, volume)
      break
    case 'pop-snap':
      playPopSnap(ctx, now, volume)
      break
    case 'tactile-tap':
      playTactileTap(ctx, now, volume)
      break
    default:
      break
  }
}
