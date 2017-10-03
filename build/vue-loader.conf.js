let utils = require('./utils')
let baseConfig = require('../config/base')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: baseConfig.productionSourceMap
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  preserveWhitespace: false,
  postcss: [
    require("autoprefixer")({browsers: ["last 3 versions"]}),
    require("cssnano")
  ]
}