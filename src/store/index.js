import Vue from "vue"
import Vuex from "vuex"
import pathify from "@/store/pathify"
import { make } from "vuex-pathify"
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

// base state
const state = {
  isAuthenticated: true,
  name: "Tyler",
}

// automatically generate operations
const getters = { ...make.getters(state) }
const mutations = { ...make.mutations(state) }
const actions = { ...make.actions(state) }

const store = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

export default new Vuex.Store({
  plugins: [createPersistedState(), pathify.plugin],
  ...store,
})
