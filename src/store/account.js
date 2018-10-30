import { make } from "vuex-pathify"

const state = function() {
  return {
    isAuthenticated: false,
    id: null,
    firstName: null,
    lastName: null,
    emailAddress: null,
    token: null,
    phoneNumber: null,
    userRole: null,
    UUID: null,
    isVerified: null,
    createdTime: null,
    modifiedTime: null,
  }
}

// automatically generate operations
const getters = { ...make.getters(state) }
const mutations = {
  ...make.mutations(state),

  // setting the store back to it's initial state (logout, etc.)
  reset(s) {
    Object.assign(s, state())
  },
}
const actions = { ...make.actions(state) }

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
