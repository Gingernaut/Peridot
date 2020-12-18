// const PurgecssPlugin = require("purgecss-webpack-plugin")
// const glob = require("glob-all")
const path = require("path")

module.exports = {
  lintOnSave: undefined,
  configureWebpack: {
    // Merged into the final Webpack config
    plugins: [
      // new PurgecssPlugin({
      //   paths: glob.sync([
      //     path.join(__dirname, "./public/index.html"),
      //     path.join(__dirname, "./src/components/**/*.vue"),
      //     path.join(__dirname, "./src/views/**/*.vue"),
      //     path.join(__dirname, "./**/*.vue"),
      //     path.join(__dirname, "./src/**/*.js"),
      //   ]),
      //   whitelist: [
      //     "notices",
      //     "snackbar",
      //     "notification",
      //     "toast",
      //     "is-top",
      //     "action",
      //     "is-info",
      //     "is-warning",
      //     "is-success",
      //     "is-danger",
      //     "is-dark",
      //     "message",
      //     "delete",
      //     "button",
      //     "loading-overlay",
      //   ],
      // }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/styles/_variables.scss";
        `,
      },
    },
  },
  pwa: {
    name: "Peridot",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppStatusBarStyle: "black",
  },
}
