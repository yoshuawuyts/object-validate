/**
 * Module dependencies.
 */

var assert = require('assert');
var validate = require('./');

/**
 * Test.
 */

describe('validate', function() {
  it('should validate input (lol, how meta)', function() {
    try {
      validate('foo')
    } catch(e) {
      assert.equal(e.message, 'object-validate: schema should be an object')
    }
  });

  it('should return a function', function() {
    assert(typeof validate({}), 'function')
  })

  it('the returned function should validate input types', function() {
    try {
      validate({})('derp')
    } catch(e) {
      assert.equal(e.message, 'object-validate: data should be an object')
    }
  })

  it('should validate objects', function() {
    var schema = validate({
      name: function(val) { return typeof val == 'string' },
      foo: function(val) { return typeof val == 'number' },
    })

    var res = schema({
      name: 'derp',
      foo: 'darp'
    })

    assert.deepEqual(res, { name: true, foo: false })
  })

  it('should support nested schema define', function() {
    var schema = validate({
      'user.name': function(val) { return typeof val == 'string' },
      'user.age': function(val) { return typeof val == 'number' },
    })

    var res = schema({
      user: {
        name: 'foo',
        age: 'bar'
      }
    })

    assert.deepEqual(res, { 'user.name': true, 'user.age': false })
  })
});
