const nodemailer = require('nodemailer');

module.exports.sendEmail = async (email,title,content) => {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
        // user: 'YOUR_GMAIL_ADDRESS',
        user: process.env.EMAIL_USER,
        // pass: 'YOUR_APP_PASSWORD',
        pass: process.env.EMAIL_PASS
    }
    });

    // Configure the mailoptions object
    const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: title,
    text: content
    };

    // Send the email
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Email sent: ', info.response);
    }
    });

}