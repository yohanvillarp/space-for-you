import type {
  SpaceScene,
  FreeCanvasScene,
  LettersScene,
  SceneType,
  LetterItem,
} from '@/features/create-space/model/scenes.types'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'

/**
 * Base abstract class for a Space Scene Domain Entity.
 * Encapsulates core scene properties and enforces polymorphic behavior.
 */
export abstract class SpaceSceneEntity {
  public id: string
  public title: string
  public subtitle: string
  public icon: string
  public order: number

  constructor(data: {
    id: string
    title: string
    subtitle: string
    icon: string
    order: number
  }) {
    this.id = data.id
    this.title = data.title
    this.subtitle = data.subtitle
    this.icon = data.icon
    this.order = data.order
  }

  abstract readonly type: SceneType

  abstract clone(newId?: string): SpaceSceneEntity

  abstract getItemCountLabel(): string

  abstract toDTO(): SpaceScene

  public rename(newTitle: string): void {
    const trimmed = newTitle.trim()
    if (trimmed) {
      this.title = trimmed
    }
  }

  public setOrder(newOrder: number): void {
    this.order = newOrder
  }

  public static fromDTO(dto: SpaceScene): SpaceSceneEntity {
    if (dto.type === 'letters') {
      return new LettersSceneEntity(dto)
    }
    return new FreeCanvasSceneEntity(dto)
  }
}

/**
 * Free Canvas Scene Entity
 * Encapsulates spatial keepsake items on an open canvas stage.
 */
export class FreeCanvasSceneEntity extends SpaceSceneEntity {
  public readonly type = 'free-canvas' as const
  public items: SpatialItem[]

  constructor(dto: FreeCanvasScene) {
    super({
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle,
      icon: dto.icon,
      order: dto.order,
    })
    this.items = [...dto.items]
  }

  public getItemCountLabel(): string {
    const count = this.items.length
    return `${count} ${count === 1 ? 'keepsake' : 'keepsakes'}`
  }

  public clone(newId?: string): FreeCanvasSceneEntity {
    const timestamp = Date.now()
    const clonedItems = this.items.map((item) => ({
      ...item,
      id: `item-${timestamp}-${Math.random().toString(36).slice(2, 6)}`,
    }))

    return new FreeCanvasSceneEntity({
      id: newId ?? `scene-canvas-${timestamp}`,
      type: 'free-canvas',
      title: `${this.title} (Copy)`,
      subtitle: this.subtitle,
      icon: this.icon,
      order: this.order + 1,
      items: clonedItems,
    })
  }

  public addItem(item: SpatialItem): void {
    this.items.push(item)
  }

  public removeItem(itemId: string): void {
    this.items = this.items.filter((item) => item.id !== itemId)
  }

  public toDTO(): FreeCanvasScene {
    return {
      id: this.id,
      type: 'free-canvas',
      title: this.title,
      subtitle: this.subtitle,
      icon: this.icon,
      order: this.order,
      items: [...this.items],
    }
  }
}

/**
 * Letters Scene Entity
 * Encapsulates heartfelt folded letters and wax-sealed stationery.
 */
export class LettersSceneEntity extends SpaceSceneEntity {
  public readonly type = 'letters' as const
  public letters: LetterItem[]

  constructor(dto: LettersScene) {
    super({
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle,
      icon: dto.icon,
      order: dto.order,
    })
    this.letters = [...dto.letters]
  }

  public getItemCountLabel(): string {
    const count = this.letters.length
    return `${count} ${count === 1 ? 'letter' : 'letters'}`
  }

  public clone(newId?: string): LettersSceneEntity {
    const timestamp = Date.now()
    const clonedLetters = this.letters.map((ltr) => ({
      ...ltr,
      id: `letter-${timestamp}-${Math.random().toString(36).slice(2, 6)}`,
    }))

    return new LettersSceneEntity({
      id: newId ?? `scene-letters-${timestamp}`,
      type: 'letters',
      title: `${this.title} (Copy)`,
      subtitle: this.subtitle,
      icon: this.icon,
      order: this.order + 1,
      letters: clonedLetters,
    })
  }

  public addLetter(letter: LetterItem): void {
    this.letters.push(letter)
  }

  public removeLetter(letterId: string): void {
    this.letters = this.letters.filter((ltr) => ltr.id !== letterId)
  }

  public updateLetter(updated: LetterItem): void {
    this.letters = this.letters.map((ltr) =>
      ltr.id === updated.id ? updated : ltr,
    )
  }

  public reorderLetters(fromIndex: number, toIndex: number): boolean {
    if (fromIndex < 0 || fromIndex >= this.letters.length) return false
    if (toIndex < 0 || toIndex >= this.letters.length) return false
    if (fromIndex === toIndex) return false

    const [moved] = this.letters.splice(fromIndex, 1)
    this.letters.splice(toIndex, 0, moved)
    return true
  }

  public toDTO(): LettersScene {
    return {
      id: this.id,
      type: 'letters',
      title: this.title,
      subtitle: this.subtitle,
      icon: this.icon,
      order: this.order,
      letters: [...this.letters],
    }
  }
}
