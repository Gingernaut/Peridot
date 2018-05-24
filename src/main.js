import Vue from "vue"
import App from "@/App.vue"
import createRouter from "@/router/router"
import getStore from "@/store/index"
import "@/registerServiceWorker"

Vue.config.productionTip = false
Vue.config.debug = true

const router = createRouter()
let store = getStore()

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
