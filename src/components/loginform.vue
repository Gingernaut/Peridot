<template>
  <div>
    <h1 class="title has-text-centered">Login</h1>
    <form @submit.prevent="login" id="loginform">
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
          Login
        </button>
      </p>
    </form>

    <a class="is-info" v-on:click="goToReset">Forgot your password?</a>

  </div>
</template>

<script>
export default {
  name: 'loginform',
  components: {
  },
  // props: [],
  mixins: [],
  data () {
    return {
      emailAddress: null,
      password: null,
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
    login () {
      let cleanData = this.$account.cleanData({
        emailAddress: this.emailAddress ? this.emailAddress : '',
        password: this.password ? this.password : ''
      })

      if (!cleanData.isClean) {
        this.errors = cleanData.errors
        return
      }

      this.errors = []
      this.$account.login(cleanData).then(res => {
        this.$toast.open({
          duration: 2000,
          message: 'Login Successful',
          position: 'is-top',
          type: 'is-success'
        })
        this.$emit('exitModal')

        if (this.$router.currentRoute.path === '/login') {
          this.$router.push('/')
        }
      })
        .catch(err => {
          console.log(err)
          this.errors = ['Incorrect email or password']
        })
    },
    clearVals () {
      this.emailErr = null
      this.passErr = null
      this.errors = []
    },
    goToReset () {
      this.$emit('exitModal')
      this.$router.push('/reset')
    }
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
    this.clearVals()
  }
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
  font-size: .8em;
}
</style>
