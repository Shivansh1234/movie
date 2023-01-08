const Post = require('../models/postModel');
const User = require('../models/userModel');
// @desc Get author
// @route POST /api/author/info
// @access private
const authorRequest = async (req, res, next) => {
    res.send('Author');
    next();
};

const createPost = async (req, res, next) => {
    const postName = req.body.title;
    const postType = req.body.type;
    const createdBy = req.body.createdBy;

    const user = await User.findById(createdBy);
    user.save(async (err) => {
        if (err) {
            console.log(err);
        } else {
            const post = await Post.create({
                postName, postType, createdBy: user._id
            });

            user.posts.push(post._id);
            user.save();
        }
    });
    res.send('Oks');
    next();
};

module.exports = { authorRequest, createPost };
