let merge = require('webpack-merge')
let config = require('./base')

module.exports = merge(config, {
  NODE_ENV: 'production',
  showComments: false,
  warningsAndErrors: false,
  productionSourceMap: true,
})
