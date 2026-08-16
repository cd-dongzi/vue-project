'use strict'

const assert = require('assert')
const {
  captureScrollPositions,
  restoreScrollPositions
} = require('./scroll-position')

function run() {
  const firstContainer = { scrollTop: 120 }
  const secondContainer = { scrollTop: 480 }
  const containers = {
    0: firstContainer,
    1: secondContainer,
    length: 2
  }

  assert.deepStrictEqual(
    captureScrollPositions(containers),
    [120, 480],
    'each channel scroll position must be captured by index'
  )

  firstContainer.scrollTop = 0
  secondContainer.scrollTop = 0
  restoreScrollPositions(containers, [120, 480])

  assert.deepStrictEqual(
    [firstContainer.scrollTop, secondContainer.scrollTop],
    [120, 480],
    'each channel scroll position must be restored by index'
  )

  const untouched = { scrollTop: 75 }
  restoreScrollPositions({ 0: untouched, length: 1 }, [])
  assert.strictEqual(
    untouched.scrollTop,
    75,
    'a missing saved position must not reset the current scroll position'
  )

  console.log('home scroll position tests passed')
}

run()
