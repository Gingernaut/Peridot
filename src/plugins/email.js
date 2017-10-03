/*
import axios from 'axios'
import store from '@/index'

const emailFunctions = {
  let helper = require('sendgrid').mail
let fromEmail = new helper.Email(this.emailAddress)
let toEmail = new helper.Email('tylermpeterson36@gmail.com')
let subject = this.subject
let content = new helper.Content('text/plain', this.body)
let mail = new helper.Mail(fromEmail, subject, toEmail, content)

let sg = require('sendgrid')(process.env.SENDGRID_API_KEY)
let request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON()
})

sg.API(request, function (error, response) {
  if (error) {
    console.log('Error response received')
  }
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

}

export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$email', { value: emailFunctions })
  }
}
*/
