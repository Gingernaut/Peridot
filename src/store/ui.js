module.exports = {
  state: {
    navbar: true,
    footer: true
  },
  mutations: {
    hideNav: state => (state.navbar = false),
    showNav: state => (state.navbar = true),
    hideFoot: state => (state.footer = false),
    showFoot: state => (state.footer = true)
  }
}
