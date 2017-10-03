const path = require('path')
const webpack = require('webpack')
const Vue = require('vue')
const baseConfig = require('../config/base')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const StringReplacePlugin = require('string-replace-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const vueLoaderConfig = require('./vue-loader.conf')
const utils = require('./utils')

const nodeEnv = JSON.stringify(baseConfig.NODE_ENV)
const isProd = JSON.stringify(baseConfig.NODE_ENV) === 'production'


function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

// Webpack plugins for both client and server
let commonPlugins = [
    new StringReplacePlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': nodeEnv,
        'PRODUCTION': isProd
    }),
    new StyleLintPlugin({
        files: ['src/**/*.vue', 'src/**/*.scss']
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),

    // https://webpack.js.org/plugins/module-concatenation-plugin/
    new webpack.optimize.ModuleConcatenationPlugin(),
]

if (isProd) {
    commonPlugins.push(
        new FriendlyErrorsPlugin()
    )
}

const moduleRules = [{
        enforce: 'pre',
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        include: [resolve('src')],
        options: {
            cache: true
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

    devtool: isProd ? false : 'inline-source-map',

    // extensions: ['.js', '.vue', '.scss'],

    entry: {
        app: './src/main.client.js'
    },

    resolve: {
        extensions: ['.js', '.vue', '.json', '.scss'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '@@': resolve('../')
        }
    },

    resolveLoader: {
        alias: {
            'scss-loader': 'sass-loader'
        }
    },

    output: {
        path: resolve('../dist'),
        publicPath: '/dist/',
        filename: utils.assetsPath('js/[name].[chunkhash:16].js')
    },


    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: moduleRules
    },

    performance: {
        maxEntrypointSize: 250000,
        hints: isProd ? 'warning' : false
    },
}