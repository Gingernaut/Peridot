import { make } from "vuex-pathify"

const state = {
  showNavbar: true,
  showFooter: true,
}

// automatically generate operations
const getters = { ...make.getters(state) }
const mutations = { ...make.mutations(state) }
const actions = { ...make.actions(state) }

// export store
export default {
  state,
  getters,
  mutations,
  actions,
}
