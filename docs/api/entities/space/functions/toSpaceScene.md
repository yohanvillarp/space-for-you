[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / toSpaceScene

# Function: toSpaceScene()

> **toSpaceScene**(`doc`): [`SpaceScene`](../../../features/create-space/type-aliases/SpaceScene.md) \| `null`

Defined in: [apps/web/src/entities/space/api/space-converters.ts:42](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/api/space-converters.ts#L42)

Transforms an Appwrite scene document into a typed, polymorphic `SpaceScene`.
Safely parses the JSON payload into `items` or `letters` depending on `type`.

## Parameters

### doc

`DefaultDocument`

Raw Appwrite document from the `space_scenes` collection.

## Returns

[`SpaceScene`](../../../features/create-space/type-aliases/SpaceScene.md) \| `null`

Parsed `FreeCanvasScene`, `LettersScene`, or `null` if unrecognized.
