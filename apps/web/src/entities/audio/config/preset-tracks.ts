import type { SpaceTemplateId } from '@/entities/space'
import type { AudioTrack } from '@/entities/audio/model/types'

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
      'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/09/36/bd/0936bddf-1f3e-05ee-60f9-5e9292bb5eaf/artwork.jpg/300x300bb.jpg',
  },
  anniversary: {
    id: 'track-romantic-piano',
    title: 'Midnight Romance (Soft Piano)',
    artist: 'Piano Dreams',
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/ee/d7/66/eed766eb-2005-632c-e318-df46b41a0b31/mzaf_10777420971562937150.plus.aac.p.m4a',
    duration: 30,
    source: 'preset',
    genre: 'Romantic Piano',
    templateId: 'anniversary',
    albumArt:
      'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/ec/48/bd/ec48bdca-89a9-0f18-e4b7-2aa36abb3a69/S_A193339059198.jpg/300x300bb.jpg',
  },
  friendship: {
    id: 'track-friendship-roadtrip',
    title: 'Roadtrip Mixtape (Acoustic Indie)',
    artist: 'Acoustic Guitar',
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3c/66/91/3c669114-9db4-ff5e-3afa-046efe902127/mzaf_2180028622212558007.plus.aac.p.m4a',
    duration: 30,
    source: 'preset',
    genre: 'Acoustic Indie',
    templateId: 'friendship',
    albumArt:
      'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/c2/94/3f/c2943fa6-e1fc-8ef5-f4c4-44c94e219879/cover_10326874.jpg/300x300bb.jpg',
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
      'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/69/d7/77/69d777f3-f45d-a755-71f0-57972ab2a6bc/artwork.jpg/300x300bb.jpg',
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
      'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/10/53/a6/1053a62c-6369-3a40-4044-6efff664ceb0/artwork.jpg/300x300bb.jpg',
  },
  PRESET_AUDIO_TRACKS.anniversary,
  PRESET_AUDIO_TRACKS.friendship,
  {
    id: 'track-lofi-sunset',
    title: 'Golden Sunset (Lofi Chill Beats)',
    artist: 'Lofi Jazz Terrace',
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/8f/37/81/8f378167-1fdc-779f-918b-02b7a78a058b/mzaf_3086083542344155835.plus.aac.p.m4a',
    duration: 30,
    source: 'preset',
    genre: 'Lo-Fi Chill',
    albumArt:
      'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/df/d1/47/dfd147d9-5934-9311-94cb-7b2d90d9ddfd/4550795088463_cover.jpg/300x300bb.jpg',
  },
  {
    id: 'track-candlelight-piano',
    title: 'Candlelight Waltz (Classical Piano)',
    artist: 'Matthew Mayer',
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/48/9e/0f/489e0f56-2c6a-b67f-5bff-8884255589cc/mzaf_8562272796320708818.plus.aac.p.m4a',
    duration: 30,
    source: 'preset',
    genre: 'Classical Piano',
    albumArt:
      'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/15/45/3d/15453d12-2f0c-d2ea-665d-5573df24da81/artwork.jpg/300x300bb.jpg',
  },
  {
    id: 'track-cozy-breeze',
    title: 'Warm Autumn Leaves & Guitar',
    artist: 'Acoustic Guitar Chill',
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/54/35/e9/5435e963-cea7-435c-6f79-e5bd9d80779a/mzaf_5276581093914584798.plus.aac.p.m4a',
    duration: 30,
    source: 'preset',
    genre: 'Acoustic Chill',
    albumArt:
      'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/e9/d0/99/e9d099a8-7ebd-d1d0-b232-2ed017d32035/055120361616.png/300x300bb.jpg',
  },
]

export function getPresetTrackForTemplate(
  templateId: SpaceTemplateId,
): AudioTrack {
  return PRESET_AUDIO_TRACKS[templateId] ?? PRESET_AUDIO_TRACKS.birthday
}
