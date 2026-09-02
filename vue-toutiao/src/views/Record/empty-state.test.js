'use strict'

const assert = require('assert')
const fs = require('fs')
const compiler = require('vue-template-compiler')

const source = fs.readFileSync(__dirname + '/index.vue', 'utf8')
const template = source.match(/<template>([\s\S]*?)<\/template>/)[1]
const render = new Function(compiler.compile(template).render)

function createElement(tag, data, children) {
  if (Array.isArray(data)) {
    children = data
    data = {}
  }
  return { tag, data: data || {}, children: children || [] }
}

function findTags(node, tag) {
  if (!node) return []
  if (Array.isArray(node)) return node.reduce((tags, child) => tags.concat(findTags(child, tag)), [])
  return (node.tag === tag ? [tag] : []).concat(findTags(node.children, tag))
}

function renderRecordList(list) {
  return render.call({
    recordTypes: [{ title: '我的收藏', list }],
    recordIndex: 0,
    recordLoading: false,
    $router: {},
    activeTabs() {},
    end() {},
    skip() {},
    _c: createElement,
    _e() { return null },
    _l(items, renderItem) { return items.map(renderItem) },
    _s(value) { return String(value) },
    _v(text) { return { text } }
  })
}

assert.deepStrictEqual(
  findTags(renderRecordList([]), 'NoneData'),
  ['NoneData'],
  'an empty record list must show the empty-state component'
)

assert.deepStrictEqual(
  findTags(renderRecordList([{ id: 1, title: '已收藏', images: [] }]), 'NoneData'),
  [],
  'a populated record list must not show the empty-state component'
)

console.log('record empty-state tests passed')
