const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    
    /*
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
    */

    //better way to write the above code using async await 
    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    
        let users = await User.find({});

        return res.render('home', {
            title: 'Home',
            posts: posts,
            all_users: users
        });
    }catch(err){
        console.log("Error : "+err);
        return;
    }
    
}