import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta)

const index = () => import('@/views/index-page')
const about = () => import('@/views/about-page')
const contact = () => import('@/views/contact-page')
const account = () => import('@/views/account-page')
const loginpage = () => import('@/views/login-page')
const signuppage = () => import('@/views/signup-page')
const accounts = () => import('@/views/accounts-page')
const confirm = () => import('@/views/confirm-page')
const reset = () => import('@/views/reset-page')
const pageNotFound = () => import('@/views/not-found-page')

let routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    meta: { requiresAuth: false }
  },
  {
    path: '/contact',
    name: 'contact',
    component: contact,
    meta: { requiresAuth: false }
  },
  {
    path: '/account',
    name: 'account',
    component: account,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: about,
    meta: { requiresAuth: false }
  },
  { path: '/signup',
    name: 'signup',
    component: signuppage,
    meta: {
      requiresAuth: false,
      redirectIfLoggedIn: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: loginpage,
    meta: {
      requiresAuth: false,
      redirectIfLoggedIn: true
    }
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: accounts,
    meta: { requiresAuth: true }
  },
  {
    path: '/confirm/:token',
    name: 'confirm',
    component: confirm,
    meta: { requiresAuth: false }
  },
  {
    path: '/reset',
    name: 'reset',
    component: reset,
    meta: { requiresAuth: false }
  },
  {
    path: '/reset/:token',
    name: 'resetToken',
    component: reset,
    meta: { requiresAuth: false }
  },
  {
    path: '*',
    name: 'pageNotFound',
    component: pageNotFound,
    meta: { requiresAuth: false }
  }
]

export function createRouter (store) {
  let router = new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes
  })

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.isLoggedIn) {
        next({
          path: '/login'
        })
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.redirectIfLoggedIn)) {
      if (store.getters.isLoggedIn) {
        next({
          path: '/'
        })
      } else {
        next()
      }
    } else {
      next()
    }
  })

  return router
}
