[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [entities/space](../README.md) / generateSpaceSlug

# Function: generateSpaceSlug()

> **generateSpaceSlug**(`title`, `recipientName`): `string`

Defined in: [apps/web/src/entities/space/api/space-converters.ts:90](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/entities/space/api/space-converters.ts#L90)

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
