require('dotenv').config();
const nodemailer = require('nodemailer');

// Create transporter
let transporter = nodemailer.createTransport({
  service: 'gmail', // or another SMTP service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Create email
// Example questions
const questions = [
  {
    question: "What is the capital of France?",
    options: ["A) Paris", "B) London", "C) Rome", "D) Berlin"]
  },
  {
    question: "2 + 2 = ?",
    options: ["A) 3", "B) 4", "C) 5", "D) 22"]
  }
];

// Build HTML for email
let htmlBody = `
  <h2>SpacedPeel Quiz</h2>
  <p>Please reply to this email with your answers (e.g., Q1:A, Q2:B).</p>
`;

questions.forEach((q, index) => {
  htmlBody += `<p><strong>Q${index + 1}: ${q.question}</strong><br>`;
  q.options.forEach(option => {
    htmlBody += `${option}<br>`;
  });
  htmlBody += `</p>`;
});

// Define email options
let mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'justin.cockrell1@gmail.com', // replace with your teacher's email
  subject: 'Test Email from SpacedPeel',
  html: htmlBody,
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});