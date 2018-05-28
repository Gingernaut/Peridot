<template>
  <div>
     <form @submit.prevent="saveAccountChanges()" id="editAccForm">

        <h1 class="title has-text-centered">
            Editing user: id {{ id }}
        </h1>

        <b-field label="Validated">
            <div class="block">
                <b-radio v-model="isValidated" native-value="true">
                    True
                </b-radio>
                <b-radio v-model="isValidated" native-value="false">
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
</template>

<script>
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
      isValidated: false,
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
    this.isValidated = this.payload.isValidated
    this.userRole = this.payload.userRole
    this.createdTime = this.payload.createdTime
    this.modifiedTime = this.payload.modifiedTime
  },
  beforeMount() {},
  mounted() {},
  computed: {},
  methods: {
    saveAccountChanges() {
      const cleanData = this.$accountAPI.cleanData({
        emailAddress: this.emailAddress,
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        userRole: this.userRole,
        isValidated: this.isValidated,
      })

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
    closeModal() {
      this.$emit("exitModal")
    },
  },
  filters: {},
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
