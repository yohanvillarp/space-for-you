import { useState, useMemo } from 'react'
import type {
  VaultThemeMeta,
  KeypadThemeMeta,
  BackgroundThemeMeta,
} from './lock.types'
import {
  VAULT_THEMES_CATALOG,
  KEYPAD_THEMES_CATALOG,
  BACKGROUND_THEMES_CATALOG,
} from './lock.types'
import { playSpatialSfx } from '@/shared/lib'

export type LockGateCategory = 'vaults' | 'keypads' | 'atmospheres'

export interface UseLockGateToolboxReturn {
  activeCategory: LockGateCategory
  setActiveCategory: (category: LockGateCategory) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  clearSearch: () => void
  filteredVaults: VaultThemeMeta[]
  filteredKeypads: KeypadThemeMeta[]
  filteredAtmospheres: BackgroundThemeMeta[]
  activePlaceholder: string
}

export function useLockGateToolbox(): UseLockGateToolboxReturn {
  const [activeCategory, setActiveCategoryState] =
    useState<LockGateCategory>('vaults')
  const [searchQuery, setSearchQuery] = useState('')

  const setActiveCategory = (category: LockGateCategory) => {
    playSpatialSfx('tactile-tap')
    setActiveCategoryState(category)
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredVaults = useMemo(() => {
    if (!normalizedQuery) return VAULT_THEMES_CATALOG
    return VAULT_THEMES_CATALOG.filter(
      (v) =>
        v.name.toLowerCase().includes(normalizedQuery) ||
        v.subtitle.toLowerCase().includes(normalizedQuery) ||
        v.description.toLowerCase().includes(normalizedQuery) ||
        v.badgeText.toLowerCase().includes(normalizedQuery),
    )
  }, [normalizedQuery])

  const filteredKeypads = useMemo(() => {
    if (!normalizedQuery) return KEYPAD_THEMES_CATALOG
    return KEYPAD_THEMES_CATALOG.filter(
      (k) =>
        k.name.toLowerCase().includes(normalizedQuery) ||
        k.subtitle.toLowerCase().includes(normalizedQuery),
    )
  }, [normalizedQuery])

  const filteredAtmospheres = useMemo(() => {
    if (!normalizedQuery) return BACKGROUND_THEMES_CATALOG
    return BACKGROUND_THEMES_CATALOG.filter(
      (b) =>
        b.name.toLowerCase().includes(normalizedQuery) ||
        b.subtitle.toLowerCase().includes(normalizedQuery),
    )
  }, [normalizedQuery])

  const activePlaceholder = useMemo(() => {
    switch (activeCategory) {
      case 'vaults':
        return 'Search entrance vaults...'
      case 'keypads':
        return 'Search keypad dials & styles...'
      case 'atmospheres':
        return 'Search entrance atmospheres...'
      default:
        return 'Search entrance objects...'
    }
  }, [activeCategory])

  return {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    clearSearch,
    filteredVaults,
    filteredKeypads,
    filteredAtmospheres,
    activePlaceholder,
  }
}
