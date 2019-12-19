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




// router.get('/addListToUser', (req, res) => {
//     const userId = req.user._id
//     const listId = req.body._id

//     User.findByIdAndUpdate(userId, { $push: { lists: listId } })
//         .then(addList => { res.json(addList) })
//         .catch(err => console.log('DB error', err))

// })

router.post('/addMovieToList', (req, res) => {
     const listId = req.body.listId
     const movieId = req.body.movieId


    //console.log("id de la listaa", listId, "id de la peli", movieId)

    List.findByIdAndUpdate(listId, { $push: { movies: movieId } })
        .then(addMovie => { res.json(addMovie) })
        .catch(err => console.log('DB error', err))
})




router.get(`/getAllListsFromUser/:userId`, (req, res) => {
    console.log(req.params.userId)
    List.find({ creator: req.params.userId })
        .then(lists => { res.json(lists) })
        .catch(err => console.log('DB error', err))

})

router.get('/getUserLists', (req, res)=> {
    const userId = req.user._id
    console.log('-------HOLA--------',userId)
    List.find({ creator: userId })
        .populate('movies')
        .then(listCreator => {res.json(listCreator)})
        .catch(err => console.log('DB error', err))
})





module.exports = router