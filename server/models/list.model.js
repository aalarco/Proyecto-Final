const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    listName: String,
    creator: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
}, {
     timestamps:
    {
         createdAt: 'created_at',
         updatedAt: 'updated_at'
    }
    }
)

const List = mongoose.model('List', listSchema)
module.exports = List