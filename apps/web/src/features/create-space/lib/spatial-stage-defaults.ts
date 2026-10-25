import type { SpaceTemplateId } from '@/entities/space'
import type { ToolboxItemDef } from '@/features/create-space/model/spatial-stage.types'
import { TOOLBOX_ITEMS } from './stage-toolbox-items'

export { TOOLBOX_ITEMS } from './stage-toolbox-items'
export { getDefaultItemsForTemplate } from './stage-template-defaults'

export function getToolboxItemsForTemplate(
  templateId: SpaceTemplateId,
): ToolboxItemDef[] {
  return TOOLBOX_ITEMS.filter(
    (item) =>
      item.supportedTemplates === 'all' ||
      item.supportedTemplates.includes(templateId),
  )
}
