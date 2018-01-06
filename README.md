
# Peridot
A powerful Vue.js boilerplate with Vue-Router and Vuex
![Screenshot](./docs/readme_resources/homepage.png)

## Features:
* Server Side Rendering (SSR)
* Progressive Web App (PWA) with Service Worker
* Code splitting and async component/route loading
* Automatic hot-reload in development
* Dockerized production setup with [pm2 load balancing](https://github.com/Unitech/pm2)
* Automatic removal of unused CSS/SCSS
* Global SCSS variables and easy theme customization
* Linting and formatting with [eslint](https://github.com/eslint/eslint) and [stylelint](https://github.com/stylelint/stylelint)
* Uses [Buefy](https://buefy.github.io/#/) for styling

## Configuration

Rename `config/.env.default` to `config/.env` and fill it out with your SendGrid API key and contact email address.

## [Contributing Guide](./docs/contributing.md)

## Credits
The following resources were extremely helpful for configuring webpack and SSR:
* https://ssr.vuejs.org/
* https://github.com/vuejs/vue-hackernews-2.0
* https://github.com/crisbal/vue-webpack-ssr-fully-featured
* https://github.com/wemake-services/wemake-vue-template