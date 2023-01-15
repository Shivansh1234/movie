const express = require('express');
const { getPost, createPost, deletePost } = require('../controllers/authorController');

// Middleware
const { authProtect } = require('../middlewares/authMiddleware');
const { roleProtect } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/createPost', authProtect, roleProtect('AUTHOR'), createPost);
router.get('/getPosts', authProtect, roleProtect('AUTHOR'), getPost);
router.delete('/deletePost/:postId', authProtect, roleProtect('AUTHOR'), deletePost);

module.exports = router;
