import nodemailer from 'nodemailer';

export const sendConfirmationEmail = async (to, name) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"iGaming Afrika Summit" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject: 'Thank you for registering!',
    html: `
      <p>${name},</p>
      <p>Thank you for registering your interest in iGaming Afrika Summit 2026. You will be the first to know when registration opens and any other relevant updates about the event.</p>
      <p>If you'd like to find out more about all things iGaming Afrika Summit, please visit our website <a href="https://summits.igamingafrika.com" target="_blank">here</a>.</p>
      <p>We look forward to seeing you next year!</p>
      <p>The iGaming Team</p>
    `,
  };  

  await transporter.sendMail(mailOptions);
};
