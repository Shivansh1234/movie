const APIResponse = require('../config/APIResponse');

// @desc Get admin
// @route POST /api/admin/info
// @access private
const sampleAdminRequest = async (req, res, next) => {
    res.status(200).send(APIResponse.fetched('Admin request fetched successfully', req.user));
    next();
};

module.exports = { sampleAdminRequest };
