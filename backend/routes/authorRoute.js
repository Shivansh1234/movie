const express = require('express');
const {
    getPosts, createPost, deletePost, getSinglePost
} = require('../controllers/authorController');

// Middleware
const { authProtect } = require('../middlewares/authMiddleware');
const { roleProtect } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/createPost', authProtect, roleProtect('AUTHOR'), createPost);
router.get('/getPosts', authProtect, roleProtect('AUTHOR'), getPosts);
router.get('/postDetail/:postId', authProtect, roleProtect('AUTHOR'), getSinglePost);
router.delete('/deletePost/:postId', authProtect, roleProtect('AUTHOR'), deletePost);

module.exports = router;
