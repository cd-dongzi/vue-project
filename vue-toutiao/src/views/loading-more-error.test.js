'use strict'

process.env.BABEL_ENV = 'test'

const assert = require('assert')
const babel = require('babel-core')
const fs = require('fs')
const Module = require('module')
const path = require('path')
const compiler = require('vue-template-compiler')

function loadComponent(relativePath) {
  const filename = path.join(__dirname, relativePath)
  const source = fs.readFileSync(filename, 'utf8')
  const script = compiler.parseComponent(source).script.content
  const compiled = babel.transform(script, { filename }).code
  const componentModule = new Module(filename, module)
  const originalLoad = Module._load

  componentModule.filename = filename
  componentModule.paths = module.paths
  Module._load = function loadWithComponentDependencies(request, parent, isMain) {
    if (request === './topBar/index') {
      return { __esModule: true, default: {} }
    }
    return originalLoad.call(this, request, parent, isMain)
  }

  try {
    componentModule._compile(compiled, filename)
  } finally {
    Module._load = originalLoad
  }

  return componentModule.exports.default
}

async function observeSettlement(promise) {
  let unhandledRejection
  const onUnhandledRejection = error => {
    unhandledRejection = error
  }

  process.on('unhandledRejection', onUnhandledRejection)
  try {
    const outcome = await Promise.race([
      promise.then(
        value => ({ status: 'resolved', value }),
        error => ({ status: 'rejected', error })
      ),
      new Promise(resolve => setImmediate(() => resolve({ status: 'pending' })))
    ])
    await new Promise(resolve => setImmediate(resolve))
    return { outcome, unhandledRejection }
  } finally {
    process.removeListener('unhandledRejection', onUnhandledRejection)
  }
}

async function run() {
  const requestError = new Error('request failed')
  const video = loadComponent('Video/index.vue')
  const headline = loadComponent('Headline/index.vue')
  const search = loadComponent('Search/body/index.vue')
  const searchState = {
    keyword: 'news',
    pageindex: 1,
    list: [],
    history: [],
    loading: false,
    loadingMore: false,
    end: false
  }
  const cases = [
    {
      label: 'video',
      method: video.methods.loadingMore,
      context: {
        pageindex: 1,
        $store: { dispatch: () => Promise.reject(requestError) }
      },
      readPage: context => context.pageindex
    },
    {
      label: 'headline',
      method: headline.methods.loadingMore,
      context: {
        pageindex: 1,
        $store: { dispatch: () => Promise.reject(requestError) }
      },
      readPage: context => context.pageindex
    },
    {
      label: 'search',
      method: search.methods.loadingMore,
      context: {
        keyword: 'news',
        searchPageindex: 2,
        $store: {
          state: { search: searchState },
          dispatch: () => Promise.reject(requestError)
        }
      },
      readPage: context => context.$store.state.search.pageindex
    }
  ]

  for (const testCase of cases) {
    const result = await observeSettlement(testCase.method.call(testCase.context))

    assert.strictEqual(
      result.outcome.status,
      'rejected',
      `${testCase.label} loading must reject promptly after a request error`
    )
    assert.strictEqual(result.outcome.error, requestError)
    assert.strictEqual(
      testCase.readPage(testCase.context),
      1,
      `${testCase.label} loading must preserve the page number for retry`
    )
    assert.strictEqual(
      result.unhandledRejection,
      undefined,
      `${testCase.label} loading must not create an unhandled rejection`
    )
  }

  const terminalCases = [
    {
      label: 'video',
      method: video.methods.loadingMore,
      createContext: dispatch => ({
        pageindex: 3,
        videoEnd: true,
        $store: { dispatch }
      }),
      readPage: context => context.pageindex
    },
    {
      label: 'headline',
      method: headline.methods.loadingMore,
      createContext: dispatch => ({
        pageindex: 3,
        headlineEnd: true,
        $store: { dispatch }
      }),
      readPage: context => context.pageindex
    },
    {
      label: 'search',
      method: search.methods.loadingMore,
      createContext: dispatch => ({
        keyword: 'news',
        searchEnd: true,
        $store: {
          state: {
            search: {
              keyword: 'news',
              pageindex: 3,
              loading: false,
              loadingMore: true,
              end: true
            }
          },
          dispatch
        }
      }),
      readPage: context => context.$store.state.search.pageindex
    }
  ]

  for (const testCase of terminalCases) {
    let dispatchCount = 0
    const context = testCase.createContext(() => {
      dispatchCount += 1
      return Promise.resolve([])
    })

    await testCase.method.call(context)

    assert.strictEqual(
      dispatchCount,
      0,
      `${testCase.label} loading must not request another page after reaching the end`
    )
    assert.strictEqual(
      testCase.readPage(context),
      3,
      `${testCase.label} loading must keep the terminal page number stable`
    )
  }

  console.log('loading more error tests passed')
}

run().catch(error => {
  console.error(error)
  process.exitCode = 1
})
