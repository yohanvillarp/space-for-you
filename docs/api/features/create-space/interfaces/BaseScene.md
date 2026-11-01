[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [features/create-space](../README.md) / BaseScene

# Interface: BaseScene

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:89](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L89)

Common base properties shared by all scenes in a space.

## Extended by

- [`FreeCanvasScene`](FreeCanvasScene.md)

## Properties

### icon

> **icon**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:99](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L99)

Lucide icon name for navigation.

---

### id

> **id**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:91](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L91)

Unique scene identifier.

---

### order

> **order**: `number`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:101](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L101)

Sequential zero-indexed display order.

---

### schedule?

> `optional` **schedule?**: [`SceneScheduleConfig`](SceneScheduleConfig.md)

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:103](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L103)

Optional schedule restricting scene access until a specific date.

---

### subtitle

> **subtitle**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:97](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L97)

Emotional subtitle or description.

---

### title

> **title**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:95](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L95)

Tab and header title.

---

### type

> **type**: [`SceneType`](../type-aliases/SceneType.md)

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:93](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L93)

Polymorphic scene discriminator.
