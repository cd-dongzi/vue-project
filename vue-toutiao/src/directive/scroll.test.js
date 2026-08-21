'use strict'

process.env.BABEL_ENV = 'test'
require('babel-register')

const assert = require('assert')
const Module = require('module')

let scrollDirective
const Vue = {
  directive(name, definition) {
    if (name === 'scroll') scrollDirective = definition
  }
}

const originalLoad = Module._load
Module._load = function loadWithDirectiveDependencies(request, parent, isMain) {
  if (request === 'vue') {
    return { __esModule: true, default: Vue }
  }
  return originalLoad.call(this, request, parent, isMain)
}

try {
  require('./scroll')
} finally {
  Module._load = originalLoad
}

function run() {
  const listeners = new Map()
  const element = {
    offsetHeight: 100,
    scrollTop: 0,
    firstChild: { clientHeight: 500 },
    addEventListener(type, handler) {
      listeners.set(type, handler)
    },
    removeEventListener(type, handler) {
      if (listeners.get(type) === handler) listeners.delete(type)
    }
  }
  const context = {
    loadingMore() {
      return Promise.resolve()
    }
  }

  scrollDirective.inserted(
    element,
    { expression: 'loadingMore' },
    { context }
  )
  assert.strictEqual(
    listeners.has('scroll'),
    true,
    'the directive must register its scroll listener when inserted'
  )
  if (typeof scrollDirective.unbind === 'function') {
    scrollDirective.unbind(element)
  }

  assert.strictEqual(
    listeners.has('scroll'),
    false,
    'the scroll listener must be removed when the directive is unbound'
  )

  console.log('scroll directive cleanup tests passed')
}

try {
  run()
} catch (error) {
  console.error(error)
  process.exitCode = 1
}
