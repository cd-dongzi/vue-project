'use strict'

async function loadArticleWhenChanged(nextId, previousId, loadArticle, showLoading, hideLoading) {
  if (nextId === undefined || nextId === null || nextId === '' || nextId === previousId) {
    return
  }

  showLoading()
  try {
    await loadArticle(nextId)
  } finally {
    hideLoading()
  }
}

module.exports = loadArticleWhenChanged
