 const nodemailer = require("nodemailer");


 const transporter = nodemailer.createTransport({
  host: 'smtp.forwardemail.net',
  port: 465,
  secure: false,
  auth: {
      user: 'mukeshkumarprajapati666@gmail.com',
      pass: '77008075'
  }
});

  module.exports = transporter;


  //  git pull --rebase