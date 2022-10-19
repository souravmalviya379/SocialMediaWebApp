const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){
    // Post.find({}, function(err, posts){
    //     if(err){console.log('Error in finding posts in db'); return;}
    //     return res.render('home', {
    //         title: 'Home',
    //         posts: posts
    //     });
    // });

    //populating the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        User.find({}, function(err, users){
            if(err){console.log('Error in db'); return;}
            return res.render('home', {
                title: 'Home', 
                posts: posts,
                all_users: users
            });
        })
        
    });
}