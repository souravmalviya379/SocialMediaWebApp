const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment')

let transporter = nodemailer.createTransport(env.smtp);

let renderTemaplate = (data, relativePath)=> {
    let mailHTML;
    ejs.renderFile(
        //relativPath is the place from where this function is called
        path.join(__dirname, '../views/mailers', relativePath),
        data, function(err, template){
            if(err){console.log('Error in rendering template :', err); return;}
            
            mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemaplate: renderTemaplate
}
