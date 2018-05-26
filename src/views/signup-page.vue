<template>
  <div>
    <section class="section">
      <div class="container">
        <SignupForm/>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "signuppage",
  components: {
    SignupForm: () => import("@/components/signup-form"),
  },
  // props: [],
  mixins: [],
  data() {
    return {}
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
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
