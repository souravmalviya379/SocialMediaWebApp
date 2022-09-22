const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy(
    {
    usernameField: 'email'
    }, 
    function(email, password, done){
        //find a user and establish the identity
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding user --> passport');
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid username or password');
                return done(null, false);   //authentication is false and no errror
            }
            return done(null, user);
        })
    }
));

//serializing the user to decide which key need to be kept in cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
})


//deserialize the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding the user');
            return done(err);
        }
        return done(null, user);
    })
});

passport.checkAuthentication = function(req, res, next){
    //if user is signed in, then pass the request to the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in 
    return res.redirect('/users/login')
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending
        // this to locals for the views and we will be able to access the user in the profile page
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;