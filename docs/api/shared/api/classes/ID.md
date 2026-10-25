[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [shared/api](../README.md) / ID

# Class: ID

Defined in: apps/web/node\_modules/appwrite/types/id.d.ts:4

Helper class to generate ID strings for resources.

## Constructors

### Constructor

> **new ID**(): `ID`

#### Returns

`ID`

## Methods

### custom()

> `static` **custom**(`id`): `string`

Defined in: apps/web/node\_modules/appwrite/types/id.d.ts:12

Uses the provided ID as the ID for the resource.

#### Parameters

##### id

`string`

#### Returns

`string`

---

### unique()

> `static` **unique**(`padding?`): `string`

Defined in: apps/web/node\_modules/appwrite/types/id.d.ts:19

Have Appwrite generate a unique ID for you.

#### Parameters

##### padding?

`number`

#### Returns

`string`
