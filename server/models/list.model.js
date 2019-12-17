const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const movieId = require("./movie.model")

const listSchema = new Schema({
    listName: String,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
}, {
        timestamps: true

    })

const List = mongoose.model('List', listSchema)
module.exports = List