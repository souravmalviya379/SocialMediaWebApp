const Post = require('../models/post');

module.exports.home = function(req, res){
    // Post.find({}, function(err, posts){
    //     if(err){console.log('Error in finding posts in db'); return;}
    //     return res.render('home', {
    //         title: 'Home',
    //         posts: posts
    //     });
    // });

    //populating the user
    Post.find({}).populate('user').exec(function(err, posts){
        if(err){console.log('Error in db'); return;}
        return res.render('home', {
            title: 'Home', 
            posts: posts
        });
    });
}