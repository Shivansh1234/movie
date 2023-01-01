const express = require('express');
const { sampleAdminRequest } = require('../controllers/adminController');
const { adminProtect } = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/info', adminProtect, sampleAdminRequest);

module.exports = router;
