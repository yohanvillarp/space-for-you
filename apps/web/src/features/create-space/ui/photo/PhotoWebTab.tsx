import { useState, useEffect } from 'react'
import { Search, Sparkles, Check, Globe } from 'lucide-react'
import { searchPhotos } from '@/features/create-space/lib/photo-catalog'
import type { WebPhotoSpecimen } from '@/features/create-space/lib/photo-catalog'
import { playSpatialSfx } from '@/shared/lib'

export interface PhotoWebTabProps {
  currentPhotoUrl?: string
  onSelectPhoto: (photoUrl: string) => void
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'birthday', label: 'Birthday' },
  { id: 'romance', label: 'Romance' },
  { id: 'memories', label: 'Memories' },
  { id: 'nature', label: 'Nature' },
  { id: 'stars', label: 'Stars' },
]

export function PhotoWebTab({
  currentPhotoUrl,
  onSelectPhoto,
}: PhotoWebTabProps) {
  const [selectedCat, setSelectedCat] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [photos, setPhotos] = useState<WebPhotoSpecimen[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let active = true

    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const results = await searchPhotos(searchQuery, selectedCat)
        if (active) setPhotos(results)
      } finally {
        if (active) setIsLoading(false)
      }
    }, 200)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [searchQuery, selectedCat])

  const handleSelect = (photo: WebPhotoSpecimen) => {
    playSpatialSfx('camera-shutter')
    onSelectPhoto(photo.url)
  }

  return (
    <div className="space-y-3.5">
      {/* Search Input */}
      <div className="relative">
        <Search className="text-text-muted absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
        <input
          data-search-input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search aesthetic web photos (or browse presets)..."
          className="font-heading w-full rounded-xl border border-[#443831] bg-[#1E1815] py-2 pr-3 pl-9 text-xs text-[#F3EAE1] placeholder-[#A99B90] outline-none focus:border-amber-500/60"
        />
      </div>

      {/* Category Pills */}
      <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCat(cat.id)}
            className={`shrink-0 cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
              selectedCat === cat.id
                ? 'bg-amber-400 text-[#1E1815]'
                : 'bg-[#251E1A] text-[#A99B90] hover:text-[#F3EAE1]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Results */}
      {isLoading ? (
        <div className="flex h-48 flex-col items-center justify-center gap-2 text-xs text-[#A99B90]">
          <Sparkles className="h-5 w-5 animate-spin text-amber-400" />
          <span>Searching editorial photos...</span>
        </div>
      ) : photos.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center gap-1 text-center text-xs text-[#A99B90]">
          <Globe className="h-6 w-6 text-[#A99B90]" />
          <span>No photos found for "{searchQuery}".</span>
          <span className="text-[10px]">
            Try searching another mood or category.
          </span>
        </div>
      ) : (
        <div className="grid max-h-72 grid-cols-3 gap-2 overflow-y-auto pr-1">
          {photos.map((photo) => {
            const isSelected = currentPhotoUrl === photo.url
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => handleSelect(photo)}
                className={`group relative aspect-square cursor-pointer overflow-hidden rounded-lg border transition-all ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/50'
                    : 'border-[#443831] hover:border-amber-400/60'
                }`}
              >
                <img
                  src={photo.thumbUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute right-1 bottom-1 left-1 truncate text-left text-[9px] text-[#F3EAE1] opacity-0 group-hover:opacity-100">
                  {photo.author}
                </span>
                {isSelected && (
                  <div className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[#1E1815]">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
