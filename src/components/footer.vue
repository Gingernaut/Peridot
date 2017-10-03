<template>
  <footer class="footer" v-if="this.$store.state.ui.footer">
    <router-link to="/about" class="navbar-item">About</router-link>
    <router-link to="/contact" class="navbar-item">Contact</router-link>
    <!-- <p> &copy; {{ year }} Tyler Peterson</p> -->
  </footer>
</template>

<script>
export default {
  name: 'footer',
  components: {
  },
  // props: [],
  mixins: [],
  data () {
    return {
      year: new Date().getFullYear()
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

<style lang="scss" scoped>
footer {
  border-top: 1px solid $outline;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-bottom: 2vh;

  p {
    padding: 8px;
  }
}
</style>
