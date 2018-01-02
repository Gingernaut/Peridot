const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const config = require('../config/oracle')

const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

let clientConfig = merge(base, {
  entry: {
    app: './src/entry-client.js'
  },
  resolve: {
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': 'client'
    }),

    new VueSSRClientPlugin()
  ]
})

if (config.isProd) {
  clientConfig.plugins.push(
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'PeridotCache',
      filename: 'service-worker.js',
      minify: true,
      stripPrefix: 'dist/',
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],

      staticFileGlobs: [
        'dist/**.css',
        'dist/**.js',
        'dist/img/**/*'
      ],

      runtimeCaching: [{
        urlPattern: /\/.*/,
        handler: 'networkFirst'
      }]
    })
  )
}

if (!config.isTesting) {
  clientConfig.plugins.push(
    // extract vendor chunks for better caching
    // https://github.com/Narkoleptika/webpack-everything/commit/b7902f60806cf40b9d1abf8d6bb2a094d924fff7
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
  )
}

if (config.bundleAnalyzerReport) {
  let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  clientConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = clientConfig
