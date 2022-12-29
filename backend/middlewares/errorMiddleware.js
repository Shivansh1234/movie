const APIError = require('../config/APIError');

const errorHandler = (err, req, res, next) => {
    if (err instanceof APIError) {
        res.status(err.code).json(err);
        next();
        return;
    }
    res.status(500).json('Somethign went wrong');
};

module.exports = errorHandler;
