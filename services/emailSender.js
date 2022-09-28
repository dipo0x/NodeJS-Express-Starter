const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD
    }
});

module.exports.OTPSender = (theEmail, theToken)=>{
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./emails/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./emails/'),
    };
    transporter.use('compile', hbs(handlebarOptions))

    var mailOptions = {
        from: `"Oladipo Team" <${process.env.ADMIN_EMAIL}>`,
        to: theEmail,
        subject: "Boilerplate Login OTP",
        template: 'otp',
        context:{
            theToken: theToken,
            theEmail:theEmail
        }
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){return console.log(error)}else{}
    })
}

module.exports.errorNotifier = (theEmail, errorStack)=>{
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./emails/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./emails/'),
    };
    transporter.use('compile', hbs(handlebarOptions))
    var mailOptions = {
        from: `"Boiler Team" <${process.env.ADMIN_EMAIL}>`,
        to: theEmail,
        subject: "Urgent: Boilerplate Server Error",
        template: 'serverError',
        context:{
            errorStack:errorStack
        }
    };
    transporter.sendMail(mailOptions, function(error, info){    
        if(error){return console.log(error)}else{
        }
        ////IF AN ERROR OCCURS WHEN SENDING ERROR NOTIFICATION TO SERVER ADMIN, CALL ON JESUS AT THIS POINT
    })
}

module.exports.resetPasswordEmailSender = (theEmail, theToken)=>{
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./emails/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./emails/'),
    };
    transporter.use('compile', hbs(handlebarOptions))
    var mailOptions = {
        from: `"Boiler Team" <${process.env.ADMIN_EMAIL}>`,
        to: theEmail,
        subject: "Reset Password OTP",
        template: 'resetPasswordOTP',
        context:{
            theToken: theToken,
            theEmail:theEmail
        }
    };
    transporter.sendMail(mailOptions, function(error, info){    
        if(error){return console.log(error)}else{
        }
    })
}

module.exports.newPassWordNotifier = (theEmail)=>{
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./emails/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./emails/'),
    };
    transporter.use('compile', hbs(handlebarOptions))
    var mailOptions = {
        from: `"Boiler Team" <${process.env.ADMIN_EMAIL}>`,
        to: theEmail,
        subject: "Your password was changed",
        template: 'newPassWordNotifier',
        context:{
            theEmail:theEmail
        }
    };
    transporter.sendMail(mailOptions, function(error, info){    
        if(error){return console.log(error)}else{
        }
    })
}