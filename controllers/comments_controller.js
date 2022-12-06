const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();        //it is necessary to tell the mongodb to save the changes
            
            comment = await comment.populate('user');
            commentsMailer.newComment(comment);

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment
                    }, 
                    message: 'Comment created!'
                })
            }

            req.flash('success', 'Comment added !!');
            return res.redirect('/');
        }
    } catch (err) {
        console.log('Error : '+ err);
    }
}


module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (comment.user == req.user.id) {
            let postId = comment.post;

            comment.remove();
            //removing comment reference from post (comment array in post)
            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
                
                req.flash('success', 'Comment deleted !!');
                return res.redirect('back');
            });
        } else {    
            return res.redirect('back');
        }

    })
}
