'use strict'

process.env.BABEL_ENV = 'test'
require('babel-register')

const assert = require('assert')

const cookieWrites = []
const storage = {
  getItem() { return null },
  setItem() {},
  removeItem() {},
  clear() {}
}

global.window = {
  localStorage: storage,
  sessionStorage: storage
}
global.document = {}
Object.defineProperty(global.document, 'cookie', {
  get() {
    return cookieWrites.join('; ')
  },
  set(value) {
    cookieWrites.push(value)
  }
})

const { Cookie } = require('./storage')

Cookie.set({ username: 'reader', avatar: '/avatar.png' })
assert.deepStrictEqual(
  cookieWrites,
  ['username=reader', 'avatar=/avatar.png'],
  'cookies without a lifetime should be valid session cookies'
)

cookieWrites.length = 0
Cookie.set('token', 'abc', 1)
assert.ok(cookieWrites[0].indexOf('token=abc;expires=') === 0)
assert.strictEqual(cookieWrites[0].includes('Invalid Date'), false)

console.log('cookie storage tests passed')
