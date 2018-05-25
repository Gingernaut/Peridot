<template>
  <div class="home">

  </div>
</template>

<script>
// @ is an alias to /src

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
.home {
  font-size: 30px;
  color: $blue;
}
</style>
