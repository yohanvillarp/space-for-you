[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [features/create-space](../README.md) / SpatialItem

# Interface: SpatialItem

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:98](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L98)

A discrete interactive item positioned in the 2D spatial canvas diorama.

## Properties

### data

> **data**: [`SpatialItemData`](SpatialItemData.md)

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:116](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L116)

Domain item payload data.

---

### id

> **id**: `string`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:100](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L100)

Unique item instance ID.

---

### isLocked?

> `optional` **isLocked?**: `boolean`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:114](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L114)

Whether position and rotation are locked against accidental drag.

---

### label

> **label**: `string`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:104](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L104)

Display label in the layer list or inspector.

---

### rotation

> **rotation**: `number`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:110](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L110)

Visual rotation angle in degrees (-25 to +25).

---

### type

> **type**: [`SpatialItemType`](../type-aliases/SpatialItemType.md)

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:102](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L102)

Spatial artifact archetype.

---

### x

> **x**: `number`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:106](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L106)

Normalized X position (0 - 100 percentage relative to stage width).

---

### y

> **y**: `number`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:108](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L108)

Normalized Y position (0 - 100 percentage relative to stage height).

---

### zIndex

> **zIndex**: `number`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:112](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L112)

Depth layering stack order.
