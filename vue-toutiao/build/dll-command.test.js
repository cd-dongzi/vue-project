'use strict'

const assert = require('assert')
const getDllCommand = require('./dll-command')

assert.deepStrictEqual(
  getDllCommand('win32', 'C:\\Windows\\System32\\cmd.exe'),
  {
    command: 'C:\\Windows\\System32\\cmd.exe',
    args: ['/d', '/s', '/c', 'npm.cmd run dll']
  }
)

assert.deepStrictEqual(
  getDllCommand('linux'),
  { command: 'npm', args: ['run', 'dll'] }
)

console.log('dll-command tests passed')
