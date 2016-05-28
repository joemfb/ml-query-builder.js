'use strict'

/** @module queryBuilder */

var asArray = require('./utils.js').asArray

/** @member {module:extensions} ext */

/**
 * Builds a {@link http://docs.marklogic.com/guide/search-dev/structured-query structured query}
 * from a set of sub-queries
 * @see http://docs.marklogic.com/jsdoc/queryBuilder.html#where
 *
 * @static
 * @param {...Object} queries - sub queries
 * @return {Object} {@link http://docs.marklogic.com/guide/search-dev/structured-query structured query}
 */
function where () {
  var args = asArray.apply(null, arguments)
  return {
    'query': {
      'queries': args
    }
  }
}

/**
 * Builds an {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_83674 `and-query`}
 * @see http://docs.marklogic.com/jsdoc/queryBuilder.html#and
 *
 * @static
 * @param {...Object} queries - sub queries
 * @return {Object} {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_64259 or-query}
 */
function and () {
  var args = asArray.apply(null, arguments)
  return {
    'and-query': {
      'queries': args
    }
  }
}

/**
 * Builds an {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_64259 `or-query`}
 * @see http://docs.marklogic.com/jsdoc/queryBuilder.html#or
 *
 * @static
 * @param {...Object} queries - sub queries
 * @return {Object} {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_64259 or-query}
 */
function or () {
  var args = asArray.apply(null, arguments)
  return {
    'or-query': {
      'queries': args
    }
  }
}

/**
 * Builds a {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_39488 `not-query`}
 * @see http://docs.marklogic.com/jsdoc/queryBuilder.html#not
 *
 * @static
 * @param {Object} query - sub query to be negated
 * @return {Object} {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_39488 not-query}
 */
function not (query) {
  return {
    'not-query': query
  }
}

/**
 * Builds a {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_30556 `document-fragment-query`}
 * @see http://docs.marklogic.com/jsdoc/queryBuilder.html#documentFragment
 *
 * @static
 * @param {Object} query - sub query to be constrained to document fragments
 * @return {Object} {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_30556 document-fragment-query}
 */
function documentFragment (query) {
  return { 'document-fragment-query': query }
}

/**
 * Builds a {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_67222 `properties-fragment-query`}
 * @see http://docs.marklogic.com/jsdoc/queryBuilder.html#propertiesFragment
 *
 * @static
 * @param {Object} query - sub query to be constrained to properties fragments
 * @return {Object} {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_67222 properties-fragment-query}
 */
function propertiesFragment (query) {
  return { 'properties-fragment-query': query }
}

/**
 * Builds a {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_53441 `locks-fragment-query`}
 * @see http://docs.marklogic.com/jsdoc/queryBuilder.html#locksFragment
 *
 * @static
 * @param {Object} query - sub query to be constrained to document locks
 * @return {Object} {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_53441 locks-fragment-query}
 */
function locksFragment (query) {
  return { 'locks-fragment-query': query }
}

/**
 * Builds a {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_76890 `collection-query`}
 * @see http://docs.marklogic.com/jsdoc/queryBuilder.html#collection
 *
 * @static
 * @param {...String|Array<String>} uris - the collection URIs to query (logical OR)
 * @return {Object} {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_76890 collection-query}
 */
function collection () {
  var args = asArray.apply(null, arguments)
  return {
    'collection-query': {
      'uri': args
    }
  }
}

/**
 * Builds a {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_94821 `directory-query`}
 * @see http://docs.marklogic.com/jsdoc/queryBuilder.html#directory
 *
 * @static
 * @param {...String|Array<String>} uris - the directory URIs to query (logical OR)
 * @param {Boolean} [infinite] - whether to query into all sub-directories (defaults to `true`)
 * @return {Object} {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_94821 directory-query}
 */
function directory () {
  var args = asArray.apply(null, arguments)
  var last = args[args.length - 1]
  var infinite = true

  if (last === true || last === false) {
    infinite = last
    args.pop()
  }

  // horrible hack to support an array of URIs
  if (args.length === 1 && Array.isArray(args[0])) {
    args = args[0]
  }

  return {
    'directory-query': {
      'uri': args,
      'infinite': infinite
    }
  }
}

/**
 * Builds a {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_27172 `document-query`}
 * @see http://docs.marklogic.com/jsdoc/queryBuilder.html#document
 *
 * @static
 * @param {...String} uris - document URIs to match
 * @return {Object} {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_27172 document-query}
 */
function document () {
  var args = asArray.apply(null, arguments)
  return {
    'document-query': {
      'uri': args
    }
  }
}

/**
 * Builds a {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_25949 `boost-query`}
 * @see http://docs.marklogic.com/jsdoc/queryBuilder.html#boost
 *
 * @static
 * @param {Object} matching - matching query
 * @param {Object} boosting - boosting query
 * @return {Object} {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_25949 boost-query}
 */
