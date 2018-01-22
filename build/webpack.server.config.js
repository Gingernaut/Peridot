const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(base, {
  target: 'node',
  devtool: '#source-map',
  entry: './src/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
  },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: [
    // do not externalize CSS files in case we need to import it from a dep
    // also whitelist deps that modifies `global` (e.g. polyfills)
    nodeExternals({whitelist: /\.css$/}),
    Object.keys(require('../package.json').dependencies)
  ],
  plugins: [
    new webpack.DefinePlugin({
      // eslint-disable-next-line quotes
      'process.env.VUE_ENV': "'server'"
    }),
    new VueSSRServerPlugin()
  ]
})
