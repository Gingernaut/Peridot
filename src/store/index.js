import Vue from "vue"
import Vuex from "vuex"
import pathify from "@/store/pathify"
import createPersistedState from "vuex-persistedstate"

import ui from "@/store/ui"
import account from "@/store/account"

Vue.use(Vuex)
pathify.debug()

const persistData = false

const store = {
  namespaced: true,
  modules: {
    account: { ...account },
    ui: { ...ui },
  },
}

const storePlugins = persistData
  ? [createPersistedState(), pathify.plugin]
  : [pathify.plugin]

export default new Vuex.Store({
  plugins: storePlugins,
  ...store,
})
