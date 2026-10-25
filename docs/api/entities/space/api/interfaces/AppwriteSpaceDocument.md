[**Space For You - Architecture & API Documentation**](../../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../../modules.md) / [entities/space/api](../README.md) / AppwriteSpaceDocument

# Interface: AppwriteSpaceDocument

Defined in: [apps/web/src/entities/space/api/types.ts:15](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L15)

Raw document model stored in the Appwrite `spaces` collection.
Enforces Document-Level Security where only the owner has write access,
and public unauthenticated users obtain read access once published.

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

### artifactsCount

> **artifactsCount**: `number`

Defined in: [apps/web/src/entities/space/api/types.ts:33](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L33)

Total count of memories/artifacts placed across all scenes.

---

### dedicationMessage?

> `optional` **dedicationMessage?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:29](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L29)

Optional long-form dedication message or greeting note.

---

### isProtected?

> `optional` **isProtected?**: `boolean`

Defined in: [apps/web/src/entities/space/api/types.ts:37](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L37)

Whether the sanctuary requires a passcode or privacy gate to access.

---

### passcodeHash?

> `optional` **passcodeHash?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:39](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L39)

Cryptographic hash (SHA-256) of the protection passcode.

---

### passcodeHint?

> `optional` **passcodeHint?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:43](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L43)

Optional hint displayed on the passcode gate.

---

### passcodeSalt?

> `optional` **passcodeSalt?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:41](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L41)

Cryptographic salt for passcode hashing.

---

### protectionTheme?

> `optional` **protectionTheme?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:45](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L45)

Passcode gate theme design variant.

---

### recipientName

> **recipientName**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:19](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L19)

Name of the intended recipient.

---

### scenesCount

> **scenesCount**: `number`

Defined in: [apps/web/src/entities/space/api/types.ts:31](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L31)

Total count of scenes contained in this space.

---

### senderName

> **senderName**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:21](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L21)

Optional display name or nickname of the creator/sender.

---

### slug

> **slug**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:27](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L27)

Unique, human-friendly URL slug (e.g., "sophia-sanctuary-a81f").

---

### status

> **status**: `"draft"` \| `"ready"` \| `"published"`

Defined in: [apps/web/src/entities/space/api/types.ts:25](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L25)

Publication lifecycle status.

---

### templateId

> **templateId**: [`SpaceTemplateId`](../../type-aliases/SpaceTemplateId.md)

Defined in: [apps/web/src/entities/space/api/types.ts:23](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L23)

Selected aesthetic theme ('birthday' | 'anniversary' | 'friendship').

---

### themeConfig?

> `optional` **themeConfig?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:35](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L35)

JSON-serialized theme customization (colors, fonts, QR code styling).

---

### title

> **title**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:17](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L17)

Display title of the digital sanctuary (e.g., "Sophia's 25th Birthday").

---

### userId

> **userId**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:47](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/types.ts#L47)

Owner user ID matching Appwrite Auth `$id`.
