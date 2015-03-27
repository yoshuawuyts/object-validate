/**
 * Module dependencies.
 */

var assert = require('assert')
var validate = require('./')

assert.deepStrictEqual = require('is-equal-shallow')

/**
 * Test.
 */

describe('validate', function() {
  it('should validate input (lol, how meta)', function() {
    assert.throws(function _fixture() {
      validate('foo')
    }, /schema should be an object/)
  })

  it('should return a function', function() {
    assert(typeof validate({}), 'function')
  })

  it('the returned function should validate input types', function() {
    assert.throws(function _fixture() {
      validate({})('foo')
    }, /data should be an object/)
  })

  it('should validate objects', function() {
    var schema = validate({
      name: function(val) { return typeof val === 'string' },
      age: function(val) { return typeof val === 'number' },
    })

    var res = schema({
      name: 'foo',
      age: 'bar'
    })

    assert.deepStrictEqual(res, { name: true, age: false })
  })

  it('should validate objects when validator class given', function() {
    function Validator() {}
    Validator.prototype.name = function(val) { return typeof val === 'string' }
    Validator.prototype.age = function(val) { return typeof val === 'number' }

    var schema = validate(new Validator())

    var res = schema({
      name: 'foo',
      age: 'bar'
    })

    assert.deepStrictEqual(res, { name: true, age: false })
  })

  it('should validate given class', function() {
    function Klass() {}
    Klass.prototype.name = 'foo'
    Klass.prototype.age = 'bar'

    var schema = validate({
      name: function(val) { return typeof val === 'string' },
      age: function(val) { return typeof val === 'number' },
    })

    var res = schema(new Klass())

    assert.deepStrictEqual(res, { name: true, age: false })
  })

  it('should validate class with validator class', function() {
    function Klass() {}
    Klass.prototype.name = 'foo'
    Klass.prototype.age = 'bar'

    function Validator() {}
    Validator.prototype.name = function(val) { return typeof val === 'string' }
    Validator.prototype.age = function(val) { return typeof val === 'number' }

    var schema = validate(new Validator())
    var res = schema(new Klass())

    assert.deepStrictEqual(res, { name: true, age: false })
  })

  it('should validate objects with dots defined schema like `user.name`', function() {
    var schema = validate({
      'user.name': function(val) { return typeof val === 'string' },
      'user.age': function(val) { return typeof val === 'number' },
    })

    var res = schema({
      user: {
        name: 'foo',
        age: 'bar'
      }
    })

    assert.deepStrictEqual(res, { user: { name: true, age: false } })
  })
})
