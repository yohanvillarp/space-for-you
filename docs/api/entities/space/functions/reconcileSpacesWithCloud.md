[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / reconcileSpacesWithCloud

# Function: reconcileSpacesWithCloud()

> **reconcileSpacesWithCloud**(`localSpaces`, `cloudSpaces`, `pendingIds?`, `pendingDeleteIds?`): [`UserSpace`](../interfaces/UserSpace.md)[]

Defined in: [apps/web/src/entities/space/model/space-sync-engine.ts:105](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/model/space-sync-engine.ts#L105)

Reconciles local spaces with authoritative cloud spaces for the authenticated user.
Filters pending deletions, purges deleted spaces, and caps total spaces to MAX_SYNCED_SPACES (3).

## Parameters

### localSpaces

[`UserSpace`](../interfaces/UserSpace.md)[]

### cloudSpaces

[`UserSpace`](../interfaces/UserSpace.md)[]

### pendingIds?

`Set`\<`string`\> = `...`

### pendingDeleteIds?

`Set`\<`string`\> = `...`

## Returns

[`UserSpace`](../interfaces/UserSpace.md)[]
