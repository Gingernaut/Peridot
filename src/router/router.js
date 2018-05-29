import Vue from "vue"
import Router from "vue-router"
import store from "@/store/index"

Vue.use(Router)

const index = () => import("@/views/index-page")
const about = () => import("@/views/about-page")
const contact = () => import("@/views/contact-page")
const account = () => import("@/views/account-page")
const loginpage = () => import("@/views/login-page")
const signuppage = () => import("@/views/signup-page")
const accounts = () => import("@/views/accounts-page")
const confirm = () => import("@/views/confirm-page")
const reset = () => import("@/views/reset-page")
const pageNotFound = () => import("@/views/not-found-page")

const notAuthenticated = (to, from, next) => {
  if (!store.get("account/isAuthenticated")) {
    next()
    return
  }
  next("/")
}

const isAuthenticated = (to, from, next) => {
  if (store.get("account/isAuthenticated")) {
    next()
    return
  }
  next("/login")
}

const routes = [
  {
    path: "/",
    name: "index",
    component: index,
  },
  {
    path: "/contact",
    name: "contact",
    component: contact,
  },
  {
    path: "/account",
    name: "account",
    component: account,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/about",
    name: "about",
    component: about,
  },
  {
    path: "/signup",
    name: "signup",
    component: signuppage,
    beforeEnter: notAuthenticated,
  },
  {
    path: "/login",
    name: "login",
    component: loginpage,
    beforeEnter: notAuthenticated,
  },
  {
    path: "/accounts",
    name: "accounts",
    component: accounts,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/confirm-account/:token",
    name: "confirm",
    component: confirm,
  },
  {
    path: "/reset",
    name: "reset",
    component: reset,
    beforeEnter: notAuthenticated,
  },
  {
    path: "/reset/:token",
    name: "resetToken",
    component: reset,
    beforeEnter: notAuthenticated,
  },
  {
    path: "*",
    name: "pageNotFound",
    component: pageNotFound,
  },
]

export default new Router({
  mode: "history",
  fallback: false,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes,
})
