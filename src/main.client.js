import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from '@/main'

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false

    if (store.state.error) console.log(store.state.error)

    const activated = matched.filter((component, i) => {
      return diffed || (diffed = (prevMatched[i] !== component))
    })
    if (!activated.length) {
      return next()
    }
    Promise.all(activated.map((c) => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(() => {
      next()
    }).catch(next)
  })

  // actually mount to DOM
  app.$mount('#app')
})

/*
// service worker
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
} else {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    console.log('Unregistering service workers for development')
    for (let registration of registrations) {
      registration.unregister()
    }
  })
}
*/