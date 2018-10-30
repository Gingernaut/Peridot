const fs = require("fs")
const PurgecssPlugin = require("purgecss-webpack-plugin")
const glob = require("glob-all")
const path = require("path")

module.exports = {
  lintOnSave: undefined,
  configureWebpack: {
    // Merged into the final Webpack config
    plugins: [
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, "./public/index.html"),
          path.join(__dirname, "./src/components/**/*.vue"),
          path.join(__dirname, "./src/views/**/*.vue"),
          path.join(__dirname, "./**/*.vue"),
          path.join(__dirname, "./src/**/*.js"),
        ]),
      }),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        data: fs.readFileSync("./src/styles/_variables.scss", "utf-8"),
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
