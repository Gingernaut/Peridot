<template>
  <div class="hero-body">
    <div class="container">

      <!-- updating password -->
      <form v-if="hasToken" id="resetPassForm" @submit.prevent="saveNewPass">
        <b-field label="New Password">
          <b-input type="password" min="6 " v-model="password1">
          </b-input>
        </b-field>

        <b-field label="Confirm New Password">
          <b-input type="password" min="6 " v-model="password2">
          </b-input>
        </b-field>
        <p class="has-text-danger" v-if="!passesMatch && password1.length >= 1">Both passwords must match</p>

        <p class="control">
          <button class="button is-primary">
            Save Password
          </button>
        </p>
      </form>

      <!-- Creating new reset -->
      <form v-if="!hasToken" id="initResetForm" @submit.prevent="initReset">

        <h1 class="title">Reset your password</h1>
          
        <p>If there is an account with your email, you will get a link to reset your password.</p>

        <br>
        <b-field label="Email Address">
          <b-input type="email" v-model="emailAddress">
          </b-input>
        </b-field>

        <p class="control">
          <button class="button is-primary">
            Send Reset Email
          </button>
        </p>
      </form>

      <p v-for="err in errors" v-bind:key="err" class="error">
        {{ err }}
      </p>

    </div>
  </div>
</template>


<script>
export default {
  name: "reset",
  components: {},
  // props: [],
  mixins: [],
  data() {
    return {
      hasToken: false,
      password1: null,
      password2: null,
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
  computed: {
    passesMatch: function() {
      return this.password1 === this.password2
    },
  },
  methods: {
    initReset: function() {
      let cleanData = this.$accountAPI.cleanData({
        emailAddress: this.emailAddress,
      })

      if (!cleanData.errors.length > 1) {
        this.errors = cleanData.errors
        return
      }

      this.$accountAPI.initReset(this.emailAddress)
      this.$snackbar.open({
        message: "Email Address Submitted",
        type: "is-info",
        position: "is-top",
        actionText: "Ok",
      })
      this.$router.push("/")
    },
    saveNewPass: function() {
      if (this.password1 === this.password2 && this.password1.length >= 6) {
        this.$account
          .updateAcc({ password: this.password1 })
          .then(() => {
            this.$router.push("/account")
            this.$toast.open({
              duration: 2000,
              message: "Changes Saved",
              position: "is-top",
              type: "is-success",
            })
          })
          .catch((err) => {
            console.log("errors")
            console.log(err)
            this.errors = [err]
          })
      } else {
        this.errors = ["Passwords must match and be at least 6 characters long"]
      }
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
