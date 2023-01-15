const APIError = require('../config/APIError');

const roleProtect = (roles) => async (req, res, next) => {
    try {
        if (req.user.role.includes(roles)) {
            next();
        } else {
            next(APIError.unauthorized('Unauthorized Author access'));
        }
    } catch (e) {
        next(APIError.unauthorized('User cannot be verified'));
    }
};

module.exports = { roleProtect };
