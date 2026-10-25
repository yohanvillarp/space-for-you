[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / SpaceWithScenes

# Interface: SpaceWithScenes

Defined in: [apps/web/src/entities/space/api/types.ts:66](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/types.ts#L66)

Aggregated domain structure combining a space and its ordered scenes.

## Properties

### dedicationMessage?

> `optional` **dedicationMessage?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:74](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/types.ts#L74)

Optional long-form dedication message.

---

### scenes

> **scenes**: [`SpaceScene`](../../../features/create-space/type-aliases/SpaceScene.md)[]

Defined in: [apps/web/src/entities/space/api/types.ts:70](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/types.ts#L70)

Ordered list of polymorphic scenes populated with items or letters.

---

### senderName?

> `optional` **senderName?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:72](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/types.ts#L72)

Optional sender name.

---

### slug?

> `optional` **slug?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:78](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/types.ts#L78)

Resolved public slug for sharing.

---

### space

> **space**: [`UserSpace`](UserSpace.md)

Defined in: [apps/web/src/entities/space/api/types.ts:68](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/types.ts#L68)

Domain representation of the space metadata.

---

### themeConfig?

> `optional` **themeConfig?**: `string`

Defined in: [apps/web/src/entities/space/api/types.ts:76](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/types.ts#L76)

Optional JSON-serialized theme customization string.
