/* 
    Oracle === source of truth for configuration. 
    It determines which other config files to merge with. 
    This is the config file you should import where configuration is needed.
*/

const merge = require('webpack-merge')
const baseConfig = require('./base')

const neededConfig = process.env.NODE_ENV === "production" ? require('./prod') : require('./dev')

const lastSettings = {
  isProd: neededConfig.NODE_ENV === "production",
  isDev: neededConfig.NODE_ENV === "development",
  isTesting: neededConfig.NODE_ENV === "testing"
}

module.exports = merge(baseConfig, neededConfig, lastSettings)
