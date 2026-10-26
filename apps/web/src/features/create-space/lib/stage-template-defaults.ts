import type { SpaceTemplateId } from '@/entities/space'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'

export function getDefaultItemsForTemplate(
  templateId: SpaceTemplateId,
): SpatialItem[] {
  switch (templateId) {
    case 'birthday':
      return [
        {
          id: 'b-candle-1',
          type: 'candle',
          label: 'Birthday Candle',
          x: 50,
          y: 30,
          rotation: 0,
          zIndex: 10,
          data: {
            isLit: true,
            title: 'Make a Wish',
          },
        },
        {
          id: 'b-musicbox-1',
          type: 'music-box',
          label: 'Birthday Music Box',
          x: 74,
          y: 28,
          rotation: 2,
          zIndex: 8,
          data: {
            isPlaying: true,
            title: 'Happy Birthday (Music Box)',
            artist: 'Oleg Kirilkov',
            audioUrl:
              'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/9c/ff/8f/9cff8fc6-308a-a3c0-0116-3d3a44df5344/mzaf_7859720660966454213.plus.aac.p.m4a',
          },
        },
        {
          id: 'b-card-1',
          type: 'greeting-card',
          label: 'Dedication Card',
          x: 26,
          y: 56,
          rotation: -2,
          zIndex: 5,
          data: {
            title: 'Birthday Dedication',
            text: 'May this year bring gentle discoveries, quiet wonder, and all the happiness you deserve.',
          },
        },
        {
          id: 'b-polaroid-1',
          type: 'polaroid',
          label: 'Polaroid Memory',
          x: 72,
          y: 64,
          rotation: 3,
          zIndex: 6,
          data: {
            caption: 'Celebration Memories',
            date: 'Another beautiful year',
            tapeColor: 'gold',
          },
        },
        {
          id: 'b-confetti-1',
          type: 'confetti-stars',
          label: 'Golden Starlight',
          x: 50,
          y: 84,
          rotation: 0,
          zIndex: 2,
          data: {
            color: '#F59E0B',
          },
        },
      ]

    case 'anniversary':
      return [
        {
          id: 'r-envelope-1',
          type: 'wax-envelope',
          label: 'Wax-Sealed Letter',
          x: 36,
          y: 45,
          rotation: -1,
          zIndex: 8,
          data: {
            isSealed: true,
            title: 'A Private Love Letter',
            text: 'To the one who turned everyday moments into our favorite place.',
          },
        },
        {
          id: 'r-vinyl-1',
          type: 'vinyl-player',
          label: 'Vinyl Turntable',
          x: 74,
          y: 35,
          rotation: 2,
          zIndex: 5,
          data: {
            isPlaying: true,
            title: 'Our Special Song',
          },
        },
        {
          id: 'r-polaroid-1',
          type: 'polaroid',
          label: 'Polaroid Memory',
          x: 20,
          y: 62,
          rotation: -4,
          zIndex: 6,
          data: {
            caption: 'Our Favorite Evening',
            date: 'Forever begins here',
            tapeColor: 'rose',
          },
        },
        {
          id: 'r-petals-1',
          type: 'rose-petals',
          label: 'Rose Petals',
          x: 60,
          y: 78,
          rotation: 12,
          zIndex: 2,
          data: {
            color: '#A34835',
          },
        },
      ]

    case 'friendship':
      return [
        {
          id: 'f-postcard-1',
          type: 'airmail-postcard',
          label: 'Airmail Postcard',
          x: 35,
          y: 44,
          rotation: -2,
          zIndex: 7,
          data: {
            title: 'Travel Postcard',
            text: 'For the memories made on the road, late-night laughs, and the adventures ahead.',
          },
        },
        {
          id: 'f-radio-1',
          type: 'vintage-radio',
          label: 'Roadtrip Radio',
          x: 74,
          y: 38,
          rotation: 2,
          zIndex: 6,
          data: {
            isPlaying: true,
            title: 'Roadtrip Mixtape • FM Dial',
          },
        },
        {
          id: 'f-polaroid-1',
          type: 'polaroid',
          label: 'Polaroid Memory',
          x: 18,
          y: 50,
          rotation: -3,
          zIndex: 5,
          data: {
            caption: 'Best Adventure Yet',
            date: 'Roadtrip Diaries',
            tapeColor: 'sage',
          },
        },
        {
          id: 'f-note-1',
          type: 'sticky-note',
          label: 'Handwritten Note',
          x: 55,
          y: 76,
          rotation: 2,
          zIndex: 4,
          data: {
            title: 'Secret Code',
            text: 'Remember rule #1: Never forget the snacks and always stop for photos.',
          },
        },
      ]

    default:
      return []
  }
}
