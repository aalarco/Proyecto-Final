const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    
    username: String,
    password: String,
    email: String,
    profile_picture: String,
    lists: [{ type: Schema.Types.ObjectId, ref: 'List' }]

}, {
    timestamps: true
})


const User = mongoose.model('User', userSchema)
module.exports = User