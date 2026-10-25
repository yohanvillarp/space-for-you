[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / fetchSpaceById

# Function: fetchSpaceById()

> **fetchSpaceById**(`spaceId`): `Promise`\<[`SpaceWithScenes`](../interfaces/SpaceWithScenes.md) \| `null`\>

Defined in: [apps/web/src/entities/space/api/space-database.ts:62](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/space-database.ts#L62)

Retrieves a single space and all its associated scenes by space ID.

## Parameters

### spaceId

`string`

Unique document identifier in the `spaces` collection.

## Returns

`Promise`\<[`SpaceWithScenes`](../interfaces/SpaceWithScenes.md) \| `null`\>

The aggregated space and its scenes, or `null` if not found.
