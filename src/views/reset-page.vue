<template>
  <div class="hero-body">
    <div class="container">

      <form v-if="hasToken" id="resetPassForm" @submit.prevent="saveNewPass">
        <b-field label="New Password">
          <b-input type="password" min="6" v-model="localPass1">
          </b-input>
        </b-field>

        <b-field label="Confirm New Password">
          <b-input type="password" min="6 " v-model="localPass2">
          </b-input>
        </b-field>
        <p id="passMatchErr" v-if="!passesMatch && localPass1.length >= 1">Both passwords must match</p>

        <p class="control">
          <button class="button is-primary">
            Save Password
          </button>
        </p>
      </form>

      <form v-if="!hasToken" id="initResetForm" @submit.prevent="initReset">

        <h1 class="title">Please enter your email.</h1>
          
        <p>If there is an account with your email, you will get a link to reset your password.</p>

        <br>
        <b-field label="Email Address">
          <b-input type="email" v-model="emailAddr">
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
      localPass1: null,
      localPass2: null,
      emailAddr: null,
      errors: [],
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    if (this.$route.params.token) {
      this.hasToken = true
      this.$account.confirmReset(this.$route.params.token)
    }
  },
  computed: {
    passesMatch: function() {
      return this.localPass1 === this.localPass2
    },
  },
  methods: {
    initReset: function() {
      let cleanData = this.$account.cleanData({ emailAddress: this.emailAddr })

      if (!cleanData.isClean) {
        this.errors = cleanData.errors
        return
      }

      this.$account.initReset(this.emailAddr)
      this.$snackbar.open({
        message: "An email has been sent to that address.",
        type: "is-info",
        position: "is-top",
        actionText: "Ok",
      })
      this.$router.push("/")
    },
    saveNewPass: function() {
      if (this.localPass1 === this.localPass2 && this.localPass1.length >= 6) {
        this.$account
          .updateAcc({ password: this.localPass1 })
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
