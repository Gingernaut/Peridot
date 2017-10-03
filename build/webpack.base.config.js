const path = require('path')
const webpack = require('webpack')
const Vue = require('vue')
const baseConfig = require('../config/base')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const StringReplacePlugin = require('string-replace-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')


const nodeEnv = JSON.stringify(baseConfig.NODE_ENV)
const isProd = JSON.stringify(baseConfig.NODE_ENV) === 'production'

// Webpack plugins for both client and server
const commonPlugins = [
	new StringReplacePlugin(),
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': nodeEnv,
		'PRODUCTION': isProd
	}),
	new StyleLintPlugin({
		files: ['src/**/*.vue', 'src/**/*.scss']
	})
]

const moduleRules = [
    {
        enforce: "pre",
        test: /\.(vue|js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
    },
    {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
            preserveWhitespace: false,
            postcss: [
                require("autoprefixer")({browsers: ["last 3 versions"]}),
                require("cssnano")
            ]
        }
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
    },
    {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: "url-loader",
        options: {
            limit: 10000,
            name: "img/[name].[hash:16].[ext]"
        }
    }
]

module.exports = {

    devtool: isProd ? false : "inline-source-map",

    // extensions: ['.js', '.vue', '.scss'],

    entry: {
        app: "./src/main.client.js"
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, "../src"),
            '@@': path.resolve(__dirname, "../")
        }
    },

    output: {
		path: path.resolve(__dirname, "../dist"),
		publicPath: "/dist/",
		filename: "js/[name].[chunkhash:16].js"
    },


    module: {
		noParse: /es6-promise\.js$/, // avoid webpack shimming process
		rules: moduleRules
	},
    
    performance: {
		maxEntrypointSize: 250000,
		hints: isProd ? "warning" : false
	},
}