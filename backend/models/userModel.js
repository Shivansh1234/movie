const mongoose = require('mongoose');
const postSchema = require('./postModel');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    role: {
        type: [String],
        enum: ['USER', 'AUTHOR', 'ADMIN'],
        default: 'USER'
    },
    posts: [postSchema]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
