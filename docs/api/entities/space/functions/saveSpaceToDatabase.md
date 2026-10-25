[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / saveSpaceToDatabase

# Function: saveSpaceToDatabase()

> **saveSpaceToDatabase**(`params`): `Promise`\<[`UserSpace`](../interfaces/UserSpace.md)\>

Defined in: [apps/web/src/entities/space/api/space-database.ts:167](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/entities/space/api/space-database.ts#L167)

Saves a space and all its scenes to Appwrite Databases with Document-Level Security.
Performs idempotent update or creation of both space and scene documents.

## Parameters

### params

[`SaveSpaceParams`](../interfaces/SaveSpaceParams.md)

Save parameters containing space, scenes, and owner info.

## Returns

`Promise`\<[`UserSpace`](../interfaces/UserSpace.md)\>

The persisted space model with updated timestamps.

## Remarks

This function persists the master space document and loops over scenes,
serializing polymorphic payloads (diorama canvas items or letters).

## Example

```ts
const savedSpace = await saveSpaceToDatabase({
  space: currentSpace,
  scenes: currentScenes,
  userId: user.$id,
})
```
