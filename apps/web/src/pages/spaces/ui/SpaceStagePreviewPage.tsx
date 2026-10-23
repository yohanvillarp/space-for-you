import { useParams } from 'react-router'
import { THEME_REGISTRY } from '@/features/space-themes'
import type { SpaceTemplateId } from '@/entities/space'
import { FullscreenSpatialEditor } from '@/features/create-space/ui/FullscreenSpatialEditor'

export function SpaceStagePreviewPage() {
  const { templateId } = useParams<{ templateId: string }>()

  const validTemplateId = (
    templateId && templateId in THEME_REGISTRY ? templateId : 'birthday'
  ) as SpaceTemplateId

  return (
    <FullscreenSpatialEditor
      key={validTemplateId}
      templateId={validTemplateId}
    />
  )
}
