const express = require('express')
const router = express.Router()

const Movie = require('../models/movie.model')


// const APIHandler = require('../services/moviesApi.service')
// const moviesAPI = new APIHandler(`https://api.themoviedb.org/3`)
// const User = require('../models/user.model')



router.get('/getAllMovies', (req, res) => {
    Movie.find()
        .limit(100)
        .then(allMovies => res.json(allMovies))
        .catch(err => console.log('DB error', err))
})

router.get('/:id', (req, res) => {
    const movieId = req.params.id
    Movie.findById(movieId)
        .then(theMovie => res.json(theMovie))
        .catch(err => console.log('DB error', err))
})

router.post('/getMoviesByGenre', (req, res) => {
    const { genre } = req.body
    console.log(genre)
    Movie.find({
        $or: [
            { 'Genre1': genre },
            { 'Genre2': genre },
            { 'Genre3': genre },
            { 'Genre4': genre }
        ]
    })
        .then(allMoviesByGenre => res.json(allMoviesByGenre))
        .catch(err => console.log('DB error', err))
})

router.post('/getMoviesBySubGenre', (req, res) => {
    const { subgenre } = req.body
    Movie.find({
        $or: [
            { 'SubGenre1': subgenre },
            { 'SubGenre2': subgenre },
            { 'SubGenre3': subgenre },
            { 'SubGenre4': subgenre }
        ]
    })
        .then(allMoviesBySubGenre => res.json(allMoviesBySubGenre))
        .catch(err => console.log('DB error', err))
})

router.post('/getMoviesByMood', (req, res) => {
    const { mood } = req.body
    Movie.find({
        $or: [
            { 'Mood1': mood },
            { 'Mood2': mood },
            { 'Mood3': mood },
            { 'Mood4': mood }
        ]
    })
        .then(allMoviesByMood => res.json(allMoviesByMood))
        .catch(err => console.log('DB error', err))
})



module.exports = router