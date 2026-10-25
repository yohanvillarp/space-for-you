[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [features/create-space](../README.md) / FreeCanvasScene

# Interface: FreeCanvasScene

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:95](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/features/create-space/model/scenes.types.ts#L95)

Scene representing an interactive 2D diorama with spatial items.

## Extends

- [`BaseScene`](BaseScene.md)

## Properties

### icon

> **icon**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:87](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/features/create-space/model/scenes.types.ts#L87)

Lucide icon name for navigation.

#### Inherited from

[`BaseScene`](BaseScene.md).[`icon`](BaseScene.md#icon)

---

### id

> **id**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:79](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/features/create-space/model/scenes.types.ts#L79)

Unique scene identifier.

#### Inherited from

[`BaseScene`](BaseScene.md).[`id`](BaseScene.md#id)

---

### items

> **items**: [`SpatialItem`](SpatialItem.md)[]

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:98](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/features/create-space/model/scenes.types.ts#L98)

Draggable spatial artifacts placed on the canvas.

---

### order

> **order**: `number`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:89](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/features/create-space/model/scenes.types.ts#L89)

Sequential zero-indexed display order.

#### Inherited from

[`BaseScene`](BaseScene.md).[`order`](BaseScene.md#order)

---

### subtitle

> **subtitle**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:85](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/features/create-space/model/scenes.types.ts#L85)

Emotional subtitle or description.

#### Inherited from

[`BaseScene`](BaseScene.md).[`subtitle`](BaseScene.md#subtitle)

---

### title

> **title**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:83](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/features/create-space/model/scenes.types.ts#L83)

Tab and header title.

#### Inherited from

[`BaseScene`](BaseScene.md).[`title`](BaseScene.md#title)

---

### type

> **type**: `"free-canvas"`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:96](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/features/create-space/model/scenes.types.ts#L96)

Polymorphic scene discriminator.

#### Overrides

[`BaseScene`](BaseScene.md).[`type`](BaseScene.md#type)
