import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: true,
  auth: {
    user: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
    pass: process.env.NODE_CODE_SENDING_EMAIL_PASSWORD,
  },
});

export default transport;
