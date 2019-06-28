<template>
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        404 Not Found
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  components: {},
  // props: [],
  mixins: [],
  data() {
    return {}
  },
  beforeCreate() {},
  created() {
    this.$router.push("/404")
  },
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

<style lang="scss" scoped></style>
