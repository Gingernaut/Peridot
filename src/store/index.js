import Vue from 'vue'
import Vuex from 'vuex'
import accountModule from '@/store/account'
import uiModule from '@/store/ui'

// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    // plugins: [createPersistedState()],
    modules: {
      account: accountModule,
      ui: uiModule
    }
  })
}
