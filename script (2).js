// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Initialize Express app
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Define route to handle form submission
app.post('/send-email', (req, res) => {
    // Retrieve form data
    const { name, email, subject, message } = req.body;

    // Create transporter using nodemailer
    const transporter = nodemailer.createTransport({
        service: 'your_email_service_provider', // e.g., 'gmail', 'outlook', etc.
        auth: {
            user: 'your_email@example.com', // Your email address
            pass: 'your_email_password' // Your email password
        }
    });

    // Define email options
    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: 'recipient_email@example.com', // Recipient's email address
        subject: subject,
        html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Subject: ${subject}</p><p>Message: ${message}</p>`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Failed to send message. Please try again later.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Your message has been sent.');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
