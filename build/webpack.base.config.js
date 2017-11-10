const path = require('path')
const webpack = require('webpack')

const utils = require('./utils')
const config = require('../config/oracle')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const StringReplacePlugin = require('string-replace-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')


function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// Webpack plugins for both client and server
let commonPlugins = [
  new StringReplacePlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': config.NODE_ENV,
    'PRODUCTION': config.isProd
  }),
  new StyleLintPlugin({
    files: ['src/**/*.vue', 'src/**/*.scss']
  }),
  // keep module.id stable when vender modules does not change
  new webpack.HashedModuleIdsPlugin(),

  // https://webpack.js.org/plugins/module-concatenation-plugin/
  new webpack.optimize.ModuleConcatenationPlugin(),
]

if (config.isDev) {
  commonPlugins.push(
    new FriendlyErrorsPlugin()
  )
}

const vueLoaderConfig = {
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


const moduleRules = [
  {
    enforce: 'pre',
    test: /\.(vue|js)$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
    include: [resolve('src')],
    options: {
      cache: true,
      formatter: require('eslint-friendly-formatter')
    }
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: vueLoaderConfig
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  },
  {
    test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('img/[name].[hash:16].[ext]')
    }
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('media/[name].[hash:7].[ext]')
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
    }
  }
]

module.exports = {

  devtool: config.isProd ? false : 'inline-source-map',

  entry: {
    app: './src/main.client.js'
  },

  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@@': path.join(__dirname, '../')
    }
  },

  resolveLoader: {
    alias: {
      'scss-loader': 'sass-loader'
    }
  },

  output: {
    path: resolve('dist'),
    publicPath: '/dist/',
    filename: utils.assetsPath('js/[name].[chunkhash:16].js')
  },

  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: moduleRules
  },

  performance: {
    maxEntrypointSize: 250000,
    hints: config.isProd ? 'warning' : false
  },
}
