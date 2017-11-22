const envalid = require('envalid')
const { str, email } = envalid

/*
  default configuration settings. May be overwritten in dev or prod configs.
  Import the 'oracle' file anywhere you need configuration options.
*/

const env = envalid.cleanEnv(process.env, {
  SENDGRID_API_KEY: str(),
  RECIEVING_EMAIL: email({ default: 'admin@example.com' })
})

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  port: process.env.SERVER_PORT || 8080,
  showComments: false,
  warningsAndErrors: false,
  productionSourceMap: true,
  assetsSubDirectory: 'static',
  bundleAnalyzerReport: process.env.npm_config_report || false,
  SENDGRID_API_KEY: env.SENDGRID_API_KEY,
  RECIEVING_EMAIL: env.RECIEVING_EMAIL
}
