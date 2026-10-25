import type {
  SpaceScene,
  LetterItem,
} from '@/features/create-space/model/scenes.types'
import {
  SpaceSceneEntity,
  LettersSceneEntity,
} from '@/features/create-space/model/domain/SpaceSceneEntity'

/**
 * Aggregate Root managing the collection of scenes in a Space.
 * Encapsulates domain business rules and invariants in pure OOP.
 */
export class SpaceSceneCollection {
  private scenes: SpaceSceneEntity[]

  constructor(scenes: SpaceSceneEntity[] = []) {
    this.scenes = [...scenes]
  }

  public static fromDTOs(dtos: SpaceScene[]): SpaceSceneCollection {
    const entities = dtos.map((dto) => SpaceSceneEntity.fromDTO(dto))
    return new SpaceSceneCollection(entities)
  }

  public getAll(): SpaceSceneEntity[] {
    return [...this.scenes]
  }

  public toDTOs(): SpaceScene[] {
    return this.scenes.map((s) => s.toDTO())
  }

  public findById(id: string): SpaceSceneEntity | undefined {
    return this.scenes.find((s) => s.id === id)
  }

  public count(): number {
    return this.scenes.length
  }

  public canRemove(): boolean {
    return this.scenes.length > 1
  }

  public add(scene: SpaceSceneEntity): void {
    scene.setOrder(this.scenes.length + 1)
    this.scenes.push(scene)
  }

  public remove(sceneId: string): boolean {
    if (!this.canRemove()) return false
    const prevCount = this.scenes.length
    this.scenes = this.scenes.filter((s) => s.id !== sceneId)
    this.reindexOrders()
    return this.scenes.length < prevCount
  }

  public rename(sceneId: string, newTitle: string): boolean {
    const scene = this.findById(sceneId)
    if (!scene) return false
    scene.rename(newTitle)
    return true
  }

  public updateScene(
    sceneId: string,
    updates: { title?: string; subtitle?: string },
  ): boolean {
    const scene = this.findById(sceneId)
    if (!scene) return false
    if (updates.title !== undefined) scene.title = updates.title
    if (updates.subtitle !== undefined) scene.subtitle = updates.subtitle
    return true
  }

  public duplicate(sceneId: string): SpaceSceneEntity | null {
    const source = this.findById(sceneId)
    if (!source) return null

    const duplicate = source.clone()
    duplicate.setOrder(this.scenes.length + 1)
    this.scenes.push(duplicate)
    return duplicate
  }

  public reorder(sceneId: string, direction: 'left' | 'right'): boolean {
    const idx = this.scenes.findIndex((s) => s.id === sceneId)
    if (idx === -1) return false

    const targetIdx = direction === 'left' ? idx - 1 : idx + 1
    if (targetIdx < 0 || targetIdx >= this.scenes.length) return false

    const [item] = this.scenes.splice(idx, 1)
    this.scenes.splice(targetIdx, 0, item)
    this.reindexOrders()
    return true
  }

  public reorderScenes(fromIndex: number, toIndex: number): boolean {
    if (fromIndex < 0 || fromIndex >= this.scenes.length) return false
    if (toIndex < 0 || toIndex >= this.scenes.length) return false
    if (fromIndex === toIndex) return false

    const [moved] = this.scenes.splice(fromIndex, 1)
    this.scenes.splice(toIndex, 0, moved)
    this.reindexOrders()
    return true
  }

  public reorderLetters(
    fromIndex: number,
    toIndex: number,
    sceneId?: string,
  ): boolean {
    const targetScene = sceneId
      ? this.findById(sceneId)
      : this.scenes.find(
          (s): s is LettersSceneEntity => s instanceof LettersSceneEntity,
        )

    if (!(targetScene instanceof LettersSceneEntity)) return false
    return targetScene.reorderLetters(fromIndex, toIndex)
  }

  public addLetter(sceneId?: string): LetterItem | null {
    const targetScene = sceneId
      ? this.findById(sceneId)
      : this.scenes.find(
          (s): s is LettersSceneEntity => s instanceof LettersSceneEntity,
        )

    if (!(targetScene instanceof LettersSceneEntity)) return null

    const newLetter: LetterItem = {
      id: `letter-${Date.now()}`,
      title: 'A New Note',
      content: 'Write your thoughts and gentle wishes here...',
      envelopeColor: 'rose',
      waxSeal: 'heart',
      date: 'Today',
    }

    targetScene.addLetter(newLetter)
    return newLetter
  }

  public updateLetter(updated: LetterItem): boolean {
    let updatedAny = false
    for (const scene of this.scenes) {
      if (scene instanceof LettersSceneEntity) {
        scene.updateLetter(updated)
        updatedAny = true
      }
    }
    return updatedAny
  }

  public removeLetter(letterId: string): boolean {
    let removed = false
    for (const scene of this.scenes) {
      if (scene instanceof LettersSceneEntity) {
        scene.removeLetter(letterId)
        removed = true
      }
    }
    return removed
  }

  public duplicateLetter(letterId: string): LetterItem | null {
    for (const scene of this.scenes) {
      if (scene instanceof LettersSceneEntity) {
        const found = scene.letters.find((l: LetterItem) => l.id === letterId)
        if (found) {
          const duplicate: LetterItem = {
            ...found,
            id: `letter-${Date.now()}`,
            title: `${found.title} (Copy)`,
          }
          scene.addLetter(duplicate)
          return duplicate
        }
      }
    }
    return null
  }

  public clone(): SpaceSceneCollection {
    const clonedEntities = this.scenes.map((s) =>
      SpaceSceneEntity.fromDTO(s.toDTO()),
    )
    return new SpaceSceneCollection(clonedEntities)
  }

  private reindexOrders(): void {
    this.scenes.forEach((scene, index) => {
      scene.setOrder(index + 1)
    })
  }
}
