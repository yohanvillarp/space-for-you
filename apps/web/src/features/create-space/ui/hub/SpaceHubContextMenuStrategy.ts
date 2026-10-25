import {
  Compass,
  Pencil,
  Copy,
  ArrowLeft,
  ArrowRight,
  Trash2,
  Sparkles,
  Mail,
  Plus,
  Lock,
  ShieldCheck,
  ShieldAlert,
  CalendarClock,
} from 'lucide-react'
import { createElement } from 'react'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import type { SpaceHubContextMenuTarget } from '@/features/create-space/ui/hub/space-hub-context-menu.types'
import {
  ContextMenuAction,
  ContextMenuSection,
} from '@/features/create-space/shared/context-menu'

export interface SpaceHubContextMenuHandlers {
  totalScenes: number
  isProtectionEnabled: boolean
  onOpenScene: (sceneId: string) => void
  onStartRename: (scene: SpaceScene) => void
  onOpenSchedule?: (scene: SpaceScene) => void
  onDuplicateScene?: (sceneId: string) => void
  onMoveScene?: (sceneId: string, direction: 'left' | 'right') => void
  onDeleteScene?: (sceneId: string) => void
  onAddQuickScene?: (type: 'free-canvas' | 'letters') => void
  onOpenAddScene: () => void
  onOpenVault?: () => void
  onToggleProtection?: () => void
}

/**
 * Strategy class building contextual menu sections for Space Hub using OOP.
 */
export class SpaceHubContextMenuStrategy {
  public static buildSections(
    target: SpaceHubContextMenuTarget,
    h: SpaceHubContextMenuHandlers,
  ): ContextMenuSection[] {
    switch (target.type) {
      case 'scene':
        return this.buildSceneSections(target.scene, target.index, h)
      case 'add-card':
        return this.buildAddCardSections(h)
      case 'hero':
      case 'background':
      default:
        return this.buildSpaceActionsSections(h)
    }
  }

  private static buildSceneSections(
    scene: SpaceScene,
    index: number,
    h: SpaceHubContextMenuHandlers,
  ): ContextMenuSection[] {
    const mainActions: ContextMenuAction[] = [
      new ContextMenuAction({
        id: 'hub-open-scene',
        label: 'Open Scene',
        icon: createElement(Compass, {
          className: 'h-3.5 w-3.5 text-amber-300',
        }),
        handler: () => h.onOpenScene(scene.id),
      }),
      new ContextMenuAction({
        id: 'hub-rename-scene',
        label: 'Rename Scene...',
        icon: createElement(Pencil, {
          className: 'h-3.5 w-3.5 text-stone-400',
        }),
        handler: () => h.onStartRename(scene),
      }),
    ]

    if (h.onOpenSchedule) {
      mainActions.push(
        new ContextMenuAction({
          id: 'hub-schedule-scene',
          label: scene.schedule?.enabled
            ? 'Edit Schedule...'
            : 'Schedule Release...',
          icon: createElement(CalendarClock, {
            className: 'h-3.5 w-3.5 text-amber-400',
          }),
          handler: () => h.onOpenSchedule?.(scene),
        }),
      )
    }

    if (h.onDuplicateScene) {
      mainActions.push(
        new ContextMenuAction({
          id: 'hub-dup-scene',
          label: 'Duplicate Scene',
          icon: createElement(Copy, {
            className: 'h-3.5 w-3.5 text-stone-400',
          }),
          handler: () => h.onDuplicateScene?.(scene.id),
        }),
      )
    }

    if (h.onMoveScene) {
      mainActions.push(
        new ContextMenuAction({
          id: 'hub-move-earlier',
          label: 'Move Earlier',
          icon: createElement(ArrowLeft, {
            className: 'h-3.5 w-3.5 text-stone-400',
          }),
          disabled: index === 0,
          handler: () => h.onMoveScene?.(scene.id, 'left'),
        }),
        new ContextMenuAction({
          id: 'hub-move-later',
          label: 'Move Later',
          icon: createElement(ArrowRight, {
            className: 'h-3.5 w-3.5 text-stone-400',
          }),
          disabled: index === h.totalScenes - 1,
          handler: () => h.onMoveScene?.(scene.id, 'right'),
        }),
      )
    }

    const sections: ContextMenuSection[] = [
      new ContextMenuSection('hub-scene-main', mainActions, scene.title),
    ]

    if (h.onDeleteScene) {
      sections.push(
        new ContextMenuSection('hub-scene-danger', [
          new ContextMenuAction({
            id: 'hub-delete-scene',
            label: 'Delete Scene',
            icon: createElement(Trash2, { className: 'h-3.5 w-3.5' }),
            variant: 'danger',
            disabled: h.totalScenes <= 1,
            handler: () => h.onDeleteScene?.(scene.id),
          }),
        ]),
      )
    }

    return sections
  }

