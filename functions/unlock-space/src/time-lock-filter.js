/**
 * Server-authoritative time-lock filter for scenes.
 * Strips confidential items and letters from scenes that are locked until a future UTC date.
 */

export function filterTimeLockedScenes(scenes, now = new Date()) {
  const currentTimestamp = now.getTime()

  return scenes.map((scene) => {
    let schedule = scene.schedule
    if (typeof schedule === 'string') {
      try {
        schedule = JSON.parse(schedule)
      } catch {
        schedule = null
      }
    }

    if (!schedule || !schedule.enabled || !schedule.unlockAt) {
      return scene
    }

    const unlockTime = new Date(schedule.unlockAt).getTime()
    if (isNaN(unlockTime) || unlockTime <= currentTimestamp) {
      return scene
    }

    // Scene is locked by authoritative server time:
    // Strip all internal letters/canvas items/secrets
    const sanitized = {
      id: scene.$id || scene.id,
      order: scene.order ?? 0,
      type: scene.type,
      title: scene.title,
      subtitle: scene.subtitle || '',
      icon: scene.icon || 'Sparkles',
      isTimeLocked: true,
      schedule: {
        enabled: true,
        unlockAt: schedule.unlockAt,
        teaserMessage: schedule.teaserMessage || '',
      },
    }

    if (scene.type === 'letters') {
      sanitized.letters = []
    } else {
      sanitized.items = []
    }

    return sanitized
  })
}
