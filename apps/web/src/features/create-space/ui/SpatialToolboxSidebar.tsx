import { useState, useEffect, useRef } from 'react'
import type { DragEvent, ChangeEvent } from 'react'
import { Search, X, Plus, Loader2, Sparkles, Layers } from 'lucide-react'
import type { SpaceTemplateId } from '@/entities/space'
import type {
  SpatialItemType,
  ToolboxItemDef,
  SpatialItemData,
} from '../model/spatial-stage.types'
import { getToolboxItemsForTemplate } from '../lib/spatial-stage-defaults'
import { cn } from '@/shared/lib'

export interface SpatialToolboxSidebarProps {
  templateId: SpaceTemplateId
  onAddItem: (
    type: SpatialItemType,
    x?: number,
    y?: number,
    defaultData?: Partial<SpatialItemData>,
  ) => void
  className?: string
}

// Quick filter chips for Vector Stickers
const STICKER_CHIPS = [
  { label: 'Birthday', query: 'birthday' },
  { label: 'Love', query: 'heart' },
  { label: 'Sparkles', query: 'sparkles' },
  { label: 'Flowers', query: 'flower' },
  { label: 'Music', query: 'music' },
  { label: 'Cheers', query: 'cheers' },
  { label: 'Travel', query: 'travel' },
]

// Initial curated SVG stickers from open iconify collections
const INITIAL_POPULAR_STICKERS = [
  { id: 'fluent-emoji-flat:birthday-cake', name: 'Birthday Cake' },
  { id: 'fluent-emoji-flat:party-popper', name: 'Party Popper' },
  { id: 'fluent-emoji-flat:wrapped-gift', name: 'Gift Box' },
  { id: 'fluent-emoji-flat:red-heart', name: 'Red Heart' },
  { id: 'fluent-emoji-flat:sparkling-heart', name: 'Sparkling Heart' },
  { id: 'fluent-emoji-flat:sparkles', name: 'Magic Sparkles' },
  { id: 'fluent-emoji-flat:glowing-star', name: 'Golden Star' },
  { id: 'fluent-emoji-flat:cherry-blossom', name: 'Cherry Blossom' },
  { id: 'fluent-emoji-flat:bouquet', name: 'Flower Bouquet' },
  { id: 'fluent-emoji-flat:musical-notes', name: 'Music Notes' },
  { id: 'fluent-emoji-flat:clinking-glasses', name: 'Champagne' },
  { id: 'fluent-emoji-flat:love-letter', name: 'Love Letter' },
  { id: 'fluent-emoji-flat:camera-with-flash', name: 'Camera' },
  { id: 'fluent-emoji-flat:candle', name: 'Festive Candle' },
  { id: 'fluent-emoji-flat:balloon', name: 'Balloon' },
]

/**
 * Dedicated visual thumbnail renderer that accurately represents each physical keepsake
 */
