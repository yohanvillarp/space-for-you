export type LockVaultTheme =
  'snowy-safe' | 'cloud-vault' | 'vintage-diary' | 'velvet-chest'

export type LockKeypadTheme =
  | 'classic'
  | 'vintage-typewriter'
  | 'golden-luxury'
  | 'celestial-crystal'
  | 'clay-terracotta'

export interface SpaceProtectionConfig {
  enabled: boolean
  passcode: string
  hint?: string
  vaultTheme: LockVaultTheme
  keypadTheme?: LockKeypadTheme
  customTitle?: string
  customSubtitle?: string
  vaultX?: number
  vaultY?: number
  vaultRotation?: number
  keypadX?: number
  keypadY?: number
  keypadRotation?: number
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

export interface KeypadThemeMeta {
  id: LockKeypadTheme
  name: string
  subtitle: string
  icon: string
  accentColor: string
}

export const DEFAULT_PROTECTION_CONFIG: SpaceProtectionConfig = {
  enabled: false,
  passcode: '1234',
  vaultTheme: 'snowy-safe',
  keypadTheme: 'classic',
  customTitle: 'A Secret Keepsake',
  customSubtitle: 'Enter the secret combination to unlock',
  vaultX: 32,
  vaultY: 50,
  vaultRotation: 0,
  keypadX: 72,
  keypadY: 50,
  keypadRotation: 0,
}

export const KEYPAD_THEMES_CATALOG: KeypadThemeMeta[] = [
  {
    id: 'classic',
    name: 'Classic Keypad',
    subtitle: 'Frosted Glass Dial',
    icon: '🔢',
    accentColor: '#EACABC',
  },
  {
    id: 'vintage-typewriter',
    name: 'Vintage Typewriter',
    subtitle: 'Brass Mechanical Keys',
    icon: '⌨️',
    accentColor: '#D97706',
  },
  {
    id: 'golden-luxury',
    name: 'Golden Clavier',
    subtitle: 'Brushed Gold Filigree',
    icon: '✨',
    accentColor: '#F59E0B',
  },
  {
    id: 'celestial-crystal',
    name: 'Crystal Runes',
    subtitle: 'Glowing Pastel Starlight',
    icon: '🔮',
    accentColor: '#EC4899',
  },
  {
    id: 'clay-terracotta',
    name: 'Warm Terracotta',
    subtitle: 'Artisan Ceramic Blocks',
    icon: '🏺',
    accentColor: '#CF7056',
  },
]

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
