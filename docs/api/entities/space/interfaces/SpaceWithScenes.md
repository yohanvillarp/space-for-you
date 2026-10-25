[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / SpaceWithScenes

# Interface: SpaceWithScenes

Defined in: [apps/web/src/entities/space/api/types.ts:74](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/entities/space/api/types.ts#L74)

Aggregated domain structure combining a space and its ordered scenes.

## Properties

### dedicationMessage?

> `optional` **dedicationMessage?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:82](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/entities/space/api/types.ts#L82)

Optional long-form dedication message.

---

### passcodeHash?

> `optional` **passcodeHash?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:87](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/entities/space/api/types.ts#L87)

---

### passcodeHint?

> `optional` **passcodeHint?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:89](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/entities/space/api/types.ts#L89)

---

### passcodeSalt?

> `optional` **passcodeSalt?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:88](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/entities/space/api/types.ts#L88)

---

### protectionTheme?

> `optional` **protectionTheme?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:90](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/entities/space/api/types.ts#L90)

---

### scenes

> **scenes**: [`SpaceScene`](../../../features/create-space/type-aliases/SpaceScene.md)[]

Defined in: [apps/web/src/entities/space/api/types.ts:78](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/entities/space/api/types.ts#L78)

Ordered list of polymorphic scenes populated with items or letters.

---

### senderName?

> `optional` **senderName?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:80](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/entities/space/api/types.ts#L80)

Optional sender name.

---

### slug?

> `optional` **slug?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:86](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/entities/space/api/types.ts#L86)

Resolved public slug for sharing.

---

### space

> **space**: [`UserSpace`](UserSpace.md)

Defined in: [apps/web/src/entities/space/api/types.ts:76](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/entities/space/api/types.ts#L76)

Domain representation of the space metadata.

---

### themeConfig?

> `optional` **themeConfig?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:84](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/entities/space/api/types.ts#L84)

Optional JSON-serialized theme customization string.
