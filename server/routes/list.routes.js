const express = require('express')
const router = express.Router()

const List = require('../models/list.model')
const Movie = require('../models/movie.model')


router.post('/newList', (req, res) => {
    const { listName, movies } = req.body.movielist
    const creator = req.user._id

    List.create({ listName, movies, creator })
        .then(theNewList => {
            //console.log(theNewList)
            res.json(theNewList)
        })
        .catch(err => console.log('DB error', err))
})


router.get('/getAllLists', (req, res) => {
    List.find()
        .then(allLists => res.json(allLists))
        .catch(err => console.log('DB error', err))
})


// router.post('/addMovie', (req, res) => {
//     const listId = req.body._id
//     const addNewMovie = 

//     List.findByIdAndUpdate(listId), { $push: { movies: "5df0d1fe010223bb5c536f1c"}}
//         .then(addMovie => {
//             res.json(addMovie)
//         })
//         .catch(err => console.log('DB error', err))
// })


router.get('/addListToUser', (req, res) => {
    const userId = req.user._id
    const listId = req.body_id

    User.findByIdAndUpdate(userId, { $push: { lists: listId } })
        .then(addList => { res.json(addList) })
        .catch(err => console.log('DB error', err))

})

router.post('/addMovieToList', (req, res) => {
     const listId = req.body.listId
     const movieId = req.body.movieId


    console.log("id de la listaa", listId, "id de la peli", movieId)

    List.findByIdAndUpdate(listId, { $push: { movies: movieId } })
        .then(addMovie => { res.json(addMovie) })
        .catch(err => console.log('DB error', err))
})




router.get(`/getAllListsFromUser/:userId`, (req, res) => {
    console.log(req.params.userId)
    List.find({ "creator": req.params.userId })
        .then(lists => { res.json(lists) })
        .catch(err => console.log('DB error', err))

})






module.exports = router