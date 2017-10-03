<template>
  <div id="app">
    <navbar></navbar>
    <router-view id="appContent"></router-view>
    <myFooter></myFooter>
  </div>
</template>

<script>

import navbar from '@/components/navbar'

export default {
  name: 'app',
  components: {
    navbar,
    myFooter: () => import('@/components/footer')
  },
  // props: [],
  mixins: [],
  data () {
    return {

    }
  },
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
  }
}
</script>


<style lang="scss">


html,body {
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
  z-index:1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#appContent {
  flex-grow:1;
}

*, *:before, *:after {
  box-sizing: inherit;
}

a, a:visited, a:hover {
    text-decoration: none;
}
</style>
