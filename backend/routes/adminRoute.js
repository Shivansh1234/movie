const express = require('express');
const { getUserListRequest } = require('../controllers/adminController');
const { adminProtect } = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/info', adminProtect, getUserListRequest);

module.exports = router;