function TangibleSpecimenPreview({ type }: { type: SpatialItemType }) {
  switch (type) {
    case 'candle':
      return (
        <div className="relative flex scale-90 flex-col items-center justify-center select-none">
          {/* Flame Corona Glow */}
          <div className="h-3.5 w-2 animate-pulse rounded-full bg-gradient-to-t from-amber-400 to-amber-200 shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
          {/* Candle Wick & Body */}
          <div className="h-5 w-2.5 rounded-t-xs bg-gradient-to-b from-amber-100 to-amber-300 shadow-xs" />
          {/* Ceramic Dish */}
          <div className="mt-0.5 h-1.5 w-8 rounded-full border border-stone-500/40 bg-stone-600 shadow-xs" />
        </div>
      )

    case 'greeting-card':
      return (
        <div className="relative flex flex-col items-center justify-center select-none">
          <div className="absolute -top-1.5 left-1/2 z-10 h-1.5 w-5 -translate-x-1/2 rotate-1 rounded-xs border-t border-b border-amber-300/40 bg-amber-400/50" />
          <div className="flex h-10 w-13 flex-col justify-between rounded-md border border-amber-500/30 bg-[#FAF7F0] p-1 shadow-xs">
            <div className="h-1 w-6 rounded bg-amber-700/40" />
            <div className="space-y-0.5">
              <div className="h-0.5 w-full rounded bg-stone-300" />
              <div className="h-0.5 w-4/5 rounded bg-stone-300" />
            </div>
          </div>
        </div>
      )

    case 'confetti-stars':
      return (
        <div className="flex items-center justify-center gap-1.5 text-amber-300 select-none">
          <span className="animate-pulse text-xs">✦</span>
          <span className="text-base text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]">
            ✧
          </span>
          <span className="text-xs text-amber-200">✦</span>
        </div>
      )

    case 'wax-envelope':
      return (
        <div className="relative flex flex-col items-center justify-center select-none">
          <div className="absolute -top-1.5 right-1 z-10 h-1.5 w-4 -rotate-3 rounded-xs border-t border-b border-rose-300/40 bg-rose-400/40" />
          <div className="relative flex h-10 w-14 items-center justify-center overflow-hidden rounded-md border border-[#3B302A] bg-[#221B17] p-1 shadow-xs">
            <div className="absolute inset-0 border-b border-[#3B302A] bg-[#2A221E] [clip-path:polygon(0_0,50%_50%,100%_0)]" />
            <div className="relative z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-rose-400/40 bg-[#A34835] shadow-xs">
              <span className="text-[6px] text-rose-200">♥</span>
            </div>
          </div>
        </div>
      )

    case 'vinyl-player':
      return (
        <div className="relative flex items-center justify-center select-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-700 bg-stone-900 shadow-md [background:radial-gradient(circle,#1c1917_30%,#292524_55%,#1c1917_70%,#0c0a09_100%)]">
            <div className="flex h-4 w-4 items-center justify-center rounded-full border border-amber-400/30 bg-[#A34835]">
              <div className="h-1 w-1 rounded-full bg-stone-900" />
            </div>
          </div>
        </div>
      )

    case 'rose-petals':
      return (
        <div className="flex items-center justify-center gap-1 text-rose-500/80 select-none">
          <span className="rotate-12 text-sm drop-shadow-xs">❧</span>
          <span className="-rotate-45 text-base text-rose-600/90 drop-shadow-xs">
            ❧
          </span>
          <span className="rotate-30 text-xs text-rose-400/80 drop-shadow-xs">
            ❧
          </span>
        </div>
      )

    case 'airmail-postcard':
      return (
        <div className="relative flex flex-col items-center justify-center select-none">
          <div className="relative flex h-10 w-14 flex-col justify-between overflow-hidden rounded-xs border border-stone-400 bg-[#FAF6EE] p-1 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-0.5">
              <div className="h-1 w-5 rounded-xs bg-teal-700/40" />
              <div className="flex h-2 w-2 items-center justify-center rounded-xs border border-red-500/40 bg-red-100 text-[5px] text-red-600">
                ✉
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="h-0.5 w-full rounded bg-stone-300" />
              <div className="h-0.5 w-3/4 rounded bg-stone-300" />
            </div>
          </div>
        </div>
      )

    case 'cassette-tape':
      return (
        <div className="flex h-9 w-14 flex-col justify-between rounded-md border border-stone-600 bg-stone-900 p-1 shadow-xs select-none">
          <div className="flex h-2.5 w-full items-center justify-center rounded-xs bg-[#FAF7F0] px-1">
            <div className="h-0.5 w-7 rounded bg-stone-400" />
          </div>
          <div className="flex items-center justify-around py-0.5">
            <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full border border-stone-400 bg-stone-800">
              <div className="h-0.5 w-0.5 rounded-full bg-stone-300" />
            </div>
            <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full border border-stone-400 bg-stone-800">
              <div className="h-0.5 w-0.5 rounded-full bg-stone-300" />
            </div>
          </div>
        </div>
      )

    case 'polaroid':
      return (
        <div className="relative flex flex-col items-center justify-center select-none">
          <div className="flex h-11 w-9 flex-col justify-between rounded-xs border border-stone-300 bg-[#FAF7F0] p-1 shadow-xs">
            <div className="rounded-2xs flex h-6 w-full items-center justify-center bg-gradient-to-tr from-amber-600/30 via-orange-500/20 to-yellow-200/30 text-[10px]">
              📷
            </div>
            <div className="mx-auto h-0.5 w-4 rounded bg-stone-300" />
          </div>
        </div>
      )

    case 'sticky-note':
      return (
        <div className="relative flex flex-col items-center justify-center select-none">
          <div className="absolute -top-1 left-1/2 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full border border-amber-600 bg-amber-500 shadow-xs" />
          <div className="flex h-10 w-11 flex-col justify-center space-y-0.5 rounded-sm border border-amber-300/70 bg-amber-100 p-1 shadow-xs">
            <div className="h-0.5 w-full rounded bg-amber-700/30" />
            <div className="h-0.5 w-4/5 rounded bg-amber-700/30" />
            <div className="h-0.5 w-3/5 rounded bg-amber-700/30" />
          </div>
        </div>
      )

    case 'washi-tape':
      return (
        <div className="flex items-center justify-center select-none">
          <div className="h-3 w-12 -rotate-3 rounded-xs border-t border-b border-amber-400/50 bg-amber-300/40 [background-image:repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(245,158,11,0.15)_2px,rgba(245,158,11,0.15)_4px)] shadow-xs" />
        </div>
      )

    default:
      return (
        <div className="flex items-center justify-center text-[#CF7056]">
          <Sparkles className="h-6 w-6" />
        </div>
      )
  }
}

