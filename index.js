'use strict'

var qb = require('./lib/query-builder-lite.js')
var ext = require('./lib/query-builder-extensions.js')

qb.ext = ext

module.exports = qb
