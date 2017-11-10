module.exports = {
  state: {
    loggedIn: false,
    firstName: null,
    lastName: null,
    emailAddress: null,
    token: null,
    phoneNumber: null,
    userRole: null,
    UUID: null
  },
  mutations: {
    setLoginState: function (state, payload) {
      state.loggedIn = true
      state.firstName = payload.firstName ? payload.firstName : state.firstName
      state.lastName = payload.lastName ? payload.lastName : state.lastName
      state.emailAddress = payload.emailAddress ? payload.emailAddress : state.emailAddress
      state.userRole = payload.userRole ? payload.userRole : state.userRole
      state.UUID = payload.UUID ? payload.UUID : state.UUID
      state.token = payload.authToken ? payload.authToken : state.token
      state.phoneNumber = payload.phoneNumber ? payload.phoneNumber : state.phoneNumber
    },
    setLogoutState: function (state) {
      state.loggedIn = false
      state.firstName = null
      state.lastName = null
      state.emailAddress = null
      state.userRole = null
      state.UUID = null
      state.token = null
      state.phoneNumber = null
    }
  },
  actions: {
    login (context, payload) {
      context.commit('setLoginState', payload)
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.loggedIn
    },
    getToken: state => {
      return state.token
    },
    userRole: state => {
      return state.userRole
    },
    isAdmin: state => {
      return state.userRole === 'ADMIN'
    }
  }

}
