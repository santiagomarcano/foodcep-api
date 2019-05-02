const nodemailer = require('nodemailer');
const pool = nodemailer.createTransport({
    pool: true,
    host: "mail.privateemail.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

module.exports = pool;