  private static buildAddCardSections(
    h: SpaceHubContextMenuHandlers,
  ): ContextMenuSection[] {
    const quickActions: ContextMenuAction[] = []

    if (h.onAddQuickScene) {
      quickActions.push(
        new ContextMenuAction({
          id: 'quick-canvas',
          label: 'Memory Canvas',
          icon: createElement(Sparkles, {
            className: 'h-3.5 w-3.5 text-amber-300',
          }),
          handler: () => h.onAddQuickScene?.('free-canvas'),
        }),
        new ContextMenuAction({
          id: 'quick-letters',
          label: 'Heartfelt Letters',
          icon: createElement(Mail, { className: 'h-3.5 w-3.5 text-rose-300' }),
          handler: () => h.onAddQuickScene?.('letters'),
        }),
      )
    }

    return [
      new ContextMenuSection('quick-scenes', quickActions, 'Create New Scene'),
      new ContextMenuSection('browse-templates', [
        new ContextMenuAction({
          id: 'browse-all',
          label: 'Browse All Templates...',
          icon: createElement(Plus, {
            className: 'h-3.5 w-3.5 text-stone-400',
          }),
          handler: h.onOpenAddScene,
        }),
      ]),
    ]
  }

  private static buildSpaceActionsSections(
    h: SpaceHubContextMenuHandlers,
  ): ContextMenuSection[] {
    const creationActions: ContextMenuAction[] = []

    if (h.onAddQuickScene) {
      creationActions.push(
        new ContextMenuAction({
          id: 'bg-quick-canvas',
          label: 'Add Memory Canvas',
          icon: createElement(Sparkles, {
            className: 'h-3.5 w-3.5 text-amber-300',
          }),
          handler: () => h.onAddQuickScene?.('free-canvas'),
        }),
        new ContextMenuAction({
          id: 'bg-quick-letters',
          label: 'Add Heartfelt Letters',
          icon: createElement(Mail, { className: 'h-3.5 w-3.5 text-rose-300' }),
          handler: () => h.onAddQuickScene?.('letters'),
        }),
      )
    }

    creationActions.push(
      new ContextMenuAction({
        id: 'bg-browse',
        label: 'Browse Templates...',
        icon: createElement(Plus, { className: 'h-3.5 w-3.5 text-stone-400' }),
        handler: h.onOpenAddScene,
      }),
    )

    const sections: ContextMenuSection[] = [
      new ContextMenuSection(
        'space-creation',
        creationActions,
        'Space Actions',
      ),
    ]

    const configActions: ContextMenuAction[] = []
    if (h.onOpenVault) {
      configActions.push(
        new ContextMenuAction({
          id: 'bg-vault',
          label: 'Configure Entrance Vault',
          icon: createElement(Lock, {
            className: 'h-3.5 w-3.5 text-amber-300',
          }),
          handler: h.onOpenVault,
        }),
      )
    }

    if (h.onToggleProtection) {
      configActions.push(
        new ContextMenuAction({
          id: 'bg-protection',
          label: h.isProtectionEnabled ? 'Disable Passcode' : 'Enable Passcode',
          icon: h.isProtectionEnabled
            ? createElement(ShieldAlert, {
                className: 'h-3.5 w-3.5 text-amber-400',
              })
            : createElement(ShieldCheck, {
                className: 'h-3.5 w-3.5 text-emerald-400',
              }),
          handler: h.onToggleProtection,
        }),
      )
    }

    if (configActions.length > 0) {
      sections.push(new ContextMenuSection('space-config', configActions))
    }

    return sections
  }
}
