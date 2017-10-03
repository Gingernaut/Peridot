import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

/* Importing pages */
const index = import('@/pages/index')

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
    component: index
  },
  { 
    path: '/contact',
    name: 'contact',
    component: contact
  },
  { 
    path: '/account',
    name: 'account',
    component: account
  },
  { 
    path: '/about', 
    name: 'about',
    component: about
  },
  { path: '/signup',
    name: 'signup',
    component: signuppage
  },
  { 
    path: '/login', 
    name: 'login',
    component: loginpage
  },
  { 
    path: '/accounts', 
    name: 'accounts',
    component: accounts
  },
  { 
    path: '/confirm/:token', 
    name: 'confirm',
    component: confirm
  },
  { 
    path: '/reset', 
    name: 'reset',
    component: reset
  },
  { 
    path: '/reset/:token', 
    name: 'reset',
    component: reset
  },
  { 
    path: '*', 
    name: 'pageNotFound',
    component: pageNotFound
  }
]


export function createRouter() {
  return new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes
  })
}
