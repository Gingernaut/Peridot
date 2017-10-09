<template>
  <div>
    <h1 class="title">Account Page</h1>
    <form id="updateAccForm" @submit.prevent="updateAcc">

      <b-field label="First Name">
        <b-input v-model="localFName"></b-input>
      </b-field>

      <b-field label="Last Name">
        <b-input v-model="localLName"></b-input>
      </b-field>

      <b-field label="Email">
        <b-input type="email" v-model="localEmail">
        </b-input>
      </b-field>

      <b-field label="Phone">
        <b-input v-model="localPhoneNumber"></b-input>
      </b-field>

      <b-field label="Change Password">
        <b-input type="password" v-model="localPass1">
        </b-input>

      </b-field>

      <b-field v-if="localPass1" label="Confirm Password">
        <b-input type="password" v-model="localPass2">
        </b-input>
      </b-field>

      <p id="passMatchErr" v-if="!passesMatch && localPass1.length >= 1">Both passwords must match</p>

      <p class="control">
        <button class="button is-primary">
          Save Changes
        </button>

        <button class="button is-danger is-outlined" @click="deleteAcc()">
          Delete Account
        </button>
      </p>

    </form>
  </div>
</template>


<script>
export default {
  name: 'account',
  components: {
  },
  // props: [],
  mixins: [],
  data () {
    return {
      localFName: null,
      localLName: null,
      localEmail: null,
      localPhoneNumber: null,
      localPass1: null,
      localPass2: null,
      errors: []
    }
  },
  beforeCreate () {
    if (!this.$store.state.account.loggedIn) {
      this.$router.push('/login')
    }
  },
  created () {
    this.$account.getOwnData()
    this.setLocalData()
  },
  beforeMount () {
  },
  mounted () {
  },
  computed: {
    passesMatch: function () {
      return this.localPass1 === this.localPass2
    }
  },
  methods: {
    setLocalData: function () {
      this.localLName = this.$store.state.account.lastName
      this.localFName = this.$store.state.account.firstName
      this.localEmail = this.$store.state.account.emailAddress
      this.localPhoneNumber = this.$store.state.account.phoneNumber
    },
    updateAcc: function () {
      if (this.localPass1 !== this.localPass2) {
        this.errors = ['passwords must match.']
        return
      }

      let changedFields = this.changedFields()
      let cleanData = this.$account.cleanData(changedFields)

      if (!cleanData.isClean) {
        this.errors = cleanData.errors
        return
      }

      this.$account.updateAcc(cleanData).then(res => {
        this.$toast.open({
          duration: 2000,
          message: 'Changes Saved',
          position: 'is-top',
          type: 'is-success'
        })
      })
        .catch(err => {
          this.$toast.open({
            duration: 2000,
            message: 'An error occured, changes not saved',
            position: 'is-top',
            type: 'is-danger'
          })
          console.log(err)
        })
    },
    changedFields: function () {
      let fields = {}

      if (this.$store.state.account.firstName !== this.localFName) {
        fields['firstName'] = this.localFName
      }

      if (this.$store.state.account.lastName !== this.localLName) {
        fields['lastName'] = this.localLName
      }

      if (this.$store.state.account.emailAddress !== this.localEmail) {
        fields['emailAddress'] = this.localEmail
      }

      if (this.$store.state.account.phoneNum !== this.localPhoneNum) {
        fields['phoneNumber'] = this.localPhoneNumber
      }

      if (this.localPass1) {
        fields['password'] = this.localPass1
      }

      return fields
    },
    deleteAcc: function () {
      this.$dialog.confirm({
        title: 'Deleting account',
        message: 'Are you sure you want to <strong>delete</strong> your account? This cannot be undone.',
        confirmText: 'Delete Account',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$account.deleteAcc()
          this.logout()
          this.$toast.open('Account deleted.')
        }
      })
    },
    clearLocal: function () {
      this.localFName = null
      this.localLName = null
      this.localEmail = null
      this.localPhoneNum = null
      this.localPass1 = null
      this.localPass2 = null
      this.errors = []
    },
    logout: function () {
      this.$account.logout()
      this.$router.push('/')
    }
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
    this.clearLocal()
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 25px;
  margin-top: 5vh;
  margin-bottom: 5vh;
}

#passMatchErr {
  color: red;
  margin-bottom: 15px;
}

.is-danger {
  margin-left: 20px;
}

#updateAccForm {
  margin: 25px;
  max-width: 350px;
}
</style>