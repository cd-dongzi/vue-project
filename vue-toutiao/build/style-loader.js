'use strict'
const path = require('path')
//一个抽离出css的webpack插件！
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const getLessVariables = require('./get-less-variables.js')

exports.cssLoader = function(opts) {
    function generateLoaders(loader, loaderOpts) {
        const loaders = [ 
            { //默认loader
                loader: 'css-loader',
                options: {
                    minimize: process.env.NODE_ENV === 'production',
                    sourceMap: opts.sourceMap
                }
            }
        ]
        if (loader) { // 需要增加的loader
            loaders.push({
                loader: `${loader}-loader`,
                options: Object.assign({}, loaderOpts, {
                    sourceMap: opts.sourceMap
                })
            })
        }

        if (opts.extract) { //是否需要抽离css
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader',
                publicPath: '../../' //抽离出来的css 添加路径前缀, 让其打包出来的路径正确
            })
        }else{
            return ['vue-style-loader'].concat(loaders)
        }
    }

    let variables = getLessVariables(path.join(__dirname, '../static/color.less'))
    return {
        css: generateLoaders(),
        less: generateLoaders('less', {
            globalVars: variables
        })
    }
}

exports.styleLoader = function(opts) {
    const output = []
    const cssLoaders = exports.cssLoader(opts)
    for ( let extension in  cssLoaders) {
        let loader = cssLoaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'), //路径匹配
            use: loader
        })
    }
    return output
}