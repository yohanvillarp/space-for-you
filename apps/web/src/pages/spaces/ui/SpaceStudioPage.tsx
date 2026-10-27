import { Navigate, useSearchParams } from 'react-router'
import { THEME_REGISTRY } from '@/features/space-themes'
import { getSavedSpaces, type SpaceTemplateId } from '@/entities/space'
import { MAX_USER_SPACES } from '@/features/create-space/lib/space-tier-limits'
import { FullscreenSpatialEditor } from '@/features/create-space/ui/FullscreenSpatialEditor'
import { ProtectedRoute } from '@/features/auth'
import { ROUTES } from '@/shared/config'

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
  const rawSpaceId = searchParams.get('spaceId')?.trim() || undefined
  const validTemplateId = resolveInitialTemplate(rawParam)

  if (!rawSpaceId) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  const savedSpaces = getSavedSpaces()
  const existsLocally = savedSpaces.some((s) => s.id === rawSpaceId)
  if (!existsLocally && savedSpaces.length >= MAX_USER_SPACES) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return (
    <ProtectedRoute>
      {() => (
        <FullscreenSpatialEditor
          key={`${validTemplateId}_${rawSpaceId}_${rawScene ?? 'default'}`}
          templateId={validTemplateId}
          initialSceneId={rawScene}
          spaceId={rawSpaceId}
        />
      )}
    </ProtectedRoute>
  )
}
