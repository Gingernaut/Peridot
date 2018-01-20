<template>
  <nav class="navbar" v-if="this.$store.state.ui.navbar">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <h1 id="logo">Peridot</h1>
        <!-- <img src="/static/yourLogo.png" alt="Your Logo" width="112" height="28"> -->
      </router-link>

      <div class="navbar-burger burger" :class="{ 'is-active': showMobileNav }" @click="toggleMobileNav">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navMenu" class="navbar-menu" :class="{ 'is-active': showMobileNav }">

      <div class="navbar-start">
        <router-link to="/accounts" class="navbar-item" v-if="this.$store.state.account.userRole ==='ADMIN'">Accounts</router-link>
      </div>

      <div class="navbar-end">
        <span class="navbar-item">
          <a v-if="!this.$store.getters.isLoggedIn" @click="openSignup()" class="button accNav is-info"> Sign Up</a>
          <a v-if="!this.$store.getters.isLoggedIn" @click="openLogin()"  class="button accNav">Log In</a>
        </span>

        <div v-if="this.$store.getters.isLoggedIn" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link is-active">
            Account
          </a>

          <div class="navbar-dropdown ">
            <router-link to="/account" class="navbar-item">
              Overview
            </router-link>

            <!--  <a class="navbar-item is-active" href="http://bulma.io/documentation/components/breadcrumb/">
                    Components
                  </a> -->

            <hr class="navbar-divider">
            <div class="navbar-item">
              <div>
                <small>
                  <a @click="logout()">Sign Out</a>
                </small>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

    <modal @exitModal="closeModal" v-bind:show="showLogin" v-bind:modalcomponent="'login'"></modal>
    <modal @exitModal="closeModal" v-bind:show="showSignup" v-bind:modalcomponent="'signup'"></modal>

  </nav>
</template>


<script>
export default {
  name: 'navbar',
  components: {
  },
  // props: [],
  mixins: [],
  data () {
    return {
      showLogin: false,
      showSignup: false,
      showMobileNav: false
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
    closeModal () {
      this.showLogin = false
      this.showSignup = false
    },
    openSignup () {
      this.showSignup = true
    },
    openLogin () {
      this.showLogin = true
    },
    logout () {
      this.$account.logout()
      this.$toast.open({
        duration: 1000,
        message: 'Signed Out',
        position: 'is-top',
        type: 'is-dark'
      })
      this.$router.push('/')
    },
    toggleMobileNav () {
      this.showMobileNav = !this.showMobileNav
    }
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="scss" scoped>
nav {
  border-bottom: 1px solid $outline;
}

#logo {
  font-weight: 700;
  font-size: 1.5em;
  color: $outline;
}

.accNav {
  margin-left: 5px;
}
</style>
