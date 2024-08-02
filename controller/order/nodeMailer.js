let nodemailer = require('nodemailer');
const dotenv = require('dotenv');


let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD,
    },
    // tls: {
    //     rejectUnauthorized: false
    // }
});

let mailOptions = {
    from: "the best in the world",
    to: process.env.REMAIL,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};


// transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });
const SENDMAIL = async (mailDetails, callback) => {
    try {
        const info = await transporter.sendMail(mailDetails);
        callback(info);
    } catch (error) {
        throw error;
    }
};

module.exports = SENDMAIL;