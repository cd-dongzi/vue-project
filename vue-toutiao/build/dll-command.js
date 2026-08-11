'use strict'

module.exports = function getDllCommand(platform, comSpec) {
  if (platform === 'win32') {
    return {
      command: comSpec || 'cmd.exe',
      args: ['/d', '/s', '/c', 'npm.cmd run dll']
    }
  }

  return { command: 'npm', args: ['run', 'dll'] }
}
