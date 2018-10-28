import Vue from "vue"
import Router from "vue-router"
import routes from "@/router/routes"
import store from "@/store/index"

Vue.use(Router)

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes,
})

// route checks for authentication and redirects
router.beforeEach((routeTo, routeFrom, next) => {
  const requiresAuth = routeTo.matched.some((route) => route.meta.requiresAuth)
  const redirectIfAuthenticated = routeTo.matched.some(
    (route) => route.meta.redirectIfAuthenticated
  )
  // If auth isn't required for the route, just continue.
  if (!requiresAuth && !redirectIfAuthenticated) return next()

  let isAuthenticated = store.get("account/isAuthenticated")

  if (requiresAuth && !isAuthenticated) return next("/login")

  if (isAuthenticated && redirectIfAuthenticated) {
    return next("/")
  }

  return next()
})

export default router
