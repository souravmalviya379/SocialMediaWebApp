const { localsName } = require("ejs")
const User = require("../models/user")

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: "User Profile",
            profile_user: user
        })
    })
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('signUp', {
        title: "Sign Up Page"
    });
}

module.exports.login = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('login', {
        title: 'Login Page'
    });
}

// get the signUp data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){ console.log('Error in finding user in signing up'); return;}       //this msg will be shown when error occurs in database

        if(!user){                      //if user is not found then sign up
            User.create(req.body, function(err, user){
                if(err){console.log('Error in creating user while signing up!'); return;}

                return res.redirect('/users/login');
            })
        }else{
            res.redirect('back');
        }
    })
}

//get the login data    
module.exports.create_session = function(req, res){
    return res.redirect('/');
}

//sign-out
module.exports.destroySession = function(req, res, next){
    // req.logout();   //passport will call this method
    req.logout(function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/');
    })
}

module.exports.update = function(req, res){
     if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
     }else{
        return res.status(401).send('Unauthorized');
     }
}