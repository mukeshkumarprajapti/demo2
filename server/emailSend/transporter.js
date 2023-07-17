 const nodemailer = require("nodemailer");


 const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: true,
  auth: {
      user: 'prajaptimukesh770@gmail.com',
      pass: 'qqkgmgganwolbduj'
  }
});

  module.exports = transporter;


  //  git pull --rebase