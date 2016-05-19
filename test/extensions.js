/* eslint-env mocha */
'use strict'

var expect = require('chai').expect
var qb = require('../index.js')

describe('extensions', function () {
  it('should build a range-constraint-query with one value', function () {
    var query = qb.ext.rangeConstraint('test', 'value')

    expect(query['range-constraint-query']).not.to.be.undefined
    expect(query['range-constraint-query']['constraint-name']).to.equal('test')
    expect(query['range-constraint-query'].value.length).to.equal(1)
    expect(query['range-constraint-query'].value[0]).to.equal('value')
    expect(query['range-constraint-query']['range-option'].length).to.equal(0)
  })

  it('should build a range-constraint-query with multiple values', function () {
    var query = qb.ext.rangeConstraint('test', ['value1', 'value2'])

    expect(query['range-constraint-query']).not.to.be.undefined
    expect(query['range-constraint-query']['constraint-name']).to.equal('test')
    expect(query['range-constraint-query'].value.length).to.equal(2)
    expect(query['range-constraint-query'].value[0]).to.equal('value1')
    expect(query['range-constraint-query'].value[1]).to.equal('value2')
  })

  it('should build a range-constraint-query with an operator', function () {
    var query = qb.ext.rangeConstraint('test', 'NE', 'value')

    expect(query['range-constraint-query']).not.to.be.undefined
    expect(query['range-constraint-query']['constraint-name']).to.equal('test')
    expect(query['range-constraint-query']['range-operator']).to.equal('NE')
    expect(query['range-constraint-query'].value.length).to.equal(1)
    expect(query['range-constraint-query'].value[0]).to.equal('value')
  })

  it('throws an error when rangeConstraint is invoked with an invalid operator', function () {
    try {
      qb.ext.rangeConstraint('test', 'ZZ', 'value')
    } catch (err) {
      expect(err).to.match(/invalid rangeConstraint query operator: ZZ/)
    }
  })

  it('should build a collection-query with one collection', function () {
    var query = qb.ext.collectionConstraint('name', 'uri')

    expect(query['collection-constraint-query']).not.to.be.undefined
    expect(query['collection-constraint-query']['constraint-name']).to.equal('name')
    expect(query['collection-constraint-query'].uri.length).to.equal(1)
    expect(query['collection-constraint-query'].uri[0]).to.equal('uri')
  })

  it('should build a collection-query with multiple collections', function () {
    var query = qb.ext.collectionConstraint('name', ['uri1', 'uri2'])

    expect(query['collection-constraint-query']).not.to.be.undefined
    expect(query['collection-constraint-query']['constraint-name']).to.equal('name')
    expect(query['collection-constraint-query'].uri.length).to.equal(2)
    expect(query['collection-constraint-query'].uri[0]).to.equal('uri1')
    expect(query['collection-constraint-query'].uri[1]).to.equal('uri2')
  })

  it('should build a custom-constraint-query with one value', function () {
    var query = qb.ext.customConstraint('test', 'value')

    expect(query['custom-constraint-query']).not.to.be.undefined
    expect(query['custom-constraint-query']['constraint-name']).to.equal('test')
    expect(query['custom-constraint-query'].text.length).to.equal(1)
    expect(query['custom-constraint-query'].text[0]).to.equal('value')
  })

  it('should build a custom-constraint-query with multiple values', function () {
    var query = qb.ext.customConstraint('test', ['value1', 'value2'])

    expect(query['custom-constraint-query']).not.to.be.undefined
    expect(query['custom-constraint-query']['constraint-name']).to.equal('test')
    expect(query['custom-constraint-query'].text.length).to.equal(2)
    expect(query['custom-constraint-query'].text[0]).to.equal('value1')
    expect(query['custom-constraint-query'].text[1]).to.equal('value2')
  })

  it('should build a custom-constraint-query with object properties', function () {
    var query = qb.ext.customConstraint('name', qb.ext.geospatialValues(
      { latitude: 1, longitude: 2 },
      { south: 1, west: 2, north: 3, east: 4 }
    ))

    expect(query['custom-constraint-query']).not.to.be.undefined
    expect(query['custom-constraint-query']['constraint-name']).to.equal('name')
    expect(query['custom-constraint-query'].text).to.be.undefined
    expect(query['custom-constraint-query'].point).not.to.be.undefined
    expect(query['custom-constraint-query'].point.length).to.equal(1)
    expect(query['custom-constraint-query'].box).not.to.be.undefined
    expect(query['custom-constraint-query'].box.length).to.equal(1)
    expect(query['custom-constraint-query'].circle).not.to.be.undefined
    expect(query['custom-constraint-query'].circle.length).to.equal(0)
    expect(query['custom-constraint-query'].polygon).not.to.be.undefined
    expect(query['custom-constraint-query'].polygon.length).to.equal(0)
  })

  it('should build a custom-constraint-query with mixed properties', function () {
    var query = qb.ext.customConstraint(
      'name',
      { prop: 'value' },
      'blah'
    )

    expect(query['custom-constraint-query']).not.to.be.undefined
    expect(query['custom-constraint-query']['constraint-name']).to.equal('name')
    expect(query['custom-constraint-query'].text).not.to.be.undefined
    expect(query['custom-constraint-query'].text.length).to.equal(1)
  })

  it('should parse geospatial values', function () {
    var values = qb.ext.geospatialValues(
      { latitude: 1, longitude: 2 },
      { south: 1, west: 2, north: 3, east: 4 },
      { point: { latitude: 1, longitude: 2 } },
      { point: { latitude: 10, longitude: 20 } },
      { radius: 100, point: { latitude: 4, longitude: 5 } },
      { ignored: true }
    )

    expect(values).not.to.be.undefined
    expect(values.point).not.to.be.undefined
    expect(values.point.length).to.equal(1)
    expect(values.box).not.to.be.undefined
    expect(values.box.length).to.equal(1)
    expect(values.circle).not.to.be.undefined
    expect(values.circle.length).to.equal(1)
    expect(values.polygon).not.to.be.undefined
    expect(values.polygon.length).to.equal(2)
    expect(values.ignored).to.be.undefined
  })

  it('should build a geospatial-constraint-query', function () {
    var query = qb.ext.geospatialConstraint('name', [
      { latitude: 1, longitude: 2 },
      { south: 1, west: 2, north: 3, east: 4 }
    ])

    expect(query['geospatial-constraint-query']).not.to.be.undefined
    expect(query['geospatial-constraint-query']['constraint-name']).to.equal('name')
    expect(query['geospatial-constraint-query'].text).to.be.undefined
    expect(query['geospatial-constraint-query'].point).not.to.be.undefined
    expect(query['geospatial-constraint-query'].point.length).to.equal(1)
    expect(query['geospatial-constraint-query'].box).not.to.be.undefined
    expect(query['geospatial-constraint-query'].box.length).to.equal(1)
    expect(query['geospatial-constraint-query'].circle).not.to.be.undefined
    expect(query['geospatial-constraint-query'].circle.length).to.equal(0)
    expect(query['geospatial-constraint-query'].polygon).not.to.be.undefined
    expect(query['geospatial-constraint-query'].polygon.length).to.equal(0)
  })

  it('should build a geospatial-constraint-query with rest params', function () {
    var query = qb.ext.geospatialConstraint(
      'name',
      { latitude: 1, longitude: 2 },
      { south: 1, west: 2, north: 3, east: 4 }
    )

    expect(query['geospatial-constraint-query']).not.to.be.undefined
    expect(query['geospatial-constraint-query']['constraint-name']).to.equal('name')
    expect(query['geospatial-constraint-query'].text).to.be.undefined
    expect(query['geospatial-constraint-query'].point).not.to.be.undefined
    expect(query['geospatial-constraint-query'].point.length).to.equal(1)
    expect(query['geospatial-constraint-query'].box).not.to.be.undefined
    expect(query['geospatial-constraint-query'].box.length).to.equal(1)
    expect(query['geospatial-constraint-query'].circle).not.to.be.undefined
    expect(query['geospatial-constraint-query'].circle.length).to.equal(0)
    expect(query['geospatial-constraint-query'].polygon).not.to.be.undefined
    expect(query['geospatial-constraint-query'].polygon.length).to.equal(0)
  })

  it('should build a value-constraint-query with one value', function () {
    var query = qb.ext.valueConstraint('test', 'value')

    expect(query['value-constraint-query']).not.to.be.undefined
    expect(query['value-constraint-query']['constraint-name']).to.equal('test')
    expect(query['value-constraint-query']['text'].length).to.equal(1)
    expect(query['value-constraint-query']['text'][0]).to.equal('value')

    query = null
    query = qb.ext.valueConstraint('test', 1)

    expect(query['value-constraint-query']).not.to.be.undefined
    expect(query['value-constraint-query']['constraint-name']).to.equal('test')
    expect(query['value-constraint-query']['number'].length).to.equal(1)
    expect(query['value-constraint-query']['number'][0]).to.equal(1)

    query = null
    query = qb.ext.valueConstraint('test', null)

    expect(query['value-constraint-query']).not.to.be.undefined
    expect(query['value-constraint-query']['constraint-name']).to.equal('test')
    expect(query['value-constraint-query']['null'].length).to.equal(0)
  })

  it('should build a value-constraint-query with multiple values', function () {
    var query = qb.ext.valueConstraint('test', ['value1', 'value2'])

    expect(query['value-constraint-query']).not.to.be.undefined
    expect(query['value-constraint-query']['constraint-name']).to.equal('test')
    expect(query['value-constraint-query']['text'].length).to.equal(2)
    expect(query['value-constraint-query']['text'][0]).to.equal('value1')
    expect(query['value-constraint-query']['text'][1]).to.equal('value2')

    query = null
    query = qb.ext.valueConstraint('test', [1, 2])

    expect(query['value-constraint-query']).not.to.be.undefined
    expect(query['value-constraint-query']['constraint-name']).to.equal('test')
    expect(query['value-constraint-query']['number'].length).to.equal(2)
    expect(query['value-constraint-query']['number'][0]).to.equal(1)
    expect(query['value-constraint-query']['number'][1]).to.equal(2)
  })

  it('should build a word-constraint-query with one value', function () {
    var query = qb.ext.wordConstraint('test', 'value')

    expect(query['word-constraint-query']).not.to.be.undefined
    expect(query['word-constraint-query']['constraint-name']).to.equal('test')
    expect(query['word-constraint-query']['text'].length).to.equal(1)
    expect(query['word-constraint-query']['text'][0]).to.equal('value')
  })

  it('should build a word-constraint-query with multiple values', function () {
    var query = qb.ext.wordConstraint('test', ['value1', 'value2'])

    expect(query['word-constraint-query']).not.to.be.undefined
    expect(query['word-constraint-query']['constraint-name']).to.equal('test')
    expect(query['word-constraint-query']['text'].length).to.equal(2)
    expect(query['word-constraint-query']['text'][0]).to.equal('value1')
    expect(query['word-constraint-query']['text'][1]).to.equal('value2')
  })

  it('should choose a constraint query by type', function () {
    var constraint

    constraint = qb.ext.constraint(null)
    expect(constraint('name', 'value')).to.deep.equal(qb.ext.rangeConstraint('name', 'value'))

    constraint = qb.ext.constraint('range')
    expect(constraint('name', 'value')).to.deep.equal(qb.ext.rangeConstraint('name', 'value'))

    constraint = qb.ext.constraint('collection')
    expect(constraint('name', 'value')).to.deep.equal(qb.ext.collectionConstraint('name', 'value'))

    constraint = qb.ext.constraint('custom')
    expect(constraint('name', 'value')).to.deep.equal(qb.ext.customConstraint('name', 'value'))

    constraint = qb.ext.constraint('value')
    expect(constraint('name', 'value')).to.deep.equal(qb.ext.valueConstraint('name', 'value'))

    constraint = qb.ext.constraint('word')
    expect(constraint('name', 'value')).to.deep.equal(qb.ext.wordConstraint('name', 'value'))
  })

  it('should build an operator query', function () {
    var query = qb.ext.operatorState('sort', 'date')

    expect(query['operator-state']).not.to.be.undefined
    expect(query['operator-state']['operator-name']).to.equal('sort')
    expect(query['operator-state']['state-name']).to.equal('date')
  })

  it('should build a combined query', function () {
    var query = qb.and()

    var combined = qb.ext.combined(query, 'blah')

    expect(combined.search).not.to.be.undefined
    expect(combined.search.query).to.equal(query)
    expect(combined.search.qtext).to.equal('blah')
    expect(combined.search.options).to.equal(undefined)

    combined = qb.ext.combined(query, 'blah', {})

    expect(combined.search).not.to.be.undefined
    expect(combined.search.query).to.equal(query)
    expect(combined.search.qtext).to.equal('blah')
    expect(combined.search.options).to.deep.equal({})

    query = qb.or()
    combined = qb.ext.combined(query, {
      options: { 'return-query': 0 }
    })

    expect(combined.search).not.to.be.undefined
    expect(combined.search.query).to.equal(query)
    expect(combined.search.qtext).to.equal('')
    expect(combined.search.options).not.to.be.undefined
    expect(combined.search.options['return-query']).to.equal(0)
  })
})
