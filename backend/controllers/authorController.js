const Post = require('../models/postModel');
const User = require('../models/userModel');
const APIError = require('../config/APIError');
const APIResponse = require('../config/APIResponse');

// @desc Get Post
// @route GET /api/author/getPost
// @access private
const getPost = async (req, res, next) => {
    const userId = req.user._id;
    const filter = userId;
    const userPosts = await User.findById(filter).populate('posts').select('posts');
    res.send(userPosts);
    next();
};

// @desc Create Post
// @route POST /api/author/createPost
// @access private
const createPost = async (req, res, next) => {
    const postName = req.body.name;
    const postType = req.body.type;
    const createdBy = req.user._id;

    const user = await User.findById(createdBy);
    user.save(async (err) => {
        if (err) {
            next(APIError.notFound('Invalid user'));
        } else {
            const post = await Post.create({
                postName, postType, createdBy: user._id
            });
            user.posts.push(post._id);
            user.save();
            res.status(200).send(APIResponse.created(`${post.postName} - Post created`));
            next();
        }
    });
};

module.exports = { createPost, getPost };
