const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({

    TMDB: String,
    Title: String,
    Type: String,
    Trailer_url: String,
    Calification: Number,
    Duration: String,
    Genre1: String,
    Genre2: String,
    Genre3: String,
    Genre4: String,
    Genre5: String,
    SubGenre1: String,
    SubGenre2: String,
    SubGenre3: String,
    SubGenre4: String,
    SubGenre5: String,
    Theme1: String,
    Theme2: String,
    Theme3: String,
    Theme4: String,
    Theme5: String,
    Theme6: String,
    Mood1: String,
    Mood2: String,
    Mood3: String,
    Mood4: String,
    Mood5: String,
    Keyword1: String,
    Keyword2: String,
    Keyword3: String,
    Keyword4: String,
    Keyword5: String,
    Keyword6: String,
    Keyword7: String,
    Keyword8: String,
    Keyword9: String,
    Keyword10: String,
    Flag1: String,
    Flag2: String,
    Flag3: String,
    Flag4: String,
    Flag5: String,
    Stream1: String,
    Stream2: String,
    Stream3: String,
    Stream4: String,
    Stream5: String,
    Rent1: String,
    Rent2: String,
    Rent3: String,
    Rent4: String,
    Rent5: String,

}, {
    timestamps: true
})

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;