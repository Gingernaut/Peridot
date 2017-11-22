
const config = require('@@config/oracle')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(config['SENDGRID_API_KEY'])

function emailFunctions () {
  return {
    sendSelfEmail: function (sender, title, message) {
      let msg = {
        to: config['RECIEVING_EMAIL'],
        from: sender,
        subject: 'Message: ' + title,
        text: message
      }
      sgMail.send(msg)
    }
  }
}

export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$email', { value: emailFunctions() })
  }
}
