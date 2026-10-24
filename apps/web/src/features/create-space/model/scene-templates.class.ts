import type {
  SpaceScene,
  SceneType,
} from '@/features/create-space/model/scenes.types'

/**
 * Base abstract class defining a Scene Specimen Template
 * Following Object-Oriented Programming (OOP) principles.
 */
export abstract class SceneSpecimenTemplate {
  abstract readonly type: SceneType
  abstract readonly title: string
  abstract readonly subtitle: string
  abstract readonly description: string
  abstract readonly iconName: string
  abstract readonly category: string
  abstract readonly previewAccent: string

  abstract createInstance(existingCount: number): SpaceScene
}

/**
 * Free-form Canvas Scene Specimen Template
 */
export class FreeCanvasSceneTemplate extends SceneSpecimenTemplate {
  readonly type = 'free-canvas' as const
  readonly title = 'Memory Canvas'
  readonly subtitle = 'Creative spatial stage'
  readonly description = 'Freely arrange photos, music, letters, and keepsakes.'
  readonly iconName = 'Sparkles'
  readonly category = 'Canvas'
  readonly previewAccent = '#F59E0B'

  createInstance(existingCount: number): SpaceScene {
    const timestamp = Date.now()
    return {
      id: `scene-canvas-${timestamp}`,
      type: 'free-canvas',
      title: `Memory Canvas ${existingCount + 1}`,
      subtitle: this.subtitle,
      icon: this.iconName,
      order: existingCount + 1,
      items: [],
    }
  }
}

/**
 * Heartfelt Letters Scene Specimen Template
 */
export class LettersSceneTemplate extends SceneSpecimenTemplate {
  readonly type = 'letters' as const
  readonly title = 'Heartfelt Letters'
  readonly subtitle = 'Desk of folded notes'
  readonly description =
    'A collection of sealed envelopes with wax stamps and dates.'
  readonly iconName = 'Mail'
  readonly category = 'Letters'
  readonly previewAccent = '#F43F5E'

  createInstance(existingCount: number): SpaceScene {
    const timestamp = Date.now()
    return {
      id: `scene-letters-${timestamp}`,
      type: 'letters',
      title: `Heartfelt Letters ${existingCount + 1}`,
      subtitle: this.subtitle,
      icon: this.iconName,
      order: existingCount + 1,
      letters: [
        {
          id: `letter-${timestamp}-1`,
          title: 'A Gentle Note',
          content: 'Write your thoughts and gentle wishes here...',
          envelopeColor: 'rose',
          waxSeal: 'heart',
          date: 'Today',
        },
      ],
    }
  }
}

/**
 * Registry managing available scene specimens using OOP encapsulation.
 */
export class SceneTemplateRegistry {
  private templates: SceneSpecimenTemplate[] = [
    new FreeCanvasSceneTemplate(),
    new LettersSceneTemplate(),
  ]

  public getAll(): SceneSpecimenTemplate[] {
    return [...this.templates]
  }

  public search(query: string): SceneSpecimenTemplate[] {
    const q = query.trim().toLowerCase()
    if (!q) return this.getAll()
    return this.templates.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q),
    )
  }

  public getByType(type: SceneType): SceneSpecimenTemplate | undefined {
    return this.templates.find((t) => t.type === type)
  }
}

export const sceneTemplateRegistry = new SceneTemplateRegistry()
