import Vue from "vue"
import Vuex from "vuex"
import pathify from "@/store/pathify"
import createPersistedState from "vuex-persistedstate"

import account from "@/store/account"
import ui from "@/store/ui"

Vue.use(Vuex)
pathify.debug()

const persistData = false

const store = {
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
  strict: true,
  ...store,
})
