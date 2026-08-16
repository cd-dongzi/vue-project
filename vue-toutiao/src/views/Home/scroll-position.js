'use strict'

function captureScrollPositions(containers) {
  return Array.prototype.map.call(containers, container => container.scrollTop)
}

function restoreScrollPositions(containers, positions) {
  Array.prototype.forEach.call(containers, (container, index) => {
    if (typeof positions[index] === 'number') {
      container.scrollTop = positions[index]
    }
  })
}

module.exports = {
  captureScrollPositions,
  restoreScrollPositions
}
