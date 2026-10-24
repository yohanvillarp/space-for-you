import { MailOpen, Pencil, Copy, Plus, Trash2, Compass } from 'lucide-react'
import { createElement } from 'react'
import type { LetterItem } from '@/features/create-space/model/scenes.types'
import type { LettersContextMenuTarget } from '@/features/create-space/ui/letters/letters-context-menu.types'
import {
  ContextMenuAction,
  ContextMenuSection,
} from '@/features/create-space/shared/context-menu'

export interface LettersContextMenuHandlers {
  totalLetters: number
  onOpenLetter: (letter: LetterItem) => void
  onSelectLetter: (letterId: string) => void
  onDuplicateLetter?: (letterId: string) => void
  onDeleteLetter?: (letterId: string) => void
  onAddLetter?: () => void
  onBackToHub?: () => void
}

/**
 * Strategy class building contextual menu sections for the Letters area using OOP.
 */
export class LettersContextMenuStrategy {
  public static buildSections(
    target: LettersContextMenuTarget,
    h: LettersContextMenuHandlers,
  ): ContextMenuSection[] {
    if (target.type === 'envelope') {
      return this.buildEnvelopeSections(target.letter, h)
    }
    return this.buildDeskSections(h)
  }

  private static buildEnvelopeSections(
    letter: LetterItem,
    h: LettersContextMenuHandlers,
  ): ContextMenuSection[] {
    const mainActions: ContextMenuAction[] = [
      new ContextMenuAction({
        id: 'read-letter',
        label: 'Open & Edit Letter',
        icon: createElement(MailOpen, { className: 'h-4 w-4' }),
        handler: () => h.onOpenLetter(letter),
      }),
      new ContextMenuAction({
        id: 'edit-envelope',
        label: 'Edit in Workshop',
        icon: createElement(Pencil, { className: 'h-4 w-4' }),
        handler: () => h.onSelectLetter(letter.id),
      }),
    ]

    const manageActions: ContextMenuAction[] = []
    if (h.onDuplicateLetter) {
      manageActions.push(
        new ContextMenuAction({
          id: 'duplicate-letter',
          label: 'Duplicate Letter',
          icon: createElement(Copy, { className: 'h-4 w-4' }),
          handler: () => h.onDuplicateLetter!(letter.id),
        }),
      )
    }

    if (h.onAddLetter) {
      manageActions.push(
        new ContextMenuAction({
          id: 'add-letter',
          label: 'Add New Letter',
          icon: createElement(Plus, { className: 'h-4 w-4' }),
          handler: () => h.onAddLetter!(),
        }),
      )
    }

    const sections: ContextMenuSection[] = [
      new ContextMenuSection('envelope-main', mainActions, letter.title),
    ]

    if (manageActions.length > 0) {
      sections.push(new ContextMenuSection('envelope-manage', manageActions))
    }

    if (h.onDeleteLetter && h.totalLetters > 1) {
      sections.push(
        new ContextMenuSection('envelope-danger', [
          new ContextMenuAction({
            id: 'delete-letter',
            label: 'Delete Letter',
            variant: 'danger',
            icon: createElement(Trash2, { className: 'h-4 w-4' }),
            handler: () => h.onDeleteLetter!(letter.id),
          }),
        ]),
      )
    }

    return sections
  }

  private static buildDeskSections(
    h: LettersContextMenuHandlers,
  ): ContextMenuSection[] {
    const actions: ContextMenuAction[] = []

    if (h.onAddLetter) {
      actions.push(
        new ContextMenuAction({
          id: 'desk-add-letter',
          label: 'Add New Letter',
          variant: 'accent',
          icon: createElement(Plus, { className: 'h-4 w-4 text-amber-300' }),
          handler: () => h.onAddLetter!(),
        }),
      )
    }

    if (h.onBackToHub) {
      actions.push(
        new ContextMenuAction({
          id: 'desk-back-hub',
          label: 'Explore Space Hub',
          icon: createElement(Compass, { className: 'h-4 w-4' }),
          handler: () => h.onBackToHub!(),
        }),
      )
    }

    return [new ContextMenuSection('desk-actions', actions, 'Letters Desk')]
  }
}
