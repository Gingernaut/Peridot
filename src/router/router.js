import Vue from "vue"
import Router from "vue-router"

const index = () => import("@/views/Index")
const about = () => import("@/views/About")
// const contact = () => import("@/views/contact-page")
// const account = () => import("@/views/account-page")
// const loginpage = () => import("@/views/login-page")
// const signuppage = () => import("@/views/signup-page")
// const accounts = () => import("@/views/accounts-page")
// const confirm = () => import("@/views/confirm-page")
// const reset = () => import("@/views/reset-page")
// const pageNotFound = () => import("@/views/not-found-page")

Vue.use(Router)

export default function createRouter(store) {
  const notAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
      next()
      return
    }
    next("/")
  }

  const isAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
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
      path: "/about",
      name: "about",
      component: about,
    },
    {
      path: "/account",
      name: "Account",
      component: index,
      beforeEnter: isAuthenticated,
    },
    {
      path: "/login",
      name: "Login",
      component: index,
      beforeEnter: notAuthenticated,
    },
  ]

  return new Router({
    mode: "history",
    fallback: false,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes,
  })
}
