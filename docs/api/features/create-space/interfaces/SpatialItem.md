[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [features/create-space](../README.md) / SpatialItem

# Interface: SpatialItem

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:66](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/spatial-stage.types.ts#L66)

A discrete interactive item positioned in the 2D spatial canvas diorama.

## Properties

### data

> **data**: [`SpatialItemData`](SpatialItemData.md)

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:84](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/spatial-stage.types.ts#L84)

Domain item payload data.

---

### id

> **id**: `string`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:68](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/spatial-stage.types.ts#L68)

Unique item instance ID.

---

### isLocked?

> `optional` **isLocked?**: `boolean`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:82](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/spatial-stage.types.ts#L82)

Whether position and rotation are locked against accidental drag.

---

### label

> **label**: `string`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:72](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/spatial-stage.types.ts#L72)

Display label in the layer list or inspector.

---

### rotation

> **rotation**: `number`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:78](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/spatial-stage.types.ts#L78)

Visual rotation angle in degrees (-25 to +25).

---

### type

> **type**: [`SpatialItemType`](../type-aliases/SpatialItemType.md)

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:70](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/spatial-stage.types.ts#L70)

Spatial artifact archetype.

---

### x

> **x**: `number`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:74](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/spatial-stage.types.ts#L74)

Normalized X position (0 - 100 percentage relative to stage width).

---

### y

> **y**: `number`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:76](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/spatial-stage.types.ts#L76)

Normalized Y position (0 - 100 percentage relative to stage height).

---

### zIndex

> **zIndex**: `number`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:80](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/spatial-stage.types.ts#L80)

Depth layering stack order.
