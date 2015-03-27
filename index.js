/**
 * Module dependencies
 */
var assert = require('assert')
var get = require('get-value')
var set = require('set-value')
var isObject = require('isobject');

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
  assert.equal(isObject(schema), true, 'object-validate: schema should be an object')

  return function(data) {
    assert.equal(isObject(schema), true, 'object-validate: data should be an object')

    var res = {}

    Object.keys(schema).forEach(function(key) {
      set(res, key, schema[key](get(data, key)))
    })

    return res
  }
}
