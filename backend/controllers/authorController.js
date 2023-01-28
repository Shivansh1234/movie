const Post = require('../models/postModel');
const User = require('../models/userModel');
const APIError = require('../config/APIError');
const APIResponse = require('../config/APIResponse');

// @desc Get Post
// @route GET /api/author/getPost
// @access private
const getPosts = async (req, res, next) => {
    const userId = req.user._id;
    const filter = userId;
    const userPosts = await User.findById(filter).populate('posts').select('posts');
    res.status(200).send(APIResponse.fetched('User Posts fetched successfully', userPosts.posts));
    next();
};

// @desc Create Post
// @route POST /api/author/createPost
// @access private
const createPost = async (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const createdBy = req.user._id;

    const user = await User.findById(createdBy);
    user.save(async (err) => {
        if (err) {
            next(APIError.notFound('Invalid user'));
        } else {
            const post = await Post.create({
                title, description, createdBy: user._id
            });
            user.posts.push(post._id);
            user.save();
            res.status(200).send(APIResponse.created(`${post.title} - Post created`));
            next();
        }
    });
};

// @desc Delete Post
// @route DELETE /api/author/deletePost
// @access private
const deletePost = async (req, res, next) => {
    const postId = req.params.postId;
    const filter = postId;

    const post = await Post.findByIdAndDelete(filter);
    if (post) {
        res.status(200).send(APIResponse.deleted(`${post.title} - Post deleted`));
        next();
    } else {
        next(APIError.notFound('Error while deleting post'));
    }
};

const getSinglePost = async (req, res, next) => {
    const postId = req.params.postId;
    const filter = postId;
    const post = await Post.findById(filter).populate('createdBy');
    res.send(APIResponse.fetched('Post fetched', post));
    next();
};

module.exports = {
    createPost, getPosts, deletePost, getSinglePost
};
