import axios from "axios"
import store from "@/store/index"

const HTTP = () => {
  return axios.create({
    baseURL: "http://0.0.0.0:8000",
    headers: {
      Authorization: `Bearer ${store.get("account/token")}`,
    },
  })
}

function updateStoreData(accInfo) {
  if (accInfo.jwt) {
    store.set("account/isAuthenticated", true)
    store.set("account/token", accInfo.jwt)
  }
  if (accInfo.id) {
    store.set("account/id", accInfo.id)
  }
  if (accInfo.firstName) {
    store.set("account/firstName", accInfo.firstName)
  }
  if (accInfo.lastName) {
    store.set("account/lastName", accInfo.lastName)
  }
  if (accInfo.emailAddress) {
    store.set("account/emailAddress", accInfo.emailAddress)
  }
  if (accInfo.createdTime) {
    store.set("account/createdTime", accInfo.createdTime)
  }
  if (accInfo.modifiedTime) {
    store.set("account/modifiedTime", accInfo.modifiedTime)
  }
  if (accInfo.UUID) {
    store.set("account/UUID", accInfo.UUID)
  }
  if (accInfo.phoneNumber) {
    store.set("account/phoneNumber", accInfo.phoneNumber)
  }
  if (accInfo.isVerified) {
    store.set("account/isVerified", accInfo.isVerified)
  }
  if (accInfo.userRole) {
    store.set("account/userRole", accInfo.userRole)
  }
}

const accFunctions = {
  login: function(payload) {
    return HTTP()
      .post("/login", {
        emailAddress: payload.emailAddress,
        password: payload.password,
      })
      .then((res) => {
        store.set("account/isAuthenticated", true)
        updateStoreData(res.data)
      })
  },
  signup: function(payload) {
    return HTTP()
      .post("/signup", {
        emailAddress: payload.emailAddress,
        password: payload.password,
        firstName: payload.firstName,
        lastName: payload.lastName,
      })
      .then((res) => {
        store.set("account/isAuthenticated", true)
        updateStoreData(res.data)
      })
  },
  getAccount: function(id = null) {
    if (id) {
      return HTTP().get(`/accounts/${id}`)
    } else {
      return HTTP()
        .get("/account")
        .then((res) => {
          updateStoreData(res.data)
        })
    }
  },
  updateAccount: function(payload, id = null) {
    if (id) {
      return HTTP().put(`/accounts/${id}`, payload)
    } else {
      return HTTP()
        .put("/account", payload)
        .then((res) => {
          updateStoreData(res.data)
        })
    }
  },
  deleteAccount: function(id = null) {
    if (id) {
      return HTTP().delete(`/accounts/${id}`)
    } else {
      return HTTP()
        .delete("/account")
        .then(() => {
          store.commit("account/reset")
        })
    }
  },
  getAccounts: function() {
    return HTTP()
      .get("/accounts")
      .then((res) => {
        return res.data
      })
  },
  initReset: function(emailAddress) {
    return HTTP().post(`/initiate-reset/${emailAddress}`)
  },
  confirmReset: function(token) {
    return HTTP()
      .post(`/confirm-reset/${token}`)
      .then((res) => {
        updateStoreData(res.data)
      })
  },
  sendEmailToSiteAdmin: function(payload) {
    return HTTP().post("/contact-form", payload)
  },
  validateAccount: function(token) {
    return HTTP()
      .post(`/confirm-account/${token}`)
      .then((res) => {
        updateStoreData(res.data)
      })
  },
  logout: function() {
    store.commit("account/reset")
  },
  cleanData: function(payload) {
    let cleanedData = {
      errors: [],
    }

    if (payload.firstName) {
      cleanedData.firstName = payload.firstName
    }
    if (payload.lastName) {
      cleanedData.lastName = payload.lastName
    }
    if (payload.emailAddress) {
      cleanedData.emailAddress = payload.emailAddress
    }

    if (payload.isVerified) {
      cleanedData.isVerified = payload.isVerified
    }

    if (payload.phoneNumber) {
      cleanedData.phoneNumber = payload.phoneNumber
    }

    if (payload.userRole) {
      cleanedData.userRole = payload.userRole
    }

    if (payload.password) {
      if (payload.password.length < 6) {
        payload.errors.push("Password does not meet length requirements")
      } else {
        cleanedData.password = payload.password
      }
    }

    return cleanedData
  },
}

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, "$accountAPI", {
      value: accFunctions,
    })
  },
}
