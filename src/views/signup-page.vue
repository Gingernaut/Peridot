<template>
  <div>
    <section class="section">
      <div class="container">
        <signupform></signupform>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'signuppage',
  components: {
    signupform: () => import('@/components/signup-form')
  },
  // props: [],
  mixins: [],
  metaInfo: {
    title: 'Signup',
    htmlAttrs: {
      lang: 'en'
    }
  },
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
