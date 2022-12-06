const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){

    let posts = await Post.find({})
                .sort('-createdAt')
                .populate('user')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user'
                    }
                });     

    return res.status(200).json({
        message: 'List of posts',
        posts: posts
    });
}

module.exports.destroy = async function(req, res){
    console.log(req.params);
    try{
        let id = req.params.id;
        let post = await Post.findById(id);
        console.log(post)
        if(post.user == req.user._id){
            post.remove();

            await Comment.deleteMany({post: id});

            return res.status(200).json({
                message: 'Post and associated comments deleted successfully'
            });
        }else{
            return res.status(401).json({
                message: 'You cannot delete this post'
            })
            
        }
        
    }catch(err){
        console.log('****', err);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}