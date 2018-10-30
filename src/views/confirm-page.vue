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
  name: "Confirm",
  components: {},
  mixins: [],
  data() {
    return {
      isLoading: true,
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {
    const token = this.$route.params.token
    this.$accountAPI.validateAccount(token).then(() => {
      this.isLoading = false
      this.$toast.open({
        duration: 2000,
        message: "Account Confirmed",
        position: "is-top",
        type: "is-success",
      })
      this.$router.push("/")
    })
  },
  mounted() {},
  computed: {},
  methods: {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
}
</script>

<style lang="scss" scoped>
</style>
