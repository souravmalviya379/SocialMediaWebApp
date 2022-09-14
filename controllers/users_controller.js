const User = require("../models/user")

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findOne({id: req.cookies.user_id}, function(err, user){
            if(err){console.log('Error in finding user from cookies'); return;}

            if(user){
                return res.render('user_profile', {
                    title: "User Profile", 
                    user: user
                })
            }
            return res.redirect('/users/login');
        })
    }else{
        res.redirect('/users/login');
    }
}

module.exports.signUp = function(req, res){
    return res.render('signUp', {
        title: "Sign Up Page"
    });
}

module.exports.login = function(req, res){
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
    //find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding the user'); return;}

        //handle the user found
        if(user){
            //check password match or not
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }else{
            return res.redirect('back');
        }
    });
}

module.exports.posts = function(req, res){
    return res.end('<h1>See the following posts</h1>');
}


module.exports.signOut = function(req, res){
    if(req.cookies){
        res.cookie('user_id', "");
    }
    return res.redirect('/users/login');
}