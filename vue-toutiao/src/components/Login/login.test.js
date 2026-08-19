'use strict'

process.env.BABEL_ENV = 'test'

const assert = require('assert')
const babel = require('babel-core')
const fs = require('fs')
const Module = require('module')
const path = require('path')
const compiler = require('vue-template-compiler')

function loadLoginComponent() {
  const filename = path.join(__dirname, 'index.vue')
  const source = fs.readFileSync(filename, 'utf8')
  const script = compiler.parseComponent(source).script.content
  const compiled = babel.transform(script, { filename }).code
  const componentModule = new Module(filename, module)

  componentModule.filename = filename
  componentModule.paths = module.paths
  componentModule._compile(compiled, filename)

  return componentModule.exports.default
}

async function run() {
  const login = loadLoginComponent().methods.login
  const events = []
  const footerBarList = [
    { title: '首页', icon: 'home', path: '/home' },
    { title: '西瓜视频', icon: 'video', path: '/video' },
    { title: '微头条', icon: 'comment', path: '/headline' },
    { title: '未登录', icon: 'account1', path: '/account' }
  ]

  await login.call({
    username: 'reader',
    password: '123456',
    username_msg: '',
    password_msg: '',
    $showLoading() {
      events.push('loading:show')
    },
    $hideLoading() {
      events.push('loading:hide')
    },
    $store: {
      state: { user: { footerBarList } },
      dispatch() {
        return Promise.reject(new Error('request failed'))
      }
    },
    $set(target, index, value) {
      target[index] = value
      events.push('footer:update')
    },
    $emit(event) {
      events.push(`emit:${event}`)
    }
  })

  assert.deepStrictEqual(
    events,
    ['loading:show', 'loading:hide'],
    'a failed login must stop loading without updating the footer or closing the panel'
  )
  assert.deepStrictEqual(
    footerBarList[3],
    { title: '未登录', icon: 'account1', path: '/account' },
    'a failed login must preserve the logged-out navigation item'
  )

  console.log('login failure tests passed')
}

run().catch(error => {
  console.error(error)
  process.exitCode = 1
})
