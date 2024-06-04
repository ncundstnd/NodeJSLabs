const nodemailer = require('nodemailer');

function send(email, password, messageText) {
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'Ignatcov169@gmail.com',
      pass: password
    }
  });

  const mailOptions = {
    from: '<Ignatcov169@gmail.com>',
    to: email,
    subject: 'Registration success',
    html: messageText
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports.send = send;
