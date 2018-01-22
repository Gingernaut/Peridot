
/*
  Default configuration settings. May be overwritten in dev or prod configs.
  You should import the 'oracle' file anywhere you need configuration options.
*/

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  port: process.env.SERVER_PORT || 8080,
  host: '0.0.0.0',
  isProd: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'testing',
  isDev: process.env.NODE_ENV === 'development',
  showComments: false,
  warningsAndErrors: false,
  productionSourceMap: true,
  useMicroCache: false,
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
  assetsSubDirectory: 'static',
  bundleAnalyzerReport: process.env.npm_config_report || false
}
