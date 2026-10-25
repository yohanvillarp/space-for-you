[**Space For You - Architecture & API Documentation**](../../../README.md)

---

[Space For You - Architecture & API Documentation](../../../modules.md) / [shared/api](../README.md) / Query

# Class: Query

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:8

Helper class to generate query strings.

## Constructors

### Constructor

> **new Query**(`method`, `attribute?`, `values?`): `Query`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:19

Constructor for Query class.

#### Parameters

##### method

`string`

##### attribute?

`AttributesTypes`

##### values?

`QueryTypes`

#### Returns

`Query`

## Properties

### attribute

> **attribute**: `AttributesTypes` \| `undefined`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:10

---

### method

> **method**: `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:9

---

### values

> **values**: `QueryTypesList` \| `undefined`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:11

---

### and

> `static` **and**: (`queries`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:328

Combine multiple queries using logical AND operator.

#### Parameters

##### queries

`string`[]

#### Returns

`string`

---

### avg

> `static` **avg**: (`attribute`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:484

Average values of `attribute`, optionally aliased.

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`string`

---

### between

> `static` **between**: (`attribute`, `start`, `end`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:118

Filter resources where attribute is between start and end (inclusive).

#### Parameters

##### attribute

`string`

##### start

`string` \| `number` \| `bigint`

##### end

`string` \| `number` \| `bigint`

#### Returns

`string`

---

### bitAnd

> `static` **bitAnd**: (`attribute`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:502

Bitwise AND of `attribute`, optionally aliased.

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`string`

---

### bitOr

> `static` **bitOr**: (`attribute`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:504

Bitwise OR of `attribute`, optionally aliased.

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`string`

---

### bitXor

> `static` **bitXor**: (`attribute`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:506

Bitwise XOR of `attribute`, optionally aliased.

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`string`

---

### builder

> `static` **builder**: () => [`Builder`](../namespaces/Query/classes/Builder.md)

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:546

Start a fluent query builder.

#### Returns

[`Builder`](../namespaces/Query/classes/Builder.md)

---

### contains

> `static` **contains**: (`attribute`, `value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:208

Filter resources where attribute contains the specified value.
For string attributes, checks if the string contains the substring.

