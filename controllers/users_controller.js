module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: "User Profile"
    })
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
    //To do later
}

//get the login data    
module.exports.create_session = function(req, res){
    //to do later
}

module.exports.posts = function(req, res){
    return res.end('<h1>See the following posts</h1>');
}