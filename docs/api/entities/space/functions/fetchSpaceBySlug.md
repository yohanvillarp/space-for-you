[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / fetchSpaceBySlug

# Function: fetchSpaceBySlug()

> **fetchSpaceBySlug**(`slug`): `Promise`\<[`SpaceWithScenes`](../interfaces/SpaceWithScenes.md) \| `null`\>

Defined in: [apps/web/src/entities/space/api/space-database.ts:106](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/entities/space/api/space-database.ts#L106)

Resolves a space and its scenes by its public unique slug without requiring login.

## Parameters

### slug

`string`

Human-friendly URL slug (e.g., "sophia-sanctuary-a81f").

## Returns

`Promise`\<[`SpaceWithScenes`](../interfaces/SpaceWithScenes.md) \| `null`\>

The aggregated space with its scenes, or `null` if not found.
