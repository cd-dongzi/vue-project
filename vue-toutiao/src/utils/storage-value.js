'use strict'

function getStoredValue(storage, key) {
    if (!key) return null

    try {
        const value = storage.getItem(key)
        return value === null ? null : JSON.parse(value)
    } catch (error) {
        return null
    }
}

module.exports = getStoredValue
