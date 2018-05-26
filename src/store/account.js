import { make } from "vuex-pathify"

// base state
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
  state,
  getters,
  mutations,
  actions,
}
