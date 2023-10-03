const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.USER, // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { senderEmail, subject, content } = req.body;
  console.log(senderEmail, content, subject);
  
  var mailOptions = {
    from: senderEmail,
    to: process.env.USER,
    subject: subject,
    html: `

        <h3>Informations</h3>
        <ul>
            <li> Contact email : ${senderEmail}</li>
        </ul>
        <h3>Message</h3>
        <p>${content}</p>
    
    `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!", info);
    }
  });
});

module.exports = { sendEmail };