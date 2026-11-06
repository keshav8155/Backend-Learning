const express = require('express');
const app = express();

app.use(express.json()); // middleware to parse JSON bodies

const notes = [];

app.post('/notes', (req, res) => {
    notes.push(req.body);
    res.status(201).json({ message: 'Note added' });
});

app.get('/notes', (req, res) => {
    res.status(200).json({
        message: 'Notes fetched successfully',
        notes: notes
    });
});

app.delete('/notes/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < notes.length) {
        delete notes[index];
        res.status(200).json({ message: 'Note deleted' });
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
});

app.patch('/notes/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const title = req.body.title;
    const description = req.body.description;
    if (index >= 0 && index < notes.length) {
        if (title) {
            notes[index].title = title;
        }
        if (description) {
            notes[index].description = description;
        }
        res.status(200).json({ message: 'Note updated' });
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
});

module.exports = app;