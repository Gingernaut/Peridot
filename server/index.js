const express = require("express")
const path = require("path")
const port = 3000
const app = express()

// serve static assets normally
app.use(express.static(__dirname + "/dist"))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "index.html"))
})

app.listen(port)
console.log("server started on port " + port)

// const express = require('express')
// const app = express()
// const compression = require('compression')
// // const favicon = require('serve-favicon')
// const port = 3000

// app.use(compression({ threshold: 0 }))
// // app.use(favicon('./public/logo-48.png'))
// app.use('/dist', serve('./dist', true))

// app.use('/public', serve('./public', true))
// app.use('/manifest.json', serve('./manifest.json', true))
// app.use('/service-worker.js', serve('./dist/service-worker.js'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
