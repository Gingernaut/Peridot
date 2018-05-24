import Vue from "vue"
import App from "@/App.vue"
import createRouter from "@/router/router"
import store from "@/store/store"
import "@/registerServiceWorker"

Vue.config.productionTip = false
Vue.config.debug = true

const router = createRouter()

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
