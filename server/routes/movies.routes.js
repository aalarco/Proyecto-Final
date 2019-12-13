const express = require('express')
const router = express.Router()

const Movie = require('../models/movie.model')


// const APIHandler = require('../services/moviesApi.service')
// const moviesAPI = new APIHandler(`https://api.themoviedb.org/3`)
// const User = require('../models/user.model')



router.get('/getAllMovies', (req, res) => {
    Movie.find()
        .then(allMovies => res.json(allMovies))
        .catch(err => console.log('DB error', err))
})

router.get('/:id', (req, res) => {
    const movieId = req.params.id
    Movie.findById(movieId)
        .then(theMovie => res.json(theMovie))
        .catch(err => console.log('DB error', err))
})




module.exports = router