[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / UserSpace

# Interface: UserSpace

Defined in: [apps/web/src/entities/space/model/types.ts:59](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/types.ts#L59)

Complete domain entity representing a user-created space.

## Properties

### artifactsCount

> **artifactsCount**: `number`

Defined in: [apps/web/src/entities/space/model/types.ts:71](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/types.ts#L71)

Total count of memories, letters, and artifacts.

---

### createdAt

> **createdAt**: `string`

Defined in: [apps/web/src/entities/space/model/types.ts:75](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/types.ts#L75)

ISO timestamp of space creation.

---

### description?

> `optional` **description?**: `string`

Defined in: [apps/web/src/entities/space/model/types.ts:87](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/types.ts#L87)

Short summary or dedication note.

---

### id

> **id**: `string`

Defined in: [apps/web/src/entities/space/model/types.ts:61](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/types.ts#L61)

Unique identifier (local ID or Appwrite document ID).

---

### isProtected?

> `optional` **isProtected?**: `boolean`

Defined in: [apps/web/src/entities/space/model/types.ts:85](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/types.ts#L85)

Whether the space is gated behind a privacy code.

---

### recipientName

> **recipientName**: `string`

Defined in: [apps/web/src/entities/space/model/types.ts:65](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/types.ts#L65)

Recipient name.

---

### scenesCount

> **scenesCount**: `number`

Defined in: [apps/web/src/entities/space/model/types.ts:69](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/types.ts#L69)

Total count of scenes/rooms inside the space.

---

### slug?

> `optional` **slug?**: `string`

Defined in: [apps/web/src/entities/space/model/types.ts:89](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/types.ts#L89)

Canonical public sharing slug (e.g. "ariana-birthday-sanctuary-brs2f").

---

### status

> **status**: `"draft"` \| `"ready"` \| `"published"` \| `"archived"`

Defined in: [apps/web/src/entities/space/model/types.ts:83](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/types.ts#L83)

Publication lifecycle:

- `draft`: Initial editing phase.
- `ready`: Prepared with all letters and artifacts placed.
- `published`: Shared with recipient (public read access enabled).
- `archived`: Historical or archived space kept for records.

---

### templateId

> **templateId**: [`SpaceTemplateId`](../type-aliases/SpaceTemplateId.md)

Defined in: [apps/web/src/entities/space/model/types.ts:67](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/types.ts#L67)

Associated theme template.

---

### title

> **title**: `string`

Defined in: [apps/web/src/entities/space/model/types.ts:63](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/types.ts#L63)

Sanctuary title.

---

### updatedAt

> **updatedAt**: `string`

Defined in: [apps/web/src/entities/space/model/types.ts:73](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/types.ts#L73)

ISO timestamp of the last modification.
