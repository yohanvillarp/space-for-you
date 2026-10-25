[**Space For You - Architecture & API Documentation**](../../../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../../../modules.md) / [shared/api](../../../README.md) / [Query](../README.md) / Builder

# Class: Builder

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:556

## Constructors

### Constructor

> **new Builder**(): `Builder`

#### Returns

`Builder`

## Methods

### and()

> **and**(`queries`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:597

#### Parameters

##### queries

`string`[]

#### Returns

`this`

---

### avg()

> **avg**(`attribute`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:615

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`this`

---

### between()

> **between**(`attribute`, `start`, `end`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:568

#### Parameters

##### attribute

`string`

##### start

`string` \| `number` \| `bigint`

##### end

`string` \| `number` \| `bigint`

#### Returns

`this`

---

### bitAnd()

> **bitAnd**(`attribute`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:624

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`this`

---

### bitOr()

> **bitOr**(`attribute`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:625

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`this`

---

### bitXor()

> **bitXor**(`attribute`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:626

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`this`

---

### build()

> **build**(): `string`[]

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:558

#### Returns

`string`[]

---

### contains()

> **contains**(`attribute`, `value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:579

#### Parameters

##### attribute

`string`

##### value

`string` \| `any`[]

#### Returns

`this`

---

### containsAll()

> **containsAll**(`attribute`, `value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:581

#### Parameters

##### attribute

`string`

##### value

`any`[]

#### Returns

`this`

---

### containsAny()

> **containsAny**(`attribute`, `value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:580

#### Parameters

##### attribute

`string`

##### value

`any`[]

#### Returns

`this`

---

### count()

> **count**(`attribute?`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:612

#### Parameters

##### attribute?

`string`

##### alias?

`string`

#### Returns

`this`

---

### countDistinct()

> **countDistinct**(`attribute`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:613

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`this`

---

### covers()

> **covers**(`attribute`, `values`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:638

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`this`

---

### createdAfter()

> **createdAfter**(`value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:591

#### Parameters

##### value

`string`

#### Returns

`this`

---

### createdBefore()

> **createdBefore**(`value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:590

#### Parameters

##### value

`string`

#### Returns

`this`

---

### createdBetween()

> **createdBetween**(`start`, `end`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:592

#### Parameters

##### start

`string`

##### end

`string`

#### Returns

`this`

---

### crosses()

> **crosses**(`attribute`, `values`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:606

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`this`

---

### crossJoin()

> **crossJoin**(`table`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:634

#### Parameters

##### table

`string`

##### alias?

`string`

#### Returns

`this`

---

### cursorAfter()

> **cursorAfter**(`documentId`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:572

#### Parameters

##### documentId

`string`

#### Returns

`this`

---

### cursorBefore()

> **cursorBefore**(`documentId`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:573

#### Parameters

##### documentId

`string`

#### Returns

`this`

---

### distanceEqual()

> **distanceEqual**(`attribute`, `values`, `distance`, `meters?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:600

#### Parameters

##### attribute

`string`

##### values

`any`[]

##### distance

`number`

##### meters?

`boolean`

#### Returns

`this`

---

### distanceGreaterThan()

> **distanceGreaterThan**(`attribute`, `values`, `distance`, `meters?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:602

#### Parameters

##### attribute

`string`

##### values

`any`[]

##### distance

`number`

##### meters?

`boolean`

#### Returns

`this`

---

### distanceLessThan()

> **distanceLessThan**(`attribute`, `values`, `distance`, `meters?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:603

#### Parameters

##### attribute

`string`

##### values

`any`[]

##### distance

`number`

##### meters?

`boolean`

#### Returns

`this`

---

### distanceNotEqual()

> **distanceNotEqual**(`attribute`, `values`, `distance`, `meters?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:601

#### Parameters

##### attribute

`string`

##### values

`any`[]

##### distance

`number`

##### meters?

`boolean`

#### Returns

`this`

---

### distinct()

> **distinct**(): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:629

#### Returns

`this`

---

### elemMatch()

> **elemMatch**(`attribute`, `queries`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:598

#### Parameters

##### attribute

`string`

##### queries

`string`[]

#### Returns

`this`

---

### endsWith()

> **endsWith**(`attribute`, `value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:570

#### Parameters

##### attribute

`string`

##### value

`string`

#### Returns

`this`

---

### equal()

> **equal**(`attribute`, `value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:559

#### Parameters

##### attribute

`string`

##### value

`QueryTypes`

#### Returns

`this`

---

### exists()

> **exists**(`attributes`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:588

#### Parameters

##### attributes

`string`[]

#### Returns

`this`

---

### fullOuterJoin()

> **fullOuterJoin**(`table`, `leftOrAliasOrOn`, `rightOrOn?`, `operator?`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:633

#### Parameters

##### table

`string`

##### leftOrAliasOrOn

`string` \| `string`[]

##### rightOrOn?

`string` \| `string`[]

##### operator?

`string`

##### alias?

`string`

#### Returns

`this`

---

### greaterThan()

> **greaterThan**(`attribute`, `value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:563

#### Parameters

##### attribute

`string`

##### value

`QueryTypes`

#### Returns

`this`

---

### greaterThanEqual()

> **greaterThanEqual**(`attribute`, `value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:564

#### Parameters

##### attribute

`string`

##### value

`QueryTypes`

#### Returns

`this`

---

### groupBy()

> **groupBy**(`attributes`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:627

#### Parameters

##### attributes

`string`[]

#### Returns

`this`

---

### having()

> **having**(`queries`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:628

#### Parameters

##### queries

`string`[]

#### Returns

`this`

---

### intersects()

> **intersects**(`attribute`, `values`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:604

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`this`

---

### isNotNull()

> **isNotNull**(`attribute`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:567

#### Parameters

##### attribute

`string`

#### Returns

`this`

---

### isNull()

> **isNull**(`attribute`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:566

#### Parameters

##### attribute

`string`

#### Returns

`this`

---

### join()

> **join**(`table`, `leftOrAliasOrOn`, `rightOrOn?`, `operator?`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:630

#### Parameters

##### table

`string`

##### leftOrAliasOrOn

`string` \| `string`[]

##### rightOrOn?

`string` \| `string`[]

##### operator?

`string`

##### alias?

`string`

#### Returns

`this`

---

### leftJoin()

> **leftJoin**(`table`, `leftOrAliasOrOn`, `rightOrOn?`, `operator?`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:631

#### Parameters

##### table

`string`

##### leftOrAliasOrOn

`string` \| `string`[]

##### rightOrOn?

`string` \| `string`[]

##### operator?

`string`

##### alias?

`string`

#### Returns

`this`

---

### lessThan()

> **lessThan**(`attribute`, `value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:561

#### Parameters

##### attribute

`string`

##### value

`QueryTypes`

#### Returns

`this`

---

### lessThanEqual()

> **lessThanEqual**(`attribute`, `value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:562

#### Parameters

##### attribute

`string`

##### value

`QueryTypes`

#### Returns

`this`

---

### limit()

> **limit**(`limit`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:577

#### Parameters

##### limit

`number`

#### Returns

`this`

---

### max()

> **max**(`attribute`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:617

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`this`

---

### min()

> **min**(`attribute`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:616

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`this`

---

### notBetween()

> **notBetween**(`attribute`, `start`, `end`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:584

#### Parameters

##### attribute

`string`

##### start

`string` \| `number` \| `bigint`

##### end

`string` \| `number` \| `bigint`

#### Returns

`this`

---

### notContains()

> **notContains**(`attribute`, `value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:582

#### Parameters

##### attribute

`string`

##### value

`string` \| `any`[]

#### Returns

`this`

---

### notCovers()

> **notCovers**(`attribute`, `values`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:639

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`this`

---

### notCrosses()

> **notCrosses**(`attribute`, `values`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:607

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`this`

---

### notEndsWith()

> **notEndsWith**(`attribute`, `value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:586

#### Parameters

##### attribute

`string`

##### value

`string`

#### Returns

`this`

---

### notEqual()

> **notEqual**(`attribute`, `value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:560

#### Parameters

##### attribute

`string`

##### value

`QueryTypes`

#### Returns

`this`

---

### notExists()

> **notExists**(`attributes`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:589

#### Parameters

##### attributes

`string`[]

#### Returns

`this`

---

### notIntersects()

> **notIntersects**(`attribute`, `values`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:605

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`this`

---

### notOverlaps()

> **notOverlaps**(`attribute`, `values`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:609

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`this`

---

### notSearch()

> **notSearch**(`attribute`, `value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:583

#### Parameters

##### attribute

`string`

##### value

`string`

#### Returns

`this`

---

### notSpatialEquals()

> **notSpatialEquals**(`attribute`, `values`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:641

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`this`

---

### notStartsWith()

> **notStartsWith**(`attribute`, `value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:585

#### Parameters

##### attribute

`string`

##### value

`string`

#### Returns

`this`

---

### notTouches()

> **notTouches**(`attribute`, `values`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:611

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`this`

---

### offset()

> **offset**(`offset`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:578

#### Parameters

##### offset

`number`

#### Returns

`this`

---

### or()

> **or**(`queries`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:596

#### Parameters

##### queries

`string`[]

#### Returns

`this`

---

### orderAsc()

> **orderAsc**(`attribute`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:574

#### Parameters

##### attribute

`string`

#### Returns

`this`

---

### orderDesc()

> **orderDesc**(`attribute`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:575

#### Parameters

##### attribute

`string`

#### Returns

`this`

---

### orderRandom()

> **orderRandom**(): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:576

#### Returns

`this`

---

### overlaps()

> **overlaps**(`attribute`, `values`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:608

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`this`

---

### page()

> **page**(`page`, `perPage?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:642

#### Parameters

##### page

`number`

##### perPage?

`number`

#### Returns

`this`

---

### regex()

> **regex**(`attribute`, `pattern`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:587

#### Parameters

##### attribute

`string`

##### pattern

`string`

#### Returns

`this`

---

### relationship()

> **relationship**(`attribute`, `queries`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:599

#### Parameters

##### attribute

`string`

##### queries

`string`[]

#### Returns

`this`

---

### rightJoin()

> **rightJoin**(`table`, `leftOrAliasOrOn`, `rightOrOn?`, `operator?`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:632

#### Parameters

##### table

`string`

##### leftOrAliasOrOn

`string` \| `string`[]

##### rightOrOn?

`string` \| `string`[]

##### operator?

`string`

##### alias?

`string`

#### Returns

`this`

---

### search()

> **search**(`attribute`, `value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:565

#### Parameters

##### attribute

`string`

##### value

`string`

#### Returns

`this`

---

### select()

> **select**(`attributes`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:571

#### Parameters

##### attributes

`string`[]

#### Returns

`this`

---

### spatialEquals()

> **spatialEquals**(`attribute`, `values`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:640

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`this`

---

### startsWith()

> **startsWith**(`attribute`, `value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:569

#### Parameters

##### attribute

`string`

##### value

`string`

#### Returns

`this`

---

### stddev()

> **stddev**(`attribute`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:618

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`this`

---

### stddevPop()

> **stddevPop**(`attribute`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:619

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`this`

---

### stddevSamp()

> **stddevSamp**(`attribute`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:620

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`this`

---

### sum()

> **sum**(`attribute`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:614

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`this`

---

### touches()

> **touches**(`attribute`, `values`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:610

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`this`

---

### updatedAfter()

> **updatedAfter**(`value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:594

#### Parameters

##### value

`string`

#### Returns

`this`

---

### updatedBefore()

> **updatedBefore**(`value`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:593

#### Parameters

##### value

`string`

#### Returns

`this`

---

### updatedBetween()

> **updatedBetween**(`start`, `end`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:595

#### Parameters

##### start

`string`

##### end

`string`

#### Returns

`this`

---

### variance()

> **variance**(`attribute`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:621

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`this`

---

### varPop()

> **varPop**(`attribute`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:622

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`this`

---

### varSamp()

> **varSamp**(`attribute`, `alias?`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:623

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`this`

---

### vectorCosine()

> **vectorCosine**(`attribute`, `vector`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:636

#### Parameters

##### attribute

`string`

##### vector

`number`[]

#### Returns

`this`

---

### vectorDot()

> **vectorDot**(`attribute`, `vector`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:635

#### Parameters

##### attribute

`string`

##### vector

`number`[]

#### Returns

`this`

---

### vectorEuclidean()

> **vectorEuclidean**(`attribute`, `vector`): `this`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:637

#### Parameters

##### attribute

`string`

##### vector

`number`[]

#### Returns

`this`
