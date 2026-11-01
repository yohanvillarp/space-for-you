[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / unlockSpaceViaFunction

# Function: unlockSpaceViaFunction()

> **unlockSpaceViaFunction**(`__namedParameters`): `Promise`\<[`UnlockSpaceResult`](../interfaces/UnlockSpaceResult.md)\>

Defined in: [apps/web/src/entities/space/api/space-database-unlock.ts:34](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/api/space-database-unlock.ts#L34)

Unlocks a space by calling the Appwrite Cloud Function 'unlock-space'.
Falls back to offline/local storage if cloud function execution is unavailable.

## Parameters

### \_\_namedParameters

[`UnlockSpaceParams`](../interfaces/UnlockSpaceParams.md)

## Returns

`Promise`\<[`UnlockSpaceResult`](../interfaces/UnlockSpaceResult.md)\>
