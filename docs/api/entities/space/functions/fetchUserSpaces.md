[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / fetchUserSpaces

# Function: fetchUserSpaces()

> **fetchUserSpaces**(`userId`): `Promise`\<[`UserSpace`](../interfaces/UserSpace.md)[]\>

Defined in: [apps/web/src/entities/space/api/space-database.ts:52](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/space-database.ts#L52)

Retrieves all spaces owned by the authenticated user, sorted by last updated.

## Parameters

### userId

`string`

Owner's Appwrite Auth account `$id`.

## Returns

`Promise`\<[`UserSpace`](../interfaces/UserSpace.md)[]\>

Array of spaces belonging to the user.