function boost (matching, boosting) {
  return {
    'boost-query': {
      'matching-query': matching,
      'boosting-query': boosting
    }
  }
}

/**
 *
 * @static
 * @see http://docs.marklogic.com/jsdoc/queryBuilder.html#qname
 */
function qname (ns, name) {
  var args = asArray.apply(null, arguments)

  if (args.length === 1) {
    return { ns: null, name: args[0] }
  } else {
    return { ns: args[0], name: args[1] }
  }
}

/**
 *
 * @static
 * @see http://docs.marklogic.com/jsdoc/queryBuilder.html#element
 */
function element () {
  var args = asArray.apply(null, arguments)
  var qname

  if (args.length === 1) {
    if (args[0].ns || args[0].name) {
      qname = args[0]
    } else {
      qname = this.qname(args[0])
    }
  } else {
    qname = this.qname(args[0], args[1])
  }

  return { element: qname }
}

/**
 *
 * @static
 * @see http://docs.marklogic.com/jsdoc/queryBuilder.html#datatype
 */
function datatype (type, collation) {
  var datatypes = [
    'anyURI',
    'date',
    'dateTime',
    'dayTimeDuration',
    'decimal',
    'double',
    'float',
    'gDay',
    'gMonth',
    'gMonthDay',
    'gYear',
    'gYearMonth',
    'int',
    'long',
    'string',
    'time',
    'unsignedInt',
    'unsignedLong',
    'yearMonthDuration'
  ]

  if (datatypes.indexOf(type) > -1) {
    type = 'xs:' + type
  } else {
    throw new TypeError('Unknown datatype: ' + type)
  }

  return {
    datatype: type,
    collation: collation
  }
}

/**
 * Builds a {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_83393 `range-query`}
 * @see http://docs.marklogic.com/jsdoc/queryBuilder.html#range
 *
 * @static
 * @param {Object|String|Array<String>} indexedName - the name of a range index
 * @param {Object} [datatype] - the type/collation of the range index (as returned by {@link MLQueryBuilder#datatype})
 * @param {String} [operator] - the query operator
 * @param {...*} [value] - the values to compare
 * @param {Object} [rangeOptions] - the range query options (as returned by {@link MLQueryBuilder#rangeOptions})
 * @return {Object} {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_83393 range-query}
 */
function range () {
  var comparisons = {
    '<': 'LT',
    '<=': 'LE',
    '>': 'GT',
    '>=': 'GE',
    '=': 'EQ',
    '!=': 'NE'
  }

  var args = asArray.apply(null, arguments)

  var indexedName = args.shift()

  // TODO: attribute/field/path
  if (!indexedName.element) {
    indexedName = { 'json-property': indexedName }
  }

  var datatype = args.shift()
  var operator = null
  var values = []

  if (datatype && datatype.datatype) {
    datatype = { type: datatype.datatype, collation: datatype.collation }
    operator = args.shift()
  } else {
    operator = datatype
    datatype = null
  }

  if (!comparisons[ operator ]) {
    Array.prototype.push.apply(values, asArray(operator))
    operator = null
  }

  var options = []

  args.forEach(function (arg) {
    if (arg['range-option']) {
      Array.prototype.push.apply(options, asArray(arg['range-option']))
    } else {
      Array.prototype.push.apply(values, asArray(arg))
    }
  })

  var query = {
    'range-query': {
      'range-operator': comparisons[ operator ] || 'EQ',
      'value': values,
      'range-option': options
    }
  }

  Object.assign(query['range-query'], indexedName, datatype)

  return query
}

/**
 *
 * @static
 * @see http://docs.marklogic.com/jsdoc/queryBuilder.html#rangeOptions
 */
function rangeOptions (ns, name) {
  var args = asArray.apply(null, arguments)

  return { 'range-option': args }
}

/**
 * Builds a {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_56027 `term-query`}
 * @see http://docs.marklogic.com/jsdoc/queryBuilder.html#term
 *
 * @static
 * @param {...String} terms - terms to match (logical OR)
 * @return {Object} {@link http://docs.marklogic.com/guide/search-dev/structured-query#id_56027 term-query}
 */
function term () {
  var args = asArray.apply(null, arguments)
  return {
    'term-query': {
      'text': args
    }
  }
}

module.exports = {
  where: where,
  and: and,
  or: or,
  not: not,
  documentFragment: documentFragment,
  propertiesFragment: propertiesFragment,
  locksFragment: locksFragment,
  collection: collection,
  directory: directory,
  document: document,
  boost: boost,
  qname: qname,
  element: element,
  datatype: datatype,
  range: range,
  rangeOptions: rangeOptions,
  term: term
}
