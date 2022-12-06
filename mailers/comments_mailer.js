const nodemailer = require('../config/nodemailer');


//this is another way of exporting method
exports.newComment = (comment) => {
    console.log('Inside newComment mailer', comment);

    nodemailer.transporter.sendMail({
        from: 'programmeriam33@gmail.com',
        to: comment.user.email,
        subject: 'New Comment published',
        html: "<h1>Yup, your comment is now published!</h1>"
    }, (err, info)=>{
        if(err){
            console.log('Error in sending mail : ', err);
            return;
        }

        console.log('Message sent : ', info);
        return;
    })
}