
const nodeEnv = 'production' // process.env.NODE_ENV || 'development'


module.exports = {
    NODE_ENV: nodeEnv,
    // isProd: nodeEnv === 'production',
    // isTesting: nodeEnv === 'testing',
    // isDev: nodeEnv === 'development',
    port: process.env.SERVER_PORT || 8080,
    showComments: true,
    warningsAndErrors: true,
    productionSourceMap: false
}