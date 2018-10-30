<template>
  <section class="section">
    <div class="hero-body">
      <div class="container">
        <b-loading :active.sync="isLoading"/>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  name: "LoadingPage",
  components: {},
  mixins: [],
  data() {
    return {
      isLoading: true,
    }
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

<style lang="scss" scoped>
</style>
