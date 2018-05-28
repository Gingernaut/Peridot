<template>
  <div id="app">
    <GlobalNavbar/>
    <router-view id="appContent"/>
    <GlobalFooter/>
  </div>
</template>

<script>
import GlobalNavbar from "@/components/navbar-comp"

export default {
  name: "app",
  components: {
    GlobalNavbar,
    GlobalFooter: () => import("@/components/footer-comp"),
  },
  mixins: [],
  data() {
    return {}
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  computed: {},
  methods: {},
  filters: {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
}
</script>

<style lang="scss">
// setting Buefy variables from the _variables.scss file
@import "~bulma/sass/utilities/_all";
$primary-invert: findColorInvert($primary);
$colors: (
  "white": ($white, $black),
  "black": ($black, $white),
  "light": ($light, $light-invert),
  "dark": ($dark, $dark-invert),
  "primary": ($primary, $primary-invert),
  "info": ($info, $info-invert),
  "success": ($success, $success-invert),
  "warning": ($warning, $warning-invert),
  "danger": ($danger, $danger-invert)
);
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;
@import "~bulma";
@import "~buefy/src/scss/buefy";

html,
body {
  margin: 0;
  padding: 0;
  line-height: 1.5;
  transform-style: preserve-3d;
  box-sizing: border-box;
  overflow-x: hidden;
}

#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#appContent {
  margin-top: $stickyNavHeight + 1px;
  flex-grow: 1;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

a,
a:visited,
a:hover {
  text-decoration: none;
}
</style>
