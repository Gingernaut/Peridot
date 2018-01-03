const path = require('path')
const express = require('express')
const config = require('../config/oracle')
const createServer = require('./server')
const favicon = require('serve-favicon')
const compression = require('compression')
const helmet = require('helmet')

const app = createServer()
const port = config.port
const host = config.host

const resolve = (file) => path.resolve(__dirname, file)

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && config.isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(favicon(resolve('../static/faviconLogo.png')))
app.use('/dist', serve('../dist', true))

if (config.isProd) {
  app.use(compression({ threshold: 0 }))
  app.use('/service-worker.js', serve('../dist/service-worker.js'))
  app.use('/manifest.json', serve('../dist/static/manifest.json', true))
  app.use('/static', serve('../dist/static', true))
  app.use(helmet())
} else {
  app.use('/static', serve('../static', true))
}

app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`server started at http://${host}:${port}`)
})
