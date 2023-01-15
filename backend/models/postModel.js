const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const postSchema = new Schema({
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    title: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
