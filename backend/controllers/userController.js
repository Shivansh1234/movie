const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const APIError = require('../config/APIError');
const APIResponse = require('../config/APIResponse');
const User = require('../models/userModel');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
});

// @desc Register user
// @route POST /api/user/register
// @access public
const userRegister = async (req, res, next) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const isAdmin = false;

    // Check if form is incomplete
    if (!fname || !lname || !email || !password) {
        next(APIError.badRequest('User data incomplete'));

        // Check if user with email Id already exists
    } else if (await User.findOne({ email })) {
        next(APIError.conflict('User with email already exists'));
    } else {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        await User.create({
            fname, lname, email, password: hashedPassword, isAdmin
        });
        res.status(201).send(APIResponse.created('User Registered'));
    }
};

// @desc Authenticate user
// @route POST /api/users/login
// @access public
const userLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // Check for user email
    const filter = { email };
    const user = await User.findOne(filter).select('+password');
    if (user && (await (bcrypt.compare(password, user.password)))) {
        const token = generateToken(user._id);
        const role = user.isAdmin;
        const response = { token, role };
        res.status(200).send(APIResponse.fetched('Login successfully', response));
    } else {
        next(APIError.unauthorized('Invalid credentials'));
    }
};

// @desc Get user
// @route POST /api/users/info
// @access private
const userInfo = async (req, res, next) => {
    res.status(200).send(APIResponse.fetched('User fetched successfully', req.user));
    next();
};

const sampleDataInsert = async (req, res) => {
    for (let k = 1; k < 5; k++) {
        const fname = 'shivansh';
        const lname = fname;
        const email = fname + k;
        const password = fname;
        const isAdmin = true;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        await User.create({
            fname, lname, email, password: hashedPassword, isAdmin
        });
    }
    res.send('ok');
};

module.exports = { userRegister, userLogin, userInfo, sampleDataInsert };
