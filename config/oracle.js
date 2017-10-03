/* 
    Oracle == source of truth for configuration. It determines which other config files to merge with. 
*/

let merge = require('webpack-merge')
let config = require('./base')
let devConfig = require('./dev')
let prodConfig = require('./prod')

let curConfig = process.env.NODE_ENV === "production" ? prodConfig : devConfig


module.exports = merge(config, curConfig)
