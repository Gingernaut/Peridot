import { make } from "vuex-pathify"

const state = {
  showNavbar: true,
  showFooter: true,
}

// automatically generate operations
const getters = { ...make.getters(state) }
const mutations = make.mutations(state)
const actions = { ...make.actions(state) }

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
