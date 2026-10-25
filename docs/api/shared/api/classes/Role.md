[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [shared/api](../README.md) / Role

# Class: Role

Defined in: apps/web/node\_modules/appwrite/types/role.d.ts:4

Helper class to generate role strings for `Permission`.

## Constructors

### Constructor

> **new Role**(): `Role`

#### Returns

`Role`

## Methods

### any()

> `static` **any**(): `string`

Defined in: apps/web/node\_modules/appwrite/types/role.d.ts:12

Grants access to anyone.

This includes authenticated and unauthenticated users.

#### Returns

`string`

---

### guests()

> `static` **guests**(): `string`

Defined in: apps/web/node\_modules/appwrite/types/role.d.ts:41

Grants access to any guest user without a session.

Authenticated users don't have access to this role.

#### Returns

`string`

---

### label()

> `static` **label**(`name`): `string`

Defined in: apps/web/node\_modules/appwrite/types/role.d.ts:69

Grants access to a user with the specified label.

#### Parameters

##### name

`string`

#### Returns

`string`

---

### member()

> `static` **member**(`id`): `string`

Defined in: apps/web/node\_modules/appwrite/types/role.d.ts:62

Grants access to a specific member of a team.

When the member is removed from the team, they will
no longer have access.

#### Parameters

##### id

`string`

#### Returns

`string`

---

### team()

> `static` **team**(`id`, `role?`): `string`

Defined in: apps/web/node\_modules/appwrite/types/role.d.ts:52

Grants access to a team by team ID.

You can optionally pass a role for `role` to target
team members with the specified role.

#### Parameters

##### id

`string`

##### role?

`string`

#### Returns

`string`

---

### user()

> `static` **user**(`id`, `status?`): `string`

Defined in: apps/web/node\_modules/appwrite/types/role.d.ts:23

Grants access to a specific user by user ID.

You can optionally pass verified or unverified for
`status` to target specific types of users.

#### Parameters

##### id

`string`

##### status?

`string`

#### Returns

`string`

---

### users()

> `static` **users**(`status?`): `string`

Defined in: apps/web/node\_modules/appwrite/types/role.d.ts:33

Grants access to any authenticated or anonymous user.

You can optionally pass verified or unverified for
`status` to target specific types of users.

#### Parameters

##### status?

`string`

#### Returns

`string`
