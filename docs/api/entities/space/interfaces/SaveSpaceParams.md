[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / SaveSpaceParams

# Interface: SaveSpaceParams

Defined in: [apps/web/src/entities/space/api/space-database.ts:114](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/space-database.ts#L114)

Parameters for creating or updating a space in Appwrite Databases.

## Properties

### dedicationMessage?

> `optional` **dedicationMessage?**: `string`

Defined in: [apps/web/src/entities/space/api/space-database.ts:124](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/space-database.ts#L124)

Optional dedication message.

---

### scenes?

> `optional` **scenes?**: [`SpaceScene`](../../../features/create-space/type-aliases/SpaceScene.md)[]

Defined in: [apps/web/src/entities/space/api/space-database.ts:118](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/space-database.ts#L118)

Optional array of scenes (free-canvas items or heartfelt letters).

---

### senderName?

> `optional` **senderName?**: `string`

Defined in: [apps/web/src/entities/space/api/space-database.ts:122](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/space-database.ts#L122)

Optional sender name.

---

### slug?

> `optional` **slug?**: `string`

Defined in: [apps/web/src/entities/space/api/space-database.ts:128](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/space-database.ts#L128)

Optional slug override.

---

### space

> **space**: [`UserSpace`](UserSpace.md)

Defined in: [apps/web/src/entities/space/api/space-database.ts:116](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/space-database.ts#L116)

Space metadata to save or update.

---

### themeConfig?

> `optional` **themeConfig?**: `string`

Defined in: [apps/web/src/entities/space/api/space-database.ts:126](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/space-database.ts#L126)

Optional JSON-serialized theme customization.

---

### userId

> **userId**: `string`

Defined in: [apps/web/src/entities/space/api/space-database.ts:120](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/space-database.ts#L120)

Owner user ID matching Appwrite Auth `$id`.
