const nodemailer = require('nodemailer');

const sendPasswordResetEmail = async (toEmail, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your system email
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const resetUrl = `http://localhost:3000/reset-password/${token}`; // Adjust URL as needed

  const mailOptions = {
    from: 'no-reply@yourdomain.com',  // Your system email
    to: toEmail,                      // Dynamic email of the user
    subject: 'Password Reset Request',
    text: `You requested a password reset. Please visit the following link to reset your password: ${resetUrl}`,
    html: `<p>You requested a password reset. Please visit the following link to reset your password:</p>
           <a href="${resetUrl}">${resetUrl}</a>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetEmail };
