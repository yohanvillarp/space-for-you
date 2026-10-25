[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [shared/api](../README.md) / Permission

# Class: Permission

Defined in: apps/web/node\_modules/appwrite/types/permission.d.ts:4

Helper class to generate permission strings for resources.

## Constructors

### Constructor

> **new Permission**(): `Permission`

#### Returns

`Permission`

## Properties

### create

> `static` **create**: (`role`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/permission.d.ts:28

Generate create permission string for the provided role.

#### Parameters

##### role

`string`

#### Returns

`string`

---

### delete

> `static` **delete**: (`role`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/permission.d.ts:42

Generate delete permission string for the provided role.

#### Parameters

##### role

`string`

#### Returns

`string`

---

### read

> `static` **read**: (`role`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/permission.d.ts:11

Generate read permission string for the provided role.

#### Parameters

##### role

`string`

#### Returns

`string`

---

### update

> `static` **update**: (`role`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/permission.d.ts:35

Generate update permission string for the provided role.

#### Parameters

##### role

`string`

#### Returns

`string`

---

### write

> `static` **write**: (`role`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/permission.d.ts:21

Generate write permission string for the provided role.

This is an alias of update, delete, and possibly create.
Don't use write in combination with update, delete, or create.

#### Parameters

##### role

`string`

#### Returns

`string`
