const nodeEnv = process.env.NODE_ENV || 'development'

// default configuration settings. May be overwritten in dev or prod configs.

module.exports = {
  NODE_ENV: nodeEnv,
  // isProd: nodeEnv === 'production',
  // isTesting: nodeEnv === 'testing',
  // isDev: nodeEnv === 'development',
  port: process.env.SERVER_PORT || 8080,
  showComments: true,
  warningsAndErrors: true,
  productionSourceMap: false,
  assetsSubDirectory: 'static'
}