<template>
  <div>
    <h1 class="title has-text-centered">Login</h1>
    <form id="loginform" @submit.prevent="login">
      <b-field label="Email">
        <b-input v-model="emailAddress" type="email"/>
      </b-field>

      <b-field label="Password">
        <b-input v-model="password" type="password"/>
      </b-field>

      <p v-for="err in errors" v-bind:key="err" class="error">
        {{ err }}
      </p>

      <p class="control">
        <button id="submitbutton" class="button is-primary">
          Login
        </button>
      </p>
    </form>
    <router-link to="/signup" @click.native="closeModal()">Create new account</router-link>
    <br>
    <router-link to="/reset" @click.native="closeModal()">Forget your password?</router-link>
  </div>
</template>

<script>
export default {
  name: "loginform",
  components: {},
  // props: [],
  mixins: [],
  data() {
    return {
      emailAddress: null,
      password: null,
      errors: [],
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  computed: {},
  methods: {
    login() {
      const cleanData = this.$accountAPI.cleanData({
        emailAddress: this.emailAddress,
        password: this.password,
      })

      if (cleanData.errors.length >= 1) {
        this.errors = cleanData.errors
        return
      }
      this.errors = []
      this.$accountAPI
        .login(cleanData)
        .then(() => {
          this.$toast.open({
            duration: 2000,
            message: "Login Successful",
            position: "is-top",
            type: "is-success",
          })
          this.$emit("exitModal")

          if (this.$router.currentRoute.path === "/login") {
            this.$router.push("/")
          }
        })
        .catch(() => {
          this.errors = ["Incorrect email or password"]
        })
    },
    clearVals() {
      this.emailErr = null
      this.passErr = null
      this.errors = []
    },
    closeModal() {
      this.$emit("exitModal")
    },
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    this.clearVals()
  },
}
</script>

<style lang="scss" scoped>
#loginform {
  max-width: 400px;
}

#submitbutton {
  margin-top: 9px;
  margin-bottom: 9px;
}

.error {
  color: red;
  font-size: 0.8em;
}
</style>
