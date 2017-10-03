let utils = require('./utils')
let config = require('../config/oracle')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: config.productionSourceMap
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  preserveWhitespace: false
}