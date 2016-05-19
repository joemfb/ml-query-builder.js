'use strict'

function asArray () {
  var args = Array.prototype.slice.call(arguments)

  if (args.length === 1) {
    if (args[0] == null) {
      return []
    }
    if (Array.isArray(args[0])) {
      return args[0]
    }
  }

  return args
}

module.exports.asArray = asArray
