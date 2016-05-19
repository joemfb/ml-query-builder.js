/* eslint-env mocha */
'use strict'

var expect = require('chai').expect
var qb = require('../lib/query-builder-lite.js')

describe('query-builder-lite', function () {
  it('should build a query', function () {
    var query = qb.where()

    expect(query.query).not.to.be.undefined
    expect(query.query.queries.length).to.equal(0)

    query = qb.where(qb.and())

    expect(query.query.queries.length).to.equal(1)
  })

  it('should build an and-query with one sub-query', function () {
    var query = qb.and()
    expect(query['and-query']).not.to.be.undefined
    expect(query['and-query'].queries.length).to.equal(0)

    query = qb.and(qb.term('blah'))
    expect(query['and-query'].queries.length).to.equal(1)
  })

  it('should build an and-query with multiple sub-query', function () {
    var query = query = qb.and(qb.term('blah'), qb.term('blue'))

    expect(query['and-query'].queries.length).to.equal(2)
  })

  it('should build an or-query with one sub-query', function () {
    var query = qb.or(qb.term('foo'))

    expect(query['or-query']).not.to.be.undefined
    expect(query['or-query'].queries.length).to.equal(1)
  })

  it('should build an or-query with multiple sub-queries', function () {
    var query = qb.or(qb.term('foo'), qb.term('bar'))

    expect(query['or-query']).not.to.be.undefined
    expect(query['or-query'].queries.length).to.equal(2)
  })

  it('should build a not-query', function () {
    var query = qb.not(qb.term('blah'))

    expect(query['not-query']).not.to.be.undefined
    expect(query['not-query']['term-query']).not.to.be.undefined
    expect(query['not-query']['term-query'].text[0]).to.equal('blah')
  })

  it('should build a collection query with one uri', function () {
    var query = qb.collection('uri')

    expect(query['collection-query']).not.to.be.undefined
    expect(query['collection-query'].uri.length).to.equal(1)
    expect(query['collection-query'].uri[0]).to.equal('uri')
  })

  it('should build a collection query with multiple uris', function () {
    var query = qb.collection('uri1', 'uri2')

    expect(query['collection-query']).not.to.be.undefined
    expect(query['collection-query'].uri.length).to.equal(2)
    expect(query['collection-query'].uri[0]).to.equal('uri1')
    expect(query['collection-query'].uri[1]).to.equal('uri2')

    expect(query).to.deep.equal(qb.collection(['uri1', 'uri2']))
  })

  it('should build a directory query with one uri', function () {
    var query = qb.directory('uri')

    expect(query['directory-query']).not.to.be.undefined
    expect(query['directory-query'].uri.length).to.equal(1)
    expect(query['directory-query'].uri[0]).to.equal('uri')
    expect(query['directory-query'].infinite).to.equal(true)
  })

  it('should build a directory query with multiple uris', function () {
    var query = qb.directory(['uri1', 'uri2'], false)

    expect(query['directory-query']).not.to.be.undefined
    expect(query['directory-query'].uri.length).to.equal(2)
    expect(query['directory-query'].uri[0]).to.equal('uri1')
    expect(query['directory-query'].uri[1]).to.equal('uri2')
    expect(query['directory-query'].infinite).to.equal(false)
  })

  it('should build a document query with one document', function () {
    var query = qb.document('uri')

    expect(query['document-query']).not.to.be.undefined
    expect(query['document-query'].uri.length).to.equal(1)
    expect(query['document-query'].uri[0]).to.equal('uri')
  })

  it('should build a document query with multiple documents', function () {
    var query = qb.document(['uri1', 'uri2'])

    expect(query['document-query']).not.to.be.undefined
    expect(query['document-query'].uri.length).to.equal(2)
    expect(query['document-query'].uri[0]).to.equal('uri1')
    expect(query['document-query'].uri[1]).to.equal('uri2')
  })

  it('should build a qname', function () {
    var qname = qb.qname('foo')

    expect(qname).not.to.be.undefined
    expect(qname.ns).to.be.null
    expect(qname.name).to.equal('foo')

    qname = qb.qname('foo', 'bar')

    expect(qname).not.to.be.undefined
    expect(qname.ns).to.equal('foo')
    expect(qname.name).to.equal('bar')

    qname = qb.qname(['foo', 'bar'])

    expect(qname).not.to.be.undefined
    expect(qname.ns).to.equal('foo')
    expect(qname.name).to.equal('bar')
  })

  it('should build an element', function () {
    var element = qb.element('foo')

    expect(element).not.to.be.undefined
    expect(element.element).not.to.be.undefined
    expect(element.element.ns).to.be.null
    expect(element.element.name).to.equal('foo')

    element = qb.element('foo', 'bar')

    expect(element).not.to.be.undefined
    expect(element.element).not.to.be.undefined
    expect(element.element.ns).to.equal('foo')
    expect(element.element.name).to.equal('bar')

    element = qb.element(['foo', 'bar'])

    expect(element).not.to.be.undefined
    expect(element.element).not.to.be.undefined
    expect(element.element.ns).to.equal('foo')
    expect(element.element.name).to.equal('bar')

    element = qb.element(qb.qname(['foo', 'bar']))

    expect(element).not.to.be.undefined
    expect(element.element).not.to.be.undefined
    expect(element.element.ns).to.equal('foo')
    expect(element.element.name).to.equal('bar')
  })

  it('should build a datatype', function () {
    var datatype = qb.datatype('int')

    expect(datatype).not.to.be.undefined
    expect(datatype.datatype).not.to.be.undefined
    expect(datatype.datatype).to.equal('xs:int')
    expect(datatype.collation).to.be.undefined

    datatype = qb.datatype('string', 'my-collation')

    expect(datatype).not.to.be.undefined
    expect(datatype.datatype).not.to.be.undefined
    expect(datatype.datatype).to.equal('xs:string')
    expect(datatype.collation).to.equal('my-collation')
  })

  it('should throw an error when given invalid datatype', function () {
    var f = function () { qb.datatype('blah') }
    expect(f).to.throw(/Unknown datatype: blah/)
  })

  it('should build a range query with one value', function () {
    var query = qb.range('foo', 'bar')

    expect(query['range-query']).not.to.be.undefined
    expect(query['range-query']['json-property']).not.to.be.undefined
    expect(query['range-query']['json-property']).to.equal('foo')
    expect(query['range-query'].value.length).to.equal(1)
    expect(query['range-query'].value[0]).to.equal('bar')
    expect(query['range-query']['range-operator']).not.to.be.undefined
    expect(query['range-query']['range-operator']).to.equal('EQ')

    query = qb.range(qb.element('foo'), 'bar')

    expect(query['range-query']).not.to.be.undefined
    expect(query['range-query'].element).not.to.be.undefined
    expect(query['range-query'].element.name).not.to.be.undefined
    expect(query['range-query'].element.name).to.equal('foo')
    expect(query['range-query'].value.length).to.equal(1)
    expect(query['range-query'].value[0]).to.equal('bar')
    expect(query['range-query']['range-operator']).not.to.be.undefined
    expect(query['range-query']['range-operator']).to.equal('EQ')
  })

  it('should build a range query with multiple values', function () {
    var query = qb.range('foo', 'bar', 'baz')

    expect(query['range-query']).not.to.be.undefined
    expect(query['range-query']['json-property']).not.to.be.undefined
    expect(query['range-query']['json-property']).to.equal('foo')
    expect(query['range-query'].value.length).to.equal(2)
    expect(query['range-query'].value[0]).to.equal('bar')
    expect(query['range-query'].value[1]).to.equal('baz')
    expect(query['range-query']['range-operator']).not.to.be.undefined
    expect(query['range-query']['range-operator']).to.equal('EQ')

    query = qb.range(qb.element('foo'), ['bar', 'baz'])

    expect(query['range-query']).not.to.be.undefined
    expect(query['range-query'].element).not.to.be.undefined
    expect(query['range-query'].element.name).not.to.be.undefined
    expect(query['range-query'].element.name).to.equal('foo')
    expect(query['range-query'].value.length).to.equal(2)
    expect(query['range-query'].value[0]).to.equal('bar')
    expect(query['range-query'].value[1]).to.equal('baz')
    expect(query['range-query']['range-operator']).not.to.be.undefined
    expect(query['range-query']['range-operator']).to.equal('EQ')
  })

  it('should build a range query with datatype, comparison and/or rangeOptions', function () {
    var query = qb.range('foo', '!=', 'bar', 'baz')

    expect(query['range-query']).not.to.be.undefined
    expect(query['range-query']['json-property']).not.to.be.undefined
    expect(query['range-query']['json-property']).to.equal('foo')
    expect(query['range-query'].value.length).to.equal(2)
    expect(query['range-query'].value[0]).to.equal('bar')
    expect(query['range-query'].value[1]).to.equal('baz')
    expect(query['range-query']['range-operator']).not.to.be.undefined
    expect(query['range-query']['range-operator']).to.equal('NE')

    query = qb.range(qb.element('foo'), qb.datatype('int'), [12, 15])

    expect(query['range-query']).not.to.be.undefined
    expect(query['range-query'].element).not.to.be.undefined
    expect(query['range-query'].element.name).not.to.be.undefined
    expect(query['range-query'].element.name).to.equal('foo')
    expect(query['range-query'].value.length).to.equal(2)
    expect(query['range-query'].value[0]).to.equal(12)
    expect(query['range-query'].value[1]).to.equal(15)
    expect(query['range-query']['range-operator']).not.to.be.undefined
    expect(query['range-query']['range-operator']).to.equal('EQ')
    expect(query['range-query'].type).to.equal('xs:int')
    expect(query['range-query'].collation).to.be.undefined

    query = qb.range('foo', qb.datatype('string', 'my-collation'), '>=', 'bar', 'baz', qb.rangeOptions('limit=10'))

    expect(query['range-query']).not.to.be.undefined
    expect(query['range-query']['json-property']).not.to.be.undefined
    expect(query['range-query']['json-property']).to.equal('foo')
    expect(query['range-query'].value.length).to.equal(2)
    expect(query['range-query'].value[0]).to.equal('bar')
    expect(query['range-query'].value[1]).to.equal('baz')
    expect(query['range-query']['range-operator']).not.to.be.undefined
    expect(query['range-query']['range-operator']).to.equal('GE')
    expect(query['range-query'].type).to.equal('xs:string')
    expect(query['range-query'].collation).to.equal('my-collation')
    expect(query['range-query']['range-option']).not.to.be.undefined
    expect(query['range-query']['range-option'].length).to.equal(1)
    expect(query['range-query']['range-option'][0]).to.equal('limit=10')
  })

  it('should build range options', function () {
    var options = qb.rangeOptions('limit=10')

    expect(options).not.to.be.undefined
    expect(options['range-option']).not.to.be.undefined
    expect(options['range-option'].length).to.equal(1)
    expect(options['range-option'][0]).to.equal('limit=10')

    options = qb.rangeOptions('limit=10', 'skip=3')

    expect(options).not.to.be.undefined
    expect(options['range-option']).not.to.be.undefined
    expect(options['range-option'].length).to.equal(2)
    expect(options['range-option'][0]).to.equal('limit=10')
    expect(options['range-option'][1]).to.equal('skip=3')

    options = qb.rangeOptions(['limit=10', 'skip=3'])

    expect(options).not.to.be.undefined
    expect(options['range-option']).not.to.be.undefined
    expect(options['range-option'].length).to.equal(2)
    expect(options['range-option'][0]).to.equal('limit=10')
    expect(options['range-option'][1]).to.equal('skip=3')
  })

  it('should build a term query with one value', function () {
    var query = qb.term('foo')

    expect(query['term-query']).not.to.be.undefined
    expect(query['term-query'].text.length).to.equal(1)
    expect(query['term-query'].text[0]).to.equal('foo')
  })

  it('should build a term query with multiple values', function () {
    var query = qb.term(['foo', 'bar'])

    expect(query['term-query']).not.to.be.undefined
    expect(query['term-query'].text.length).to.equal(2)
    expect(query['term-query'].text[0]).to.equal('foo')
    expect(query['term-query'].text[1]).to.equal('bar')
  })

  it('should build a boost query', function () {
    var query = qb.boost(qb.and(), qb.term('blah'))

    expect(query['boost-query']).not.to.be.undefined
    expect(query['boost-query']['matching-query']).not.to.be.undefined
    expect(query['boost-query']['matching-query']).to.deep.equal(qb.and())

    expect(query['boost-query']['boosting-query']).not.to.be.undefined
    expect(query['boost-query']['boosting-query']['term-query']).not.to.be.undefined
    expect(query['boost-query']['boosting-query']['term-query'].text[0]).to.equal('blah')
  })

  it('should build a document-fragment query', function () {
    var query = qb.documentFragment(qb.and())

    expect(query['document-fragment-query']).not.to.be.undefined
    expect(query['document-fragment-query']).to.deep.equal(qb.and())
  })

  it('should build a properties-fragment query', function () {
    var query = qb.propertiesFragment(qb.and())

    expect(query['properties-fragment-query']).not.to.be.undefined
    expect(query['properties-fragment-query']).to.deep.equal(qb.and())
  })

  it('should build a locks-fragment query', function () {
    var query = qb.locksFragment(qb.and())

    expect(query['locks-fragment-query']).not.to.be.undefined
    expect(query['locks-fragment-query']).to.deep.equal(qb.and())
  })
})
