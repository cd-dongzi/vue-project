'use strict'

const assert = require('assert')
const getStoredValue = require('./storage-value')

function storageWith(value) {
  return {
    getItem() {
      return value
    }
  }
}

assert.deepStrictEqual(getStoredValue(storageWith('["vue","webpack"]'), 'history'), ['vue', 'webpack'])
assert.strictEqual(getStoredValue(storageWith(null), 'missing'), null)
assert.strictEqual(getStoredValue(storageWith('{not-json'), 'broken'), null)
assert.strictEqual(getStoredValue(storageWith('"value"'), ''), null)
assert.strictEqual(getStoredValue({ getItem() { throw new Error('blocked') } }, 'private'), null)

console.log('storage value tests passed')
