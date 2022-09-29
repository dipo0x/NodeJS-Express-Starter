const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')
const seeders = require('../config/seeders.config')

const transporter = nodemailer.createTransport({
    host: seeders.EMAIL_HOST,
    port: seeders.EMAIL_PORT,
    secure: true,
    auth: {
        user: seeders.ADMIN_EMAIL,
        pass: seeders.ADMIN_PASSWORD
    }
});

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./templates/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./templates/'),
};
transporter.use('compile', hbs(handlebarOptions))

module.exports.OTPSender = (theEmail, theToken)=>{
    var mailOptions = {
        from: `"Oladipo Team" <${seeders.ADMIN_EMAIL}>`,
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
    transporter.use('compile', hbs(handlebarOptions))
    var mailOptions = {
        from: `"Boiler Team" <${seeders.ADMIN_EMAIL}>`,
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
    var mailOptions = {
        from: `"Boiler Team" <${seeders.ADMIN_EMAIL}>`,
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
    var mailOptions = {
        from: `"Boiler Team" <${seeders.ADMIN_EMAIL}>`,
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