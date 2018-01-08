
# Peridot
A powerful Vue.js boilerplate with Vue-Router and Vuex
![Screenshot](./docs/readme_resources/homepage.png)

## Features:
* Server Side Rendering (SSR) with injected meta tags for SEO
* Progressive Web App (PWA) with Service Worker
* Code splitting and async component/route loading
* Automatic hot-reload in development
* Dockerized production setup with [pm2 load balancing](https://github.com/Unitech/pm2)
* Automatic removal of unused CSS/SCSS
* Global SCSS variables and easy theme customization
* Linting and formatting with [eslint](https://github.com/eslint/eslint) and [stylelint](https://github.com/stylelint/stylelint)
* Uses [Buefy](https://buefy.github.io/#/) for styling

#### Bonus
* Add user authentication easily with my [user authentication microservice](https://github.com/Gingernaut/microAuth).

#### Coming Soon
* Email contact form with Sendgrid.

## Running
```bash
# Run in development
yarn run dev

# Building and running with Docker
docker build -t peridot .
docker run -p 8080:8080 peridot:latest

# Lint .vue, .js, .scss
yarn run lint

# See wepback build breakdown
npm run build --report

```

## Configuration (optional)
You can tweak settings in `config/`. `base.js` contains all settings, which you can choose to override for specific environments in `dev.js` and `prod.js`. Import `oracle.js` anywhere you need configuration options.


## [Contributing Guide](./docs/contributing.md)

## Credits
The following resources were extremely helpful for configuring webpack and SSR:
* https://ssr.vuejs.org/
* https://github.com/vuejs/vue-hackernews-2.0
* https://github.com/crisbal/vue-webpack-ssr-fully-featured
* https://github.com/wemake-services/wemake-vue-template