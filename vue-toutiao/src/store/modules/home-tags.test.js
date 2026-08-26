'use strict'

process.env.BABEL_ENV = 'test'
require('babel-register')

const assert = require('assert')
const Module = require('module')

const originalLoad = Module._load
Module._load = function loadWithTestDependencies(request, parent, isMain) {
  if (request === 'src/utils/fetch') {
    return { __esModule: true, default: {} }
  }
  if (request === 'utils/storage') {
    return {
      __esModule: true,
      Local: {
        get() { return null },
        set() {}
      }
    }
  }
  if (request === 'vue') {
    return {
      __esModule: true,
      default: {
        prototype: {
          $set(target, key, value) {
            target[key] = value
          }
        }
      }
    }
  }
  return originalLoad.call(this, request, parent, isMain)
}

let home
try {
  home = require('./home').default
} finally {
  Module._load = originalLoad
}

const state = {
  newsList: [
    { title: '推荐', id: 1 },
    { title: '热点', id: 3 },
    { title: '社会', id: 4 }
  ]
}
const removedTag = state.newsList[1]

home.mutations.DELHOMETAG(state, removedTag)
home.mutations.DELHOMETAG(state, removedTag)

assert.deepStrictEqual(
  state.newsList.map(tag => tag.title),
  ['推荐', '社会'],
  'repeating a stale channel deletion must not remove the final channel'
)

console.log('home tag mutation tests passed')
