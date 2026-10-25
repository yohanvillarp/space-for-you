[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / toUserSpace

# Function: toUserSpace()

> **toUserSpace**(`doc`): [`UserSpace`](../interfaces/UserSpace.md)

Defined in: [apps/web/src/entities/space/api/space-converters.ts:17](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/space-converters.ts#L17)

Transforms an Appwrite space document into a client domain `UserSpace`.

## Parameters

### doc

`DefaultDocument`

Raw Appwrite document from the `spaces` collection.

## Returns

[`UserSpace`](../interfaces/UserSpace.md)

Clean, typed `UserSpace` domain entity.
