const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from sub pages of layout
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
    secret: 'blahsomething',
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