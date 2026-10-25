[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [features/create-space](../README.md) / SpatialToolboxSidebarProps

# Interface: SpatialToolboxSidebarProps

Defined in: [apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx:25](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx#L25)

## Properties

### className?

> `optional` **className?**: `string`

Defined in: [apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx:39](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx#L39)

---

### isCompact?

> `optional` **isCompact?**: `boolean`

Defined in: [apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx:38](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx#L38)

---

### onAddItem

> **onAddItem**: (`type`, `x?`, `y?`, `defaultData?`) => `void`

Defined in: [apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx:27](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx#L27)

#### Parameters

##### type

[`SpatialItemType`](../type-aliases/SpatialItemType.md)

##### x?

`number`

##### y?

`number`

##### defaultData?

`Partial`\<[`SpatialItemData`](SpatialItemData.md)\>

#### Returns

`void`

---

### onAssignPhoto?

> `optional` **onAssignPhoto?**: (`photoUrl`, `file?`) => `void`

Defined in: [apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx:36](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx#L36)

#### Parameters

##### photoUrl

`string`

##### file?

`File`

#### Returns

`void`

---

### onAssignTrack?

> `optional` **onAssignTrack?**: (`track`) => `void`

Defined in: [apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx:33](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx#L33)

#### Parameters

##### track

`AudioTrack`

#### Returns

`void`

---

### photoCount?

> `optional` **photoCount?**: `number`

Defined in: [apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx:37](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx#L37)

---

### selectedMusicItem?

> `optional` **selectedMusicItem?**: [`SpatialItem`](SpatialItem.md) \| `null`

Defined in: [apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx:34](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx#L34)

---

### selectedPhotoItem?

> `optional` **selectedPhotoItem?**: [`SpatialItem`](SpatialItem.md) \| `null`

Defined in: [apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx:35](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx#L35)

---

### templateId

> **templateId**: [`SpaceTemplateId`](../../../entities/space/type-aliases/SpaceTemplateId.md)

Defined in: [apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx:26](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/ui/SpatialToolboxSidebar.tsx#L26)
