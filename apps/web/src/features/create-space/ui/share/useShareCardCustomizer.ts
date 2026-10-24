import { useState, useCallback, useEffect } from 'react'
import type {
  ShareCardCustomization,
  ShareColorTarget,
} from './share-customizer.types'
import { playSpatialSfx } from '@/shared/lib'

const STORAGE_KEY = 'space_share_customization_v1'

const DEFAULT_CUSTOMIZATION: ShareCardCustomization = {
  qrStyle: 'minimal',
  qrColor: '#CF7056',
  cardBg: '#FAF7F2',
  textColor: '#221915',
  fontFamily: 'editorial',
  tapeColor: 'rose',
  customNote: 'A quiet, private world meant solely for you.',
}

export function useShareCardCustomizer(defaultAccentColor?: string) {
  const [customization, setCustomization] = useState<ShareCardCustomization>(
    () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<ShareCardCustomization>
          return {
            ...DEFAULT_CUSTOMIZATION,
            ...parsed,
            qrColor:
              parsed.qrColor ??
              defaultAccentColor ??
              DEFAULT_CUSTOMIZATION.qrColor,
          }
        }
      } catch {
        // Fallback
      }
      return {
        ...DEFAULT_CUSTOMIZATION,
        qrColor: defaultAccentColor ?? DEFAULT_CUSTOMIZATION.qrColor,
      }
    },
  )

  const [selectedTarget, setSelectedTarget] = useState<ShareColorTarget>('qr')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customization))
    } catch {
      // Ignore quota errors
    }
  }, [customization])

  const updateCustomization = useCallback(
    (updates: Partial<ShareCardCustomization>) => {
      setCustomization((prev) => ({ ...prev, ...updates }))
    },
    [],
  )

  const handleSelectTarget = useCallback((target: ShareColorTarget) => {
    setSelectedTarget(target)
    playSpatialSfx('tactile-tap')
  }, [])

  const applyColorToSelectedTarget = useCallback(
    (hex: string) => {
      playSpatialSfx('tactile-tap')
      setCustomization((prev) => {
        if (selectedTarget === 'qr') {
          return { ...prev, qrColor: hex }
        }
        if (selectedTarget === 'text') {
          return { ...prev, textColor: hex }
        }
        return { ...prev, cardBg: hex }
      })
    },
    [selectedTarget],
  )

  const applyHarmonyPalette = useCallback(
    (palette: {
      qrColor: string
      cardBg: string
      textColor: string
      tapeColor?: 'rose' | 'gold' | 'sage'
    }) => {
      playSpatialSfx('tactile-tap')
      setCustomization((prev) => ({
        ...prev,
        qrColor: palette.qrColor,
        cardBg: palette.cardBg,
        textColor: palette.textColor,
        tapeColor: palette.tapeColor ?? prev.tapeColor,
      }))
    },
    [],
  )

  return {
    customization,
    selectedTarget,
    setSelectedTarget: handleSelectTarget,
    updateCustomization,
    applyColorToSelectedTarget,
    applyHarmonyPalette,
  }
}
