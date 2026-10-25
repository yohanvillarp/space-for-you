[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / toSpaceScene

# Function: toSpaceScene()

> **toSpaceScene**(`doc`): [`SpaceScene`](../../../features/create-space/type-aliases/SpaceScene.md) \| `null`

Defined in: [apps/web/src/entities/space/api/space-converters.ts:44](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/space-converters.ts#L44)

Transforms an Appwrite scene document into a typed, polymorphic `SpaceScene`.
Safely parses the JSON payload into `items` or `letters` depending on `type`.

## Parameters

### doc

`DefaultDocument`

Raw Appwrite document from the `space_scenes` collection.

## Returns

[`SpaceScene`](../../../features/create-space/type-aliases/SpaceScene.md) \| `null`

Parsed `FreeCanvasScene`, `LettersScene`, or `null` if unrecognized.
