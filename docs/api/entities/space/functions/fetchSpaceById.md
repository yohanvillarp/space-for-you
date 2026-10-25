[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / fetchSpaceById

# Function: fetchSpaceById()

> **fetchSpaceById**(`spaceId`): `Promise`\<[`SpaceWithScenes`](../interfaces/SpaceWithScenes.md) \| `null`\>

Defined in: [apps/web/src/entities/space/api/space-database.ts:66](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/entities/space/api/space-database.ts#L66)

Retrieves a single space and all its associated scenes by space ID.

## Parameters

### spaceId

`string`

Unique document identifier in the `spaces` collection.

## Returns

`Promise`\<[`SpaceWithScenes`](../interfaces/SpaceWithScenes.md) \| `null`\>

The aggregated space and its scenes, or `null` if not found.