export function SpatialToolboxSidebar({
  templateId,
  onAddItem,
  className,
}: SpatialToolboxSidebarProps) {
  const [activeCategory, setActiveCategory] = useState<'objects' | 'stickers'>(
    'objects',
  )
  const [objectFilter, setObjectFilter] = useState<
    'all' | 'stage' | 'universal'
  >('all')

  // Sticker Search State
  const [searchQuery, setSearchQuery] = useState('')
  const [fetchedResults, setFetchedResults] = useState<
    { id: string; name: string }[]
  >([])
  const [isSearching, setIsSearching] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const availableItems = getToolboxItemsForTemplate(templateId)

  // Filter objects by search query and category pill
  const filteredObjects = availableItems.filter((item) => {
    const matchesCategory =
      objectFilter === 'all' ? true : item.category === objectFilter
    const matchesSearch = searchQuery.trim()
      ? item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true
    return matchesCategory && matchesSearch
  })

  const displayedStickers = searchQuery.trim()
    ? fetchedResults
    : INITIAL_POPULAR_STICKERS

  // Debounced Search via Iconify API
  useEffect(() => {
    if (activeCategory !== 'stickers' || !searchQuery.trim()) {
      return
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const prefixes = 'fluent-emoji-flat,twemoji,noto'
        const url = `https://api.iconify.design/search?query=${encodeURIComponent(
          searchQuery.trim(),
        )}&prefixes=${prefixes}&limit=36`
        const res = await fetch(url)
        const data = await res.json()

        if (data.icons && Array.isArray(data.icons) && data.icons.length > 0) {
          const formatted = data.icons.map((iconStr: string) => {
            const parts = iconStr.split(':')
            const rawName = parts[1] || iconStr
            const formattedName = rawName
              .split('-')
              .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(' ')
            return { id: iconStr, name: formattedName }
          })
          setFetchedResults(formatted)
        } else {
          setFetchedResults([])
        }
      } catch {
        setFetchedResults([])
      } finally {
        setIsSearching(false)
      }
    }, 320)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery, activeCategory])

  const getIconSvgUrl = (iconId: string) => {
    const [prefix, name] = iconId.split(':')
    return `https://api.iconify.design/${prefix}/${name}.svg`
  }

  // Drag start for Tangible Keepsake
  const handleDragKeepsake = (
    e: DragEvent<HTMLDivElement>,
    item: ToolboxItemDef,
  ) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item))
    e.dataTransfer.effectAllowed = 'copy'
  }

  // Drag start for Vector Sticker
  const handleDragSticker = (
    e: DragEvent<HTMLDivElement>,
    sticker: { id: string; name: string },
  ) => {
    const svgUrl = getIconSvgUrl(sticker.id)
    const payload = {
      type: 'vector-sticker' as SpatialItemType,
      label: sticker.name,
      category: 'universal',
      description: 'Vector SVG Sticker',
      defaultData: {
        svgUrl,
        stickerName: sticker.name,
        title: sticker.name,
      },
    }
    e.dataTransfer.setData('application/json', JSON.stringify(payload))
    e.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <aside
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-2xl border border-[#3B302A] bg-[#14110F] text-[#F3EAE1] shadow-2xl select-none',
        className,
      )}
    >
      {/* =========================================================================
          REGION A: COMPACT STUDIO HEADER
          ========================================================================= */}
      <div className="flex items-center justify-between border-b border-[#3B302A] bg-[#171310] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-md border border-[#3B302A] bg-[#2A221E] text-[#CF7056]">
            <Layers className="h-3 w-3" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-sans text-[9px] font-semibold tracking-widest text-[#A99B90] uppercase">
                Studio Library
              </span>
            </div>
            <h3 className="font-heading mt-0.5 text-sm leading-tight font-medium text-[#F3EAE1]">
              Elements
            </h3>
          </div>
        </div>

        {/* Asset Count Indicator */}
        <span className="rounded-full border border-[#3B302A] bg-[#211B18] px-2 py-0.5 font-sans text-[10px] text-[#A99B90]">
          {activeCategory === 'objects'
            ? `${filteredObjects.length} objects`
            : `${displayedStickers.length} vectors`}
        </span>
      </div>

      {/* =========================================================================
          REGION B: SEARCH & NAVIGATION
          ========================================================================= */}
      <div className="space-y-2.5 border-b border-[#3B302A] bg-[#171310]/80 p-3">
        {/* Refined Search Input */}
        <div className="relative">
          <Search className="pointer-events-none absolute top-2.5 left-2.5 h-3.5 w-3.5 text-[#A99B90]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value
              setSearchQuery(val)
              if (activeCategory === 'stickers') {
                setIsSearching(Boolean(val.trim()))
              }
            }}
            placeholder="Search elements..."
            className="w-full rounded-lg border border-[#3B302A] bg-[#211B18] py-1.5 pr-7 pl-8 font-sans text-xs text-[#F3EAE1] transition-colors outline-none placeholder:text-[#A99B90]/60 focus:border-[#CF7056] focus:ring-1 focus:ring-[#CF7056]/30"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setIsSearching(false)
              }}
              title="Clear search"
              className="absolute top-2 right-2 cursor-pointer p-0.5 text-[#A99B90] hover:text-[#F3EAE1]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Category Switcher: Objects vs Stickers */}
        <div className="grid grid-cols-2 gap-1 rounded-lg border border-[#3B302A] bg-[#211B18] p-0.5 font-sans text-xs">
          <button
            type="button"
            onClick={() => setActiveCategory('objects')}
            className={cn(
              'flex cursor-pointer items-center justify-center gap-1.5 rounded-md py-1 text-xs font-medium transition-all',
              activeCategory === 'objects'
                ? 'border border-[#3B302A] bg-[#2A221E] text-[#F3EAE1] shadow-xs'
                : 'text-[#A99B90] hover:text-[#F3EAE1]',
            )}
          >
            <span>Objects</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('stickers')}
            className={cn(
              'flex cursor-pointer items-center justify-center gap-1.5 rounded-md py-1 text-xs font-medium transition-all',
              activeCategory === 'stickers'
                ? 'border border-[#3B302A] bg-[#2A221E] font-semibold text-[#CF7056] shadow-xs'
                : 'text-[#A99B90] hover:text-[#F3EAE1]',
            )}
          >
            <Sparkles className="h-3 w-3 text-[#CF7056]" />
            <span>Stickers</span>
          </button>
        </div>

        {/* Secondary Filter Chips Row */}
        {activeCategory === 'objects' ? (
          <div className="flex items-center gap-1 pt-0.5">
            <button
              type="button"
              onClick={() => setObjectFilter('all')}
              className={cn(
                'flex-1 cursor-pointer rounded-full border px-2 py-0.5 text-center font-sans text-[10px] font-medium transition-colors',
                objectFilter === 'all'
                  ? 'border-[#CF7056] bg-[#CF7056] font-semibold text-[#14110F]'
                  : 'border-[#3B302A] bg-[#211B18] text-[#A99B90] hover:text-[#F3EAE1]',
              )}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setObjectFilter('stage')}
              className={cn(
                'flex-1 cursor-pointer truncate rounded-full border px-2 py-0.5 text-center font-sans text-[10px] font-medium transition-colors',
                objectFilter === 'stage'
                  ? 'border-[#CF7056] bg-[#CF7056] font-semibold text-[#14110F]'
                  : 'border-[#3B302A] bg-[#211B18] text-[#A99B90] hover:text-[#F3EAE1]',
              )}
            >
              Setting
            </button>
            <button
              type="button"
              onClick={() => setObjectFilter('universal')}
              className={cn(
                'flex-1 cursor-pointer rounded-full border px-2 py-0.5 text-center font-sans text-[10px] font-medium transition-colors',
                objectFilter === 'universal'
                  ? 'border-[#CF7056] bg-[#CF7056] font-semibold text-[#14110F]'
                  : 'border-[#3B302A] bg-[#211B18] text-[#A99B90] hover:text-[#F3EAE1]',
              )}
            >
              Universal
            </button>
          </div>
        ) : (
          <div className="flex [scrollbar-width:none] flex-wrap items-center gap-1 pt-0.5 [&::-webkit-scrollbar]:hidden">
            {STICKER_CHIPS.map((chip) => (
              <button
                key={chip.query}
                type="button"
                onClick={() => {
                  setSearchQuery(chip.query)
                  setIsSearching(true)
                }}
                className={cn(
                  'shrink-0 cursor-pointer rounded-full border px-2 py-0.5 font-sans text-[10px] font-medium transition-colors',
                  searchQuery === chip.query
                    ? 'border-[#CF7056] bg-[#CF7056] font-semibold text-[#14110F]'
                    : 'border-[#3B302A] bg-[#211B18] text-[#A99B90] hover:text-[#F3EAE1]',
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================================
          REGION C: ASSET DISCOVERY (VISUAL-FIRST GALLERY)
          ========================================================================= */}
      <div className="flex-1 [scrollbar-width:thin] [scrollbar-color:#3B302A_transparent] overflow-y-auto p-3">
        {/* 1. TANGIBLE OBJECTS GALLERY (Two-Column Visual Specimen Tiles) */}
        {activeCategory === 'objects' && (
          <div>
            {filteredObjects.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {filteredObjects.map((item) => (
                  <div
                    key={`${item.type}-${item.category}`}
                    draggable
                    onDragStart={(e) => handleDragKeepsake(e, item)}
                    onClick={() =>
                      onAddItem(
                        item.type,
                        undefined,
                        undefined,
                        item.defaultData,
                      )
                    }
                    title={`${item.label} • ${item.description}`}
                    className="group relative flex cursor-grab flex-col overflow-hidden rounded-xl border border-[#3B302A] bg-[#211B18] transition-all duration-200 hover:border-[#CF7056]/60 hover:bg-[#251F1C] hover:shadow-lg active:cursor-grabbing"
                  >
                    {/* Dedicated Visual Preview Area (Most of the tile) */}
                    <div className="relative flex h-20 w-full items-center justify-center overflow-hidden border-b border-[#3B302A]/50 bg-[#2A221E] p-2 transition-transform duration-200 group-hover:bg-[#2E2520]">
                      <TangibleSpecimenPreview type={item.type} />

                      {/* Unobtrusive Add Action Indicator (revealed on hover without shifting layout) */}
                      <div className="pointer-events-none absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-md border border-[#3B302A] bg-[#14110F]/80 text-[#CF7056] opacity-0 transition-opacity duration-180 group-hover:opacity-100">
                        <Plus className="h-3 w-3 stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Asset Name Label Below Preview */}
                    <div className="p-2">
                      <p className="truncate text-center font-sans text-[11px] font-medium text-[#F3EAE1]">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-40 flex-col items-center justify-center p-4 text-center">
                <span className="text-xl">🔍</span>
                <p className="font-heading mt-1 text-xs text-[#F3EAE1]">
                  No elements found
                </p>
                <p className="mt-0.5 font-sans text-[10px] text-[#A99B90]">
                  Try clearing your search query.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 2. VECTOR STICKERS GALLERY (Three-Column Visual SVG Grid) */}
        {activeCategory === 'stickers' && (
          <div>
            {isSearching ? (
              <div className="flex h-44 flex-col items-center justify-center space-y-2 text-center font-sans text-xs text-[#A99B90]">
                <Loader2 className="h-4 w-4 animate-spin text-[#CF7056]" />
                <span className="text-[11px]">Searching SVG vectors...</span>
              </div>
            ) : displayedStickers.length > 0 ? (
              <div className="grid grid-cols-3 gap-1.5">
                {displayedStickers.map((sticker) => {
                  const svgUrl = getIconSvgUrl(sticker.id)

                  return (
                    <div
                      key={sticker.id}
                      draggable
                      onDragStart={(e) => handleDragSticker(e, sticker)}
                      onClick={() =>
                        onAddItem('vector-sticker', undefined, undefined, {
                          svgUrl,
                          stickerName: sticker.name,
                          title: sticker.name,
                        })
                      }
                      title={`${sticker.name} • Click to add or drag to place`}
                      className="group relative flex aspect-square cursor-grab flex-col items-center justify-center rounded-xl border border-[#3B302A] bg-[#211B18] p-1.5 transition-all duration-200 hover:scale-103 hover:border-[#CF7056]/60 hover:bg-[#2A221E] active:cursor-grabbing"
                    >
                      {/* Scalable SVG Preview */}
                      <img
                        src={svgUrl}
                        alt={sticker.name}
                        loading="lazy"
                        className="pointer-events-none h-8 w-8 drop-shadow-xs transition-transform duration-200 group-hover:scale-110"
                      />

                      {/* Name below preview */}
                      <span className="mt-1 line-clamp-1 text-center font-sans text-[9px] text-[#A99B90] group-hover:text-[#F3EAE1]">
                        {sticker.name}
                      </span>

                      {/* Minimal hover indicator */}
                      <div className="pointer-events-none absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded bg-[#14110F]/80 text-[#CF7056] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        <Plus className="h-2.5 w-2.5" />
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="flex h-44 flex-col items-center justify-center p-4 text-center font-sans text-xs text-[#A99B90]">
                <p className="text-xs font-medium text-[#F3EAE1]">
                  No vectors found
                </p>
                <p className="mt-0.5 text-[10px]">
                  Try searching &ldquo;party&rdquo;, &ldquo;heart&rdquo;, or
                  &ldquo;star&rdquo;
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* =========================================================================
          REGION D: CONTEXTUAL FOOTER
          ========================================================================= */}
      <div className="border-t border-[#3B302A] bg-[#171310] px-3 py-2.5 text-center font-sans text-[10px] text-[#A99B90]">
        <span>Drag onto canvas · Click to add</span>
      </div>
    </aside>
  )
}
