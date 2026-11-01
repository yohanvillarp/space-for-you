[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [features/create-space](../README.md) / SpatialStageCanvasProps

# Interface: SpatialStageCanvasProps

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:8](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L8)

## Properties

### className?

> `optional` **className?**: `string`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:38](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L38)

---

### copiedItem?

> `optional` **copiedItem?**: [`SpatialItem`](SpatialItem.md) \| `null`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:12](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L12)

---

### fitToHeight?

> `optional` **fitToHeight?**: `boolean`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:37](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L37)

---

### items

> **items**: [`SpatialItem`](SpatialItem.md)[]

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:10](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L10)

---

### onAddItem

> **onAddItem**: (`type`, `x?`, `y?`, `customData?`) => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:30](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L30)

#### Parameters

##### type

[`SpatialItemType`](../type-aliases/SpatialItemType.md)

##### x?

`number`

##### y?

`number`

##### customData?

`Partial`\<[`SpatialItemData`](SpatialItemData.md)\>

#### Returns

`void`

---

### onBringToFront

> **onBringToFront**: (`id`) => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:20](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L20)

#### Parameters

##### id

`string`

#### Returns

`void`

---

### onClearCanvas?

> `optional` **onClearCanvas?**: () => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:28](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L28)

#### Returns

`void`

---

### onCommitItemPosition?

> `optional` **onCommitItemPosition?**: () => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:16](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L16)

#### Returns

`void`

---

### onCopyItem?

> `optional` **onCopyItem?**: (`item`) => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:25](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L25)

#### Parameters

##### item

[`SpatialItem`](SpatialItem.md)

#### Returns

`void`

---

### onDeleteItem

> **onDeleteItem**: (`id`) => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:22](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L22)

#### Parameters

##### id

`string`

#### Returns

`void`

---

### onDuplicateItem?

> `optional` **onDuplicateItem?**: (`id`) => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:23](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L23)

#### Parameters

##### id

`string`

#### Returns

`void`

---

### onOpenPhotoPicker?

> `optional` **onOpenPhotoPicker?**: (`item`) => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:36](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L36)

#### Parameters

##### item

[`SpatialItem`](SpatialItem.md)

#### Returns

`void`

---

### onPasteItem?

> `optional` **onPasteItem?**: (`x?`, `y?`) => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:26](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L26)

#### Parameters

##### x?

`number`

##### y?

`number`

#### Returns

`void`

---

### onResetRotation?

> `optional` **onResetRotation?**: (`id`) => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:19](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L19)

#### Parameters

##### id

`string`

#### Returns

`void`

---

### onResetToDefaults?

> `optional` **onResetToDefaults?**: () => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:27](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L27)

#### Returns

`void`

---

### onRotateItem

> **onRotateItem**: (`id`, `delta`) => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:17](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L17)

#### Parameters

##### id

`string`

##### delta

`number`

#### Returns

`void`

---

### onSelectItem

> **onSelectItem**: (`id`) => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:13](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L13)

#### Parameters

##### id

`string` \| `null`

#### Returns

`void`

---

### onSendToBack?

> `optional` **onSendToBack?**: (`id`) => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:21](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L21)

#### Parameters

##### id

`string`

#### Returns

`void`

---

### onSetRotation?

> `optional` **onSetRotation?**: (`id`, `angle`) => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:18](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L18)

#### Parameters

##### id

`string`

##### angle

`number`

#### Returns

`void`

---

### onStartDragItem?

> `optional` **onStartDragItem?**: (`id`) => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:15](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L15)

#### Parameters

##### id

`string`

#### Returns

`void`

---

### onToggleLock?

> `optional` **onToggleLock?**: (`id`) => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:24](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L24)

#### Parameters

##### id

`string`

#### Returns

`void`

---

### onUpdateItemData

> **onUpdateItemData**: (`id`, `updates`) => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:29](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L29)

#### Parameters

##### id

`string`

##### updates

`Partial`\<[`SpatialItemData`](SpatialItemData.md)\>

#### Returns

`void`

---

### onUpdateItemPosition

> **onUpdateItemPosition**: (`id`, `x`, `y`) => `void`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:14](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L14)

#### Parameters

##### id

`string`

##### x

`number`

##### y

`number`

#### Returns

`void`

---

### selectedId

> **selectedId**: `string` \| `null`

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:11](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L11)

---

### templateId

> **templateId**: [`SpaceTemplateId`](../../../entities/space/type-aliases/SpaceTemplateId.md)

Defined in: [apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts:9](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/ui/canvas/spatial-stage-canvas.types.ts#L9)
