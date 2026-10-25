[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / useUserSpaces

# Function: useUserSpaces()

> **useUserSpaces**(): [`UseUserSpacesReturn`](../interfaces/UseUserSpacesReturn.md)

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:58](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/model/useUserSpaces.ts#L58)

Custom hook providing reactive access to user spaces with hybrid offline/cloud support.

## Returns

[`UseUserSpacesReturn`](../interfaces/UseUserSpacesReturn.md)

State and mutation methods for user spaces.

## Remarks

1. Instantly initializes with local storage data for zero layout shift (optimistic UI).
2. On mount, detects Appwrite Auth session and fetches live spaces from `sfy_primary_db`.
3. Listens to `StorageEvent` and internal `SPACES_CHANGED_EVENT` to synchronize across tabs.

## Example

```tsx
const { spaces, isLoading, deleteSpace } = useUserSpaces()
```
