import { useSearchParams } from 'react-router'
import { THEME_REGISTRY } from '@/features/space-themes'
import type { SpaceTemplateId } from '@/entities/space'
import { FullscreenSpatialEditor } from '@/features/create-space/ui/FullscreenSpatialEditor'

const STORAGE_KEY = 'sfy_selected_template'

function resolveInitialTemplate(paramTemplate: string | null): SpaceTemplateId {
  if (paramTemplate && paramTemplate in THEME_REGISTRY) {
    try {
      localStorage.setItem(STORAGE_KEY, paramTemplate)
    } catch {
      // ignore storage access errors
    }
    return paramTemplate as SpaceTemplateId
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && saved in THEME_REGISTRY) {
      return saved as SpaceTemplateId
    }
  } catch {
    // ignore
  }

  return 'birthday'
}

export function SpaceStudioPage() {
  const [searchParams] = useSearchParams()
  const rawParam = searchParams.get('template')
  const rawScene = searchParams.get('scene') ?? undefined
  const rawSpaceId = searchParams.get('spaceId') ?? undefined
  const validTemplateId = resolveInitialTemplate(rawParam)

  return (
    <FullscreenSpatialEditor
      key={`${validTemplateId}_${rawSpaceId ?? 'default'}`}
      templateId={validTemplateId}
      initialSceneId={rawScene}
      spaceId={rawSpaceId}
    />
  )
}
