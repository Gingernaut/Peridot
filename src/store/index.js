import Vue from "vue"
import Vuex from "vuex"
import pathify from "@/store/pathify"
import { make } from "vuex-pathify"
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

// base state
const state = {
  items: [],
  name: "Tyler",
  isAuthenticated: true,
}

// automatically generate mutations
const mutations = make.mutations(state)
const getters = make.getters(state)
const actions = make.actions(state)

const store = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
const createStore = () => {
  return new Vuex.Store({
    plugins: [createPersistedState(), pathify.plugin],
    ...store,
  })
}

export default createStore
