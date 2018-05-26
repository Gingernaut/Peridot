<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <b-field label="Email Address">
        <b-input type="email" v-model="emailAddress">
        </b-input>
      </b-field>

      <b-field label="Subject">
        <b-input type="text" v-model="subject">
        </b-input>
      </b-field>

      <b-field label="Message">
        <b-input maxlength="200" type="textarea" v-model="body"></b-input>
      </b-field>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "contact",
  components: {},
  mixins: [],
  data() {
    return {
      emailAddress: null,
      subject: null,
      body: null,
    }
  },
  beforeCreate() {},
  created() {
    this.emailAddress = this.$store.state.account.emailAddress
      ? this.$store.state.account.emailAddress
      : null
  },
  beforeMount() {},
  mounted() {},
  computed: {},
  methods: {
    submitForm: function() {},
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
}
</script>

<style lang="scss" scoped>
text-area {
  width: 100%;
}

form {
  max-width: 700px;
  margin-top: 30px;
}
</style>
