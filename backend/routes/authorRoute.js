const express = require('express');
const { getPost, createPost } = require('../controllers/authorController');

// Middleware
const { authProtect } = require('../middlewares/authMiddleware');
const { roleProtect } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/createPost', authProtect, roleProtect('AUTHOR'), createPost);
router.get('/getPost', authProtect, roleProtect('AUTHOR'), getPost);

module.exports = router;
