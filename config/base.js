/*
  default configuration settings. May be overwritten in dev or prod configs.
  Import the 'oracle' file anywhere you need configuration options.
*/

// https://www.npmjs.com/package/envalid
/*
const envalid = require('envalid')
const { str, email, json } = envalid

const env = envalid.cleanEnv(process.env, {
  API_KEY: str(),
  ADMIN_EMAIL: email({ default: 'admin@example.com' }),
  EMAIL_CONFIG_JSON: json({ desc: 'Additional email parameters' })
})
*/
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  port: process.env.SERVER_PORT || 8080,
  showComments: true,
  warningsAndErrors: true,
  productionSourceMap: false,
  assetsSubDirectory: 'static',
  bundleAnalyzerReport: process.env.npm_config_report || false
}
