[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / SaveSpaceParams

# Interface: SaveSpaceParams

Defined in: [apps/web/src/entities/space/api/space-database.ts:126](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/space-database.ts#L126)

Parameters for creating or updating a space in Appwrite Databases.

## Properties

### dedicationMessage?

> `optional` **dedicationMessage?**: `string`

Defined in: [apps/web/src/entities/space/api/space-database.ts:136](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/space-database.ts#L136)

Optional dedication message.

---

### passcodeHash?

> `optional` **passcodeHash?**: `string`

Defined in: [apps/web/src/entities/space/api/space-database.ts:141](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/space-database.ts#L141)

---

### passcodeHint?

> `optional` **passcodeHint?**: `string`

Defined in: [apps/web/src/entities/space/api/space-database.ts:143](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/space-database.ts#L143)

---

### passcodeSalt?

> `optional` **passcodeSalt?**: `string`

Defined in: [apps/web/src/entities/space/api/space-database.ts:142](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/space-database.ts#L142)

---

### protectionTheme?

> `optional` **protectionTheme?**: `string`

Defined in: [apps/web/src/entities/space/api/space-database.ts:144](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/space-database.ts#L144)

---

### scenes?

> `optional` **scenes?**: [`SpaceScene`](../../../features/create-space/type-aliases/SpaceScene.md)[]

Defined in: [apps/web/src/entities/space/api/space-database.ts:130](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/space-database.ts#L130)

Optional array of scenes (free-canvas items or heartfelt letters).

---

### senderName?

> `optional` **senderName?**: `string`

Defined in: [apps/web/src/entities/space/api/space-database.ts:134](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/space-database.ts#L134)

Optional sender name.

---

### slug?

> `optional` **slug?**: `string`

Defined in: [apps/web/src/entities/space/api/space-database.ts:140](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/space-database.ts#L140)

Optional slug override.

---

### space

> **space**: [`UserSpace`](UserSpace.md)

Defined in: [apps/web/src/entities/space/api/space-database.ts:128](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/space-database.ts#L128)

Space metadata to save or update.

---

### themeConfig?

> `optional` **themeConfig?**: `string`

Defined in: [apps/web/src/entities/space/api/space-database.ts:138](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/space-database.ts#L138)

Optional JSON-serialized theme customization.

---

### userId

> **userId**: `string`

Defined in: [apps/web/src/entities/space/api/space-database.ts:132](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/space-database.ts#L132)

Owner user ID matching Appwrite Auth `$id`.
