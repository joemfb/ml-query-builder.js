### ml-query-builder.js

a lightweight MarkLogic structured query builder, offered as a browser-friendly alternative to the official [marklogic client](//github.com/marklogic/node-client-api)

install from npm:

```sh
npm install ml-query-builder.js
```


```js
var qb = require('ml-query-builder.js')

qb.where(qb.and())
// => {query:{queries:[{and-query:{queries:[]}}]}}
```

A compatible subset of the official `queryBuilder` is provided:

*[API docs](//joemfb.github.io/ml-query-builder.js/module-extensions.html)*

- [`where()`](//docs.marklogic.com/jsdoc/queryBuilder.html#where)
- [`and()`](//docs.marklogic.com/jsdoc/queryBuilder.html#or)
- [`or()`](//docs.marklogic.com/jsdoc/queryBuilder.html#or)
- [`not()`](//docs.marklogic.com/jsdoc/queryBuilder.html#not)
- [`documentFragment()`](//docs.marklogic.com/jsdoc/queryBuilder.html#documentFragment)
- [`propertiesFragment()`](//docs.marklogic.com/jsdoc/queryBuilder.html#propertiesFragment)
- [`locksFragment()`](//docs.marklogic.com/jsdoc/queryBuilder.html#locksFragment)
- [`collection()`](//docs.marklogic.com/jsdoc/queryBuilder.html#collection)
- [`directory()`](//docs.marklogic.com/jsdoc/queryBuilder.html#directory)
- [`document()`](//docs.marklogic.com/jsdoc/queryBuilder.html#document)
- [`boost()`](//docs.marklogic.com/jsdoc/queryBuilder.html#boost)
- [`qname()`](//docs.marklogic.com/jsdoc/queryBuilder.html#qname)
- [`element()`](//docs.marklogic.com/jsdoc/queryBuilder.html#element)
- [`datatype()`](//docs.marklogic.com/jsdoc/queryBuilder.html#datatype)
- [`range()`](//docs.marklogic.com/jsdoc/queryBuilder.html#range)
- [`rangeOptions()`](//docs.marklogic.com/jsdoc/queryBuilder.html#rangeOptions)
- [`term()`](//docs.marklogic.com/jsdoc/queryBuilder.html#term)

Additionally, extension methods are provided to support server-side query options:

*[API docs](//joemfb.github.io/ml-query-builder.js/module-queryBuilder.html)*

- `ext.combined()` - *builds a [combined query](//docs.marklogic.com/guide/rest-dev/search#id_69918)*
- `ext.rangeConstraint()` - *builds a [`range-constraint-query`](//docs.marklogic.com/guide/search-dev/structured-query#id_38268)*
- `ext.valueConstraint()` - *builds a [`value-constraint-query`](//docs.marklogic.com/guide/search-dev/structured-query#id_63420)*
- `ext.wordConstraint()` - *builds a [`word-constraint-query`](//docs.marklogic.com/guide/search-dev/structured-query#id_66833)*
- `ext.collectionConstraint()` - *builds a [`collection-constraint-query`](//docs.marklogic.com/guide/search-dev/structured-query#id_30776)*
- `ext.customConstraint()` - *builds a [`custom-constraint-query`](//docs.marklogic.com/guide/search-dev/structured-query#id_28778)*
- `ext.geospatialValues()` - *normalizes geospatial values*
- `ext.geospatialConstraint()` - *builds a [`geospatial-constraint-query`](//docs.marklogic.com/guide/search-dev/structured-query#id_88775)*
- `ext.constraint()` - *gets a constraint query function by type*
- `ext.operatorState()` - *builds an [`operator-state` query component](//docs.marklogic.com/guide/search-dev/structured-query#id_45570)*

*adapted from the `MLQueryBuilder` angular service in [ml-common-ng#v1.0.1](//github.com/joemfb/ml-common-ng/tree/3dab8fbbd3aab450c2b63aac5cdf581971e1bec1)*