Note: For array attributes, use [containsAny](#containsany) or [containsAll](#containsall) instead.

#### Parameters

##### attribute

`string`

##### value

`string` \| `any`[]

#### Returns

`string`

---

### containsAll

> `static` **containsAll**: (`attribute`, `value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:228

Filter resources where attribute contains ALL of the specified values.
For array and relationship attributes, matches documents where the attribute
contains every one of the given values.

#### Parameters

##### attribute

`string`

##### value

`any`[]

#### Returns

`string`

---

### containsAny

> `static` **containsAny**: (`attribute`, `value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:218

Filter resources where attribute contains ANY of the specified values.
For array and relationship attributes, matches documents where the attribute
contains at least one of the given values.

#### Parameters

##### attribute

`string`

##### value

`any`[]

#### Returns

`string`

---

### count

> `static` **count**: (`attribute?`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:476

Count documents, optionally aliased.

#### Parameters

##### attribute?

`string`

##### alias?

`string`

#### Returns

`string`

---

### countDistinct

> `static` **countDistinct**: (`attribute`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:480

Count distinct values of attribute, optionally aliased.

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`string`

---

### covers

> `static` **covers**: (`attribute`, `values`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:534

Filter resources where `attribute` covers the given geometry.

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`string`

---

### createdAfter

> `static` **createdAfter**: (`value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:284

Filter resources where document was created after date.

#### Parameters

##### value

`string`

#### Returns

`string`

---

### createdBefore

> `static` **createdBefore**: (`value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:277

Filter resources where document was created before date.

#### Parameters

##### value

`string`

#### Returns

`string`

---

### createdBetween

> `static` **createdBetween**: (`start`, `end`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:292

Filter resources where document was created between dates.

#### Parameters

##### start

`string`

##### end

`string`

#### Returns

`string`

---

### crosses

> `static` **crosses**: (`attribute`, `values`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:432

Filter resources where attribute crosses the given geometry.

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`string`

---

### crossJoin

> `static` **crossJoin**: (`table`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:532

Cross join. `table` is the joined collection/table ID; without an alias the server names the join after it, if the ID is a valid alias, and otherwise rejects the query.

#### Parameters

##### table

`string`

##### alias?

`string`

#### Returns

`string`

---

### cursorAfter

> `static` **cursorAfter**: (`documentId`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:177

Return results after documentId.

#### Parameters

##### documentId

`string`

#### Returns

`string`

---

### cursorBefore

> `static` **cursorBefore**: (`documentId`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:184

Return results before documentId.

#### Parameters

##### documentId

`string`

#### Returns

`string`

---

### distanceEqual

> `static` **distanceEqual**: (`attribute`, `values`, `distance`, `meters?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:354

Filter resources where attribute is at a specific distance from the given coordinates.

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

`string`

---

### distanceGreaterThan

> `static` **distanceGreaterThan**: (`attribute`, `values`, `distance`, `meters?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:374

Filter resources where attribute is at a distance greater than the specified value from the given coordinates.

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

`string`

---

### distanceLessThan

> `static` **distanceLessThan**: (`attribute`, `values`, `distance`, `meters?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:384

Filter resources where attribute is at a distance less than the specified value from the given coordinates.

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

`string`

---

### distanceNotEqual

> `static` **distanceNotEqual**: (`attribute`, `values`, `distance`, `meters?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:364

Filter resources where attribute is not at a specific distance from the given coordinates.

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

`string`

---

### distinct

> `static` **distinct**: () => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:516

Select distinct rows.

#### Returns

`string`

---

### elemMatch

> `static` **elemMatch**: (`attribute`, `queries`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:336

Filter array elements where at least one element matches all the specified queries.

#### Parameters

##### attribute

`string`

The attribute containing the array to filter on.

##### queries

`string`[]

The list of query strings to match against array elements.

#### Returns

`string`

---

### endsWith

> `static` **endsWith**: (`attribute`, `value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:134

Filter resources where attribute ends with value.

#### Parameters

##### attribute

`string`

##### value

`string`

#### Returns

`string`

---

### equal

> `static` **equal**: (`attribute`, `value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:33

Filter resources where attribute is equal to value.

#### Parameters

##### attribute

`string`

##### value

`QueryTypes`

#### Returns

`string`

---

### exists

> `static` **exists**: (`attributes`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:102

Filter resources where the specified attributes exist.

#### Parameters

##### attributes

`string`[]

The list of attributes that must exist.

#### Returns

`string`

---

### fullOuterJoin

> `static` **fullOuterJoin**: (`table`, `leftOrAliasOrOn`, `rightOrOn?`, `operator?`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:530

Full outer join. `table` is the joined collection/table ID; without an alias the server names the join after it, if the ID is a valid alias, and otherwise rejects the query.

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

`string`

---

### greaterThan

> `static` **greaterThan**: (`attribute`, `value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:73

Filter resources where attribute is greater than value.

#### Parameters

##### attribute

`string`

##### value

`QueryTypes`

#### Returns

`string`

---

### greaterThanEqual

> `static` **greaterThanEqual**: (`attribute`, `value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:81

Filter resources where attribute is greater than or equal to value.

#### Parameters

##### attribute

`string`

##### value

`QueryTypes`

#### Returns

`string`

---

### groupBy

> `static` **groupBy**: (`attributes`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:510

Group results by attributes.

#### Parameters

##### attributes

`string`[]

#### Returns

`string`

---

### having

> `static` **having**: (`queries`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:514

Filter grouped results. `queries` are nested like `and`/`or`.

#### Parameters

##### queries

`string`[]

#### Returns

`string`

---

### intersects

> `static` **intersects**: (`attribute`, `values`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:416

Filter resources where attribute intersects with the given geometry.

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`string`

---

### isNotNull

> `static` **isNotNull**: (`attribute`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:95

Filter resources where attribute is not null.

#### Parameters

##### attribute

`string`

#### Returns

`string`

---

### isNull

> `static` **isNull**: (`attribute`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:88

Filter resources where attribute is null.

#### Parameters

##### attribute

`string`

#### Returns

`string`

---

### join

> `static` **join**: (`table`, `leftOrAliasOrOn`, `rightOrOn?`, `operator?`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:524

Inner join. `table` is the joined collection/table ID; without an alias the server names the join after it, if the ID is a valid alias, and otherwise rejects the query.

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

`string`

---

### leftJoin

> `static` **leftJoin**: (`table`, `leftOrAliasOrOn`, `rightOrOn?`, `operator?`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:526

Left join. `table` is the joined collection/table ID; without an alias the server names the join after it, if the ID is a valid alias, and otherwise rejects the query.

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

`string`

---

### lessThan

> `static` **lessThan**: (`attribute`, `value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:57

Filter resources where attribute is less than value.

#### Parameters

##### attribute

`string`

##### value

`QueryTypes`

#### Returns

`string`

---

### lessThanEqual

> `static` **lessThanEqual**: (`attribute`, `value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:65

Filter resources where attribute is less than or equal to value.

#### Parameters

##### attribute

`string`

##### value

`QueryTypes`

#### Returns

`string`

---

### limit

> `static` **limit**: (`limit`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:191

Return only limit results.

#### Parameters

##### limit

`number`

#### Returns

`string`

---

### max

> `static` **max**: (`attribute`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:488

Maximum value of `attribute`, optionally aliased.

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`string`

---

### min

> `static` **min**: (`attribute`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:486

Minimum value of `attribute`, optionally aliased.

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`string`

---

### notBetween

> `static` **notBetween**: (`attribute`, `start`, `end`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:254

Filter resources where attribute is not between start and end (exclusive).

#### Parameters

##### attribute

`string`

##### start

`string` \| `number` \| `bigint`

##### end

`string` \| `number` \| `bigint`

#### Returns

`string`

---

### notContains

> `static` **notContains**: (`attribute`, `value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:236

Filter resources where attribute does not contain the specified value.

#### Parameters

##### attribute

`string`

##### value

`string` \| `any`[]

#### Returns

`string`

---

### notCovers

> `static` **notCovers**: (`attribute`, `values`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:536

Filter resources where `attribute` does not cover the given geometry.

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`string`

---

### notCrosses

> `static` **notCrosses**: (`attribute`, `values`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:440

Filter resources where attribute does not cross the given geometry.

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`string`

---

### notEndsWith

> `static` **notEndsWith**: (`attribute`, `value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:270

Filter resources where attribute does not end with value.

#### Parameters

##### attribute

`string`

##### value

`string`

#### Returns

`string`

---

### notEqual

> `static` **notEqual**: (`attribute`, `value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:41

Filter resources where attribute is not equal to value.

#### Parameters

##### attribute

`string`

##### value

`QueryTypes`

#### Returns

`string`

---

### notExists

> `static` **notExists**: (`attributes`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:109

Filter resources where the specified attributes do not exist.

#### Parameters

##### attributes

`string`[]

The list of attributes that must not exist.

#### Returns

`string`

---

### notIntersects

> `static` **notIntersects**: (`attribute`, `values`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:424

Filter resources where attribute does not intersect with the given geometry.

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`string`

---

### notOverlaps

> `static` **notOverlaps**: (`attribute`, `values`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:456

Filter resources where attribute does not overlap with the given geometry.

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`string`

---

### notSearch

> `static` **notSearch**: (`attribute`, `value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:245

Filter resources by searching attribute for value (inverse of search).
A fulltext index on attribute is required for this query to work.

#### Parameters

##### attribute

`string`

##### value

`string`

#### Returns

`string`

---

### notSpatialEquals

> `static` **notSpatialEquals**: (`attribute`, `values`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:540

Filter resources where `attribute` is not spatially equal to the given geometry.

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`string`

---

### notStartsWith

> `static` **notStartsWith**: (`attribute`, `value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:262

Filter resources where attribute does not start with value.

#### Parameters

##### attribute

`string`

##### value

`string`

#### Returns

`string`

---

### notTouches

> `static` **notTouches**: (`attribute`, `values`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:472

Filter resources where attribute does not touch the given geometry.

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`string`

---

### offset

> `static` **offset**: (`offset`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:198

Filter resources by skipping the first offset results.

#### Parameters

##### offset

`number`

#### Returns

`string`

---

### on

> `static` **on**: (`left`, `right`, `operator?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:520

Column-to-column join ON condition.

#### Parameters

##### left

`string`

##### right

`string`

##### operator?

`string`

#### Returns

`string`

---

### or

> `static` **or**: (`queries`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:321

Combine multiple queries using logical OR operator.

#### Parameters

##### queries

`string`[]

#### Returns

`string`

---

### orderAsc

> `static` **orderAsc**: (`attribute`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:164

Sort results by attribute ascending.

#### Parameters

##### attribute

`string`

#### Returns

`string`

---

### orderDesc

> `static` **orderDesc**: (`attribute`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:157

Sort results by attribute descending.

#### Parameters

##### attribute

`string`

#### Returns

`string`

---

### orderRandom

> `static` **orderRandom**: () => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:170

Sort results randomly.

#### Returns

`string`

---

### overlaps

> `static` **overlaps**: (`attribute`, `values`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:448

Filter resources where attribute overlaps with the given geometry.

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`string`

---

### page

> `static` **page**: (`page`, `perPage?`) => `string`[]

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:544

Return limit and offset queries for 1-based page pagination.

#### Parameters

##### page

`number`

##### perPage?

`number`

#### Returns

`string`[]

---

### regex

> `static` **regex**: (`attribute`, `pattern`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:49

Filter resources where attribute matches a regular expression pattern.

#### Parameters

##### attribute

`string`

The attribute to filter on.

##### pattern

`string`

The regular expression pattern to match.

#### Returns

`string`

---

### relationship

> `static` **relationship**: (`attribute`, `queries`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:344

Constrain populated related documents on a relationship attribute.

#### Parameters

##### attribute

`string`

The relationship attribute to query.

##### queries

`string`[]

Filter, order, select, and pagination queries applied to related documents.

#### Returns

`string`

---

### rightJoin

> `static` **rightJoin**: (`table`, `leftOrAliasOrOn`, `rightOrOn?`, `operator?`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:528

Right join. `table` is the joined collection/table ID; without an alias the server names the join after it, if the ID is a valid alias, and otherwise rejects the query.

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

`string`

---

### search

> `static` **search**: (`attribute`, `value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:150

Filter resources by searching attribute for value.
A fulltext index on attribute is required for this query to work.

#### Parameters

##### attribute

`string`

##### value

`string`

#### Returns

`string`

---

### select

> `static` **select**: (`attributes`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:141

Specify which attributes should be returned by the API call.

#### Parameters

##### attributes

`string`[]

#### Returns

`string`

---

### spatialEquals

> `static` **spatialEquals**: (`attribute`, `values`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:538

Filter resources where `attribute` is spatially equal to the given geometry.

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`string`

---

### startsWith

> `static` **startsWith**: (`attribute`, `value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:126

Filter resources where attribute starts with value.

#### Parameters

##### attribute

`string`

##### value

`string`

#### Returns

`string`

---

### stddev

> `static` **stddev**: (`attribute`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:490

Population standard deviation of `attribute` (the same as stddevPop), optionally aliased.

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`string`

---

### stddevPop

> `static` **stddevPop**: (`attribute`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:492

Population standard deviation of `attribute`, optionally aliased.

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`string`

---

### stddevSamp

> `static` **stddevSamp**: (`attribute`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:494

Sample standard deviation of `attribute`, optionally aliased.

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`string`

---

### sum

> `static` **sum**: (`attribute`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:482

Sum values of `attribute`, optionally aliased.

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`string`

---

### touches

> `static` **touches**: (`attribute`, `values`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:464

Filter resources where attribute touches the given geometry.

#### Parameters

##### attribute

`string`

##### values

`any`[]

#### Returns

`string`

---

### updatedAfter

> `static` **updatedAfter**: (`value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:306

Filter resources where document was updated after date.

#### Parameters

##### value

`string`

#### Returns

`string`

---

### updatedBefore

> `static` **updatedBefore**: (`value`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:299

Filter resources where document was updated before date.

#### Parameters

##### value

`string`

#### Returns

`string`

---

### updatedBetween

> `static` **updatedBetween**: (`start`, `end`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:314

Filter resources where document was updated between dates.

#### Parameters

##### start

`string`

##### end

`string`

#### Returns

`string`

---

### variance

> `static` **variance**: (`attribute`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:496

Population variance of `attribute` (the same as varPop), optionally aliased.

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`string`

---

### varPop

> `static` **varPop**: (`attribute`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:498

Population variance of `attribute`, optionally aliased.

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`string`

---

### varSamp

> `static` **varSamp**: (`attribute`, `alias?`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:500

Sample variance of `attribute`, optionally aliased.

#### Parameters

##### attribute

`string`

##### alias?

`string`

#### Returns

`string`

---

### vectorCosine

> `static` **vectorCosine**: (`attribute`, `vector`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:400

Filter resources using vector cosine similarity.

#### Parameters

##### attribute

`string`

##### vector

`number`[]

#### Returns

`string`

---

### vectorDot

> `static` **vectorDot**: (`attribute`, `vector`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:392

Filter resources using vector dot product similarity.

#### Parameters

##### attribute

`string`

##### vector

`number`[]

#### Returns

`string`

---

### vectorEuclidean

> `static` **vectorEuclidean**: (`attribute`, `vector`) => `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:408

Filter resources using vector Euclidean distance.

#### Parameters

##### attribute

`string`

##### vector

`number`[]

#### Returns

`string`

## Methods

### toString()

> **toString**(): `string`

Defined in: apps/web/node\_modules/appwrite/types/query.d.ts:25

Convert the query object to a JSON string.

#### Returns

`string`
