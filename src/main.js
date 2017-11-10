import Vue from 'vue'
import App from '@/App.vue'
import modal from '@/components/modal'
import Buefy from 'buefy'
import config from '@@/config/oracle'

import { createRouter } from '@/router'
import { createStore } from '@/store'
import { getAccFunctions } from '@/plugins/account'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false
Vue.config.debug = config.isDev

Vue.component('modal', modal)
Vue.use(Buefy)

const store = createStore()
const router = createRouter(store)
const accFunctions = getAccFunctions(store)

export function createApp(ssrContext) {

  Vue.use(accFunctions)
  sync(store, router)

  const app = new Vue({
    router,
    store,
    ssrContext,
    render: (h) => h(App)
  })

  return { app, router, store }
}