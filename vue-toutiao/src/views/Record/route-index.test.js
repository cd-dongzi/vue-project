'use strict'

const assert = require('assert')
const fs = require('fs')

const source = fs.readFileSync(__dirname + '/index.vue', 'utf8')
const script = source.match(/<script>([\s\S]*?)<\/script>/)[1]
  .replace(/^\s*import .*$/gm, '')
  .replace('export default', 'return')
const component = new Function('mapGetters', 'swiper', 'swiperSlide', script)(() => ({}), {}, {})

function createContext () {
  const dispatched = []
  const slideCalls = []
  const context = {
    recordTypes: [
      { title: '我的收藏', list: [] },
      { title: '阅读历史', list: [] }
    ],
    $store: {
      state: { record: { index: 0 } },
      dispatch (name, recordType) {
        dispatched.push([name, recordType])
      }
    },
    swiper: {
      slideTo (index) {
        slideCalls.push(index)
      }
    }
  }
  Object.defineProperty(context, 'recordIndex', {
    get () {
      return context.$store.state.record.index
    }
  })
  return { context, dispatched, slideCalls }
}

function slidePage (index) {
  const state = createContext()
  component.methods.slidePage.call(state.context, index)
  return state
}

const stringIndex = slidePage('1')
assert.strictEqual(stringIndex.context.$store.state.record.index, 1, 'a route index string must select the matching tab')
assert.strictEqual(stringIndex.dispatched[0][1].title, '阅读历史', 'a route index string must load the matching record type')
assert.deepStrictEqual(stringIndex.slideCalls, [1], 'a route index string must move Swiper with a numeric index')

const invalidIndex = slidePage('not-a-tab')
assert.strictEqual(invalidIndex.context.$store.state.record.index, 0, 'an invalid route index must fall back to the first tab')
assert.strictEqual(invalidIndex.dispatched[0][1].title, '我的收藏', 'an invalid route index must load a valid record type')
assert.deepStrictEqual(invalidIndex.slideCalls, [0], 'an invalid route index must move Swiper to the first tab')

const outOfRangeIndex = slidePage(2)
assert.strictEqual(outOfRangeIndex.context.$store.state.record.index, 0, 'an out-of-range route index must fall back to the first tab')
assert.strictEqual(outOfRangeIndex.dispatched[0][1].title, '我的收藏', 'an out-of-range route index must not dispatch an undefined record type')
assert.deepStrictEqual(outOfRangeIndex.slideCalls, [0], 'an out-of-range route index must not move Swiper beyond its tabs')

console.log('record route index tests passed')
