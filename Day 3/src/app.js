const express = require('express');
const connectDB = require('./db/db');
const noteModel = require('./models/notes.model');

const app = express();
app.use(express.json());

app.get('/notes', async (req, res) => {
    try {
        const notes = await noteModel.find();
        res.status(200).json({
            message: 'Notes retrieved successfully',
            notes: notes
        }); 
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving notes',
            error: error.message
        });
    }
});

app.post('/notes', async (req, res) => {
    try {
        const data = req.body;
        await noteModel.create({
            title: data.title,
            description: data.description
        });
        res.status(201).json({ message: 'Note created successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating note',
            error: error.message
        });
    }   
        })
    
app.delete('/notes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await noteModel.findOneAndDelete({ _id: id });
        res.status(200).json({ message: 'Note deleted successfully' });     
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting note',
            error: error.message
        });
    }
        })
    
app.patch('/notes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await noteModel.findOneAndUpdate({ _id: id }, { title: data.title, description: data.description });
        res.status(200).json({ message: 'Note updated successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating note',
            error: error.message
        });
    }
});

connectDB();

module.exports = app;