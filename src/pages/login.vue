<template>
  <div>
    <section class="section">
      <div class="container">
        <loginform></loginform>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'loginpage',
  components: {
    loginform: () => import('@/components/loginform')
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

<style lang="scss" scoped>

</style>
