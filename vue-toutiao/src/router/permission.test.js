'use strict'

process.env.BABEL_ENV = 'test'
require('babel-register')

const assert = require('assert')
const Module = require('module')

const store = {
  state: {
    user: {
      user: { name: '' },
      isLogin: false
    },
    app: {
      pageLoading: false
    }
  }
}

const guards = {}
const router = {
  beforeEach(handler) {
    guards.beforeEach = handler
  },
  afterEach(handler) {
    guards.afterEach = handler
  }
}

const Vue = {
  prototype: {
    $alert() {
      return Promise.resolve()
    }
  }
}

const originalLoad = Module._load
Module._load = function loadWithRouterDependencies(request, parent, isMain) {
  if (request === '../store') {
    return { __esModule: true, default: store }
  }
  if (request === 'vue') {
    return { __esModule: true, default: Vue }
  }
  if (request === './index') {
    return { __esModule: true, router }
  }
  return originalLoad.call(this, request, parent, isMain)
}

const originalDocument = global.document
global.document = { title: '' }

try {
  require('./permission')
} finally {
  Module._load = originalLoad
  global.document = originalDocument
}

async function run() {
  const navigationDecisions = []

  guards.beforeEach(
    { meta: { login: true } },
    {},
    decision => navigationDecisions.push(decision)
  )

  assert.deepStrictEqual(
    navigationDecisions,
    [false],
    'unauthenticated protected navigation must be aborted immediately'
  )

  await Promise.resolve()
  assert.strictEqual(store.state.user.isLogin, true, 'login panel must still open after the alert')

  console.log('router permission tests passed')
}

run().catch(error => {
  console.error(error)
  process.exitCode = 1
})
