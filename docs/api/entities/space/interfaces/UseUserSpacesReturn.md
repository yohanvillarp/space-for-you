[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / UseUserSpacesReturn

# Interface: UseUserSpacesReturn

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:37](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/useUserSpaces.ts#L37)

## Properties

### archiveSpace

> **archiveSpace**: (`id`) => `void`

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:53](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/useUserSpaces.ts#L53)

#### Parameters

##### id

`string`

#### Returns

`void`

---

### deleteSpace

> **deleteSpace**: (`id`) => `void`

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:42](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/useUserSpaces.ts#L42)

#### Parameters

##### id

`string`

#### Returns

`void`

---

### duplicateSpace

> **duplicateSpace**: (`id`, `customTitle?`, `customRecipient?`) => [`UserSpace`](UserSpace.md) \| `undefined`

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:43](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/useUserSpaces.ts#L43)

#### Parameters

##### id

`string`

##### customTitle?

`string`

##### customRecipient?

`string`

#### Returns

[`UserSpace`](UserSpace.md) \| `undefined`

---

### isCloudConnected

> **isCloudConnected**: `boolean`

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:40](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/useUserSpaces.ts#L40)

---

### isLoading

> **isLoading**: `boolean`

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:39](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/useUserSpaces.ts#L39)

---

### refreshSpaces

> **refreshSpaces**: () => `void`

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:55](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/useUserSpaces.ts#L55)

#### Returns

`void`

---

### renameSpace

> **renameSpace**: (`id`, `newTitle`, `newRecipient?`) => [`UserSpace`](UserSpace.md) \| `undefined`

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:48](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/useUserSpaces.ts#L48)

#### Parameters

##### id

`string`

##### newTitle

`string`

##### newRecipient?

`string`

#### Returns

[`UserSpace`](UserSpace.md) \| `undefined`

---

### restoreSpace

> **restoreSpace**: (`id`) => `void`

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:54](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/useUserSpaces.ts#L54)

#### Parameters

##### id

`string`

#### Returns

`void`

---

### saveSpace

> **saveSpace**: (`space`) => [`UserSpace`](UserSpace.md)

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:41](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/useUserSpaces.ts#L41)

#### Parameters

##### space

[`UserSpace`](UserSpace.md)

#### Returns

[`UserSpace`](UserSpace.md)

---

### spaces

> **spaces**: [`UserSpace`](UserSpace.md)[]

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:38](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/useUserSpaces.ts#L38)
