const User = require('../models/userModel');

// @desc Get admin
// @route POST /api/admin/info
// @access private
const sampleAdminRequest = async (req, res, next) => {
    // Frontend req
    const cursorId = req.query.cursorId;
    const cursorDir = req.query.cursorDir;
    const pageSize = parseInt(req.query.limit, 10);

    let filter = {};
    const totalCount = await User.find(filter).count();

    let prevPage = '';
    let nextPage = '';

    if (cursorDir === '') {
        const users = await User.find(filter).limit(pageSize);
        if (totalCount <= pageSize) {
            nextPage = '';
            prevPage = '';
        } else {
            nextPage = users[users.length - 1]._id;
            prevPage = '';
        }
        const resp = {
            users, nextPage, prevPage, totalCount
        };
        res.status(200).send(resp);
        next();
    } else if (cursorDir === 'next') {
        filter = { _id: { $gt: cursorId } };
        const users = await User.find(filter).limit(pageSize);
        if (totalCount <= pageSize) {
            nextPage = '';
            prevPage = users[users.length - 1]._id;
        } else {
            nextPage = users[users.length - 1]._id;
            prevPage = users[0]._id;
        }
        const resp = {
            users, nextPage, prevPage, totalCount
        };
        res.status(200).send(resp);
        next();
    } else {
        filter = { _id: { $lt: cursorId } };
        const users = await User.find(filter).sort({ _id: -1 }).limit(pageSize);
        users.reverse();
        if (totalCount <= pageSize) {
            nextPage = users[users.length - 1]._id;
            prevPage = '';
        } else {
            nextPage = users[users.length - 1]._id;
            prevPage = users[0]._id;
        }
        const resp = {
            users, nextPage, prevPage, totalCount
        };
        res.status(200).send(resp);
        next();
    }
};

module.exports = { sampleAdminRequest };
