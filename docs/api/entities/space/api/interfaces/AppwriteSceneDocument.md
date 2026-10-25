[**Space For You - Architecture & API Documentation**](../../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../../modules.md) / [entities/space/api](../README.md) / AppwriteSceneDocument

# Interface: AppwriteSceneDocument

Defined in: [apps/web/src/entities/space/api/types.ts:54](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L54)

Raw document model stored in the Appwrite `space_scenes` collection.
Each document represents a room, letter desk, or diorama canvas in the space.

## Extends

- `DefaultDocument`

## Indexable

> \[`key`: `string`\]: `any`

## Properties

### \[\_\_\_default\]

> **\[\_\_\_default\]**: `true`

Defined in: apps/web/node\_modules/appwrite/types/models.d.ts:289

#### Inherited from

`Models.DefaultDocument.[___default]`

---

### $collectionId

> **$collectionId**: `string`

Defined in: apps/web/node\_modules/appwrite/types/models.d.ts:269

Collection ID.

#### Inherited from

`Models.DefaultDocument.$collectionId`

---

### $createdAt

> **$createdAt**: `string`

Defined in: apps/web/node\_modules/appwrite/types/models.d.ts:277

Document creation date in ISO 8601 format.

#### Inherited from

`Models.DefaultDocument.$createdAt`

---

### $databaseId

> **$databaseId**: `string`

Defined in: apps/web/node\_modules/appwrite/types/models.d.ts:273

Database ID.

#### Inherited from

`Models.DefaultDocument.$databaseId`

---

### $id

> **$id**: `string`

Defined in: apps/web/node\_modules/appwrite/types/models.d.ts:261

Document ID.

#### Inherited from

`Models.DefaultDocument.$id`

---

### $permissions

> **$permissions**: `string`[]

Defined in: apps/web/node\_modules/appwrite/types/models.d.ts:285

Document permissions. [Learn more about permissions](https://appwrite.io/docs/permissions).

#### Inherited from

`Models.DefaultDocument.$permissions`

---

### $sequence

> **$sequence**: `string`

Defined in: apps/web/node\_modules/appwrite/types/models.d.ts:265

Document sequence ID.

#### Inherited from

`Models.DefaultDocument.$sequence`

---

### $updatedAt

> **$updatedAt**: `string`

Defined in: apps/web/node\_modules/appwrite/types/models.d.ts:281

Document update date in ISO 8601 format.

#### Inherited from

`Models.DefaultDocument.$updatedAt`

---

### icon

> **icon**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:66](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L66)

Lucide icon identifier for UI tabs and buttons.

---

### order

> **order**: `number`

Defined in: [apps/web/src/entities/space/api/types.ts:58](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L58)

Zero-indexed sequential display order for navigation.

---

### payload

> **payload**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:68](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L68)

JSON-serialized array of SpatialItem[] or LetterItem[] objects.

---

### spaceId

> **spaceId**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:56](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L56)

Foreign key pointing to the parent space document ID.

---

### subtitle?

> `optional` **subtitle?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:64](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L64)

Optional subtitle or emotional prompt.

---

### title

> **title**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:62](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L62)

Scene tab/portal title (e.g., "Heartfelt Letters", "Stage Diorama").

---

### type

> **type**: `"free-canvas"` \| `"letters"`

Defined in: [apps/web/src/entities/space/api/types.ts:60](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L60)

Polymorphic scene discriminator.
