require('dotenv').config();
const nodemailer = require('nodemailer');

const questions = require("./server/data/questions.json")

// Create transporter
let transporter = nodemailer.createTransport({
  service: 'gmail', // or another SMTP service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Create email
const email = process.argv[2];
const questionIndex = process.argv[3];
const API_URL = process.env.API_URL

// Build HTML for email
let htmlBody = `
  <h2>Here's your Banana 🍌</h2>
  <a href="${API_URL}/response/${questionIndex}"><button>Answer</button></a>
`;



// Define email options
let mailOptions = {
  from: process.env.EMAIL_USER,
  to: email, // replace with your teacher's email
  subject: "New Banana from SpacedPeel 🍌",
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