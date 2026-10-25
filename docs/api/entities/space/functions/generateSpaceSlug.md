[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / generateSpaceSlug

# Function: generateSpaceSlug()

> **generateSpaceSlug**(`title`, `recipientName`): `string`

Defined in: [apps/web/src/entities/space/api/space-converters.ts:93](https://github.com/yohanvillarp/space-for-you/blob/6ac43e5873aaeb772b7f2bba8208e4197971a20e/apps/web/src/entities/space/api/space-converters.ts#L93)

Generates an URL-safe, human-readable unique slug for public sharing.

## Parameters

### title

`string`

Space title (e.g., "Golden Memories").

### recipientName

`string`

Recipient's name (e.g., "Sophia").

## Returns

`string`

Sanitized slug string formatted as `[recipient]-[title]-[hash]`.

## Example

```ts
const slug = generateSpaceSlug('Birthday Sanctuary', 'Sophia')
// Output: "sophia-birthday-sanctuary-a81f"
```
