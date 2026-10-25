[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / UseUserSpacesReturn

# Interface: UseUserSpacesReturn

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:26](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/model/useUserSpaces.ts#L26)

Return interface for the `useUserSpaces` hook.

## Properties

### deleteSpace

> **deleteSpace**: (`id`) => `void`

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:36](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/model/useUserSpaces.ts#L36)

Deletes a space by ID from local storage and Appwrite Databases.

#### Parameters

##### id

`string`

#### Returns

`void`

---

### duplicateSpace

> **duplicateSpace**: (`id`) => [`UserSpace`](UserSpace.md) \| `undefined`

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:38](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/model/useUserSpaces.ts#L38)

Creates a clone of an existing space and persists it.

#### Parameters

##### id

`string`

#### Returns

[`UserSpace`](UserSpace.md) \| `undefined`

---

### isCloudConnected

> **isCloudConnected**: `boolean`

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:32](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/model/useUserSpaces.ts#L32)

Whether the user is authenticated and cloud sync is connected.

---

### isLoading

> **isLoading**: `boolean`

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:30](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/model/useUserSpaces.ts#L30)

Whether spaces are currently being fetched from Appwrite Databases.

---

### refreshSpaces

> **refreshSpaces**: () => `void`

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:40](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/model/useUserSpaces.ts#L40)

Re-reads spaces from local storage to sync UI state.

#### Returns

`void`

---

### saveSpace

> **saveSpace**: (`space`) => [`UserSpace`](UserSpace.md)

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:34](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/model/useUserSpaces.ts#L34)

Saves or updates a space, synchronizing to storage and cloud.

#### Parameters

##### space

[`UserSpace`](UserSpace.md)

#### Returns

[`UserSpace`](UserSpace.md)

---

### spaces

> **spaces**: [`UserSpace`](UserSpace.md)[]

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:28](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/model/useUserSpaces.ts#L28)

Array of active spaces owned by or available to the user.
