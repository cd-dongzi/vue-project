'use strict'
const styleLoader = require('./style-loader')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    loaders: styleLoader.cssLoader({
        sourceMap: !isProduction,
        extract: isProduction
    }),
    transformToRequire: {
        video: 'src',
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}