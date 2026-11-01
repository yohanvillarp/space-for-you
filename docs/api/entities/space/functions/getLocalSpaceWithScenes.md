[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / getLocalSpaceWithScenes

# Function: getLocalSpaceWithScenes()

> **getLocalSpaceWithScenes**(`slugOrId`): [`SpaceWithScenes`](../interfaces/SpaceWithScenes.md) \| `null`

Defined in: [apps/web/src/entities/space/model/local-space-resolver.ts:25](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/local-space-resolver.ts#L25)

Resolves a space and its scenes from client-side `localStorage`.
Serves as an instant offline and local-development fallback when viewing
spaces created in the browser before or without Appwrite Cloud synchronization.

## Parameters

### slugOrId

`string`

Unique space identifier or slug alias.

## Returns

[`SpaceWithScenes`](../interfaces/SpaceWithScenes.md) \| `null`

Complete SpaceWithScenes or `null` if not found in local memory.
