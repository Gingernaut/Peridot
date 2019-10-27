<template>
  <div class="container is-fluid">
    <form v-if="!sentMessage" class="is-centered" @submit.prevent="submitForm">
      <h1 class="is-size-3">Have a question or comment?</h1>
      <br >
      <p class="is-size-5">Reach out and we'll get back to you soon.</p>
      <br >
      <br >
      <b-field label="Email Address">
        <b-input v-model="fromEmail" type="email" />
      </b-field>

      <b-field label="Subject">
        <b-input v-model="subject" type="text" />
      </b-field>

      <b-field label="Message">
        <b-input v-model="body" maxlength="500" type="textarea" />
      </b-field>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary">Submit</button>
        </div>
      </div>
    </form>
    <div v-if="sentMessage" id="message-sent">
      <h1 class="title">Your message has been sent</h1>
      <br >
      <p>Thanks for reaching out. We'll get back to you as soon as we can.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",
  components: {},
  mixins: [],
  data() {
    return {
      fromEmail: null,
      subject: null,
      body: null,
      sentMessage: false,
    }
  },
  beforeCreate() {},
  created() {
    this.fromEmail = this.$store.get("account.emailAddress")
  },
  beforeMount() {},
  mounted() {},
  computed: {},
  methods: {
    submitForm: function() {
      this.$accountAPI
        .sendEmailToSiteAdmin({
          fromEmail: this.fromEmail,
          subject: this.subject,
          body: this.body,
        })
        .then(() => {
          this.sentMessage = true
          this.$buefy.toast.open({
            duration: 2000,
            message: "Message sent",
            position: "is-top",
            type: "is-info",
          })
        })
    },
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
}

text-area {
  width: 100%;
}

form {
  width: 40%;
  min-width: 400px;
  margin-top: 30px;
}

#message-sent {
  padding: 30px;
}
</style>
