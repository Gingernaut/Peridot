import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)

const index = () =>import('@/pages/index')
const contact = () => import('@/pages/contact')
const account = () => import('@/pages/account')
const about = () => import('@/pages/about')
const pageNotFound = () => import('@/pages/pageNotFound')
const loginpage = () => import('@/pages/login')
const signuppage = () => import('@/pages/signup')
const accounts = () => import('@/pages/accounts')
const confirm = () => import('@/pages/confirm')
const reset = () => import('@/pages/reset')

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

export function createRouter(store) {

  let router = new Router({
    mode: "history",
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
    }

    else if (to.matched.some(record => record.meta.redirectIfLoggedIn)) {
      if (store.getters.isLoggedIn) {
        next({
          path: '/'
        })
      } else {
        next()
      }
    } 
    
    else {
      next()
    }
  })

  return router 
}
