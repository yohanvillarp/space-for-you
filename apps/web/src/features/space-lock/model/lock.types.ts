export type LockVaultTheme =
  'snowy-safe' | 'cloud-vault' | 'vintage-diary' | 'velvet-chest'

export interface SpaceProtectionConfig {
  enabled: boolean
  passcode: string
  hint?: string
  vaultTheme: LockVaultTheme
  customTitle?: string
  customSubtitle?: string
}

export interface VaultThemeMeta {
  id: LockVaultTheme
  name: string
  subtitle: string
  description: string
  icon: string
  accentColor: string
  badgeText: string
}

export const DEFAULT_PROTECTION_CONFIG: SpaceProtectionConfig = {
  enabled: false,
  passcode: '1234',
  vaultTheme: 'snowy-safe',
  customTitle: 'A Secret Keepsake',
  customSubtitle: 'Enter the secret combination to unlock',
}

export const VAULT_THEMES_CATALOG: VaultThemeMeta[] = [
  {
    id: 'snowy-safe',
    name: 'Snowy Steel Safe',
    subtitle: 'Frosted Winter Vault',
    description:
      'Heavy brushed steel safe surrounded by gentle falling snowflakes and a precision rotary combination dial.',
    icon: '❄️',
    accentColor: '#93C5FD',
    badgeText: 'Winter Magic',
  },
  {
    id: 'cloud-vault',
    name: 'Dreamy Cloud Vault',
    subtitle: 'Celestial Floating Chest',
    description:
      'Soft pastel clouds and shimmering starlight guarding a luminous golden lock box.',
    icon: '☁️',
    accentColor: '#F472B6',
    badgeText: 'Dreamy & Sweet',
  },
  {
    id: 'vintage-diary',
    name: 'Secret Leather Diary',
    subtitle: 'Antique Keepsake Journal',
    description:
      'Aged parchment and stitched leather bound by an ornate brass lock strap and wax seal.',
    icon: '📖',
    accentColor: '#F59E0B',
    badgeText: 'Vintage Romantic',
  },
  {
    id: 'velvet-chest',
    name: 'Velvet Jewelry Vault',
    subtitle: 'Terracotta & Gold Trinket Box',
    description:
      'Deep terracotta velvet lined with brushed gold filigree and an intimate clasp.',
    icon: '🎁',
    accentColor: '#CF7056',
    badgeText: 'Warm & Elegant',
  },
]
