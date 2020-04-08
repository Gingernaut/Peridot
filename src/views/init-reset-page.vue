<template>
  <div class="hero-body">
    <div class="container">
      <!-- Creating new reset -->
      <form id="initResetForm" @submit.prevent="initReset">
        <h1 class="title">Reset your password</h1>

        <p>
          If there is an account with your email, you will get a link to reset
          your password.
        </p>

        <br >
        <b-field label="Email Address">
          <FormulateInput
            v-model="emailAddress"
            type="email"
            name="email"
            validation="required|email"
            placeholder="first_last@example.com"
          />
        </b-field>

        <p class="control">
          <button class="button is-primary">
            Send Reset Email
          </button>
        </p>
      </form>

      <p v-for="err in errors" :key="err" class="error">
        {{ err }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reset",
  components: {},
  // props: [],
  mixins: [],
  data() {
    return {
      hasToken: false,
      emailAddress: null,
      errors: [],
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    if (this.$route.params.token) {
      console.log("has token")
      this.hasToken = true
      this.$accountAPI
        .confirmReset(this.$route.params.token)
        .then((res) => {
          console.log("confirmed reset")
          console.log(res)
        })
        .catch((err) => {
          this.errors.push(err)
          console.log(err)
          this.hasToken = false
          this.$router.push("/reset")
        })
    }
  },
  computed: {},
  methods: {
    initReset: function () {
      let cleanData = this.$accountAPI.cleanData({
        emailAddress: this.emailAddress,
      })

      if (!cleanData.errors.length > 1) {
        this.errors = cleanData.errors
        return
      }

      this.$accountAPI.initReset(this.emailAddress)
      this.$buefy.snackbar.open({
        message: "Email Address Submitted",
        type: "is-info",
        position: "is-top",
        actionText: "Ok",
      })
      this.$router.push("/")
    },
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
}
</script>

<style lang="scss" scoped>
#error {
  margin-top: 10px;
  color: red;
  margin-bottom: 15px;
}

form {
  max-width: 400px;
}
</style>
