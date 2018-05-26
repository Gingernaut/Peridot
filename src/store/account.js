import { make } from "vuex-pathify"

// base state
const state = {
  isAuthenticated: true,
  name: "Tyler",
}

// automatically generate operations
const getters = { ...make.getters(state) }
const mutations = { ...make.mutations(state) }
const actions = { ...make.actions(state) }

export default {
  state,
  getters,
  mutations,
  actions,
}
