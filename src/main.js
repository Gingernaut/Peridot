import Vue from 'vue'
import App from '@/App.vue'
import modal from '@/components/modal'
// import account from '@/plugins/account'
import Buefy from 'buefy'

import { createRouter } from '@/router'
import { createStore } from '@/store'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false
Vue.config.debug = process.env.NODE_ENV === 'development'

Vue.component('modal', modal)
// Vue.use(account)

Vue.use(Buefy, {
  defaultIconPack: 'fa'
})

export function createApp(ssrContext) {

  const store = createStore()
  const router = createRouter(store)

  sync(store, router)

  const app = new Vue({
    router,
    store,
    ssrContext,
    render: (h) => h(App)
  })

  return { app, router, store }
}