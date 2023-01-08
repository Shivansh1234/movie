const express = require('express');
const { authorRequest, createPost } = require('../controllers/authorController');
const { authorProtect } = require('../middlewares/authorMiddleware');

const router = express.Router();

router.get('/info', authorProtect, authorRequest);
router.post('/createPost', authorProtect, createPost);

module.exports = router;
