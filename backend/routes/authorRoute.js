const express = require('express');
const { authorRequest, getPost, createPost } = require('../controllers/authorController');
const { authorProtect } = require('../middlewares/authorMiddleware');

const router = express.Router();

router.get('/info', authorProtect, authorRequest);
router.post('/createPost', authorProtect, createPost);
router.get('/getPost', authorProtect, getPost);

module.exports = router;
