<template>
  <div>
      <div v-if="isAdmin">
        <form @submit.prevent="saveAccountChanges()" id="editAccForm">

            <h1 class="title has-text-centered">
                Editing user: id {{ id }}
            </h1>

            <p>
                <strong>Created:</strong> {{ createdTime | fullDate }}
            </p>
            <p>
                <strong>Modified:</strong> {{ modifiedTime | fullDate }}
            </p>

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

            <b-field label="First Name">
                <b-input type="text" v-model="firstName">
                </b-input>
            </b-field>
            
            <b-field label="Last Name">
                <b-input type="text" v-model="lastName">
                </b-input>
            </b-field>

            <b-field label="Email">
                <b-input type="text" v-model="emailAddress">
                </b-input>
            </b-field>

            <b-field label="Phone">
                <b-input type="text" v-model="phoneNumber">
                </b-input>
            </b-field>

            <b-field label="Role">
                <b-input type="text" v-model="userRole">
                </b-input>
            </b-field>
            
            <br/>
            <button class="button is-primary">Save Changes</button>
            <button @click.prevent="closeModal()" class="button is-danger is-outlined">Discard Changes</button>
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
      console.log("clean data", cleanData)
      this.$accountAPI
        .updateAccount(cleanData, this.id)
        .then(() => {
          this.$toast.open({
            duration: 2000,
            message: "Changes saved",
            position: "is-top",
            type: "is-success",
          })
          this.closeModal()
        })
        .catch((err) => {
          console.log("update error")
          console.log(err)
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
    closeModal() {
      this.$emit("exitModal")
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
      return new Date(date).toLocaleDateString("en-US", options)
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
</style>
