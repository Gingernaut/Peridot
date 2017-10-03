const webpack = require('webpack')
const merge = require('webpack-merge')

const HTMLPlugin = require('html-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const base = require('./webpack.base.config')
const baseConfig = require('../config/base')

const nodeEnv = JSON.stringify(baseConfig.NODE_ENV)
const isProd = JSON.stringify(baseConfig.NODE_ENV) === 'production'

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

// minify options to be used in production mode
// https://github.com/kangax/html-minifier#options-quick-reference
const minifyOptions = {
	collapseWhitespace: true,
	removeComments: baseConfig.showComments,
	ignoreCustomComments: [/vue-ssr-outlet/],
	removeAttributeQuotes: true,
	removeEmptyAttributes: true
}

const clientConfig = merge(base, {
	plugins: [
		// strip dev-only code in Vue source
		new webpack.DefinePlugin({
			'process.env.VUE_ENV': "'client'"
		}),
		// generate output HTML
		new HTMLPlugin({
			template: 'src/index.template.html',
			minify: isProd ? minifyOptions : {}
		}),
		new VueSSRClientPlugin()
	]
})

if (isProd) {
	clientConfig.plugins.push(
		// minify JS
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: baseConfig.warningsAndErrors,
				drop_console: baseConfig.warningsAndErrors === false
			},
			comments: baseConfig.showComments,
			sourceMap: baseConfig.productionSourceMap,
			parallel: true
		}),
		// auto generate service worker
		new SWPrecachePlugin({
			cacheId: 'vue-webpack-ssr-fully-featured',
			filename: 'service-worker.js',
			minify: true,

			staticFileGlobs: [
				'dist/**.css',
				'dist/**.js',
				'dist/img/**/*'
			],

			runtimeCaching: [{
				urlPattern: /\/.*/,
				handler: 'networkFirst'
			}],

			dontCacheBustUrlsMatching: /./,
			navigateFallback: '/'
		})
	)
}

if (nodeEnv !== 'testing') {
	clientConfig.plugins.push(
		// extract vendor chunks for better caching
		// https://github.com/Narkoleptika/webpack-everything/commit/b7902f60806cf40b9d1abf8d6bb2a094d924fff7
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function (module) {
				return module.context && module.context.indexOf('node_modules') !== -1
			}
		}),
		// any other js goes here
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		})
	)
}

if (isProd) {
	clientConfig.plugins.push(
		new webpack.optimize.ModuleConcatenationPlugin()
	)
}

module.exports = clientConfig