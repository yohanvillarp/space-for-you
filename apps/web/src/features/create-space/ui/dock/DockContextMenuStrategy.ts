import {
  Compass,
  Pencil,
  Copy,
  ArrowLeft,
  ArrowRight,
  Trash2,
  Home,
  Plus,
  Lock,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react'
import { createElement } from 'react'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import type { DockContextMenuTarget } from '@/features/create-space/ui/dock/dock-context-menu.types'
import {
  ContextMenuAction,
  ContextMenuSection,
} from '@/features/create-space/shared/context-menu'

export interface DockContextMenuHandlers {
  totalScenes: number
  isProtectionEnabled: boolean
  onSelectScene: (sceneId: string) => void
  onOpenAddScene: () => void
  onStartRename: (scene: SpaceScene) => void
  onDuplicateScene?: (sceneId: string) => void
  onMoveScene?: (sceneId: string, direction: 'left' | 'right') => void
  onDeleteScene?: (sceneId: string) => void
  onToggleProtection?: () => void
}

/**
 * Strategy class building contextual menu sections for the bottom dock using OOP.
 */
export class DockContextMenuStrategy {
  public static buildSections(
    target: DockContextMenuTarget,
    handlers: DockContextMenuHandlers,
  ): ContextMenuSection[] {
    switch (target.type) {
      case 'scene':
        return this.buildSceneSections(target.scene, target.index, handlers)
      case 'hub':
        return this.buildHubSections(handlers)
      case 'vault':
        return this.buildVaultSections(handlers)
      case 'dock':
      default:
        return this.buildDockSections(handlers)
    }
  }

  private static buildSceneSections(
    scene: SpaceScene,
    index: number,
    h: DockContextMenuHandlers,
  ): ContextMenuSection[] {
    const mainActions: ContextMenuAction[] = [
      new ContextMenuAction({
        id: 'open-scene',
        label: 'Open Scene',
        icon: createElement(Compass, {
          className: 'h-3.5 w-3.5 text-amber-300',
        }),
        handler: () => h.onSelectScene(scene.id),
      }),
      new ContextMenuAction({
        id: 'rename-scene',
        label: 'Rename Scene...',
        icon: createElement(Pencil, {
          className: 'h-3.5 w-3.5 text-stone-400',
        }),
        handler: () => h.onStartRename(scene),
      }),
    ]

    if (h.onDuplicateScene) {
      mainActions.push(
        new ContextMenuAction({
          id: 'duplicate-scene',
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
          id: 'move-left',
          label: 'Move Left',
          icon: createElement(ArrowLeft, {
            className: 'h-3.5 w-3.5 text-stone-400',
          }),
          disabled: index === 0,
          handler: () => h.onMoveScene?.(scene.id, 'left'),
        }),
        new ContextMenuAction({
          id: 'move-right',
          label: 'Move Right',
          icon: createElement(ArrowRight, {
            className: 'h-3.5 w-3.5 text-stone-400',
          }),
          disabled: index === h.totalScenes - 1,
          handler: () => h.onMoveScene?.(scene.id, 'right'),
        }),
      )
    }

    const sections: ContextMenuSection[] = [
      new ContextMenuSection('scene-primary', mainActions, scene.title),
    ]

    if (h.onDeleteScene) {
      sections.push(
        new ContextMenuSection('scene-danger', [
          new ContextMenuAction({
            id: 'delete-scene',
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

  private static buildHubSections(
    h: DockContextMenuHandlers,
  ): ContextMenuSection[] {
    return [
      new ContextMenuSection(
        'hub-actions',
        [
          new ContextMenuAction({
            id: 'open-hub',
            label: 'Open Space Hub',
            icon: createElement(Home, {
              className: 'h-3.5 w-3.5 text-amber-300',
            }),
            handler: () => h.onSelectScene('hub'),
          }),
          new ContextMenuAction({
            id: 'add-scene',
            label: 'Add New Scene...',
            icon: createElement(Plus, {
              className: 'h-3.5 w-3.5 text-stone-400',
            }),
            handler: h.onOpenAddScene,
          }),
        ],
        'Space Hub',
      ),
    ]
  }

  private static buildVaultSections(
    h: DockContextMenuHandlers,
  ): ContextMenuSection[] {
    const actions: ContextMenuAction[] = [
      new ContextMenuAction({
        id: 'configure-vault',
        label: 'Configure Vault',
        icon: createElement(Lock, { className: 'h-3.5 w-3.5 text-amber-300' }),
        handler: () => h.onSelectScene('gate'),
      }),
    ]

    if (h.onToggleProtection) {
      actions.push(
        new ContextMenuAction({
          id: 'toggle-protection',
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

    return [new ContextMenuSection('vault-actions', actions, 'Entrance Vault')]
  }

  private static buildDockSections(
    h: DockContextMenuHandlers,
  ): ContextMenuSection[] {
    return [
      new ContextMenuSection(
        'dock-actions',
        [
          new ContextMenuAction({
            id: 'dock-add',
            label: 'Add New Scene...',
            icon: createElement(Plus, {
              className: 'h-3.5 w-3.5 text-amber-300',
            }),
            handler: h.onOpenAddScene,
          }),
          new ContextMenuAction({
            id: 'dock-hub',
            label: 'Go to Space Hub',
            icon: createElement(Home, {
              className: 'h-3.5 w-3.5 text-stone-400',
            }),
            handler: () => h.onSelectScene('hub'),
          }),
          new ContextMenuAction({
            id: 'dock-vault',
            label: 'Go to Entrance Vault',
            icon: createElement(Lock, {
              className: 'h-3.5 w-3.5 text-stone-400',
            }),
            handler: () => h.onSelectScene('gate'),
          }),
        ],
        'Quick Actions',
      ),
    ]
  }
}
