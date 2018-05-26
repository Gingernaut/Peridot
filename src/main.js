import Vue from "vue"
import App from "@/App.vue"
import store from "@/store/index"
import router from "@/router/router"
import "@/registerServiceWorker"
import modal from "@/components/modal-comp"

import Buefy from "buefy"
import "buefy/lib/buefy.css"

Vue.use(Buefy)
Vue.component("modal", modal)

Vue.config.productionTip = false
Vue.config.debug = true

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
