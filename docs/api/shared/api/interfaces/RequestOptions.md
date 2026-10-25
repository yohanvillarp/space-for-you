[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [shared/api](../README.md) / RequestOptions

# Interface: RequestOptions

Defined in: [apps/web/src/shared/api/client.ts:1](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/shared/api/client.ts#L1)

## Extends

- `RequestInit`

## Properties

### body?

> `optional` **body?**: `BodyInit` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2554

A BodyInit object or null to set request's body.

#### Inherited from

`RequestInit.body`

---

### cache?

> `optional` **cache?**: `RequestCache`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2556

A string indicating how the request will interact with the browser's cache to set request's cache.

#### Inherited from

`RequestInit.cache`

---

### credentials?

> `optional` **credentials?**: `RequestCredentials`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2558

A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials.

#### Inherited from

`RequestInit.credentials`

---

### headers?

> `optional` **headers?**: `HeadersInit`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2560

A Headers object, an object literal, or an array of two-item arrays to set request's headers.

#### Inherited from

`RequestInit.headers`

---

### integrity?

> `optional` **integrity?**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2562

A cryptographic hash of the resource to be fetched by request. Sets request's integrity.

#### Inherited from

`RequestInit.integrity`

---

### keepalive?

> `optional` **keepalive?**: `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2564

A boolean to set request's keepalive.

#### Inherited from

`RequestInit.keepalive`

---

### method?

> `optional` **method?**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2566

A string to set request's method.

#### Inherited from

`RequestInit.method`

---

### mode?

> `optional` **mode?**: `RequestMode`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2568

A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.

#### Inherited from

`RequestInit.mode`

---

### params?

> `optional` **params?**: `Record`\<`string`, `string` \| `number` \| `boolean` \| `undefined`\>

Defined in: [apps/web/src/shared/api/client.ts:2](https://github.com/yohanvillarp/space-for-you/blob/970b6aad3a4c600671678fbeacae2cfef28f0613/apps/web/src/shared/api/client.ts#L2)

---

### priority?

> `optional` **priority?**: `RequestPriority`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2569

#### Inherited from

`RequestInit.priority`

---

### redirect?

> `optional` **redirect?**: `RequestRedirect`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2571

A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect.

#### Inherited from

`RequestInit.redirect`

---

### referrer?

> `optional` **referrer?**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2573

A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.

#### Inherited from

`RequestInit.referrer`

---

### referrerPolicy?

> `optional` **referrerPolicy?**: `ReferrerPolicy`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2575

A referrer policy to set request's referrerPolicy.

#### Inherited from

`RequestInit.referrerPolicy`

---

### signal?

> `optional` **signal?**: `AbortSignal` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2577

An AbortSignal to set request's signal.

#### Inherited from

`RequestInit.signal`

---

### window?

> `optional` **window?**: `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:2579

Can only be null. Used to disassociate request from any Window.

#### Inherited from

`RequestInit.window`
