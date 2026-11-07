const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://keshav:rbbiclXocxNbxbHs@cluster0.vq8wnvj.mongodb.net/day-3';

async function connectDB() {
    try {
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectDB;