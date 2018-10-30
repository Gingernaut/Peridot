const routes = [
  {
    path: "/",
    name: "index",
    component: () => lazyLoadView(import("@/views/index-page")),
  },
  {
    path: "/about",
    name: "about",
    component: () => lazyLoadView(import("@/views/about-page")),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => lazyLoadView(import("@/views/contact-page")),
  },
  {
    path: "/account",
    name: "account",
    component: () => lazyLoadView(import("@/views/account-page")),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => lazyLoadView(import("@/views/signup-page")),
    meta: {
      redirectIfAuthenticated: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => lazyLoadView(import("@/views/login-page")),
    meta: {
      redirectIfAuthenticated: true,
    },
  },
  {
    path: "/accounts",
    name: "accounts",
    component: () => lazyLoadView(import("@/views/accounts-page")),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/confirm-account/:token",
    name: "confirm",
    component: () => lazyLoadView(import("@/views/confirm-page")),
    props: true,
  },
  {
    path: "/reset",
    name: "reset",
    component: () => lazyLoadView(import("@/views/reset-page")),
    props: true,
    meta: {
      redirectIfAuthenticated: true,
    },
  },
  //   {
  //     path: "/reset/:token",
  //     name: "resetToken",
  //     component: () => lazyLoadView(import("@/views/reset-page")),
  //     meta: {
  //       redirectIfAuthenticated: true,
  //     },
  //   },
  {
    path: "/404",
    name: "pageNotFound",
    component: () => lazyLoadView(import("@/views/not-found-page")),
    props: true,
  },
  {
    path: "*",
    redirect: "404",
  },
]

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
// component: () => import('@views/my-view')
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require("@/views/loading-page").default,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require("@/views/timeout-page").default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}

export default routes
