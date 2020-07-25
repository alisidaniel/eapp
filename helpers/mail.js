var mailer = require('nodemailer');
var {EMAIL_PASS, EMAIL_USER} = require('../config/config');

const sendMail = ({receiver,subject,text,html})=>{
    let transporter = mailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS
        }
      });
      
      const mailOptions = {
        from: EMAIL_USER,
        to: receiver,
        subject: subject,
        text: text,
        html: html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('Error occured in send mail ', error.message)
        } else {
          console.log('Email sent to ', info.response)
        }
      });
}

module.exports = {
    sendMail
}