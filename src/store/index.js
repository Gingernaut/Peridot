import Vue from "vue"
import Vuex from "vuex"

// import { actions } from "./actions"
// import { mutations } from "./mutations"

Vue.use(Vuex)


const accountModule = {
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
    getToken: state => {
      return state.token
    },
    userRole: state => {
      return state.userRole
    }
  }
}
  
const uiModule = {
  state: {
    navbar: true,
    footer: true
  },
  mutations: {
    hideNav: state => (state.navbar = false),
    showNav: state => (state.navbar = true),
    hideFoot: state => (state.footer = false),
    showFoot: state => (state.footer = true)
  }
}
  


export function createStore() {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    modules: {
      account: accountModule,
      ui: uiModule
    }
  })
}