const jwt = require('jsonwebtoken');
const APIError = require('../config/APIError');
const User = require('../models/userModel');

const authorProtect = async (req, res, next) => {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Get token from Header
        token = req.headers.authorization.split(' ')[1];

        // Verify token
        try {
            // Get user from token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            if (req.user.role.includes('AUTHOR')) {
                next();
            } else {
                next(APIError.unauthorized('Unauthorized Author access'));
            }
        } catch (e) {
            next(APIError.unauthorized('Token unformatted'));
            return;
        }
    } else {
        next(APIError.unauthorized('User unauthorized'));
        return;
    }
    if (!token) {
        next(APIError.unauthorized('Unauthorized access, no token'));
    }
};

module.exports = { authorProtect };
