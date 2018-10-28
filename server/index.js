const express = require("express")
const compression = require("compression")
const history = require("connect-history-api-fallback")
const port = 8080

const app = express()

app.use(compression({ threshold: 0 }))
app.use(history())
app.use("/", express.static(__dirname + "/"))
app.use("*", function(req, res) {
  res.sendFile("/app/index.html")
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
