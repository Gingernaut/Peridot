const path = require('path')
const nodeEnv = process.env.NODE_ENV || 'development'


module.exports = {
    NODE_ENV: nodeEnv,
    // isProd: nodeEnv === 'production',
    // isTesting: nodeEnv === 'testing',
    // isDev: nodeEnv === 'development',
    port: process.env.SERVER_PORT || 8080,
    showComments: false,
    warningsAndErrors: true,
    productionSourceMap: false,

    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/'
}