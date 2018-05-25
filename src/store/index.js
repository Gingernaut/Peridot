import Vue from "vue"
import Vuex from "vuex"
import pathify from "@/store/pathify"
import { make } from "vuex-pathify"
// import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

// base state
const state = {
  isAuthenticated: true,
}

// automatically generate operations
const mutations = { ...make.mutations(state) }
const getters = { ...make.getters(state) }
const actions = { ...make.actions(state) }

const store = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
const createStore = () => {
  return new Vuex.Store({
    plugins: [pathify.plugin],
    ...store,
  })
}

export default createStore
