import type { SpaceTemplateId } from '@/entities/space'
import type { TemplateUnboxingProps } from './unboxing.types'
import { BirthdayUnboxing } from './templates/BirthdayUnboxing'
import { RomanticUnboxing } from './templates/RomanticUnboxing'
import { FriendshipUnboxing } from './templates/FriendshipUnboxing'
import { DefaultUnboxing } from './templates/DefaultUnboxing'

export interface UnboxingTemplateRendererProps extends TemplateUnboxingProps {
  templateId?: SpaceTemplateId
}

export function UnboxingTemplateRenderer({
  templateId,
  ...props
}: UnboxingTemplateRendererProps) {
  switch (templateId) {
    case 'birthday':
      return <BirthdayUnboxing {...props} />
    case 'anniversary':
      return <RomanticUnboxing {...props} />
    case 'friendship':
      return <FriendshipUnboxing {...props} />
    default:
      return <DefaultUnboxing {...props} />
  }
}
