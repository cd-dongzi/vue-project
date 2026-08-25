'use strict'

process.env.BABEL_ENV = 'test'

const assert = require('assert')
const babel = require('babel-core')
const fs = require('fs')
const Module = require('module')
const path = require('path')
const compiler = require('vue-template-compiler')

function loadVideoComponent() {
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

function createVideo() {
  const listeners = []

  return {
    ended: false,
    pauseCount: 0,
    play() {
      listeners.slice().forEach(listener => listener())
      return Promise.resolve()
    },
    pause() {
      this.pauseCount += 1
    },
    addEventListener(type, listener) {
      if (type === 'play') listeners.push(listener)
    }
  }
}

function run() {
  const component = loadVideoComponent()
  const videos = [createVideo(), createVideo()]
  const canvases = videos.map(() => ({
    getContext() {
      return { drawImage() {} }
    }
  }))
  const containers = videos.map(() => ({ clientWidth: 320, clientHeight: 176 }))
  const originalDocument = global.document
  const originalSetInterval = global.setInterval
  const originalClearInterval = global.clearInterval
  const activeTimers = new Map()
  let nextTimer = 1

  global.document = {
    querySelectorAll(selector) {
      if (selector === 'video') return videos
      if (selector === 'canvas') return canvases
      if (selector === '.video') return containers
      throw new Error(`unexpected selector: ${selector}`)
    }
  }
  global.setInterval = callback => {
    const timer = nextTimer
    nextTimer += 1
    activeTimers.set(timer, callback)
    return timer
  }
  global.clearInterval = timer => {
    activeTimers.delete(timer)
  }

  try {
    const context = {
      drawTimers: [],
      videoList: [{ playBol: true }, { playBol: true }],
      stopDrawing: component.methods.stopDrawing,
      $set(target, index, value) {
        target[index] = value
      }
    }

    component.methods.dragVideo.call(context, 0)
    component.methods.dragVideo.call(context, 0)
    component.methods.dragVideo.call(context, 0)

    assert.strictEqual(
      activeTimers.size,
      1,
      'replaying one video must keep exactly one canvas drawing timer'
    )

    videos[0].ended = true
    Array.from(activeTimers.values()).forEach(callback => callback())
    assert.strictEqual(activeTimers.size, 0, 'finishing a video must stop its drawing timer')
    videos[0].ended = false

    component.methods.dragVideo.call(context, 0)
    component.methods.pause.call(context, 0, context.videoList[0])
    assert.strictEqual(activeTimers.size, 0, 'pausing a video must stop its drawing timer')

    component.methods.dragVideo.call(context, 0)
    component.methods.dragVideo.call(context, 1)
    assert.strictEqual(activeTimers.size, 2)

    if (typeof component.beforeDestroy === 'function') {
      component.beforeDestroy.call(context)
    }
    assert.strictEqual(
      activeTimers.size,
      0,
      'destroying the video view must stop every canvas drawing timer'
    )

    console.log('video playback timer tests passed')
  } finally {
    global.document = originalDocument
    global.setInterval = originalSetInterval
    global.clearInterval = originalClearInterval
  }
}

try {
  run()
} catch (error) {
  console.error(error)
  process.exitCode = 1
}
