import { useParams, Navigate } from 'react-router'
import { THEME_REGISTRY } from '@/features/space-themes'
import { ROUTES } from '@/shared/config'

export function SpaceStagePreviewPage() {
  const { templateId } = useParams<{ templateId: string }>()

  const validTemplateId =
    templateId && templateId in THEME_REGISTRY ? templateId : 'birthday'

  return (
    <Navigate
      to={`${ROUTES.STUDIO}?template=${encodeURIComponent(validTemplateId)}`}
      replace
    />
  )
}
