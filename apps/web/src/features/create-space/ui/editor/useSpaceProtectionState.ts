import { useState, useEffect, useCallback } from 'react'
import type { SpaceTemplateId } from '@/entities/space'
import {
  DEFAULT_PROTECTION_CONFIG,
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
    useState<SpaceProtectionConfig>(() =>
      loadFromStorage(currentKey, DEFAULT_PROTECTION_CONFIG),
    )

  const [prevKey, setPrevKey] = useState(currentKey)
  if (prevKey !== currentKey) {
    setPrevKey(currentKey)
    setProtectionConfig(loadFromStorage(currentKey, DEFAULT_PROTECTION_CONFIG))
  }

  // Save to isolated localStorage on any state modification
  useEffect(() => {
    saveToStorage(currentKey, protectionConfig)
  }, [currentKey, protectionConfig])

  // Handler that handles cryptographic hash derivation seamlessly
  const handleUpdateProtection = useCallback(
    async (updates: Partial<SpaceProtectionConfig>) => {
      let finalUpdates = { ...updates }

      if (updates.passcode !== undefined && updates.passcode.trim() !== '') {
        const rawCode = updates.passcode.trim()
        const salt =
          protectionConfig.passcodeSalt || generateCryptographicSalt()
        try {
          const hash = await derivePasscodeHash(rawCode, salt)
          finalUpdates = {
            ...finalUpdates,
            passcodeSalt: salt,
            passcodeHash: hash,
          }
        } catch {
          // Fallback if subtle crypto error occurs
        }
      }

      setProtectionConfig((prev) => ({
        ...prev,
        ...finalUpdates,
      }))
    },
    [protectionConfig.passcodeSalt],
  )

  return {
    protectionConfig,
    setProtectionConfig,
    handleUpdateProtection,
  }
}
