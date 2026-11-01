[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [features/create-space](../README.md) / FreeCanvasScene

# Interface: FreeCanvasScene

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:109](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L109)

Scene representing an interactive 2D diorama with spatial items.

## Extends

- [`BaseScene`](BaseScene.md)

## Properties

### icon

> **icon**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:99](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L99)

Lucide icon name for navigation.

#### Inherited from

[`BaseScene`](BaseScene.md).[`icon`](BaseScene.md#icon)

---

### id

> **id**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:91](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L91)

Unique scene identifier.

#### Inherited from

[`BaseScene`](BaseScene.md).[`id`](BaseScene.md#id)

---

### items

> **items**: [`SpatialItem`](SpatialItem.md)[]

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:112](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L112)

Draggable spatial artifacts placed on the canvas.

---

### order

> **order**: `number`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:101](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L101)

Sequential zero-indexed display order.

#### Inherited from

[`BaseScene`](BaseScene.md).[`order`](BaseScene.md#order)

---

### schedule?

> `optional` **schedule?**: [`SceneScheduleConfig`](SceneScheduleConfig.md)

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:103](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L103)

Optional schedule restricting scene access until a specific date.

#### Inherited from

[`BaseScene`](BaseScene.md).[`schedule`](BaseScene.md#schedule)

---

### subtitle

> **subtitle**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:97](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L97)

Emotional subtitle or description.

#### Inherited from

[`BaseScene`](BaseScene.md).[`subtitle`](BaseScene.md#subtitle)

---

### title

> **title**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:95](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L95)

Tab and header title.

#### Inherited from

[`BaseScene`](BaseScene.md).[`title`](BaseScene.md#title)

---

### type

> **type**: `"free-canvas"`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:110](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L110)

Polymorphic scene discriminator.

#### Overrides

[`BaseScene`](BaseScene.md).[`type`](BaseScene.md#type)
