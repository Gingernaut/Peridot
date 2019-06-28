<template>
  <div>
    <section class="section">
      <div class="container">
        <LoginForm />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Loginpage",
  components: {
    LoginForm: () => import("@/components/login-form"),
  },
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

<style lang="scss" scoped></style>
