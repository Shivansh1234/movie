const express = require('express');
const { userRegister, userLogin, userInfo } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/info', protect, userInfo);

module.exports = router;
