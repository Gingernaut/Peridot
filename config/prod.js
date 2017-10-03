let merge = require('webpack-merge')
let baseConfig = require('./base')

module.exports = merge(baseConfig, {
  NODE_ENV: 'production'
})
