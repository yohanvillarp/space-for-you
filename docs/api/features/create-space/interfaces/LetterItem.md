[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [features/create-space](../README.md) / LetterItem

# Interface: LetterItem

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:47](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/scenes.types.ts#L47)

A personal, handwritten digital letter contained within an envelope.

## Properties

### blocksOrder?

> `optional` **blocksOrder?**: [`LetterBlockId`](../type-aliases/LetterBlockId.md)[]

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:65](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/scenes.types.ts#L65)

Arrangement order of blocks inside the letter sheet.

---

### content

> **content**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:53](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/scenes.types.ts#L53)

Markdown or plaintext letter message.

---

### date?

> `optional` **date?**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:59](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/scenes.types.ts#L59)

Optional memorable date or sentiment tagline.

---

### envelopeColor

> **envelopeColor**: [`EnvelopeColor`](../type-aliases/EnvelopeColor.md)

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:55](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/scenes.types.ts#L55)

Envelope color swatch.

---

### fontSize?

> `optional` **fontSize?**: [`LetterFontSize`](../type-aliases/LetterFontSize.md)

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:71](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/scenes.types.ts#L71)

Font scale setting.

---

### fontStyle?

> `optional` **fontStyle?**: [`LetterFontStyle`](../type-aliases/LetterFontStyle.md)

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:67](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/scenes.types.ts#L67)

Chosen font family style.

---

### id

> **id**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:49](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/scenes.types.ts#L49)

Unique identifier for the letter.

---

### imageUrl?

> `optional` **imageUrl?**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:61](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/scenes.types.ts#L61)

Optional photo attachment URL.

---

### paperColor?

> `optional` **paperColor?**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:63](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/scenes.types.ts#L63)

Optional custom background paper color hex.

---

### textAlign?

> `optional` **textAlign?**: [`LetterTextAlign`](../type-aliases/LetterTextAlign.md)

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:69](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/scenes.types.ts#L69)

Paragraph alignment.

---

### title

> **title**: `string`

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:51](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/scenes.types.ts#L51)

Title or subject of the letter.

---

### waxSeal

> **waxSeal**: [`WaxSealType`](../type-aliases/WaxSealType.md)

Defined in: [apps/web/src/features/create-space/model/scenes.types.ts:57](https://github.com/yohanvillarp/space-for-you/blob/20463d01b116b13735894bc05384fdcd0f861ca1/apps/web/src/features/create-space/model/scenes.types.ts#L57)

Wax seal stamp emblem.
