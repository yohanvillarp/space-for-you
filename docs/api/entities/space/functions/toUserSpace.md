[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / toUserSpace

# Function: toUserSpace()

> **toUserSpace**(`doc`): [`UserSpace`](../interfaces/UserSpace.md)

Defined in: [apps/web/src/entities/space/api/space-converters.ts:17](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/api/space-converters.ts#L17)

Transforms an Appwrite space document into a client domain `UserSpace`.

## Parameters

### doc

`DefaultDocument`

Raw Appwrite document from the `spaces` collection.

## Returns

[`UserSpace`](../interfaces/UserSpace.md)

Clean, typed `UserSpace` domain entity.
