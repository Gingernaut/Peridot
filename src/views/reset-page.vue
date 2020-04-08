<template>
  <div class="hero-body">
    <div class="container">
      <!-- updating password -->
      <form id="resetPassForm" @submit.prevent="saveNewPass">
        <b-field label="New Password">
          <b-input v-model="password1" type="password" min="6" />
        </b-field>

        <b-field label="Confirm New Password">
          <b-input v-model="password2" type="password" min="6" />
        </b-field>
        <p v-if="!passesMatch && password1.length >= 1" class="has-text-danger">
          Both passwords must match
        </p>

        <p class="control">
          <button class="button is-primary">
            Save Password
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
      password1: null,
      password2: null,
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
    } else {
      this.$router.push("/reset")
    }
  },
  computed: {
    passesMatch: function () {
      return this.password1 === this.password2
    },
  },
  methods: {
    saveNewPass: function () {
      if (this.password1 === this.password2 && this.password1.length >= 6) {
        this.$accountAPI
          .updateAccount({ password: this.password1 })
          .then(() => {
            this.$router.push("/account")
            this.$buefy.toast.open({
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
