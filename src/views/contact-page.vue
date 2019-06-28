<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <b-field label="Email Address">
        <b-input v-model="emailAddress" type="email" />
      </b-field>

      <b-field label="Subject">
        <b-input v-model="subject" type="text" />
      </b-field>

      <b-field label="Message">
        <b-input v-model="body" maxlength="200" type="textarea" />
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
  name: "Contact",
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
    this.emailAddress = this.$store.get("account.emailAddress")
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
