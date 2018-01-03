
# Peridot
A powerful Vue.js boilerplate with Vue-Router and Vuex
![Screenshot](./docs/readme_resources/homepage.png)

### Features:
* Server Side Rendering (SSR)
* Progressive Web App (PWA) with service worker
* Hot-reload in development
* Code splitting and async component/route loading
* Dockerized production setup with pm2 load balancing
* Automatic removal of unused CSS/SCSS
* Global SCSS variables and easy theme customization
* Linting and formatting with [eslint](https://github.com/eslint/eslint) and [stylelint](https://github.com/stylelint/stylelint)
* Made with [Buefy](https://buefy.github.io/#/) for styling



## Configuration

Rename `config/.env.default` to `config/.env` and fill it out with your API keys.


## Todo

* fix `bar` component globally
* Further Webpack optimizations
* Stylelint for css/scss in `.vue` files

The following projects were extremely helpful resources for configuring webpack and SSR:
* https://github.com/vuejs/vue-hackernews-2.0
* https://github.com/crisbal/vue-webpack-ssr-fully-featured