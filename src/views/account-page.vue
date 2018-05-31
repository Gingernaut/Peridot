<template>
  <div>
    <h1 class="title">Account Page</h1>
    <form id="updateAccForm" @submit.prevent="updateAcc">

      <b-field label="First Name">
        <b-input v-model="firstName"/>
      </b-field>

      <b-field label="Last Name">
        <b-input v-model="lastName"/>
      </b-field>

      <b-field label="Email">
        <b-input v-model="emailAddress" type="email"/>
      </b-field>

      <b-field label="Phone">
        <b-input v-model="phoneNumber"/>
      </b-field>

      <b-field label="Change Password">
        <b-input v-model="password1" type="password"/>

      </b-field>

      <b-field v-if="password1" label="Confirm Password">
        <b-input v-model="password2" type="password"/>
      </b-field>

      <p v-if="!passesMatch && password1.length >= 1" id="passMatchErr">Both passwords must match</p>

      <p class="control">
        <button class="button is-primary">
          Save Changes
        </button>

        <button class="button is-danger is-outlined" @click.prevent="deleteAcc()">
          Delete Account
        </button>
      </p>

    </form>
  </div>
</template>


<script>
export default {
  name: "account",
  components: {},
  mixins: [],
  data() {
    return {
      firstName: null,
      lastName: null,
      emailAddress: null,
      phoneNumber: null,
      password1: null,
      password2: null,
      errors: [],
    }
  },
  beforeCreate() {},
  created() {
    this.setLocalData()
  },
  beforeMount() {},
  mounted() {
    this.$accountAPI
      .getAccount()
      .then(() => {
        this.setLocalData()
      })
      .catch(() => {
        console.log("failed to retrieve latest account info")
      })
  },
  computed: {
    passesMatch: function() {
      return this.password1 === this.password2
    },
  },
  methods: {
    setLocalData: function() {
      this.firstName = this.$store.get("account/firstName")
      this.lastName = this.$store.get("account/lastName")
      this.emailAddress = this.$store.get("account/emailAddress")
      this.phoneNumber = this.$store.get("account/phoneNumber")
    },
    updateAcc: function() {
      if (this.password1 !== this.password2) {
        this.errors = ["passwords must match."]
        return
      }

      let changedFields = this.changedFields()
      let cleanData = this.$accountAPI.cleanData(changedFields)

      if (cleanData.errors.length >= 1) {
        this.errors = cleanData.errors
        return
      }

      this.$accountAPI
        .updateAccount(cleanData)
        .then(() => {
          this.setLocalData()
          this.$toast.open({
            duration: 2000,
            message: "Changes Saved",
            position: "is-top",
            type: "is-success",
          })
        })
        .catch(() => {
          this.$toast.open({
            duration: 2000,
            message: "An error occured, changes not saved",
            position: "is-top",
            type: "is-danger",
          })
        })
    },
    changedFields: function() {
      let fields = {}

      if (this.$store.get("account/firstName") !== this.firstName) {
        fields.firstName = this.firstName
      }

      if (this.$store.get("account/lastName") !== this.lastName) {
        fields.lastName = this.lastName
      }

      if (this.$store.get("account/emailAddress") !== this.emailAddress) {
        fields.emailAddress = this.emailAddress
      }

      if (this.$store.get("account/phoneNumber") !== this.phoneNumber) {
        fields.phoneNumber = this.phoneNumber
      }

      if (this.password1 && this.password1 === this.password2) {
        fields.password = this.password1
      }

      return fields
    },
    deleteAcc: function() {
      this.$dialog.confirm({
        title: "Deleting account",
        message:
          "Are you sure you want to <strong>delete</strong> your account? This cannot be undone.",
        confirmText: "Delete Account",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$accountAPI.deleteAccount()
          this.logout()
          this.$toast.open("Account deleted.")
        },
      })
    },
    clearLocal: function() {
      this.firstName = null
      this.lastName = null
      this.emailAddress = null
      this.phoneNumber = null
      this.password1 = null
      this.password2 = null
      this.errors = []
    },
    logout: function() {
      this.$accountAPI.logout()
      this.clearLocal()
      this.$router.push("/")
    },
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    this.clearLocal()
  },
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
