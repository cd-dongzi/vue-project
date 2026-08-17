'use strict'

process.env.BABEL_ENV = 'test'
require('babel-register')

const assert = require('assert')
const Module = require('module')

const requestError = new Error('request failed')
const failingHttp = {
  get() {
    return Promise.reject(requestError)
  },
  post() {
    return Promise.reject(requestError)
  }
}

const originalLoad = Module._load
Module._load = function loadWithTestDependencies(request, parent, isMain) {
  if (request === 'src/utils/fetch') {
    return { __esModule: true, default: failingHttp }
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

let modules
try {
  modules = {
    home: require('./home').default,
    search: require('./search').default,
    video: require('./video').default,
    headline: require('./headline').default,
    record: require('./record').default
  }
} finally {
  Module._load = originalLoad
}

async function assertRejectsAndClears(label, action, state, loadingKey, params) {
  state[loadingKey] = false

  const request = action({ state, commit() {} }, params)
  assert.strictEqual(state[loadingKey], true, `${label} must enable loading before requesting`)
  await assert.rejects(request, error => error === requestError)
  assert.strictEqual(state[loadingKey], false, `${label} must clear loading after rejection`)
}

async function run() {
  const cases = [
    ['home/getHomeList', modules.home.actions.getHomeList, modules.home.state, 'newsLoading', { id: 1 }],
    ['search/getSearchList', modules.search.actions.getSearchList, modules.search.state, 'loading', {}],
    ['video/getVideoList', modules.video.actions.getVideoList, modules.video.state, 'loading', {}],
    ['headline/getHeadlineList', modules.headline.actions.getHeadlineList, modules.headline.state, 'loading', {}],
    ['headline/addHeadline', modules.headline.actions.addHeadline, modules.headline.state, 'loading', {}],
    ['record/getRecordList', modules.record.actions.getRecordList, modules.record.state, 'loading', { title: '我的收藏' }]
  ]

  const originalLog = console.log
  console.log = () => {}
  try {
    for (const testCase of cases) {
      await assertRejectsAndClears(...testCase)
    }
  } finally {
    console.log = originalLog
  }

  originalLog('loading state error tests passed')
}

run().catch(error => {
  console.error(error)
  process.exitCode = 1
})
