const express = require('express');
const { getUserListRequest, userDelete } = require('../controllers/adminController');
const { adminProtect } = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/info', adminProtect, getUserListRequest);
router.delete('/userDelete/:userId', adminProtect, userDelete);

module.exports = router;
