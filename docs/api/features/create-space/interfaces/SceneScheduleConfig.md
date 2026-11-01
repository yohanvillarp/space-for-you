[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [features/create-space](../README.md) / SceneScheduleConfig

# Interface: SceneScheduleConfig

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:77](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L77)

Configuration for scheduled scene release date (Time Capsule / Advent reveal).

## Properties

### enabled

> **enabled**: `boolean`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:79](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L79)

Whether the time lock is actively enforced.

---

### teaserMessage?

> `optional` **teaserMessage?**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:83](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L83)

Optional personal teasing / anticipation message from the sender.

---

### unlockAt

> **unlockAt**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:81](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/features/create-space/model/scenes.types.ts#L81)

ISO 8601 unlock date-time string (e.g. '2026-10-31T00:00:00').
