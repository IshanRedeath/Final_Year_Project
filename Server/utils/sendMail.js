const nodemailer = require("nodemailer");

// Create a transporter using hMailServer (localhost SMTP)
const transporter = nodemailer.createTransport({
  host: "localhost", // hMailServer runs on localhost
  port: 25, // Default SMTP port for hMailServer
  secure: false, // No SSL/TLS for localhost
  auth: {
    user: "user1@localhost", // Your hMailServer email
    pass: "user1", // Email account password
  },
  tls: {
    rejectUnauthorized: false, // Accept self-signed certificates
  },
});

// Define the email options
const mailOptions = {
  from: '"User1" <user1@localhost>',
  to: "admin@localhost", // Receiver email
  subject: "Test Email from Nodemailer",
  text: "Hello! This is a test email from Nodemailer and hMailServer.",
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent successfully:", info.response);
  }
});
