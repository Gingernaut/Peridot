import { make } from "vuex-pathify"

const state = {
  isAuthenticated: false,
  firstName: null,
  lastName: null,
  emailAddress: null,
  token: null,
  phoneNumber: null,
  userRole: null,
  UUID: null,
}

// automatically generate operations
const getters = { ...make.getters(state) }
const mutations = { ...make.mutations(state) }
const actions = { ...make.actions(state) }

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
