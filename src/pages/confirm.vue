<template>
  <div class="hero-body">
    <div class="container">
      <b-loading :active.sync="isLoading"></b-loading>
    </div>
  </div>
</template>

<script>
export default {
  name: 'confirm',
  components: {
  },
  // props: [],
  mixins: [],
  data () {
    return {
      isLoading: true
    }
  },
  beforeCreate () {
  },
  created () {
  
  },
  beforeMount () {
    let token = this.$route.params.token
    this.$account.confirmToken(token).then(res => {
      this.isLoading = false
      this.$toast.open({
        duration: 2000,
        message: 'Account Confirmed',
        position: 'is-top',
        type: 'is-success'
      })
      this.$router.push('/')
    })
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

</style>

