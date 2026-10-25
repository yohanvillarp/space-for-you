[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / toSpaceScene

# Function: toSpaceScene()

> **toSpaceScene**(`doc`): [`SpaceScene`](../../../features/create-space/type-aliases/SpaceScene.md) \| `null`

Defined in: [apps/web/src/entities/space/api/space-converters.ts:41](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/entities/space/api/space-converters.ts#L41)

Transforms an Appwrite scene document into a typed, polymorphic `SpaceScene`.
Safely parses the JSON payload into `items` or `letters` depending on `type`.

## Parameters

### doc

`DefaultDocument`

Raw Appwrite document from the `space_scenes` collection.

## Returns

[`SpaceScene`](../../../features/create-space/type-aliases/SpaceScene.md) \| `null`

Parsed `FreeCanvasScene`, `LettersScene`, or `null` if unrecognized.
