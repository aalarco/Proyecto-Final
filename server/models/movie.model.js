const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({

    TMDB: String,
    Title: String,
    year: Number,
    Duration: String,
    Calification: String,
    Genre1: String,
    Genre2: String,
    Genre3: String,
    Genre4: String,
    Genre5: String,
    SubGenre1: String,
    SubGenre2: String,
    SubGenre3: String,
    SubGenre4: String,
    Mood1: String,
    Mood2: String,
    Mood3: String,
    Netflix: String,
    HBO: String,
    Movistar: String,
    Amazon: String,

}, {
    timestamps: true
})

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;