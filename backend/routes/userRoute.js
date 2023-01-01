const express = require('express');
const { userRegister, userLogin, userInfo } = require('../controllers/userController');
const { authProtect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/info', authProtect, userInfo);

module.exports = router;
