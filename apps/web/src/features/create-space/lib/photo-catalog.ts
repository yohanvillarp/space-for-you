/**
 * Curated editorial catalog and Pexels API integration for spatial stage photos.
 */

export interface WebPhotoSpecimen {
  id: string
  url: string
  thumbUrl: string
  title: string
  author: string
  category: 'all' | 'birthday' | 'romance' | 'memories' | 'nature' | 'stars'
}

export const CURATED_PHOTO_CATALOG: WebPhotoSpecimen[] = [
  // --- Birthday & Celebration ---
  {
    id: 'b-1',
    url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80',
    thumbUrl:
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=300&q=80',
    title: 'Celebration Confetti',
    author: 'Joanna Kosinska',
    category: 'birthday',
  },
  {
    id: 'b-2',
    url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1000&q=80',
    thumbUrl:
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=300&q=80',
    title: 'Festive Balloon Joy',
    author: 'Adi Goldstein',
    category: 'birthday',
  },
  {
    id: 'b-3',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
    thumbUrl:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=300&q=80',
    title: 'Birthday Candle Glow',
    author: 'Brooke Lark',
    category: 'birthday',
  },

  // --- Romance & Anniversary ---
  {
    id: 'r-1',
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80',
    thumbUrl:
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=300&q=80',
    title: 'Warm Love Letters',
    author: 'Debby Hudson',
    category: 'romance',
  },
  {
    id: 'r-2',
    url: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=1000&q=80',
    thumbUrl:
      'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=300&q=80',
    title: 'Sunset Embrace',
    author: 'Scott Broome',
    category: 'romance',
  },
  {
    id: 'r-3',
    url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1000&q=80',
    thumbUrl:
      'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=300&q=80',
    title: 'Holding Hands in Golden Hour',
    author: 'Everton Vila',
    category: 'romance',
  },

  // --- Memories & Nostalgia ---
  {
    id: 'm-1',
    url: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&w=1000&q=80',
    thumbUrl:
      'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&w=300&q=80',
    title: 'Travel Journal Memories',
    author: 'Ian Schneider',
    category: 'memories',
  },
  {
    id: 'm-2',
    url: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=1000&q=80',
    thumbUrl:
      'https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=300&q=80',
    title: 'Vintage Film Camera',
    author: 'Alexander Andrews',
    category: 'memories',
  },
  {
    id: 'm-3',
    url: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=1000&q=80',
    thumbUrl:
      'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=300&q=80',
    title: 'Cozy Morning Coffee',
    author: 'Alisa Anton',
    category: 'memories',
  },

  // --- Nature & Serenity ---
  {
    id: 'n-1',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    thumbUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
    title: 'Tranquil Sea Shore',
    author: 'Sean Oulashin',
    category: 'nature',
  },
  {
    id: 'n-2',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
    thumbUrl:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=300&q=80',
    title: 'Morning Forest Mist',
    author: 'Sebastian Unrau',
    category: 'nature',
  },

  // --- Starlight & Wonder ---
  {
    id: 's-1',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1000&q=80',
    thumbUrl:
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=300&q=80',
    title: 'Starry Cosmic Night',
    author: 'Greg Rakozy',
    category: 'stars',
  },
]

interface PexelsPhoto {
  id: number
  alt?: string
  photographer: string
  src: {
    large: string
    medium: string
    small: string
  }
}

interface PexelsResponse {
  photos: PexelsPhoto[]
}

/**
 * Searches photos via Pexels API if VITE_PEXELS_API_KEY is configured,
 * otherwise performs local filtering over the curated catalog.
 */
export async function searchPhotos(
  query: string,
  category = 'all',
): Promise<WebPhotoSpecimen[]> {
  const apiKey = (
    import.meta.env.VITE_PEXELS_API_KEY as string | undefined
  )?.trim()

  if (apiKey && query.trim()) {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=12&orientation=landscape`,
        {
          headers: {
            Authorization: apiKey,
          },
        },
      )

      if (response.ok) {
        const data: PexelsResponse = await response.json()
        return data.photos.map((photo) => ({
          id: `pexels-${photo.id}`,
          url: photo.src.large,
          thumbUrl: photo.src.small || photo.src.medium,
          title: photo.alt || 'Pexels Photo',
          author: photo.photographer,
          category: 'all',
        }))
      }
    } catch {
      // Fallback to local curated items on network or authorization error
    }
  }

  // Local filtering fallback
  const cleanQ = query.toLowerCase().trim()
  return CURATED_PHOTO_CATALOG.filter((item) => {
    const matchesCat = category === 'all' || item.category === category
    const matchesQuery =
      !cleanQ ||
      item.title.toLowerCase().includes(cleanQ) ||
      item.author.toLowerCase().includes(cleanQ)
    return matchesCat && matchesQuery
  })
}
