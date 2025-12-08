const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// GET all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET movie by ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Movie not found" });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE movie
router.post('/', async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year
    });

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE movie
router.put('/:id', async (req, res) => {
    try {
        const updated = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Movie not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE movie
router.delete('/:id', async (req, res) => {
    try {
        const removed = await Movie.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ message: "Movie not found" });
        res.json({ message: "Movie deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

