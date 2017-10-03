<template>
  <div>
    <h1 class="title has-text-centered">Sign Up</h1>
    <form @submit.prevent="signup" id="signupform">

      <!-- <b-field label="First Name">
              <b-input type="text" v-model="firstName"></b-input>
            </b-field>
      
            <b-field label="Last Name">
              <b-input type="text" v-model="lastName"></b-input>
            </b-field> -->

      <b-field label="Email">

        <b-input type="email" v-model="emailAddress">
        </b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password" v-model="password"></b-input>
      </b-field>

      <p v-for="err in errors" v-bind:key="err" class="error">
        {{ err }}
      </p>

      <p class="control">
        <button class="button is-primary" id="submitbutton">
          Signup
        </button>
      </p>
    </form>
  </div>
</template>


<script>
export default {
  name: 'signupform',
  components: {
  },
  // props: [],
  mixins: [],
  data () {
    return {
      emailAddress: null,
      password: null,
      firstName: null,
      lastName: null,
      errors: []
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
    signup () {
      let cleanData = this.$account.cleanData({
        emailAddress: this.emailAddress,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      })

      if (!cleanData.isClean) {
        this.errors = cleanData.errors
        return
      }

      this.clearErrs()

      this.$account.signup(cleanData).then(res => {
        this.$toast.open({
          duration: 2000,
          message: 'Signup Successful',
          position: 'is-top',
          type: 'is-success'
        })

        this.$emit('exitModal')

        if (this.$router.currentRoute.path === '/signup') {
          this.$router.push('/wallets')
        }
      }).catch(err => {
        console.log(err)
        this.errors = ['An error occured. An email may aready exist with that address']
      })
    },
    clearErrs () {
      this.errors = []
    }
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
    this.clearErrs()
  }
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
  font-size: .8em;
}
</style>
