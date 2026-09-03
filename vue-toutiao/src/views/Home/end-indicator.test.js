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

function renderHomeList(homeEnd) {
  return render.call({
    newsList: [{ list: [{ id: 1, title: '新闻', images: [] }] }],
    newsLoading: false,
    homeEnd,
    $router: {},
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
  findTags(renderHomeList(false), 'NoneData'),
  [],
  'a populated home list must not show the end indicator before reaching the end'
)

assert.deepStrictEqual(
  findTags(renderHomeList(true), 'NoneData'),
  ['NoneData'],
  'the home list must show the end indicator after reaching the end'
)

console.log('home end-indicator tests passed')
