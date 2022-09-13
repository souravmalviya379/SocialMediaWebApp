module.exports.profile = function(req, res){
    return res.render('profile', {
        title: "User Profile"
    })
}

module.exports.posts = function(req, res){
    return res.end('<h1>See the following posts</h1>');
}