const express = require('express');
const app = express();
const connectDB = require('./db/db');
const post = require('./models/post.model');
const uploadImage = require('./services/storage.service');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });


// Connect to the database
connectDB();

app.post('/create-post', upload.single("image") ,async (req, res) => {
    try {
        const result = await uploadImage(req.file.buffer);
        const newPost = new post({
            image: result.url,
            caption: req.body.caption
        });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});

module.exports = app;