'use strict'
/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const express = require('express')
const resolve = file => path.resolve(__dirname, file)
const LRU = require('lru-cache')
const injectToTemplate = require('./seo')
const { createBundleRenderer } = require('vue-server-renderer')
const config = require(resolve('../config/oracle'))
// const microcache = require('route-cache')
// const useMicroCache = config.useMicroCache
const templatePath = resolve('../src/index.template.html')

const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

const render = (req, res) => {
  const s = Date.now()
  res.setHeader('Server', serverInfo)

  console.log(`Rendering: ${req.url}`)

  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }

  let extArr = req.url.split('.')

  if (extArr.length > 1) {
    let fileType = extArr[extArr.length - 1]

    switch (fileType) {
    case 'js':
      res.setHeader('Content-Type', 'text/javascript')
      break
    case 'css':
      res.setHeader('Content-Type', 'text/css')
      break
    case 'png':
      res.setHeader('Content-Type', 'image/png')
      break
    case 'jpg':
      res.setHeader('Content-Type', 'image/jpeg')
      break
    default:
      res.setHeader('Content-Type', 'text/plain')
    }

    return res.sendFile(resolve('..' + req.url))
  }

  res.setHeader('Content-Type', 'text/html')

  const errorHandler = (err) => {
    if (err && err.code === 404) {
      res.status(404).end('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).end('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err)
    }
  }

  const context = {
    title: 'Peridot',
    url: req.url
  }

  renderer.renderToString(context, (error, html) => {
    if (error) return errorHandler(error)
    res.send(injectToTemplate(html, context))
    console.log(`whole request: ${Date.now() - s}ms`)
    console.log('------')
  })
}

let renderer
let readyPromise

function createServer () {
  const app = express()

  //  implement custom logic to determine whether a request is cacheable based on its url and headers
  // https://www.nginx.com/blog/benefits-of-microcaching-nginx/
  // app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))

  if (config.isProd) {
    const bundle = require(resolve('../dist/vue-ssr-server-bundle.json'))
    // src/index.template.html is processed by html-webpack-plugin to inject
    // build assets and output as dist/index.html.
    const template = fs.readFileSync(resolve('../dist/index.html'), 'utf-8')

    // The client manifests are optional, but it allows the renderer
    // to automatically infer preload/prefetch links and directly add <script>
    // tags for any async chunks used during render, avoiding waterfall requests.
    const clientManifest = require(resolve('../dist/vue-ssr-client-manifest.json'))
    renderer = createRenderer(bundle, {
      template,
      clientManifest
    })
  } else {
    // In development: setup the dev server with watch and hot-reload,
    // and create a new renderer on bundle / index template update.
    readyPromise = require(resolve('../build/setup-dev-server'))(
      app,
      templatePath,
      (bundle, options) => {
        renderer = createRenderer(bundle, options)
      }
    )
  }

  app.get('*', (req, res) => {
    config.isProd
      ? render(req, res)
      : readyPromise.then(() => render(req, res)).catch((err) => console.log(err))
  })

  return app
}

module.exports = createServer
