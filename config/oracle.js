/*
    Oracle === source of truth for configuration.
    It determines which other config files to merge with.
    This is the config file you should import where configuration is needed.
*/

const merge = require('webpack-merge')
const baseConfig = require('./base')
const neededConfig = baseConfig.NODE_ENV === 'production' ? require('./prod') : require('./dev')

module.exports = merge(baseConfig, neededConfig)
