[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [features/create-space](../README.md) / ToolboxItemDef

# Interface: ToolboxItemDef

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:90](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/features/create-space/model/spatial-stage.types.ts#L90)

Toolbox catalog definition describing an item that can be dragged onto the canvas.

## Properties

### category

> **category**: `"stage"` \| `"universal"`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:96](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/features/create-space/model/spatial-stage.types.ts#L96)

Category grouping in the sidebar toolbox.

---

### defaultData

> **defaultData**: [`SpatialItemData`](SpatialItemData.md)

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:104](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/features/create-space/model/spatial-stage.types.ts#L104)

Initial default data upon placement.

---

### description

> **description**: `string`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:98](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/features/create-space/model/spatial-stage.types.ts#L98)

Tooltip description.

---

### iconName

> **iconName**: `string`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:100](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/features/create-space/model/spatial-stage.types.ts#L100)

Lucide icon name.

---

### label

> **label**: `string`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:94](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/features/create-space/model/spatial-stage.types.ts#L94)

Human-readable label.

---

### supportedTemplates

> **supportedTemplates**: `"all"` \| [`SpaceTemplateId`](../../../entities/space/type-aliases/SpaceTemplateId.md)[]

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:102](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/features/create-space/model/spatial-stage.types.ts#L102)

Supported theme templates or 'all'.

---

### type

> **type**: [`SpatialItemType`](../type-aliases/SpatialItemType.md)

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:92](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/features/create-space/model/spatial-stage.types.ts#L92)

Item type archetype.
