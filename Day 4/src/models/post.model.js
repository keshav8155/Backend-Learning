const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image : String,
    caption : String
});

const post = mongoose.model('Post', postSchema);

module.exports = post;