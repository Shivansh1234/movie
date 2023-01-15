const express = require('express');
const { getUserListRequest, userDelete } = require('../controllers/adminController');

// Middleware
const { authProtect } = require('../middlewares/authMiddleware');
const { roleProtect } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/info', authProtect, roleProtect('ADMIN'), getUserListRequest);
router.delete('/userDelete/:userId', authProtect, roleProtect('ADMIN'), userDelete);

module.exports = router;
