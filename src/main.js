import Vue from 'vue'
import App from '@/App.vue'
import modal from '@/components/modal'
// import account from '@/plugins/account'

import { sync } from 'vuex-router-sync'
import { createStore } from '@/store'
import { createRouter } from '@/router'

Vue.config.productionTip = false
Vue.config.debug = process.env.NODE_ENV === 'development'

Vue.component('modal', modal)
// Vue.use(account)

// Creates a fresh set of store, router, app instances for each SSR request
export function createApp(ssrContext) {

  // create store and router instances
  const store = createStore()
  const router = createRouter()

  // sync the router with the vuex store (registers `store.state.route`)
  sync(store, router)

  // create the app instance.
  const app = new Vue({
    router,
    store,
    ssrContext,
    render: (h) => h(App)
  })

  // expose the app, the router and the store.
  return { app, router, store }
}