<template>
  <div class="home">
    <h1>Hello there</h1>
  </div>
</template>

<script>
import { get } from "vuex-pathify"

export default {
  name: "Home",
  components: {},
  mixins: [],
  data() {
    return {
      allData: null,
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  computed: {
    name: get("name"),
  },
  methods: {},
  filters: {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
}
</script>

<style>
</style>
