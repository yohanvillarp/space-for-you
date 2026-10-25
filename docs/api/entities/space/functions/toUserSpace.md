[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / toUserSpace

# Function: toUserSpace()

> **toUserSpace**(`doc`): [`UserSpace`](../interfaces/UserSpace.md)

Defined in: [apps/web/src/entities/space/api/space-converters.ts:20](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/space-converters.ts#L20)

Transforms an Appwrite space document into a client domain `UserSpace`.

## Parameters

### doc

`DefaultDocument`

Raw Appwrite document from the `spaces` collection.

## Returns

[`UserSpace`](../interfaces/UserSpace.md)

Clean, typed `UserSpace` domain entity.
