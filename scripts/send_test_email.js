import 'dotenv/config';
import nodemailer from 'nodemailer';

async function sendTest() {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: 'nigelmurfet@gmail.com',
    subject: 'Maddie Rose Studio — test email',
    text: 'This is a test email from the Maddie Rose Studio site. If you received this, SMTP is configured correctly.',
  });

  console.log('Message sent:', info.messageId);
}

sendTest().catch(err => {
  console.error('Send failed:', err);
  process.exit(1);
});
