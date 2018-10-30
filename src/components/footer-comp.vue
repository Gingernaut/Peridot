<template>
  <footer v-if="showFooter">
    <router-link 
      to="/about" 
      class="navbar-item">About</router-link>
    <router-link 
      to="/contact" 
      class="navbar-item">Contact</router-link>
    <p> &copy; {{ year }}</p>
  </footer>
</template>

<script>
import { get } from "vuex-pathify"

export default {
  name: "GlobalFooter",
  components: {},
  mixins: [],
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  computed: {
    showFooter: get("ui/showFooter"),
  },
  methods: {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
}
</script>

<style lang="scss" scoped>
footer {
  border-top: 1px solid $primary;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-bottom: 1vh;

  p {
    margin: 8px;
    margin-right: 16px;
  }
}
</style>
