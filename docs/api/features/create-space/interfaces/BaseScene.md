[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [features/create-space](../README.md) / BaseScene

# Interface: BaseScene

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:77](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/model/scenes.types.ts#L77)

Common base properties shared by all scenes in a space.

## Extended by

- [`FreeCanvasScene`](FreeCanvasScene.md)

## Properties

### icon

> **icon**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:87](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/model/scenes.types.ts#L87)

Lucide icon name for navigation.

---

### id

> **id**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:79](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/model/scenes.types.ts#L79)

Unique scene identifier.

---

### order

> **order**: `number`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:89](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/model/scenes.types.ts#L89)

Sequential zero-indexed display order.

---

### subtitle

> **subtitle**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:85](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/model/scenes.types.ts#L85)

Emotional subtitle or description.

---

### title

> **title**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:83](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/model/scenes.types.ts#L83)

Tab and header title.

---

### type

> **type**: [`SceneType`](../type-aliases/SceneType.md)

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:81](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/model/scenes.types.ts#L81)

Polymorphic scene discriminator.
