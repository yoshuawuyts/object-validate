# object-validate
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

Validate an object based on a schema.

## Installation
```bash
$ npm install object-validate
```

## Usage
```js
const validate = require('object-validate')

const schema = validate({
  username: (val) => typeof val === 'string',
  age:      (val) => /^(\d{1,2})$/.test(val)
})

schema({ username: 'tobi', age: 100 })
// => { username: true, age: false }
```

Also you can use dot notation to test nested object schemas

```js
const validate = require('object-validate')

const schema = validate({
  'user.name': (val) => return typeof val === 'string',
  'user.age': (val) => return typeof val === 'number',
})

schema({ user: { name: 'foo', age: 'bar' } })
// => { user: { name: true, age: false } }
```

## Why?
Most data validation tools make assumptions about the type of data you'd want to
test. By just using functions as validators we make no assumptions about your
data which gives great flexibility.

## See Also
- [RegExps org on GitHub](https://github.com/regexps)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/object-validate.svg?style=flat-square
[npm-url]: https://npmjs.org/package/object-validate
[travis-image]: https://img.shields.io/travis/yoshuawuyts/object-validate.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/object-validate
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/object-validate.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/object-validate?branch=master
[downloads-image]: http://img.shields.io/npm/dm/object-validate.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/object-validate
