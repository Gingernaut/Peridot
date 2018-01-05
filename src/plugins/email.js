// adds 0.8MB to webpack build??
// const config = require('@@/config/oracle')
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(config.SENDGRID_API_KEY)

const emailFunctions = {
  sendEmail: function (emailAddr, subject, message) {
    // const msg = {
    //   to: config.RECIEVING_EMAIL,
    //   from: emailAddr,
    //   subject: subject,
    //   text: message
    // }
    // sgMail.send(msg)
  }
}

export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$email', { value: emailFunctions })
  }
}
