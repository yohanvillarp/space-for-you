import { useState, useEffect, useCallback } from 'react'
import type { SpaceTemplateId } from '@/entities/space'
import {
  DEFAULT_PROTECTION_CONFIG,
  BACKGROUND_THEMES_CATALOG,
  derivePasscodeHash,
  generateCryptographicSalt,
} from '@/features/space-lock'
import type { SpaceProtectionConfig } from '@/features/space-lock'
import {
  getSpaceStorageKeys,
  loadFromStorage,
  saveToStorage,
} from './multi-scene-storage'

export interface UseSpaceProtectionStateReturn {
  protectionConfig: SpaceProtectionConfig
  setProtectionConfig: React.Dispatch<
    React.SetStateAction<SpaceProtectionConfig>
  >
  handleUpdateProtection: (updates: Partial<SpaceProtectionConfig>) => void
}

export function useSpaceProtectionState(
  spaceId: string | undefined,
  templateId: SpaceTemplateId,
): UseSpaceProtectionStateReturn {
  const currentKey = getSpaceStorageKeys(spaceId, templateId).protectionKey

  const [protectionConfig, setProtectionConfig] =
    useState<SpaceProtectionConfig>(() => {
      const loaded = loadFromStorage(currentKey, DEFAULT_PROTECTION_CONFIG)
      const passcodeLength =
        loaded.passcodeLength ?? (loaded.passcode ? loaded.passcode.length : 4)
      const backgroundTheme =
        loaded.backgroundTheme || BACKGROUND_THEMES_CATALOG[0].id
      return { ...loaded, passcodeLength, backgroundTheme }
    })

  const [prevKey, setPrevKey] = useState(currentKey)
  if (prevKey !== currentKey) {
    setPrevKey(currentKey)
    const loaded = loadFromStorage(currentKey, DEFAULT_PROTECTION_CONFIG)
    const passcodeLength =
      loaded.passcodeLength ?? (loaded.passcode ? loaded.passcode.length : 4)
    const backgroundTheme =
      loaded.backgroundTheme || BACKGROUND_THEMES_CATALOG[0].id
    setProtectionConfig({ ...loaded, passcodeLength, backgroundTheme })
  }

  // Save to isolated localStorage on any state modification
  useEffect(() => {
    saveToStorage(currentKey, protectionConfig)
  }, [currentKey, protectionConfig])

  // Handler that handles cryptographic hash derivation seamlessly
  const handleUpdateProtection = useCallback(
    (updates: Partial<SpaceProtectionConfig>) => {
      let syncUpdates: Partial<SpaceProtectionConfig> = { ...updates }

      if (updates.passcode !== undefined) {
        const rawCode = updates.passcode.trim()
        syncUpdates = {
          ...syncUpdates,
          passcodeLength: rawCode.length > 0 ? rawCode.length : undefined,
        }
      }

      setProtectionConfig((prev) => ({
        ...prev,
        ...syncUpdates,
      }))

      const isTargetEnabled = updates.enabled ?? protectionConfig.enabled
      const rawCode = (
        updates.passcode ??
        protectionConfig.passcode ??
        '1234'
      ).trim()

      if (
        isTargetEnabled &&
        (updates.passcode !== undefined || !protectionConfig.passcodeHash)
      ) {
        if (rawCode !== '') {
          const salt =
            protectionConfig.passcodeSalt || generateCryptographicSalt()
          derivePasscodeHash(rawCode, salt)
            .then((hash) => {
              setProtectionConfig((prev) => ({
                ...prev,
                passcodeSalt: salt,
                passcodeHash: hash,
              }))
            })
            .catch(() => {
              // Fallback if subtle crypto error occurs
            })
        }
      }
    },
    [
      protectionConfig.enabled,
      protectionConfig.passcode,
      protectionConfig.passcodeHash,
      protectionConfig.passcodeSalt,
    ],
  )

  return {
    protectionConfig,
    setProtectionConfig,
    handleUpdateProtection,
  }
}
