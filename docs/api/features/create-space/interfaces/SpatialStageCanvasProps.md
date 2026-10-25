[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [features/create-space](../README.md) / SpatialStageCanvasProps

# Interface: SpatialStageCanvasProps

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:20](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L20)

## Properties

### className?

> `optional` **className?**: `string`

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:47](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L47)

---

### copiedItem?

> `optional` **copiedItem?**: [`SpatialItem`](SpatialItem.md) \| `null`

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:24](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L24)

---

### items

> **items**: [`SpatialItem`](SpatialItem.md)[]

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:22](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L22)

---

### onAddItem

> **onAddItem**: (`type`, `x?`, `y?`, `customData?`) => `void`

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:40](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L40)

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

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:30](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L30)

#### Parameters

##### id

`string`

#### Returns

`void`

---

### onClearCanvas?

> `optional` **onClearCanvas?**: () => `void`

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:38](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L38)

#### Returns

`void`

---

### onCopyItem?

> `optional` **onCopyItem?**: (`item`) => `void`

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:35](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L35)

#### Parameters

##### item

[`SpatialItem`](SpatialItem.md)

#### Returns

`void`

---

### onDeleteItem

> **onDeleteItem**: (`id`) => `void`

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:32](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L32)

#### Parameters

##### id

`string`

#### Returns

`void`

---

### onDuplicateItem?

> `optional` **onDuplicateItem?**: (`id`) => `void`

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:33](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L33)

#### Parameters

##### id

`string`

#### Returns

`void`

---

### onOpenPhotoPicker?

> `optional` **onOpenPhotoPicker?**: (`item`) => `void`

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:46](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L46)

#### Parameters

##### item

[`SpatialItem`](SpatialItem.md)

#### Returns

`void`

---

### onPasteItem?

> `optional` **onPasteItem?**: (`x?`, `y?`) => `void`

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:36](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L36)

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

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:29](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L29)

#### Parameters

##### id

`string`

#### Returns

`void`

---

### onResetToDefaults?

> `optional` **onResetToDefaults?**: () => `void`

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:37](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L37)

#### Returns

`void`

---

### onRotateItem

> **onRotateItem**: (`id`, `delta`) => `void`

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:27](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L27)

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

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:25](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L25)

#### Parameters

##### id

`string` \| `null`

#### Returns

`void`

---

### onSendToBack?

> `optional` **onSendToBack?**: (`id`) => `void`

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:31](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L31)

#### Parameters

##### id

`string`

#### Returns

`void`

---

### onSetRotation?

> `optional` **onSetRotation?**: (`id`, `angle`) => `void`

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:28](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L28)

#### Parameters

##### id

`string`

##### angle

`number`

#### Returns

`void`

---

### onToggleLock?

> `optional` **onToggleLock?**: (`id`) => `void`

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:34](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L34)

#### Parameters

##### id

`string`

#### Returns

`void`

---

### onUpdateItemData

> **onUpdateItemData**: (`id`, `updates`) => `void`

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:39](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L39)

#### Parameters

##### id

`string`

##### updates

`Partial`\<[`SpatialItem`](SpatialItem.md)\[`"data"`\]\>

#### Returns

`void`

---

### onUpdateItemPosition

> **onUpdateItemPosition**: (`id`, `x`, `y`) => `void`

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:26](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L26)

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

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:23](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L23)

---

### templateId

> **templateId**: [`SpaceTemplateId`](../../../entities/space/type-aliases/SpaceTemplateId.md)

Defined in: [apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx:21](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/features/create-space/ui/SpatialStageCanvas.tsx#L21)
