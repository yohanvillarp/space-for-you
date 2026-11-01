[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / fetchSpaceById

# Function: fetchSpaceById()

> **fetchSpaceById**(`spaceId`): `Promise`\<[`SpaceWithScenes`](../interfaces/SpaceWithScenes.md) \| `null`\>

Defined in: [apps/web/src/entities/space/api/space-database.ts:67](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/api/space-database.ts#L67)

Retrieves a single space and all its associated scenes by space ID.

## Parameters

### spaceId

`string`

Unique document identifier in the `spaces` collection.

## Returns

`Promise`\<[`SpaceWithScenes`](../interfaces/SpaceWithScenes.md) \| `null`\>

The aggregated space and its scenes, or `null` if not found.
