const express = require('express');
const router = express.Router();

// Import model (capitalize model names!)
const Movie = require('../models/movie');
const {json} = require("express");

// Test routes
router.get('/', async (req, res) => {
        try{
            const movie = await Movie.find();
            res.json(movie)
        }catch(err){
            res.status(500).json({message:"Something went wrong"});
        }
});

router.get('/:title', (req, res) => {
    res.send(`The movie title is ${req.params.title}`);
});

// Create movie
router.post('/', async (req, res) => {
    const newMovie = new Movie({
        title: req.body.title,
        genra: req.body.genra
    });

    try {
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
