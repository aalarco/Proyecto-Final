const express = require('express')
const router = express.Router()

const List = require('../models/list.model')


router.post('/newList', (req, res) => {
    const list = req.body
    List.create(list)
        .then(theNewList => res.json(theNewList))
        .catch(err => console.log('DB error', err))
})






module.exports = router