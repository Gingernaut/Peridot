/*
  default configuration settings. May be overwritten in dev or prod configs. 
  Import the 'oracle' file anywhere you need configuration options.
*/

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  port: process.env.SERVER_PORT || 8080,
  showComments: true,
  warningsAndErrors: true,
  productionSourceMap: false,
  assetsSubDirectory: "static",
  bundleAnalyzerReport: process.env.npm_config_report || false
}