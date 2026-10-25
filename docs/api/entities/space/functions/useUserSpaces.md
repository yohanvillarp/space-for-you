[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / useUserSpaces

# Function: useUserSpaces()

> **useUserSpaces**(): [`UseUserSpacesReturn`](../interfaces/UseUserSpacesReturn.md)

Defined in: [apps/web/src/entities/space/model/useUserSpaces.ts:68](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/model/useUserSpaces.ts#L68)

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
