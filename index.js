const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const app = express();
require('./config/view-helpers')(app);
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware')
const flash = require('connect-flash');
const flashMiddleware = require('./config/flash_middleware');
const path = require('path');

app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css' 
}));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname ,env.asset_path)));
//make the uploads path available to the browser    
app.use('/uploads', express.static('__dirname'+'/uploads')); 

app.use(logger(env.morgan.mode, env.morgan.options))

app.use(expressLayouts);
//extract style ad scripts from sub pages of layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);     

//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in the db
// to use this require express-session
app.use(session({
    name: 'SocialApp',
    //TODO change in secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongoUrl: 'mongodb://localhost/socialApp_development',
            autoRemove: 'disabled'
        }, 
        function(err){
            console.log(err || 'connect - mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//put this after the session as it use session and cookies
app.use(flash());
app.use(flashMiddleware.setFlash);

//use express router
app.use('/', require('./routes'))

app.get('/', (req, res)=>{
    res.send("<h1>Welcome to Express Application</h1>")
})

app.listen(port, (err)=>{
    if(err){
        console.log('Cannot start server');
    }else{
        console.log('Server running at port : ', port);
    }
})