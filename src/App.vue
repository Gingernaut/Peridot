<template>
  <div id="app">
    <router-view id="appContent"/>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
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

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.15s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
}

#appContent {
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
