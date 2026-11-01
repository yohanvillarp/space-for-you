[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / mergeSpaces

# Function: mergeSpaces()

> **mergeSpaces**(`localSpaces`, `cloudSpaces`, `pendingIds?`): [`UserSpace`](../interfaces/UserSpace.md)[]

Defined in: [apps/web/src/entities/space/model/space-sync-engine.ts:172](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/space-sync-engine.ts#L172)

Merges retained local and cloud spaces.
Cloud is authoritative unless the space has unsaved local edits in `pendingIds`.

## Parameters

### localSpaces

[`UserSpace`](../interfaces/UserSpace.md)[]

### cloudSpaces

[`UserSpace`](../interfaces/UserSpace.md)[]

### pendingIds?

`Set`\<`string`\> = `...`

## Returns

[`UserSpace`](../interfaces/UserSpace.md)[]
