import axios from 'axios'
import store from '@/store/index'

const baseInstance = function () { // instantiated this way to get a fresh token
  return axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
      Authorization: store.getters.getToken
    }
  })
}

const accFunctions = {

  login: function (payload) {
    let HTTP = baseInstance()
    return HTTP.post('login', {
      emailAddress: payload.emailAddress,
      password: payload.password
    })
      .then(res => {
        if (res.status === 200) {
          store.dispatch('login', res.data)
        } else {
          console.log('invalid response code ', res.status)
        }
      })
  },
  logout: function () {
    store.commit('setLogoutState')
    localStorage.clear()
  },
  signup: function (payload) {
    let HTTP = baseInstance()
    return HTTP.post('signup', {
      emailAddress: payload.emailAddress,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName
    })
      .then(res => {
        if (res.status === 201) {
          store.dispatch('login', res.data)
        } else {
          console.log('invalid response code ', res.status)
        }
      })
  },
  getOwnData: function () {
    let HTTP = baseInstance()
    return HTTP.get('account')
      .then(res => {
        if (res.status === 200) {
          store.dispatch('login', res.data)
        } else {
          console.log('invalid response code ', res.status)
        }
      })
  },
  updateAcc: function (payload) {
    let HTTP = baseInstance()
    return HTTP.put('account', payload)
      .then(res => {
        if (res.status === 200) {
          store.dispatch('login', res.data)
        } else {
          console.log(' response code ', res.status)
        }
      })
  },
  deleteAcc: function () {
    let HTTP = baseInstance()
    return HTTP.delete('account')
      .then(res => {
        if (res.status === 200) {
          this.logout()
        } else {
          console.log('invalid response code ', res.status)
        }
      })
  },
  getAccounts: function (id = null) {
    if (store.getters.userRole === 'ADMIN') {
      let HTTP = baseInstance()
      if (id) {
        return HTTP.get('accounts/' + id)
      } else {
        return HTTP.get('accounts')
      }
    }
  },
  confirmToken: function (token) {
    let HTTP = baseInstance()
    return HTTP.get('confirm/' + token)
      .then(res => {
        store.dispatch('login', res.data)
      })
  },
  initReset: function (email) {
    let HTTP = baseInstance()
    return HTTP.get('initreset/' + email)
  },
  confirmReset: function (token) {
    let HTTP = baseInstance()
    return HTTP.get('reset/' + token)
      .then(res => {
        store.dispatch('login', res.data)
      })
  },
  cleanData: function (payload) {
    payload.isClean = true
    payload.errors = []

    let mailRgx = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if ('emailAddress' in payload && payload.emailAddress != null) {
      payload.emailAddress = payload.emailAddress.replace(' ', '').trim()

      if (!mailRgx.test(payload.emailAddress) || payload.emailAddress.length < 6) {
        payload.errors.push('Please use a valid Email')
        payload.isClean = false
      }
    }

    if ('password' in payload && payload.password != null) {
      payload.password = payload.password.trim()

      if (payload.password.length < 6) {
        payload.errors.push('Password must be at least 6 characters long')
        payload.isClean = false
      }
    }

    if ('firstName' in payload && payload.firstName != null) {
      payload.firstName = payload.firstName.trim()
    }

    if ('lastName' in payload && payload.lastName != null) {
      payload.lastName = payload.lastName.trim()
    }

    // phone number validator/format

    return payload
  }
}

export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$account', {
      value: accFunctions
    })
  }
}
