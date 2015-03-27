/**
 * Module dependencies
 */
var assert = require('assert')
var get = require('get-value')
var set = require('set-value')
var isObject = require('is-kindof').isObject;

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
  assert.strictEqual(!isObject(schema), false, 'object-validate: schema should be an object')

  return function(data) {
    assert.strictEqual(!isObject(data), false, 'object-validate: data should be an object')

    var res = {}

    Object.keys(schema).forEach(function(key) {
      set(res, key, schema[key](get(data, key)))
    })

    return res
  }
}
