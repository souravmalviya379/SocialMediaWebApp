const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory || fs.mkdirSync(logDirectory));

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'develpoment',
    asset_path: '/assets',
    session_cookie_key: process.env.SOCIALAPP_SESSION_COOKIE_KEY,
    db: 'socialApp_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SOCIALAPP_GMAIL_USERNAME,
            pass: process.env.SOCIALAPP_GMAIL_PASSWORD,
        },
    },
    google_client_id: process.env.SOCIALAPP_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.SOCIALAPP_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.SOCIALAPP_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.SOCIALAPP_JWT_SECRET,
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.SOCIALAPP_ASSET_PATH,
    session_cookie_key: process.env.SOCIALAPP_SESSION_COOKIE_KEY,
    db: process.env.SOCIALAPP_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SOCIALAPP_GMAIL_USERNAME,
            pass: process.env.SOCIALAPP_GMAIL_PASSWORD,
        },
    },
    google_client_id: process.env.SOCIALAPP_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.SOCIALAPP_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.SOCIALAPP_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.SOCIALAPP_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

// module.exports = eval(process.env.SOCIALAPP_ENVIRONMENT == undefined ? development : eval(process.env.SocialApp_environment));
module.exports = production;