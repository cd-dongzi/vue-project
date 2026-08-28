'use strict'

process.env.BABEL_ENV = 'test'
require('babel-register')

const assert = require('assert')
const axios = require('axios')
const request = require('./fetch').default

const originalAdapter = axios.defaults.adapter
const offlineError = new Error('offline')
const serverError = new Error('server failed')

serverError.response = {
  status: 500,
  statusText: 'Service unavailable',
  data: { msg: 'Service unavailable' }
}

axios.defaults.adapter = () => Promise.reject(offlineError)

request.get('/offline').then(
  () => {
    throw new Error('network failures should reject')
  },
  error => {
    assert.strictEqual(error, offlineError)
  }
).then(() => {
  axios.defaults.adapter = () => Promise.reject(serverError)
  return request.get('/server-error').then(
    () => {
      throw new Error('server errors should reject')
    },
    error => {
      assert.strictEqual(error.message, 'Service unavailable')
      console.log('fetch error tests passed')
    }
  )
}).then(
  () => {
    axios.defaults.adapter = originalAdapter
  }
).catch(error => {
  axios.defaults.adapter = originalAdapter
  console.error(error)
  process.exitCode = 1
})
