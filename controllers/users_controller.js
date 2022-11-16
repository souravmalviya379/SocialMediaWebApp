const { localsName } = require("ejs")
const User = require("../models/user")
const path = require('path');
const fs = require('fs');

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
                
                req.flash('success', 'You registered successfully !!');
                return res.redirect('/users/login');
            })
        }else{
            req.flash('error', 'Error in Signup');
            res.redirect('back');
        }
    })
}

//get the login data    
module.exports.create_session = function(req, res){
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

//sign-out
module.exports.destroySession = function(req, res, next){
    // req.logout();   //passport will call this method
    req.logout(function(err){
        if(err){
            return next(err);
        }
        req.flash('success', 'You have logged out');
        return res.redirect('/');
    })
}

module.exports.update = async function(req, res){
    //  if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         req.flash('success', 'User details updated successfully !!')
    //         return res.redirect('back');
    //     });
    //  }else{
    //     req.flash('error', 'Unauthorized!');
    //     return res.status(401).send('Unauthorized');
    //  }

    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){console.log('***Multer Error : ', err);}

                user.fname = req.body.fname;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname + '..' + user.avatar));
                    }

                    //this is saving the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        }catch(err){
            req.flash('err', err);
            return res.redirect('back');
        }
    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}