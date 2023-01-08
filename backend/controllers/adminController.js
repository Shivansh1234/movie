const User = require('../models/userModel');
const APIResponse = require('../config/APIResponse');

// @desc Get admin
// @route POST /api/admin/info
// @access private
const getUserListRequest = async (req, res, next) => {
    // Frontend req
    const cursorId = req.query.cursorId;
    const cursorDir = req.query.cursorDir;
    const searchVal = req.query.search;
    const pageSize = parseInt(req.query.limit, 10);

    const sortOrder = { _id: 1 };
    let filter = {};
    if (searchVal.length) {
        filter = { email: { $regex: searchVal } };
    }
    const totalCount = await User.find(filter).count();

    let prevPage = '';
    let nextPage = '';
    let data = null;
    let metaData = null;

    if (cursorDir === '') {
        const users = await User.find(filter).sort(sortOrder).limit(pageSize);
        if (totalCount <= pageSize) {
            nextPage = '';
            prevPage = '';
        } else {
            nextPage = users[users.length - 1]._id;
            prevPage = '';
        }

        // Defining response
        data = users;
        metaData = {
            page: {
                nextPage, prevPage, totalCount
            }
        };
        res.status(200).send(APIResponse.fetched('User data fetched successfully', data, metaData));
        next();
    } else if (cursorDir === 'next') {
        filter = { _id: { $gt: cursorId }, email: { $regex: searchVal } };
        const users = await User.find(filter).sort(sortOrder).limit(pageSize);
        if (totalCount <= pageSize) {
            nextPage = '';
            prevPage = users[users.length - 1]._id;
        } else {
            nextPage = users[users.length - 1]._id;
            prevPage = users[0]._id;
        }
        // Defining response
        data = users;
        metaData = {
            page: {
                nextPage, prevPage, totalCount
            }
        };
        res.status(200).send(APIResponse.fetched('User data fetched successfully', data, metaData));
        next();
    } else {
        filter = { _id: { $lt: cursorId }, email: { $regex: searchVal } };
        const users = await User.find(filter).sort({ _id: -1 }).limit(pageSize);
        users.reverse();
        if (totalCount <= pageSize) {
            nextPage = users[users.length - 1]._id;
            prevPage = '';
        } else {
            nextPage = users[users.length - 1]._id;
            prevPage = users[0]._id;
        }
        // Defining response
        data = users;
        metaData = {
            page: {
                nextPage, prevPage, totalCount
            }
        };
        res.status(200).send(APIResponse.fetched('User data fetched successfully', data, metaData));
        next();
    }
};

const userDelete = async (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId);
    const filter = userId;
    const user = await User.findByIdAndDelete(filter);
    res.send('user');
};

module.exports = { getUserListRequest, userDelete };
