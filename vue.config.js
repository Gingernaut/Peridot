const fs = require("fs")

module.exports = {
  lintOnSave: true,
  configureWebpack: {},
  css: {
    loaderOptions: {
      sass: {
        data: fs.readFileSync("./src/scss/_variables.scss", "utf-8"),
      },
    },
  },
  pwa: {
    name: "My App",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppStatusBarStyle: "black",
  },
}
