<template>
  <div>
    <h1 class="title has-text-centered">Sign Up</h1>
    <form id="signupform" @submit.prevent="signup">
      <!-- <b-field label="First Name">
              <FormulateInput
                type="text"
                name="firstName"
                placeholder="Johnny"
                v-model="firstName"
              />
            </b-field>
      
            <b-field label="Last Name">
              <FormulateInput
          type="text"
          name="lastName"
          placeholder="Appleseed"
          v-model="lastName"
        />
      </b-field>-->

      <b-field label="Email">
        <FormulateInput
          v-model="emailAddress"
          type="email"
          name="email"
          validation="required|email"
          placeholder="first_last@example.com"
        />
      </b-field>

      <b-field label="Password">
        <FormulateInput
          v-model="password"
          type="password"
          name="password"
          placeholder="••••••••••"
          validation="required|min:6,length"
          validation-name="Password"
        />
      </b-field>

      <p v-for="err in errors" :key="err" class="error">{{ err }}</p>

      <p class="control">
        <button id="submitbutton" class="button is-primary">Signup</button>
      </p>
      <router-link to="/login">Login here</router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: "Signupform",
  components: {},
  mixins: [],
  data() {
    return {
      emailAddress: null,
      password: null,
      firstName: null,
      lastName: null,
      errors: [],
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  computed: {},
  methods: {
    signup() {
      const cleanData = this.$accountAPI.cleanData({
        emailAddress: this.emailAddress,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      })

      if (cleanData.errors.length >= 1) {
        this.errors = cleanData.errors
        return
      }

      this.errors = []

      this.$accountAPI
        .signup(cleanData)
        .then(() => {
          this.$buefy.toast.open({
            duration: 2000,
            message: "Signup Successful",
            position: "is-top",
            type: "is-success",
          })

          this.$emit("exitModal")

          if (this.$router.currentRoute.path === "/signup") {
            this.$router.push("/")
          }
        })
        .catch(() => {
          this.errors = [
            "An error occured. An email may aready exist with that address",
          ]
        })
    },
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    this.errors = []
  },
}
</script>

<style lang="scss" scoped>
#signupform {
  max-width: 400px;
}

#submitbutton {
  margin-top: 9px;
}

.error {
  color: red;
  font-size: 0.8em;
}
</style>
