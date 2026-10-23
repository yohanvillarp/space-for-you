import type { SpaceTemplateId } from '@/entities/space'
import type { AudioTrack } from '../model/types'

export const PRESET_AUDIO_TRACKS: Record<SpaceTemplateId, AudioTrack> = {
  birthday: {
    id: 'track-birthday-musicbox',
    title: 'Happy Birthday (Music Box)',
    artist: 'Oleg Kirilkov',
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/9c/ff/8f/9cff8fc6-308a-a3c0-0116-3d3a44df5344/mzaf_7859720660966454213.plus.aac.p.m4a',
    duration: 34,
    source: 'preset',
    genre: 'Birthday Music Box',
    templateId: 'birthday',
    albumArt:
      'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/09/36/bd/0936bddf-1f3e-05ee-60f9-5e9292bb5eaf/artwork.jpg/100x100bb.jpg',
  },
  anniversary: {
    id: 'track-romantic-piano',
    title: 'Midnight Romance & Warm Strings',
    artist: 'Atelier Soundscape',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 423,
    source: 'preset',
    genre: 'Romantic',
    templateId: 'anniversary',
  },
  friendship: {
    id: 'track-friendship-roadtrip',
    title: 'Roadtrip Mixtape • Side A',
    artist: 'Atelier Soundscape',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 345,
    source: 'preset',
    genre: 'Acoustic Indie',
    templateId: 'friendship',
  },
}

/**
 * Editorial curated soundscapes available in Studio Library
 */
export const CURATED_SOUNDSCAPES: AudioTrack[] = [
  PRESET_AUDIO_TRACKS.birthday,
  {
    id: 'track-birthday-acoustic',
    title: 'Happy Birthday (Acoustic Guitar)',
    artist: 'Instrumental Tunes',
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/98/b3/3d/98b33da2-133a-725d-eb61-a32eae3ae1eb/mzaf_5798003139756148505.plus.aac.p.m4a',
    duration: 45,
    source: 'preset',
    genre: 'Birthday Acoustic',
    templateId: 'birthday',
    albumArt:
      'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/69/d7/77/69d777f3-f45d-a755-71f0-57972ab2a6bc/artwork.jpg/100x100bb.jpg',
  },
  {
    id: 'track-birthday-piano',
    title: 'Happy Birthday (Soft Piano)',
    artist: 'Piano Tunes',
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/6d/3f/9e/6d3f9e7d-49f6-c58f-c155-8128cb257e09/mzaf_8887709287241556647.plus.aac.p.m4a',
    duration: 40,
    source: 'preset',
    genre: 'Birthday Piano',
    templateId: 'birthday',
    albumArt:
      'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/10/53/a6/1053a62c-6369-3a40-4044-6efff664ceb0/artwork.jpg/100x100bb.jpg',
  },
  PRESET_AUDIO_TRACKS.anniversary,
  PRESET_AUDIO_TRACKS.friendship,
  {
    id: 'track-lofi-sunset',
    title: 'Golden Sunset & Vinyl Crackle',
    artist: 'Atelier Keepsake Studio',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 310,
    source: 'preset',
    genre: 'Lo-Fi Chill',
  },
  {
    id: 'track-candlelight-piano',
    title: 'Candlelight Waltz in D Minor',
    artist: 'Atelier Keepsake Studio',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    duration: 380,
    source: 'preset',
    genre: 'Classical Piano',
  },
  {
    id: 'track-cozy-breeze',
    title: 'Warm Autumn Leaves & Guitar',
    artist: 'Atelier Keepsake Studio',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    duration: 350,
    source: 'preset',
    genre: 'Acoustic',
  },
]

export function getPresetTrackForTemplate(
  templateId: SpaceTemplateId,
): AudioTrack {
  return PRESET_AUDIO_TRACKS[templateId] ?? PRESET_AUDIO_TRACKS.birthday
}
