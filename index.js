/**
 * Module dependencies
 */
var assert = require('assert')

/**
 * Expose `validate`.
 */
module.exports = validate

/**
 * Create a validator function.
 *
 * @param {Object} schema
 * @return {Function}
 * @api public
 */
function validate(schema) {
  assert.equal(typeof schema, 'object', 'object-validate: schema should be an object')

  return function(data) {
    assert.equal(typeof data, 'object', 'object-validate: data should be an object')

    var res = {}

    Object.keys(schema).forEach(function(key) {
      res[key] = schema[key](data[key])
    })

    return res
  }
}
