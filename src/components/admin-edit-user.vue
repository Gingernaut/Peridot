<template>
  <div>
    <div v-if="isAdmin">
      <form id="editAccForm" @submit.prevent="saveAccountChanges()">

        <h1 class="title has-text-centered">
          Editing user: id {{ id }}
        </h1>

        <p>
          <strong>Created:</strong> {{ createdTime | fullDate }}
        </p>
        <p>
          <strong>Modified:</strong> {{ modifiedTime | fullDate }}
        </p>

        <b-field label="First Name">
          <b-input v-model="firstName" type="text"/>
        </b-field>
            
        <b-field label="Last Name">
          <b-input v-model="lastName" type="text"/>
        </b-field>

        <b-field label="Email">
          <b-input v-model="emailAddress" type="text"/>
        </b-field>

        <b-field label="Phone">
          <b-input v-model="phoneNumber" type="text"/>
        </b-field>

        <b-field label="Role">
          <b-input v-model="userRole" type="text"/>
        </b-field>

        <b-field label="Verified">
          <div class="block">
            <b-radio v-model="isVerified" native-value="true">
              True
            </b-radio>
            <b-radio v-model="isVerified" native-value="false">
              False
            </b-radio>
          </div>
        </b-field>
        <div id="controlButtons">
          <button class="button is-primary">Save Changes</button>
          <!-- <button class="button is-danger is-outlined" @click.prevent="closeModal()">Discard Changes</button> -->
          <button class="button is-danger is-pulled-right" @click.prevent="deleteAccount()">Delete Account</button>
        </div>
      </form>
    </div>
    <div v-else>
      <h1>Not Authorized</h1>
    </div>
  </div>
</template>

<script>
import { get } from "vuex-pathify"

export default {
  name: "Admin-Edit-User",
  components: {},
  props: ["payload"],
  mixins: [],
  data() {
    return {
      id: null,
      firstName: null,
      lastName: null,
      emailAddress: null,
      phoneNumber: null,
      isVerified: false,
      UUID: null,
      userRole: null,
      createdTime: null,
      modifiedTime: null,
    }
  },
  beforeCreate() {},
  created() {
    this.id = this.payload.id
    this.firstName = this.payload.firstName
    this.lastName = this.payload.lastName
    this.emailAddress = this.payload.emailAddress
    this.phoneNumber = this.payload.phoneNumber
    this.isVerified = this.payload.isVerified
    this.userRole = this.payload.userRole
    this.createdTime = this.payload.createdTime
    this.modifiedTime = this.payload.modifiedTime
  },
  beforeMount() {},
  mounted() {},
  computed: {
    loggedInUserRole: get("account/userRole"),
    isAdmin: function() {
      return this.loggedInUserRole === "ADMIN"
    },
  },
  methods: {
    saveAccountChanges() {
      let changedData = this.changedFields()

      if (Object.values(changedData).length < 1) {
        this.$toast.open({
          duration: 2000,
          message: "No changes to save",
          position: "is-top",
          type: "is-info",
        })
        return
      }

      let cleanData = this.$accountAPI.cleanData(changedData)
      this.$accountAPI
        .updateAccount(cleanData, this.id)
        .then((res) => {
          console.log(res.data)
          this.$toast.open({
            duration: 2000,
            message: "Changes saved",
            position: "is-top",
            type: "is-success",
          })
          this.closeModal(true)
        })
        .catch(() => {
          this.$snackbar.open({
            duration: 2000,
            message: "An error occured. Please try again",
            position: "is-top",
            type: "is-warning",
          })
        })
    },
    changedFields: function() {
      let fields = {}

      if (this.payload.firstName !== this.firstName) {
        fields.firstName = this.firstName
      }

      if (this.payload.lastName !== this.lastName) {
        fields.lastName = this.lastName
      }

      if (this.payload.emailAddress !== this.emailAddress) {
        fields.emailAddress = this.emailAddress
      }

      if (this.payload.phoneNumber !== this.phoneNumber) {
        fields.phoneNumber = this.phoneNumber
      }

      if (this.payload.isVerified !== this.isVerified) {
        fields.isVerified = this.isVerified
      }

      if (this.payload.userRole !== this.userRole) {
        fields.userRole = this.userRole
      }

      return fields
    },
    deleteAccount: function() {
      this.$dialog.confirm({
        title: "Deleting account",
        message:
          "Are you sure you want to <strong>delete</strong> this account? This cannot be undone.",
        confirmText: "Delete Account",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$accountAPI
            .deleteAccount(this.id)
            .then(() => {
              if (this.id === this.$store.get("account/id")) {
                this.$accountAPI.logout()
                this.$router.push("/")
              }
              this.$toast.open({
                duration: 2000,
                message: "Account deleted",
                position: "is-top",
                type: "is-info",
              })
              this.closeModal(false)
            })
            .catch(() => {
              this.$snackbar.open({
                duration: 2000,
                message: "An error occured. Please try again",
                position: "is-top",
                type: "is-warning",
              })
            })
        },
      })
    },
    closeModal(updateUserList) {
      this.$emit("exitModal", updateUserList)
    },
  },
  filters: {
    fullDate: function(date) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }
      return new Date(date).toLocaleDateString(undefined, options)
    },
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
}
</script>

<style lang="scss" scoped>
#editAccForm {
  width: 50vw;
  line-height: 2;

  button {
    margin-left: 5px;
    margin-right: 5px;
  }
}

#controlButtons {
  margin-top: 40px;
}
</style>
