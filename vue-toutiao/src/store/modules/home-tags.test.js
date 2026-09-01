'use strict'

process.env.BABEL_ENV = 'test'
require('babel-register')

const assert = require('assert')
const Module = require('module')

const originalLoad = Module._load
const storedChannels = [
  { title: '推荐', id: 1 },
  { title: '热点', id: 3 }
]
let storedValue
let writes

Module._load = function loadWithTestDependencies(request, parent, isMain) {
  if (request === 'src/utils/fetch') {
    return { __esModule: true, default: {} }
  }
  if (request === 'utils/storage') {
    return {
      __esModule: true,
      Local: {
        get() { return storedValue },
        set(key, value) { writes.push({ key, value }) }
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

function loadHome(value) {
  storedValue = value
  writes = []
  delete require.cache[require.resolve('./home')]
  return require('./home').default
}

let home
let normalWrites
let legacyHome
let legacyWrites
let emptyHome
let emptyWrites
let malformedJsonHome
let malformedJsonWrites
let nonArrayHome
let nonArrayWrites
let malformedEntryHome
let malformedEntryWrites
try {
  home = loadHome(storedChannels)
  normalWrites = writes
  legacyHome = loadHome(JSON.stringify(storedChannels))
  legacyWrites = writes
  emptyHome = loadHome([])
  emptyWrites = writes
  malformedJsonHome = loadHome('{')
  malformedJsonWrites = writes
  nonArrayHome = loadHome({ title: '不是数组', id: 1 })
  nonArrayWrites = writes
  malformedEntryHome = loadHome([null])
  malformedEntryWrites = writes
} finally {
  Module._load = originalLoad
}

function assertDefaultChannels(homeModule, storedWrites, message) {
  assert.strictEqual(homeModule.state.newsList.length, 12, message)
  assert.deepStrictEqual(
    homeModule.state.newsList.slice(0, 3).map(tag => tag.title),
    ['推荐', '视频', '热点'],
    message
  )
  assert.strictEqual(storedWrites.length, 1, message)
  assert.strictEqual(storedWrites[0].key, 'newList', message)
  assert.strictEqual(Array.isArray(storedWrites[0].value), true, message)
  assert.strictEqual(storedWrites[0].value.length, 12, message)
}

assert.deepStrictEqual(
  home.state.newsList.map(tag => tag.title),
  ['推荐', '热点'],
  'a normally serialized channel list must initialize without being parsed again'
)
assert.deepStrictEqual(
  normalWrites,
  [{ key: 'newList', value: storedChannels }],
  'channel initialization must persist the normalized array without double serialization'
)
assert.deepStrictEqual(
  legacyHome.state.newsList.map(tag => tag.title),
  ['推荐', '热点'],
  'a legacy double-serialized channel list must remain readable'
)
assert.deepStrictEqual(
  legacyWrites,
  [{ key: 'newList', value: storedChannels }],
  'legacy channel storage must be normalized after it is read'
)
assertDefaultChannels(emptyHome, emptyWrites, 'an empty channel list must fall back to defaults')
assertDefaultChannels(malformedJsonHome, malformedJsonWrites, 'invalid JSON must fall back to defaults')
assertDefaultChannels(nonArrayHome, nonArrayWrites, 'a decoded non-array value must fall back to defaults')
assertDefaultChannels(malformedEntryHome, malformedEntryWrites, 'malformed channel entries must fall back to defaults')

const state = {
  newsList: [
    { title: '推荐', id: 1 },
    { title: '热点', id: 3 },
    { title: '社会', id: 4 }
  ]
}
const removedTag = state.newsList[1]

writes = []
home.mutations.DELHOMETAG(state, removedTag)
home.mutations.DELHOMETAG(state, removedTag)

assert.deepStrictEqual(
  state.newsList.map(tag => tag.title),
  ['推荐', '社会'],
  'repeating a stale channel deletion must not remove the final channel'
)
assert.deepStrictEqual(
  writes,
  [{ key: 'newList', value: state.newsList }],
  'channel mutations must persist the array directly without double serialization'
)

console.log('home tag mutation tests passed')
