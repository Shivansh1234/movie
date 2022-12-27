const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const postSchema = new Schema({
    postName: {
        type: String,
        required: true
    },
    postType: {
        type: String,
        required: true
    },
    postDescription: {
        type: String,
        required: true
    },
    postComments: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
module.exports = postSchema;
