[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / fetchUserSpaces

# Function: fetchUserSpaces()

> **fetchUserSpaces**(`userId`): `Promise`\<[`UserSpace`](../interfaces/UserSpace.md)[]\>

Defined in: [apps/web/src/entities/space/api/space-database.ts:48](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/space-database.ts#L48)

Retrieves all spaces owned by the authenticated user, sorted by last updated.

## Parameters

### userId

`string`

Owner's Appwrite Auth account `$id`.

## Returns

`Promise`\<[`UserSpace`](../interfaces/UserSpace.md)[]\>

Array of spaces belonging to the user.
