[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [features/create-space](../README.md) / ToolboxItemDef

# Interface: ToolboxItemDef

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:122](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L122)

Toolbox catalog definition describing an item that can be dragged onto the canvas.

## Properties

### category

> **category**: `"stage"` \| `"universal"`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:128](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L128)

Category grouping in the sidebar toolbox.

---

### defaultData

> **defaultData**: [`SpatialItemData`](SpatialItemData.md)

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:136](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L136)

Initial default data upon placement.

---

### description

> **description**: `string`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:130](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L130)

Tooltip description.

---

### iconName

> **iconName**: `string`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:132](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L132)

Lucide icon name.

---

### label

> **label**: `string`

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:126](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L126)

Human-readable label.

---

### supportedTemplates

> **supportedTemplates**: `"all"` \| [`SpaceTemplateId`](../../../entities/space/type-aliases/SpaceTemplateId.md)[]

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:134](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L134)

Supported theme templates or 'all'.

---

### type

> **type**: [`SpatialItemType`](../type-aliases/SpatialItemType.md)

Defined in: [apps/web/src/features/create-space/model/spatial-stage.types.ts:124](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/spatial-stage.types.ts#L124)

Item type archetype.
