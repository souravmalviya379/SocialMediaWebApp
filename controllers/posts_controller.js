const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        post = await post.populate('user');
        
        if(req.xhr){     //checking if the request is of type ajax
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post Created !'
            })
        }
        
        req.flash('success', 'Post published!');
        return res.redirect('back');
    } 
    catch (error) {
        req.flash('error', error);
        console.log('Error : ', error)
    }

}

module.exports.destroy = async function (req, res) {

    try {
        // console.log(req.user.id)
        let post_id = req.params.id;
        let post = await Post.findById(post_id);
        
        if (post.user == req.user.id) {
            // console.log(post)
            post.remove();
            await Comment.deleteMany({ post: post_id });

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id
                    },
                    message: 'Post deleted !'
                })
            }

            req.flash('success', 'Post and associated comments deleted!');
            return res.redirect('back');
        } 
            else {
            req.flash('error', 'You cannot delete this post')
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error : ' + err);
    }

    /*
    Post.findById(req.params.id, function(err, post){
        if(err){console.log('Error in fetching post from db'); return;}

        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
    */
}