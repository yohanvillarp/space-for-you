[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / generateSpaceSlug

# Function: generateSpaceSlug()

> **generateSpaceSlug**(`title`, `recipientName`, `existingId?`): `string`

Defined in: [apps/web/src/entities/space/api/space-converters.ts:87](https://github.com/yohanvillarp/space-for-you/blob/2449dc51f5e937e2740485aab3ea76be1b0272f7/apps/web/src/entities/space/api/space-converters.ts#L87)

Generates an URL-safe, human-readable unique slug for public sharing.
Deterministic: Reuses existing stable spaceId hash if provided so URLs stay constant.

## Parameters

### title

`string`

Space title (e.g., "Golden Memories").

### recipientName

`string`

Recipient's name (e.g., "Sophia").

### existingId?

`string`

Optional space identifier to derive a stable hash.

## Returns

`string`

Sanitized slug string formatted as `[recipient]-[title]-[hash]`.
