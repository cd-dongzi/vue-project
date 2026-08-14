'use strict'

const assert = require('assert')
const loadArticleWhenChanged = require('./load-article-when-changed')

async function run() {
  const events = []
  const loadArticle = id => {
    events.push(`load:${id}`)
    return Promise.resolve()
  }
  const showLoading = () => events.push('show')
  const hideLoading = () => events.push('hide')

  await loadArticleWhenChanged(undefined, '41', loadArticle, showLoading, hideLoading)
  assert.deepStrictEqual(events, [], 'leaving the article route must not load without an ID')

  await loadArticleWhenChanged('41', '41', loadArticle, showLoading, hideLoading)
  assert.deepStrictEqual(events, [], 'an unchanged article ID must not reload')

  await loadArticleWhenChanged('42', '41', loadArticle, showLoading, hideLoading)
  assert.deepStrictEqual(events, ['show', 'load:42', 'hide'], 'a changed article ID must load once between loading callbacks')

  const requestError = new Error('request failed')
  events.length = 0
  await assert.rejects(
    loadArticleWhenChanged(
      '43',
      '42',
      () => {
        events.push('load:43')
        return Promise.reject(requestError)
      },
      showLoading,
      hideLoading
    ),
    error => error === requestError
  )
  assert.deepStrictEqual(events, ['show', 'load:43', 'hide'], 'a failed request must still hide loading')

  console.log('article route change tests passed')
}

run().catch(error => {
  console.error(error)
  process.exitCode = 1
})
