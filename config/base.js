const envalid = require('envalid')
const { str, email } = envalid

/*
  Default configuration settings. May be overwritten in dev or prod configs.
  You should import the 'oracle' file anywhere you need configuration options.
*/
const options = {
  devDefault: 'development',
  dotEnvPath: 'config/.env'
}

const env = envalid.cleanEnv(process.env, {
  SENDGRID_API_KEY: str(),
  RECIEVING_EMAIL: email()
}, options)

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  port: process.env.SERVER_PORT || 8080,
  host: '0.0.0.0',
  isProd: env.isProduction,
  isTest: env.isTest,
  isDev: env.isDev,
  showComments: false,
  warningsAndErrors: false,
  productionSourceMap: true,
  useMicroCache: false,
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
  assetsSubDirectory: 'static',
  bundleAnalyzerReport: process.env.npm_config_report || false,
  SENDGRID_API_KEY: env.SENDGRID_API_KEY,
  RECIEVING_EMAIL: env.RECIEVING_EMAIL
}
