import Vue from "vue"
import Router from "vue-router"

const index = () => import("@/views/Home")
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

const routes = [
  {
    path: "/",
    name: "home",
    component: index,
  },
  {
    path: "/about",
    name: "about",
    component: about,
  },
]

export default function createRouter() {
  return new Router({
    mode: "history",
    fallback: false,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes,
  })
}
